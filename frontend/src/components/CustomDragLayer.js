import React from 'react';
import { useDragLayer } from 'react-dnd';
import styled from 'styled-components';

const CustomDragLayer = () => {
    const { itemType, isDragging, item, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    if (!isDragging || !currentOffset) {
        return null;
    }

    const renderItem = () => {
        if (itemType === 'product') {
            return (
                <DragPreview>
                    <DraggedItemName>{item.name}</DraggedItemName>
                </DragPreview>
            );
        }
        return null;
    };

    return (
        <DragLayerContainer>
            <div style={{
                transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 100,
                left: 0,
                top: 0
            }}>
                {renderItem()}
            </div>
        </DragLayerContainer>
    );
};

const DragLayerContainer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const DragPreview = styled.div`
  background-color: #3498db;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  transform: rotate(-5deg);
`;

const DraggedItemName = styled.div`
  font-weight: bold;
`;

export default CustomDragLayer;