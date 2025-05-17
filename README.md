# XtendPlex Grocery Management

This project is a web application for managing grocery items. It features a React frontend and a Python FastAPI backend. Users can view products, categorize them into fruits, vegetables, or meats by dragging and dropping, and search for specific items.

## Project Structure

-   `/backend`: Contains the FastAPI backend application.
-   `/frontend`: Contains the React frontend application.

## Frontend

The frontend is built with React and allows users to interact with the grocery list.

### Key Features:
- Display products in a grid.
- Drag and drop products to categorize them into "Fruits", "Vegetables", or "Meats".
- View products by category or all uncategorized items.
- Search for products by name.
- Remove products from categories.

### Running the Frontend
Navigate to the `frontend` directory:
```bash
cd frontend
npm start
```
This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Backend

The backend is a FastAPI application that serves product data and handles categorization logic.

### API Endpoints

-   `GET /`: Welcome message for the API.
-   `GET /products`: Retrieves a list of all uncategorized products.
-   `GET /products/{category}`: Retrieves a list of products for a specific category (fruits, vegetables, meats).
-   `PUT /products/{product_id}?category={category_name}`: Updates the category of a specific product. If `category` query parameter is not provided or is empty, the product is moved to uncategorized.

### Running the Backend
Navigate to the `backend` directory:
```bash
cd backend
# Ensure you have a virtual environment activated and dependencies installed (e.g., uvicorn, fastapi)
python main.py
```
The API will be available at [http://localhost:8000](http://localhost:8000).

## Application Screenshot

![Frontend UI](/frontend/public/frontend-UI.png)

## Setup

1.  **Backend**:
    *   Navigate to the `backend` directory.
    *   Create and activate a Python virtual environment.
    *   Install dependencies: `pip install fastapi uvicorn`
    *   Run the backend: `python main.py`
2.  **Frontend**:
    *   Navigate to the `frontend` directory.
    *   Install dependencies: `npm install`
    *   Run the frontend: `npm start`

Ensure both backend and frontend servers are running to use the application fully.
```