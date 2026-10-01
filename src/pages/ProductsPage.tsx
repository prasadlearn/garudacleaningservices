import React from 'react';
import { CleaningLiquidsPage } from './CleaningLiquidsPage';

/**
 * Re-export CleaningLiquidsPage for backwards compatibility across existing routes and imports.
 */
export const ProductsPage: React.FC = () => {
  return <CleaningLiquidsPage />;
};

export default ProductsPage;
