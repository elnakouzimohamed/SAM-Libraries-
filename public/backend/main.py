from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from db import add_librarian, get_all_librarians, get_db,get_all_authors, make_admin, add_to_cart_for_borrowing, add_to_cart_for_purchase, relate_user_to_librarian, remove_from_cart, delete_credit_card, create_credit_card ,add_book, get_all_book_views, get_all_categories, create_authordb, select_all_users, create_userdb, get_userdb, create_categorydb,update_userdb, delete_userdb, create_bookdb, get_bookdb, update_bookdb, delete_bookdb
from model import User, Book, Author, Category, BookView, CreditCard
import mysql.connector
from typing import List



origins = ['https://localhost:4200']
# i changed this localhost to 4200

app = FastAPI()



from db import(   get_db)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['*'],
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)

# USER Endpoints
@app.post("/user", response_model=dict)
def create_user_endpoint(user: User, db=Depends(get_db)):
    create_userdb(db,user.dict())
    return {"status": "User created successfully"}

@app.get("/user/{user_id}", response_model=User)
def read_user(user_id: str, db=Depends(get_db)):
    user = get_userdb(get_db,user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/user")
def get_all_users():
    user = select_all_users()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.put("/user/{user_id}", response_model=dict)
def update_user_endpoint(user_id: str, user: User, db=Depends(get_db)):
    update_userdb(db, user_id, user.dict())
    return {"status": "User updated successfully"}

@app.delete("/user/{user_id}", response_model=dict)
def delete_user_endpoint(user_id: str, db=Depends(get_db)):
    delete_userdb(user_id)
    return {"status": "User deleted successfully"}

@app.post("/author", response_model=dict)
def create_user_endpoint(author: Author, db=Depends(get_db)):
    create_authordb(db,author.dict())
    return {"status": "Author created successfully"}

@app.post("/category", response_model=dict)
def create_category_endpoint(category: Category, db=Depends(get_db)):
    create_categorydb(db,category.dict())
    return {"status": "Category created successfully"}

# BOOK Endpoints
@app.post("/book", response_model=dict)
def create_book_endpoint(book: Book, db=Depends(get_db)):
    create_bookdb(db, book.dict())
    return {"status": "Book created successfully"}

@app.get("/book/{book_id}", response_model=Book)
def read_book(book_id: str, db=Depends(get_db)):
    book = get_bookdb(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@app.put("/book/{book_id}", response_model=dict)
def update_book_endpoint(book_id: str, book: Book, db=Depends(get_db)):
    update_bookdb(db, book_id, book.dict())
    return {"status": "Book updated successfully"}

@app.delete("/book/{book_id}", response_model=dict)
def delete_book_endpoint(book_id: str, db=Depends(get_db)):
    delete_bookdb(db, book_id)
    return {"status": "Book deleted successfully"}

@app.get("/librarians", response_model=List[dict])
def read_librarians(db=Depends(get_db)):
    librarians = get_all_librarians(db)
    return librarians
@app.post("/librarians")
def create_librarian(librarian: dict, db=Depends(get_db)):
    add_librarian(db, librarian)
    return {"message": "Librarian added successfully"}
@app.post("/relate_user_to_librarian")
def relate_user_to_librarian_endpoint(
    user_id: int, librarian_id: str, meeting_date: str, meeting_start_time: str, meeting_duration: int, db=Depends(get_db)
):

    relate_user_to_librarian(db, user_id, librarian_id, meeting_date, meeting_start_time, meeting_duration)
    return {"status": "User successfully related to librarian"}


@app.get("/category")
def get_all_categories_endpoint(db=Depends(get_db)):
    categories = get_all_categories(db)
    return categories

@app.get("/author")
def get_all_authors_endpoint(db=Depends(get_db)):
    authors = get_all_authors(db)
    return  authors

@app.get("/bookview")
def get_all_book_views_endpoint(db=Depends(get_db)):
    books = get_all_book_views(db)
    return books

@app.post("/bookview")
def add_book_endpoint(bookView: BookView, db=Depends(get_db)):
    add_book(db, bookView.dict())
    return {"status": "Book added successfully"}



@app.post("/cart/add/purchase")
def add_to_cart_for_purchase_endpoint(shoppingCartId: str, bookCopyId: str, db=Depends(get_db)):
    add_to_cart_for_purchase(db, shoppingCartId, bookCopyId)
    return {"status": "Book copy added to cart for purchase"}


@app.post("/cart/add/borrow")
def add_to_cart_for_borrowing_endpoint(shoppingCartId: str, bookCopyId: str, db=Depends(get_db)):
    add_to_cart_for_borrowing(db, shoppingCartId, bookCopyId)
    return {"status": "Book copy added to cart for borrowing"}


@app.delete("/cart/remove")
def remove_from_cart_endpoint(shoppingCartId: str, bookCopyId: str, db=Depends(get_db)):
    remove_from_cart(db, shoppingCartId, bookCopyId)
    return {"status": "Book copy removed from cart"}


@app.put("/user/make_admin/{userId}")
def make_admin_endpoint(userId: str, db=Depends(get_db)):
    make_admin(db, userId)
    return {"status": f"User {userId} is now an admin"}


@app.post("/creditcard")
def create_credit_card_endpoint(creditCard: CreditCard, db=Depends(get_db)):
    create_credit_card(db, creditCard.dict())
    return {"status": "Credit card created successfully"}


@app.delete("/creditcard/{creditCardId}")
def delete_credit_card_endpoint(creditCardId: str, db=Depends(get_db)):
    delete_credit_card(db, creditCardId)
    return {"status": f"Credit card {creditCardId} deleted successfully"}
