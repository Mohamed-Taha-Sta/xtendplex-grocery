import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import DropZone from './components/DropZone';
import CustomDragLayer from './components/CustomDragLayer';

const API_URL = 'http://localhost:8000';

function App() {
  const [products, setProducts] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [meats, setMeats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);

        const fruitsResponse = await axios.get(`${API_URL}/products/fruits`);
        setFruits(fruitsResponse.data);

        const vegetablesResponse = await axios.get(`${API_URL}/products/vegetables`);
        setVegetables(vegetablesResponse.data);

        const meatsResponse = await axios.get(`${API_URL}/products/meats`);
        setMeats(meatsResponse.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const fetchCategorizedProducts = async () => {
    try {
      const fruitsResponse = await axios.get(`${API_URL}/products/fruits`);
      setFruits(fruitsResponse.data);

      const vegetablesResponse = await axios.get(`${API_URL}/products/vegetables`);
      setVegetables(vegetablesResponse.data);

      const meatsResponse = await axios.get(`${API_URL}/products/meats`);
      setMeats(meatsResponse.data);
    } catch (error) {
      console.error("Error fetching categorized products:", error);
    }
  };

  const handleProductDrop = async (productId, category) => {
    try {
      const response = await axios.put(`${API_URL}/products/${productId}`, null, {
        params: { category }
      });

      const droppedProduct = response.data.product;
      console.log("Dropped product:", droppedProduct);

      const productToMove = products.find(product => product.id === productId);

      if (!productToMove) {
        console.error(`Product with ID ${productId} not found`);
        return;
      }

      setProducts(products.filter(product => product.id !== productId));

      if (category === 'fruits') {
        setFruits(prevFruits => [...prevFruits, productToMove]);
      } else if (category === 'vegetables') {
        setVegetables(prevVegetables => [...prevVegetables, productToMove]);
      } else if (category === 'meats') {
        setMeats(prevMeats => [...prevMeats, productToMove]);
      }

      fetchCategorizedProducts();

    } catch (error) {
      console.error("Error updating product category:", error);
    }
  };

  const handleRemoveFromCategory = async (productId) => {
    try {
      const response = await axios.put(`${API_URL}/products/${productId}`, null, {
        params: { category: "" }
      });

      console.log("Remove response:", response.data);

      const fruitProduct = fruits.find(product => product.id === productId);
      const vegetableProduct = vegetables.find(product => product.id === productId);
      const meatProduct = meats.find(product => product.id === productId);

      let productToMove = null;

      if (fruitProduct) {
        productToMove = {...fruitProduct};
        setFruits(prevFruits => prevFruits.filter(product => product.id !== productId));
      } else if (vegetableProduct) {
        productToMove = {...vegetableProduct};
        setVegetables(prevVegetables => prevVegetables.filter(product => product.id !== productId));
      } else if (meatProduct) {
        productToMove = {...meatProduct};
        setMeats(prevMeats => prevMeats.filter(product => product.id !== productId));
      }

      if (productToMove) {
        console.log("Moving product to All:", productToMove);
        setProducts(prevProducts => {
          if (!prevProducts.some(p => p.id === productId)) {
            return [...prevProducts, productToMove];
          }
          return prevProducts;
        });
      }

      const productsResponse = await axios.get(`${API_URL}/products`);
      setProducts(productsResponse.data);

      fetchCategorizedProducts();

    } catch (error) {
      console.error("Error removing product from category:", error);

      const fruitProduct = fruits.find(product => product.id === productId);
      const vegetableProduct = vegetables.find(product => product.id === productId);
      const meatProduct = meats.find(product => product.id === productId);

      let productToMove = null;

      if (fruitProduct) {
        productToMove = {...fruitProduct};
        setFruits(prevFruits => prevFruits.filter(product => product.id !== productId));
      } else if (vegetableProduct) {
        productToMove = {...vegetableProduct};
        setVegetables(prevVegetables => prevVegetables.filter(product => product.id !== productId));
      } else if (meatProduct) {
        productToMove = {...meatProduct};
        setMeats(prevMeats => prevMeats.filter(product => product.id !== productId));
      }

      if (productToMove) {
        setProducts(prevProducts => {
          if (!prevProducts.some(p => p.id === productId)) {
            return [...prevProducts, productToMove];
          }
          return prevProducts;
        });
      }
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const getFilteredProducts = () => {
    let categoryProducts = [];

    switch(activeCategory) {
      case 'fruits':
        categoryProducts = Array.isArray(fruits) ? fruits : [];
        break;
      case 'vegetables':
        categoryProducts = Array.isArray(vegetables) ? vegetables : [];
        break;
      case 'meats':
        categoryProducts = Array.isArray(meats) ? meats : [];
        break;
      default:
        categoryProducts = Array.isArray(products) ? products : [];
    }

    console.log(`Active category: ${activeCategory}`);
    console.log(`Category products count: ${categoryProducts.length}`);

    return categoryProducts
      .filter(product => product && product.name)
      .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const filteredProducts = getFilteredProducts();

  const getCategoryTitle = () => {
    return activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
  };

  return (
      <DndProvider backend={HTML5Backend}>
        <AppContainer>
          <Header />
          <MainContent>
            <Sidebar
                fruits={fruits.length}
                vegetables={vegetables.length}
                meats={meats.length}
                uncategorizedCount={products.length}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
            />
            <ContentArea>
              <TopBar>
                <Title>{getCategoryTitle()}</Title>
                <SubTitle>Displaying {filteredProducts.length} out of {
                  activeCategory === 'all' ? products.length :
                  activeCategory === 'fruits' ? fruits.length :
                  activeCategory === 'vegetables' ? vegetables.length :
                  meats.length
                } items</SubTitle>
                <SearchContainer>
                  <SearchInput
                      type="text"
                      placeholder="Recherche"
                      value={searchTerm}
                      onChange={handleSearch}
                  />
                  <NewItemButton>New Item</NewItemButton>
                </SearchContainer>
              </TopBar>
              {activeCategory === 'all' && (
                <DropZonesContainer>
                  <DropZone title="Fruits" onDrop={(itemId) => handleProductDrop(itemId, 'fruits')} />
                  <DropZone title="Vegetables" onDrop={(itemId) => handleProductDrop(itemId, 'vegetables')} />
                  <DropZone title="Meats" onDrop={(itemId) => handleProductDrop(itemId, 'meats')} />
                </DropZonesContainer>
              )}
              <ProductGrid
                products={filteredProducts}
                isDraggable={activeCategory === 'all'}
                onRemoveFromCategory={handleRemoveFromCategory}
              />
            </ContentArea>
          </MainContent>
          <Footer>
            <p>2024 © All rights reserved</p>
          </Footer>
          <CustomDragLayer />
        </AppContainer>
      </DndProvider>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f7ff;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  max-width: 1400px; 
  width: 90%;
  margin: 20px auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-right: 15px;
`;

const SubTitle = styled.p`
  color: #666;
  margin-right: auto;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  position: relative;
  
  &::before {
    content: "⚲";
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%) rotate(-45deg);
    font-size: 22px;
    color: #999;
    z-index: 1;
    pointer-events: none;
  }
`;

const SearchInput = styled.input`
  padding: 10px 15px 10px 35px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 250px;
  position: relative;
  
  &::placeholder {
    color: #999;
  }
`;

const NewItemButton = styled.button`
  background-color: #396C95;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #2980b9;
  }
  
  &::before {
    content: "+";
    margin-right: 6px;
    font-weight: bold;
    font-size: 18px;
    line-height: 1;
  }
`;

const DropZonesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 6px;
  background-color: white;
  color: #3D779B;
  border-top: 1px solid #959595;
  font-size: 12px;
`;

export default App;
