import React from 'react';
import styled from 'styled-components';

const Sidebar = ({ fruits, vegetables, meats, uncategorizedCount, activeCategory, onCategoryChange }) => {
    return (
        <SidebarContainer>
            <SidebarHeader>Groceries</SidebarHeader>

            <CategoryList>
                <NewListItem>
                    <PlusIcon>+</PlusIcon>
                    <NewListText>New list</NewListText>
                </NewListItem>

                <CategoryItem
                    active={activeCategory === 'all'}
                    onClick={() => onCategoryChange('all')}
                >
                    <CategoryName>All</CategoryName>
                    <CategoryCount>({uncategorizedCount} items)</CategoryCount>
                </CategoryItem>

                <CategoryItem
                    active={activeCategory === 'fruits'}
                    onClick={() => onCategoryChange('fruits')}
                >
                    <CategoryName>Fruits</CategoryName>
                    <CategoryCount>({fruits} items)</CategoryCount>
                </CategoryItem>

                <CategoryItem
                    active={activeCategory === 'vegetables'}
                    onClick={() => onCategoryChange('vegetables')}
                >
                    <CategoryName>Vegetables</CategoryName>
                    <CategoryCount>({vegetables} items)</CategoryCount>
                </CategoryItem>

                <CategoryItem
                    active={activeCategory === 'meats'}
                    onClick={() => onCategoryChange('meats')}
                >
                    <CategoryName>Meats</CategoryName>
                    <CategoryCount>({meats} items)</CategoryCount>
                </CategoryItem>
            </CategoryList>
        </SidebarContainer>
    );
};

const SidebarContainer = styled.aside`
  background-color: white;
  width: 250px;
  border-right: 1px solid #e0e0e0;
  padding: 20px 15px;
`;

const SidebarHeader = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-left: 10px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const NewListItem = styled.li`
  padding: 12px 15px;
  display: flex;
  align-items: center;
  justify-content: center; 
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const PlusIcon = styled.span`
  margin-right: 8px;
  font-weight: bold;
  font-size: 16px;
`;

const NewListText = styled.span`
  font-weight: bold;
  font-size: 14px;
`;

const CategoryItem = styled.li`
  padding: 12px 15px;
  cursor: pointer;
  border-left: ${props => props.active ? '4px solid #3498db' : '4px solid transparent'};
  background-color: ${props => props.active ? '#f0f7ff' : 'transparent'};
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  transition: all 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${props => props.active ? '#e3f2fd' : '#f5f5f5'};
  }
`;

const CategoryName = styled.span`
  font-weight: 500;
  flex: 1;
`;

const CategoryCount = styled.span`
  font-size: 12px;
  color: #777;
  margin-left: 5px;
`;

export default Sidebar;
