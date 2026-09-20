import React from 'react';
import { Link } from 'react-router-dom';

interface AquaButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  color?: string;
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'gold';
  className?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const AquaButton: React.FC<AquaButtonProps> = ({
  children,
  to,
  href,
  onClick,
  color,
  variant = 'primary',
  className = '',
  target,
  rel,
  type = 'button',
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'secondary':
        return 'btn-aqua-secondary';
      case 'whatsapp':
        return 'btn-aqua-whatsapp';
      case 'gold':
        return '';
      default:
        return '';
    }
  };

  const style = color ? ({ '--clr': color } as React.CSSProperties) : undefined;
  const combinedClasses = `btn-aqua ${getVariantClass()} ${className}`.trim();

  const iconElement = (
    <span className="button__icon-wrapper" aria-hidden="true">
      <svg
        width="10"
        className="button__icon-svg"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 15"
      >
        <path
          fill="currentColor"
          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
        />
      </svg>
      <svg
        width="10"
        className="button__icon-svg button__icon-svg--copy"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 15"
      >
        <path
          fill="currentColor"
          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
        />
      </svg>
    </span>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} style={style} onClick={onClick}>
        <span>{children}</span>
        {iconElement}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        style={style}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        <span>{children}</span>
        {iconElement}
      </a>
    );
  }

  return (
    <button type={type} className={combinedClasses} style={style} onClick={onClick}>
      <span>{children}</span>
      {iconElement}
    </button>
  );
};
