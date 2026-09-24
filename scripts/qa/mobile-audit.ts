import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
import { SERVICES_DATA } from '../../src/data/servicesData.ts';

// -------------------------------------------------------------
// 1. Chrome Executable Auto-Detection
// -------------------------------------------------------------
function findChromeExecutable() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const platform = process.platform;
  const candidates = [];

  if (platform === 'win32') {
    const progFiles = process.env.ProgramFiles || 'C:\\Program Files';
    const progFilesX86 = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)';
    const localAppData = process.env.LOCALAPPDATA || '';
    candidates.push(
      path.join(progFiles, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      path.join(progFilesX86, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      path.join(localAppData, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      path.join(progFiles, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
      path.join(progFilesX86, 'Microsoft', 'Edge', 'Application', 'msedge.exe')
    );
  } else if (platform === 'darwin') {
    candidates.push(
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
    );
  } else {
    candidates.push(
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser'
    );
  }

  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

// -------------------------------------------------------------
// 2. Free Port & Vite Preview Server Lifecycle
// -------------------------------------------------------------
function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status === 200 || res.status === 404) {
        return true;
      }
    } catch {
      // Waiting for server start
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Timeout waiting for preview server at ${url}`);
}

// -------------------------------------------------------------
// 3. Allowlist Loader
// -------------------------------------------------------------
function loadAllowlist() {
  const allowlistPath = path.resolve('scripts/qa/allowlist.json');
  if (fs.existsSync(allowlistPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(allowlistPath, 'utf8'));
      return data.items || [];
    } catch (e) {
      console.warn('Warning: Could not parse allowlist.json', e.message);
    }
  }
  return [];
}

// -------------------------------------------------------------
// 4. Matrix Definitions
// -------------------------------------------------------------
const STATIC_ROUTES = [
  '/',
  '/services',
  '/about',
  '/pricing',
  '/gallery',
  '/service-areas',
  '/faq',
  '/contact',
  '/not-found-qa-test-404'
];

const SERVICE_ROUTES = SERVICES_DATA.filter((s) => s.enabled).map((s) => `/services/${s.slug}`);
const ALL_ROUTES = [...STATIC_ROUTES, ...SERVICE_ROUTES];

const VIEWPORTS = [
  // Mobile
  { width: 320, height: 740, isMobile: true, hasTouch: true, dsf: 2, label: '320' },
  { width: 360, height: 740, isMobile: true, hasTouch: true, dsf: 2, label: '360' },
  { width: 375, height: 740, isMobile: true, hasTouch: true, dsf: 2, label: '375' },
  { width: 390, height: 844, isMobile: true, hasTouch: true, dsf: 2, label: '390' },
  { width: 412, height: 892, isMobile: true, hasTouch: true, dsf: 2, label: '412' },
  { width: 414, height: 896, isMobile: true, hasTouch: true, dsf: 2, label: '414' },
  { width: 430, height: 932, isMobile: true, hasTouch: true, dsf: 2, label: '430' },
  { width: 469, height: 840, isMobile: true, hasTouch: true, dsf: 2, label: '469' },
  { width: 600, height: 960, isMobile: true, hasTouch: true, dsf: 2, label: '600' },
  { width: 768, height: 1024, isMobile: true, hasTouch: true, dsf: 2, label: '768' },
  // Landscape phones
  { width: 667, height: 375, isMobile: true, hasTouch: true, dsf: 2, label: '667x375-land' },
  { width: 844, height: 390, isMobile: true, hasTouch: true, dsf: 2, label: '844x390-land' },
  // Desktop
  { width: 1024, height: 768, isMobile: false, hasTouch: false, dsf: 1, label: '1024' },
  { width: 1100, height: 800, isMobile: false, hasTouch: false, dsf: 1, label: '1100' },
  { width: 1280, height: 800, isMobile: false, hasTouch: false, dsf: 1, label: '1280' },
  { width: 1536, height: 900, isMobile: false, hasTouch: false, dsf: 1, label: '1536' },
  { width: 1920, height: 1080, isMobile: false, hasTouch: false, dsf: 1, label: '1920' },
];

const FONT_STRESS_CONFIGS = [
  { width: 320, height: 740, fontScale: '125%', label: '320-font125' },
  { width: 320, height: 740, fontScale: '150%', label: '320-font150' },
  { width: 375, height: 740, fontScale: '125%', label: '375-font125' },
  { width: 375, height: 740, fontScale: '150%', label: '375-font150' },
  { width: 430, height: 932, fontScale: '125%', label: '430-font125' },
  { width: 430, height: 932, fontScale: '150%', label: '430-font150' },
];

const MOTION_MODES = ['no-preference', 'reduce'];

// -------------------------------------------------------------
// 5. Page Preparation & State Transitions
// -------------------------------------------------------------
async function settlePage(page) {
  await page.evaluate(`(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    const scrollStep = 800;
    const maxScroll = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let pos = 0; pos < maxScroll; pos += scrollStep) {
      window.scrollTo(0, pos);
      await new Promise((r) => setTimeout(r, 20));
    }
    window.scrollTo(0, 0);
  })()`);

  // Layout settle wait
  await page.waitForTimeout(300);
}

async function applyState(page, route, stateName, vp) {
  if (stateName === 'default') return true;

  if (stateName === 'drawer-open') {
    if (vp.width >= 1024) return false;
    const hamburger = await page.$('button[aria-label*="Navigation" i], button[aria-label*="menu" i], button[aria-controls="mobile-drawer"]');
    if (hamburger && await hamburger.isVisible()) {
      await hamburger.click();
      await page.waitForTimeout(300);
      return true;
    }
    return false;
  }

  if (stateName === 'services-accordion-open') {
    if (vp.width >= 1024) return false;
    const hamburger = await page.$('button[aria-label*="Navigation" i], button[aria-label*="menu" i], button[aria-controls="mobile-drawer"]');
    if (hamburger && await hamburger.isVisible()) {
      await hamburger.click();
      await page.waitForTimeout(300);
      const accordionBtn = await page.$('button:has-text("Services"), [data-drawer-accordion]');
      if (accordionBtn && await accordionBtn.isVisible()) {
        await accordionBtn.click();
        await page.waitForTimeout(300);
        return true;
      }
      return true;
    }
    return false;
  }

  if (stateName === 'desktop-mega-menu') {
    if (vp.width < 1024) return false;
    const servicesNav = await page.$('nav a[href="/services"], nav button:has-text("Services")');
    if (servicesNav && await servicesNav.isVisible()) {
      await servicesNav.hover();
      await page.waitForTimeout(300);
      return true;
    }
    return false;
  }

  if (stateName === 'booking-modal-header') {
    const btn = await page.$('header button:has-text("Quote"), header button:has-text("Book"), [data-quote-modal-trigger], button:has-text("Book Now"), a:has-text("Book Now")');
    if (btn && await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(300);
      return true;
    }
    return false;
  }

  if (stateName === 'booking-modal-welcome') {
    const btn = await page.$('button:has-text("Get Free Estimate"), button:has-text("Book Now"), a:has-text("Book Now")');
    if (btn && await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(300);
      return true;
    }
    return false;
  }

  if (stateName === 'gallery-lightbox') {
    if (route !== '/gallery') return false;
    const galleryImg = await page.$('button:has(img), .price-card:has(img)');
    if (galleryImg && await galleryImg.isVisible()) {
      await galleryImg.click();
      await page.waitForTimeout(300);
      return true;
    }
    return false;
  }

  if (stateName === 'form-validation-errors') {
    if (route !== '/contact') return false;
    const submitBtn = await page.$('form button[type="submit"]');
    if (submitBtn && await submitBtn.isVisible()) {
      await submitBtn.click();
      await page.waitForTimeout(300);
      return true;
    }
    return false;
  }

  if (stateName === 'form-keyboard-simulated') {
    if (route !== '/contact') return false;
    const input = await page.$('input[name="phone"], input[type="tel"], input[type="text"]');
    if (input && await input.isVisible()) {
      await input.focus();
      const newHeight = Math.round(vp.height * 0.55);
      await page.setViewportSize({ width: vp.width, height: newHeight });
      await page.waitForTimeout(300);
      return true;
    }
    return false;
  }

  return false;
}

// -------------------------------------------------------------
// 6. In-Browser Verification Checks (Checks 1 to 12)
// -------------------------------------------------------------
const browserChecksCode = fs.readFileSync(path.resolve('scripts/qa/browser-checks.cjs'), 'utf8')
  .replace(/^module\.exports\s*=\s*/, '')
  .replace(/;\s*$/, '');

async function runChecksInBrowser(page, vp, route, stateName, allowlist) {
  return await page.evaluate(
    `(${browserChecksCode})(${JSON.stringify({ vp, route, stateName, allowlist })})`
  );
}

// -------------------------------------------------------------
// 7. PerformanceObserver CLS
// -------------------------------------------------------------
async function setupClsObserver(page) {
  await page.evaluate(`(() => {
    window.__clsScore = 0;
    try {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            window.__clsScore += entry.value;
          }
        }
      });
      observer.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}
  })()`);
}

async function getClsScore(page) {
  return await page.evaluate(`window.__clsScore || 0`);
}

// -------------------------------------------------------------
// 8. Main Multi-Worker Test Runner
// -------------------------------------------------------------
async function runAudit() {
  console.log('=====================================================');
  console.log('  GARUDA CLEANING SERVICES – MOBILE ZERO-DEFECT QA   ');
  console.log('=====================================================\n');

  const allowlist = loadAllowlist();
  console.log(`Loaded allowlist with ${allowlist.length} item(s).`);

  const chromePath = findChromeExecutable();
  console.log(`Chrome detection: ${chromePath ? `Found at ${chromePath}` : 'Using system channel "chrome"'}`);

  const freePort = await getFreePort();
  const baseUrl = `http://localhost:${freePort}`;
  console.log(`Starting 'vite preview' on port ${freePort}...`);

  const previewProcess = spawn('npx', ['vite', 'preview', '--port', String(freePort), '--strictPort'], {
    shell: true,
    stdio: 'pipe'
  });

  let previewLogs = '';
  previewProcess.stdout?.on('data', (d) => { previewLogs += d.toString(); });
  previewProcess.stderr?.on('data', (d) => { previewLogs += d.toString(); });

  const cleanup = () => {
    try {
      if (process.platform === 'win32' && previewProcess.pid) {
        spawn('taskkill', ['/pid', String(previewProcess.pid), '/f', '/t']);
      } else {
        previewProcess.kill();
      }
    } catch {
      // Ignore
    }
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', cleanup);

  try {
    await waitForServer(baseUrl);
    console.log(`✅ Production preview server running at ${baseUrl}\n`);
  } catch (err) {
    console.error(`Failed to start preview server: ${err.message}`);
    console.error('Preview output:\n', previewLogs);
    cleanup();
    process.exit(1);
  }

  const screenshotDir = path.resolve('qa-screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  let browser;
  try {
    const launchOptions = {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-extensions'
      ]
    };
    if (chromePath) {
      browser = await chromium.launch({ ...launchOptions, executablePath: chromePath });
    } else {
      browser = await chromium.launch({ ...launchOptions, channel: 'chrome' });
    }
  } catch (err) {
    console.error(`Failed to launch Chrome: ${err.message}`);
    cleanup();
    process.exit(1);
  }

  // Build the complete queue of tests
  const testQueue = [];

  for (const motion of MOTION_MODES) {
    // 1. All routes at all viewports (default state)
    for (const vp of VIEWPORTS) {
      for (const route of ALL_ROUTES) {
        testQueue.push({
          type: 'standard',
          route,
          vp,
          stateName: 'default',
          motion
        });
      }
    }

    // 2. Specific states on key routes
    // Drawer open & services accordion on all mobile widths
    for (const vp of VIEWPORTS.filter((v) => v.width < 1024)) {
      testQueue.push({ type: 'standard', route: '/', vp, stateName: 'drawer-open', motion });
      testQueue.push({ type: 'standard', route: '/', vp, stateName: 'services-accordion-open', motion });
    }
    // Booking modals on all widths
    for (const vp of VIEWPORTS) {
      testQueue.push({ type: 'standard', route: '/', vp, stateName: 'booking-modal-header', motion });
      testQueue.push({ type: 'standard', route: '/', vp, stateName: 'booking-modal-welcome', motion });
    }
    // Desktop mega menu on desktop widths
    for (const vp of VIEWPORTS.filter((v) => v.width >= 1024)) {
      testQueue.push({ type: 'standard', route: '/', vp, stateName: 'desktop-mega-menu', motion });
    }
    // Gallery lightbox on all widths
    for (const vp of VIEWPORTS) {
      testQueue.push({ type: 'standard', route: '/gallery', vp, stateName: 'gallery-lightbox', motion });
    }
    // Contact form validation & keyboard simulation
    for (const vp of VIEWPORTS) {
      testQueue.push({ type: 'standard', route: '/contact', vp, stateName: 'form-validation-errors', motion });
      if (vp.isMobile) {
        testQueue.push({ type: 'standard', route: '/contact', vp, stateName: 'form-keyboard-simulated', motion });
      }
    }

    // 3. Font stress tests
    for (const fcfg of FONT_STRESS_CONFIGS) {
      for (const route of ['/', '/about', '/pricing', '/contact']) {
        testQueue.push({
          type: 'font-stress',
          route,
          fcfg,
          motion
        });
      }
    }
  }

  const totalTests = testQueue.length;
  console.log(`Total tests scheduled in matrix: ${totalTests}`);
  console.log(`  - Routes: ${ALL_ROUTES.length} (${STATIC_ROUTES.length} static + ${SERVICE_ROUTES.length} dynamic service slugs)`);
  console.log(`  - Viewports: ${VIEWPORTS.length} (${VIEWPORTS.map(v => v.label).join(', ')})`);
  console.log(`  - Motion modes: ${MOTION_MODES.join(', ')}`);
  console.log(`  - Special state & font stress variants: ${totalTests - (MOTION_MODES.length * VIEWPORTS.length * ALL_ROUTES.length)} tests`);
  console.log(`Expected total executions: ${totalTests}\n`);

  const results = [];
  const failureMatrix = [];
  let completedCount = 0;
  let passedCount = 0;
  let failedCount = 0;

  // Concurrency pool (4 parallel workers for stability)
  const CONCURRENCY = 4;
  console.log(`Running with concurrency: ${CONCURRENCY} workers...\n`);

  async function worker(_workerId) {
    while (testQueue.length > 0) {
      const item = testQueue.shift();
      if (!item) break;

      const motion = item.motion;
      const isFontStress = item.type === 'font-stress';
      const route = item.route;
      const vp = isFontStress
        ? { width: item.fcfg.width, height: item.fcfg.height, isMobile: true, hasTouch: true, dsf: 2, label: item.fcfg.label }
        : item.vp;
      const stateName = isFontStress ? 'font-stress' : item.stateName;

      const safeSlug = route.replace(/\//g, '_') || 'root';
      const screenshotName = `${safeSlug}-${vp.label}-${stateName}-${motion}.png`;
      const screenshotPath = path.join(screenshotDir, screenshotName);
      const testId = `${route} | ${vp.label}px | ${stateName} | ${motion}`;

      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: vp.dsf || 2,
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch,
        reducedMotion: motion
      });
      await context.addInitScript(() => {
        // @ts-ignore
        window.__name = (fn) => fn;
      });

      const page = await context.newPage();
      const consoleErrors = [];
      const consoleWarnings = [];
      const failedRequests = [];

      page.on('console', (msg) => {
        const type = msg.type();
        if (type === 'error') consoleErrors.push(msg.text());
        if (type === 'warning') consoleWarnings.push(msg.text());
      });

      page.on('response', (res) => {
        if (res.status() >= 400 && !route.includes('not-found')) {
          failedRequests.push(`${res.status()} ${res.url()}`);
        }
      });

      const itemIssues = [];

      try {
        await setupClsObserver(page);
        await page.goto(`${baseUrl}${route}`, { waitUntil: 'load', timeout: 20000 });

        if (isFontStress) {
          await page.evaluate(`document.documentElement.style.fontSize = ${JSON.stringify(item.fcfg.fontScale)}`);
        }

        await settlePage(page);

        if (!isFontStress) {
          const stateApplied = await applyState(page, route, stateName, vp);
          if (!stateApplied && stateName !== 'default') {
            itemIssues.push({
              check: 0,
              name: 'State Transition Failed',
              selector: `[state="${stateName}"]`,
              measured: `Could not trigger state "${stateName}" at ${vp.label}px on route ${route}`
            });
          }
        }

        await page.screenshot({ path: screenshotPath, fullPage: false });

        // Checks 1 to 8, 11
        const browserIssues = await runChecksInBrowser(page, vp, route, stateName, allowlist);
        itemIssues.push(...browserIssues);

        // Check 9: Axe-Core
        try {
          const axeResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze();

          const criticalOrSerious = axeResults.violations.filter(
            (v) => v.impact === 'serious' || v.impact === 'critical'
          );

          for (const v of criticalOrSerious) {
            for (const node of v.nodes) {
              itemIssues.push({
                check: 9,
                name: `Axe: ${v.id} (${v.impact})`,
                selector: node.target.join(' '),
                measured: `${v.description}. ${v.help}`
              });
            }
          }
        } catch (axeErr) {
          itemIssues.push({
            check: 9,
            name: 'Axe Execution Exception',
            selector: 'document',
            measured: axeErr.message
          });
        }

        // Check 10: Console & Network
        if (consoleErrors.length > 0) {
          itemIssues.push({
            check: 10,
            name: 'Console Errors',
            selector: 'window',
            measured: consoleErrors.slice(0, 3).join(' | ')
          });
        }
        if (failedRequests.length > 0) {
          itemIssues.push({
            check: 10,
            name: 'Failed Network Requests',
            selector: 'network',
            measured: failedRequests.slice(0, 3).join(' | ')
          });
        }

        // Check 11: CLS
        const clsScore = await getClsScore(page);
        if (clsScore >= 0.05) {
          itemIssues.push({
            check: 11,
            name: 'CLS Layout Shift >= 0.05',
            selector: 'PerformanceObserver',
            measured: `CLS=${clsScore.toFixed(4)}`
          });
        }
      } catch (err) {
        itemIssues.push({
          check: 0,
          name: 'Execution Exception',
          selector: 'page',
          measured: err.message
        });
      } finally {
        await context.close();
      }

      completedCount++;
      if (itemIssues.length === 0) {
        passedCount++;
        results.push({ testId, status: 'PASS', issues: [], screenshot: screenshotName });
      } else {
        failedCount++;
        results.push({ testId, status: 'FAIL', issues: itemIssues, screenshot: screenshotName });
        failureMatrix.push({
          route,
          width: vp.label,
          state: stateName,
          motion,
          issues: itemIssues,
          screenshot: screenshotName
        });
      }

      if (completedCount % 50 === 0 || completedCount === totalTests) {
        console.log(`[Progress] ${completedCount}/${totalTests} tests completed (${failedCount} failed, ${passedCount} passed)`);
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1));
  await Promise.all(workers);

  await browser.close();
  cleanup();

  // -------------------------------------------------------------
  // 9. Generate qa-report.md
  // -------------------------------------------------------------
  console.log('\n=====================================================');
  console.log(`AUDIT FINISHED: ${totalTests} total, ${passedCount} PASSED, ${failedCount} FAILED.`);
  console.log('=====================================================\n');

  let reportMd = `# Mobile QA Audit Report\n\n`;
  reportMd += `**Run Timestamp:** ${new Date().toISOString()}\n`;
  reportMd += `**Summary:** Total Tested: ${totalTests} | Passed: ${passedCount} | Failed: ${failedCount}\n\n`;

  reportMd += `## Allowlist Contents\n`;
  if (allowlist.length === 0) {
    reportMd += `_No allowlist items defined (empty)._\n\n`;
  } else {
    reportMd += `| Selector | Page | Width | Reason |\n|---|---|---|---|\n`;
    for (const item of allowlist) {
      reportMd += `| \`${item.selector}\` | \`${item.page || '*'}\` | \`${item.width || '*'}\` | ${item.reason || ''} |\n`;
    }
    reportMd += `\n`;
  }

  reportMd += `## Failure Matrix (To-Do List)\n\n`;
  if (failureMatrix.length === 0) {
    reportMd += `🎉 **ZERO DEFECTS! All checks passed successfully across all viewports, routes, states, and motion modes.**\n\n`;
  } else {
    reportMd += `| Route | Viewport | State | Motion | Check | Issue | Selector | Measured |\n`;
    reportMd += `|---|---|---|---|---|---|---|---|\n`;
    for (const item of failureMatrix) {
      for (const issue of item.issues) {
        reportMd += `| \`${item.route}\` | \`${item.width}\` | \`${item.state}\` | \`${item.motion}\` | ${issue.check} | **${issue.name}** | \`${issue.selector}\` | ${issue.measured} |\n`;
      }
    }
    reportMd += `\n`;
  }

  reportMd += `## Detailed Results Matrix\n\n`;
  reportMd += `| Test ID | Status | Issues Count | Screenshot |\n`;
  reportMd += `|---|---|---|---|\n`;
  for (const res of results) {
    reportMd += `| ${res.testId} | ${res.status === 'PASS' ? '✅ PASS' : '❌ FAIL'} | ${res.issues.length} | \`${res.screenshot}\` |\n`;
  }

  fs.writeFileSync('qa-report.md', reportMd, 'utf8');
  console.log('Report saved to qa-report.md');

  if (failedCount > 0) {
    console.error(`\nAudit exited with non-zero code due to ${failedCount} failed test state(s).`);
    process.exit(1);
  } else {
    console.log('\nAudit exited with code 0. Zero defects!');
    process.exit(0);
  }
}

runAudit().catch((err) => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
