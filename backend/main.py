from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI(title="XtendPlex Grocery API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProductBase(BaseModel):
    name: str
    weight: str
    quantity: int
    price: float
    image_url: str
    category: Optional[str] = None

class Product(ProductBase):
    id: str

products_db = [
    Product(
        id=str(uuid.uuid4()),
        name="Asparagus",
        weight="500g",
        quantity=1,
        price=3.99,
        image_url="/images/asparagus.jpg",
        category=None
    ),
    Product(
        id=str(uuid.uuid4()),
        name="Strawberry",
        weight="250g",
        quantity=1,
        price=2.49,
        image_url="/images/strawberry.jpg",
        category=None
    ),
    Product(
        id=str(uuid.uuid4()),
        name="Mandarin",
        weight="1kg",
        quantity=5,
        price=4.99,
        image_url="/images/mandarin.jpg",
        category=None
    ),
    Product(
        id=str(uuid.uuid4()),
        name="Steak",
        weight="400g",
        quantity=1,
        price=12.99,
        image_url="/images/steak.jpg",
        category=None
    ),
    Product(
        id=str(uuid.uuid4()),
        name="Cherry",
        weight="200g",
        quantity=1,
        price=3.49,
        image_url="/images/cherry.jpg",
        category=None
    ),
    Product(
        id=str(uuid.uuid4()),
        name="Fish",
        weight="1kg",
        quantity=1,
        price=9.99,
        image_url="/images/fish.jpg",
        category=None
    ),
    Product(
        id=str(uuid.uuid4()),
        name="Broccoli",
        weight="300g",
        quantity=1,
        price=1.99,
        image_url="/images/broccoli.jpg",
        category=None
    ),
    Product(
        id=str(uuid.uuid4()),
        name="Bell Peppers",
        weight="500g",
        quantity=3,
        price=4.49,
        image_url="/images/peppers.jpg",
        category=None
    )
]

categorized_products = {
    "fruits": [],
    "vegetables": [],
    "meats": []
}

@app.get("/")
def read_root():
    return {"message": "Welcome to the XtendPlex Grocery API"}

@app.get("/products", response_model=List[Product])
def get_products():
    return [product for product in products_db if product.category is None]

@app.get("/products/{category}", response_model=List[Product])
def get_products_by_category(category: str):
    if category not in ["fruits", "vegetables", "meats"]:
        raise HTTPException(status_code=400, detail="Invalid category")

    return categorized_products[category]

@app.put("/products/{product_id}")
def update_product_category(product_id: str, category: Optional[str] = None):
    # Find the product in the database
    product_index = None
    for i, product in enumerate(products_db):
        if product.id == product_id:
            product_index = i
            break

    if product_index is None:
        raise HTTPException(status_code=404, detail="Product not found")

    product = products_db[product_index]

    if product.category in categorized_products:
        categorized_products[product.category] = [
            p for p in categorized_products[product.category] if p.id != product_id
        ]

    if not category:
        product.category = None
        return {"message": "Product reset to uncategorized", "product": product}

    if category not in ["fruits", "vegetables", "meats"]:
        raise HTTPException(status_code=422, detail="Invalid category")

    product.category = category

    categorized_products[category].append(product)

    return {"message": f"Product categorized as {category}", "product": product}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", port=8000, reload=True)

