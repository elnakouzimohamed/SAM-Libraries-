import mysql.connector
from contextlib import contextmanager

# Function to create the database if it does not exist
def create_database():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root"
    )
    cursor = db.cursor()
    cursor.execute("CREATE DATABASE IF NOT EXISTS libraries;")
    cursor.close()
    db.close()

def setup_database():
   
    # Ensure the database exists
    create_database()

    # Connect to the `Library` database
    db = mysql.connector.connect(
        host="localhost",
        port = 3306,
        user="root",
        password="root",
        database="libraries"
    )
    cursor = db.cursor()

    # List of SQL commands for table creation
    sql_commands = [
        
    """
    CREATE TABLE IF NOT EXISTS USERS (
        userId VARCHAR(20) PRIMARY KEY,
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        isAdmin BOOLEAN,
        interest VARCHAR(255),
        password VARCHAR(255)
    )
    """,

  
    """
    CREATE TABLE IF NOT EXISTS BOOK (
        bookId VARCHAR(20) PRIMARY KEY,
        title VARCHAR(255),
        type ENUM('Textbook', 'Magazine', 'Article', 'Research Paper'),
        purchasePrice DECIMAL(10, 2),
        borrowPrice Decimal(10,2),
        publisher VARCHAR(255),
        imageUrl VARCHAR(255),
        voiceSummaryUrl VARCHAR(255)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS AUTHOR (
        authorId VARCHAR(20) PRIMARY KEY,
        name VARCHAR(255),
        biography TEXT
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS RECOMMENDEDFOR (
        bookId VARCHAR(20),
        userId VARCHAR(20),
        PRIMARY KEY (bookId, userId),
        FOREIGN KEY (bookId) REFERENCES BOOK(bookId),
        FOREIGN KEY (userId) REFERENCES USERS(userId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS CATEGORY (
        categoryId VARCHAR(20) PRIMARY KEY,
        categoryName VARCHAR(100)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS BOOKCOPY (
        bookCopyId VARCHAR(20) PRIMARY KEY,
        status VARCHAR(50),
        userId VARCHAR(20),
        bookId VARCHAR(20),
        FOREIGN KEY (userId) REFERENCES USERS(userId),
        FOREIGN KEY (bookId) REFERENCES BOOK(bookId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS BORROW (
        userId VARCHAR(20),
        bookCopyId VARCHAR(20),
        borrowDate DATE,
        returnDate DATE,
        borrowCost DECIMAL(10, 2),
        PRIMARY KEY (userId, bookCopyId),
        FOREIGN KEY (userId) REFERENCES USERS(userId),
        FOREIGN KEY (bookCopyId) REFERENCES BOOKCOPY(bookCopyId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS LIBRARIAN (
        librarianId VARCHAR(20) PRIMARY KEY,
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        service VARCHAR(255),
        hourRate DECIMAL(10, 2),
        webexRoom VARCHAR(255)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS SHOPPINGCART (
        shoppingCartId VARCHAR(20) PRIMARY KEY,
        status VARCHAR(20),
        userId VARCHAR(20),
        FOREIGN KEY (userId) REFERENCES USERS(userId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS CREDITCARD (
        creditCardId VARCHAR(20) PRIMARY KEY,
        cardNumber VARCHAR(20),
        cardHolderName VARCHAR(255),
        expiryDate DATE,
        cvv INT,
        userId VARCHAR(20),
        FOREIGN KEY (userId) REFERENCES USERS(userId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS `ORDER` (
        orderId VARCHAR(20) PRIMARY KEY,
        orderDate DATE,
        shippingCompany VARCHAR(255),
        shippingFee DECIMAL(10, 2),
        address VARCHAR(255),
        shoppingCartId VARCHAR(20),
        userId VARCHAR(20),
        creditCardId VARCHAR(20),
        FOREIGN KEY (shoppingCartId) REFERENCES SHOPPINGCART(shoppingCartId),
        FOREIGN KEY (userId) REFERENCES USERS(userId),
        FOREIGN KEY (creditCardId) REFERENCES CREDITCARD(creditCardId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS BOOK_CATEGORY (
        bookId VARCHAR(20),
        categoryId VARCHAR(20),
        PRIMARY KEY (bookId, categoryId),
        FOREIGN KEY (bookId) REFERENCES BOOK(bookId),
        FOREIGN KEY (categoryId) REFERENCES CATEGORY(categoryId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS SHOPPINGCART_BOOKCOPY (
        shoppingCartId VARCHAR(20),
        bookCopyId VARCHAR(20),
        type VARCHAR(50),
        PRIMARY KEY (shoppingCartId, bookCopyId),
        FOREIGN KEY (shoppingCartId) REFERENCES SHOPPINGCART(shoppingCartId),
        FOREIGN KEY (bookCopyId) REFERENCES BOOKCOPY(bookCopyId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS BOOK_AUTHOR (
        bookId VARCHAR(20),
        authorId VARCHAR(20),
        PRIMARY KEY (bookId, authorId),
        FOREIGN KEY (bookId) REFERENCES BOOK(bookId),
        FOREIGN KEY (authorId) REFERENCES AUTHOR(authorId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS USER_LIBRARIAN (
        userId VARCHAR(20),
        librarianId VARCHAR(20),
        meetingDate DATE,
        meetingStartTime TIME,
        meetingDuration INT,
        PRIMARY KEY (userId, librarianId),
        FOREIGN KEY (userId) REFERENCES USERS(userId),
        FOREIGN KEY (librarianId) REFERENCES LIBRARIAN(librarianId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS MAKEADMIN (
        adminId VARCHAR(20) PRIMARY KEY,
        userId VARCHAR(20) UNIQUE,
        FOREIGN KEY (userId) REFERENCES USERS(userId)
    )
    """
]

    

    # Execute each SQL command
    for command in sql_commands:
        cursor.execute(command)

    
    # Sample data insertion (if necessary)
    insert_data = [
        """
        INSERT INTO USERS (userId, firstName, lastName, isAdmin, interest, password)
        VALUES (1, 'Alice', 'Smith', 0, 'Machine Learning', 'password1')
        ON DUPLICATE KEY UPDATE userId=userId
        """,
        
    ]
    
    # Execute each data insertion command
    for data in insert_data:
        cursor.execute(data)

    db.commit()  # Commit the changes to the database
    cursor.close()  # Close the cursor
    db.close()     # Close the database connection

@contextmanager
def get_db():
    setup_database()
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="libraries"
    )
    try:
        yield db
    finally:
        db.close()





def select_all_books(db):
    with get_db() as db:
        cursor = db.cursor(dictionary=True)
        sql = "SELECT * FROM BOOK"
        cursor.execute(sql)
        books = cursor.fetchall()
        cursor.close()
        return books
    


# USER CRUD Operations


def create_authordb(db, user_data):
    with get_db() as db:
        cursor = db.cursor()
        sql = "INSERT INTO Author (authorId, name, biography) VALUES (%s, %s, %s)"
        cursor.execute(sql, (
            user_data['autherId'], user_data['name'], user_data['biography'], 
            
        ))
        db.commit()
        cursor.close()

def get_userdb(get_db, user_id):
    # Use the context manager properly to get the database connection
    with get_db() as db:  # This opens the connection
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM USERS WHERE userId = %s", (user_id,))
        user = cursor.fetchone()  # Assuming you want one user
        return user

def create_userdb(db,user_data):
    with get_db() as db:
        cursor = db.cursor()
        sql = "INSERT INTO USERS (userId, firstName, lastName, isAdmin, interest, password) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (
            user_data['userId'], user_data['firstName'], user_data['lastName'], 
            user_data['isAdmin'], user_data['interest'], user_data['password']
        ))
        db.commit()
        cursor.close()

def get_userdb(db,user_id):
    with get_db() as db:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM USERS WHERE userId = %s", (user_id,))
        user = cursor.fetchone()
        cursor.close()
        return user

def update_userdb(user_id, user_data):
    with get_db() as db:
        cursor = db.cursor()
        sql = "UPDATE USERS SET firstName = %s, lastName = %s, isAdmin = %s, interest = %s, password = %s WHERE userId = %s"
        cursor.execute(sql, (
            user_data['firstName'], user_data['lastName'], user_data['isAdmin'], 
            user_data['interest'], user_data['password'], user_id
        ))
        db.commit()
        cursor.close()

def delete_userdb(user_id):
    with get_db() as db:
        cursor = db.cursor()
        sql = "DELETE FROM USERS WHERE userId = %s"
        cursor.execute(sql, (user_id,))
        db.commit()
        cursor.close()

# BOOK CRUD Operations

def create_bookdb(book_data):
    with get_db() as db:
        cursor = db.cursor()
        sql = "INSERT INTO BOOK (bookId, title, type, purchasePrice, publisher, imageUrl, voiceSummaryUrl) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (
            book_data['bookId'], book_data['title'], book_data['type'], 
            book_data['purchasePrice'], book_data['publisher'], 
            book_data['imageUrl'], book_data['voiceSummaryUrl']
        ))
        db.commit()
        cursor.close()

def get_bookdb(book_id):
    with get_db() as db:
        cursor = db.cursor(dictionary=True)
        sql = "SELECT * FROM BOOK WHERE bookId = %s"
        cursor.execute(sql, (book_id,))
        book = cursor.fetchone()
        cursor.close()
        return book

def update_bookdb(book_id, book_data):
    with get_db() as db:
        cursor = db.cursor()
        sql = "UPDATE BOOK SET title = %s, type = %s, purchasePrice = %s, publisher = %s, imageUrl = %s, voiceSummaryUrl = %s WHERE bookId = %s"
        cursor.execute(sql, (
            book_data['title'], book_data['type'], book_data['purchasePrice'], 
            book_data['publisher'], book_data['imageUrl'], 
            book_data['voiceSummaryUrl'], book_id
        ))
        db.commit()
        cursor.close()

def delete_bookdb(book_id):
    with get_db() as db:
        cursor = db.cursor()
        sql = "DELETE FROM BOOK WHERE bookId = %s"
        cursor.execute(sql, (book_id,))
        db.commit()
        cursor.close()

def select_all_users():
    with get_db() as db:
        cursor = db.cursor(dictionary=True)
        sql = "SELECT * FROM USERS"
        cursor.execute(sql)
        users = cursor.fetchall()
        cursor.close()
        return users

