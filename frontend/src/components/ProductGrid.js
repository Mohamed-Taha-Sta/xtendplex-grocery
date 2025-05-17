import React from 'react';
import styled from 'styled-components';
import DraggableProduct from './DraggableProduct';

const ProductGrid = ({ products, isDraggable = true, onRemoveFromCategory }) => {
    return (
        <GridContainer>
            {products.map(product => (
                <DraggableProduct
                    key={product.id}
                    product={product}
                    isDraggable={isDraggable}
                    onRemoveFromCategory={onRemoveFromCategory}
                />
            ))}
        </GridContainer>
    );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export default ProductGrid;

