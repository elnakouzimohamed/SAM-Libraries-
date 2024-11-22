from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from db import get_db, create_authordb, create_userdb, get_userdb, update_userdb, delete_userdb, create_bookdb, get_bookdb, update_bookdb, delete_bookdb
from model import User, Book, Author
import mysql.connector

origins = ['https://localhost:3000']

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

@app.put("/users/{user_id}", response_model=dict)
def update_user_endpoint(user_id: str, user: User, db=Depends(get_db)):
    update_userdb(db, user_id, user.dict())
    return {"status": "User updated successfully"}

@app.delete("/users/{user_id}", response_model=dict)
def delete_user_endpoint(user_id: str, db=Depends(get_db)):
    delete_userdb(db, user_id)
    return {"status": "User deleted successfully"}

@app.post("/author", response_model=dict)
def create_user_endpoint(author: Author, db=Depends(get_db)):
    create_authordb(db,author.dict())
    return {"status": "Author created successfully"}

# BOOK Endpoints
@app.post("/books/", response_model=dict)
def create_book_endpoint(book: Book, db=Depends(get_db)):
    create_bookdb(db, book.dict())
    return {"status": "Book created successfully"}

@app.get("/books/{book_id}", response_model=Book)
def read_book(book_id: str, db=Depends(get_db)):
    book = get_bookdb(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@app.put("/books/{book_id}", response_model=dict)
def update_book_endpoint(book_id: str, book: Book, db=Depends(get_db)):
    update_bookdb(db, book_id, book.dict())
    return {"status": "Book updated successfully"}

@app.delete("/books/{book_id}", response_model=dict)
def delete_book_endpoint(book_id: str, db=Depends(get_db)):
    delete_bookdb(db, book_id)
    return {"status": "Book deleted successfully"}



#@app.get("/api/books")
#def get_users(db=Depends(get_db)):
 #   books = get(db)
  #  if not books:
   #     raise HTTPException(status_code=404, detail="No users found")
    #return books

