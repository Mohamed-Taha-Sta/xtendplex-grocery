import React from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';

const DropZone = ({ title, onDrop }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'product',
        drop: (item) => onDrop(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop;

    return (
        <DropContainer ref={drop} isActive={isActive} canDrop={canDrop}>
            <DropTitle>{title}</DropTitle>
            <DropMessage>
                {isActive ? `Release to add to ${title.toLowerCase()}` : `Drop ${title.toLowerCase()} here`}
            </DropMessage>
            {canDrop && !isOver && <DropIndicator>Ready to receive</DropIndicator>}
            {isActive && <ActiveIndicator />}
        </DropContainer>
    );
};

const DropContainer = styled.div`
    width: 30%;
    min-height: 120px;
    background-color: ${props => {
        if (props.isActive) return '#e3f2fd';
        if (props.canDrop) return '#f0f9ff';
        return '#f9f9f9';
    }};
    border: 2px dashed ${props => {
        if (props.isActive) return '#2196f3';
        if (props.canDrop) return '#90caf9';
        return '#ccc';
    }};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
`;

const DropTitle = styled.h3`
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: bold;
`;

const DropMessage = styled.p`
    margin: 0;
    color: #666;
    font-size: 14px;
    text-align: center;
`;

const DropIndicator = styled.div`
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #e8f5e9;
    border-radius: 20px;
    font-size: 12px;
    color: #388e3c;
`;

const ActiveIndicator = styled.div`
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
    animation: pulse 1.5s infinite;

    @keyframes pulse {
        0% {
            opacity: 0.6;
        }
        50% {
            opacity: 0.3;
        }
        100% {
            opacity: 0.6;
        }
    }
`;

export default DropZone;
