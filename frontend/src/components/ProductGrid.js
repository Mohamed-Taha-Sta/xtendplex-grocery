import React from 'react';
import styled from 'styled-components';
import DraggableProduct from './DraggableProduct';

const ProductGrid = ({ products, isDraggable = true, onRemoveFromCategory, onReorder }) => {
    return (
        <GridContainer>
            {products.map((product, index) => (
                <DraggableProduct
                    key={product.id}
                    index={index}
                    product={product}
                    isDraggable={isDraggable}
                    onRemoveFromCategory={onRemoveFromCategory}
                    onReorder={onReorder}
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

