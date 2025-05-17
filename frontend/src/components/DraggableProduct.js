import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const DraggableProduct = ({ product, isDraggable = true, onRemoveFromCategory }) => {
    const [{ isDragging }, drag, preview] = useDrag({
        type: 'product',
        item: { id: product.id, name: product.name, type: 'product' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        canDrag: () => isDraggable,
    });

    useEffect(() => {
        if (isDraggable) {
            preview(getEmptyImage(), { captureDraggingState: true });
        }
    }, [preview, isDraggable]);

    const handleDelete = () => {
        if (onRemoveFromCategory) {
            onRemoveFromCategory(product.id);
        }
    };

    const handleViewImage = () => {
        console.log('View image for:', product.name);
    };

    return (
        <ProductCard
            ref={isDraggable ? drag : null}
            isDragging={isDragging}
            isDraggable={isDraggable}
        >
            <ImageContainer>
                <ProductImage src={product.image_url} alt={product.name} />
                <ButtonsContainer>
                    <ActionButton color="#8b0000" onClick={handleDelete}>
                        <TrashIcon />
                    </ActionButton>
                    <ActionButton color="#006400" onClick={handleViewImage}>
                        <ImageIcon />
                    </ActionButton>
                </ButtonsContainer>
            </ImageContainer>
            <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductAttribute>{product.weight}</ProductAttribute>
                <ProductAttribute>Qty: {product.quantity}</ProductAttribute>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
            </ProductInfo>
        </ProductCard>
    );
};

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
        <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

const ImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
);

const ProductCard = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    opacity: ${props => props.isDragging ? 0.6 : 1};
    cursor: ${props => props.isDraggable ? 'grab' : 'default'};
    position: relative;
    overflow: hidden;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 120px;
    min-width: 120px;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const ButtonsContainer = styled.div`
    position: absolute;
    bottom: 8px;
    left: 8px;
    right: 8px;
    display: flex;
    justify-content: space-between;
`;

const ActionButton = styled.button`
    background-color: ${props => props.color};
    color: white;
    border: none;
    border-radius: 6px;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    
    &:hover {
        opacity: 0.85;
        filter: brightness(1.1);
    }
`;

const ProductInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
`;

const ProductName = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 6px;
`;

const ProductAttribute = styled.div`
    font-size: 14px;
    color: #666;
    margin-bottom: 4px;
`;

const ProductPrice = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #2ecc71;
    margin-top: 8px;
`;

export default DraggableProduct;