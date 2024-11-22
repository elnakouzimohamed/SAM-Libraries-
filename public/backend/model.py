from pydantic import BaseModel
# Pydantic Models
class User(BaseModel):
    userId: str
    firstName: str
    lastName: str
    isAdmin: bool
    interest: str
    password: str

class Book(BaseModel):
    bookId: str
    title: str
    type: str  # 'Textbook', 'Magazine', 'Article', 'Research Paper'
    purchasePrice: float
    borrowPrice: float
    publisher: str
    imageUrl: str
    voiceSummaryUrl: str

class BookView(BaseModel):
    bookId: str
    title: str
    type: str  # 'Textbook', 'Magazine', 'Article', 'Research Paper'
    purchasePrice: float
    borrowPrice: float
    publisher: str
    imageUrl: str
    voiceSummaryUrl: str
    qty: int

class BookCopy(BaseModel):
    bookCopyId: str
    bookId: str
    userId: str

class ShoppingCart_BookCopy:
    shoppingCartId: str
    bookCopyId: str
    type: str

class ShoppingCart(BaseModel):
    shoppingCartId: str
    status: str
    userId: str



class Author(BaseModel):
    authorId: str
    name: str
    biography: str