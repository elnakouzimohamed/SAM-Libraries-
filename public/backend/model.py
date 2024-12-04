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

class Category(BaseModel):
    categoryName: str
  
class BookView(BaseModel):
    bookId: str
    title: str
    type: str  # 'Textbook', 'Magazine', 'Article', 'Research Paper'
    categories: list
    authors: list
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
    authorName: str
    biography: str

class CreditCard(BaseModel):
    creditCardId: str  # Format: "crd999999"
    cardNumber: str  # Hashed representation
    cardHolderName: str
    expiryDate: str  # Format: "MM/YY", stored hashed
    cvv: str  # Hashed representation
    userId: str  # Reference to User ID
