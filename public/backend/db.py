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
    CREATE TABLE IF NOT EXISTS USER (
        userId INT PRIMARY KEY,
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
        type VARCHAR(20),
        purchasePrice DECIMAL(10, 2),
        borrowPrice Decimal(10,2),
        publisher VARCHAR(255),
        imageUrl VARCHAR(255),
        voiceSummaryUrl VARCHAR(255)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS AUTHOR (
        authorName VARCHAR(50) PRIMARY KEY,
        biography TEXT
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS RECOMMENDEDFOR (
        bookId VARCHAR(20),
        userId INT,
        PRIMARY KEY (bookId, userId),
        FOREIGN KEY (bookId) REFERENCES BOOK(bookId),
        FOREIGN KEY (userId) REFERENCES USER(userId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS CATEGORY (
         
        categoryName VARCHAR(100) PRIMARY KEY
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS BOOKCOPY (
        bookCopyId VARCHAR(20) PRIMARY KEY,
        status VARCHAR(50),
        userId INT,
        bookId VARCHAR(20),
        FOREIGN KEY (userId) REFERENCES USER(userId),
        FOREIGN KEY (bookId) REFERENCES BOOK(bookId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS BORROW (
        userId INT,
        bookCopyId VARCHAR(20),
        borrowDate DATE,
        returnDate DATE,
        borrowCost DECIMAL(10, 2),
        PRIMARY KEY (userId, bookCopyId),
        FOREIGN KEY (userId) REFERENCES USER(userId),
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
        userId INT,
        FOREIGN KEY (userId) REFERENCES USER(userId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS CREDITCARD (
        creditCardId VARCHAR(20) PRIMARY KEY,
        cardNumber VARCHAR(20),
        cardHolderName VARCHAR(255),
        expiryDate DATE,
        cvv INT,
        userId INT,
        FOREIGN KEY (userId) REFERENCES USER(userId)
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
        userId INT,
        creditCardId VARCHAR(20),
        FOREIGN KEY (shoppingCartId) REFERENCES SHOPPINGCART(shoppingCartId),
        FOREIGN KEY (userId) REFERENCES USER(userId),
        FOREIGN KEY (creditCardId) REFERENCES CREDITCARD(creditCardId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS BOOK_CATEGORY (
        bookId VARCHAR(20),
        categoryName VARCHAR(20),
        PRIMARY KEY (bookId, categoryName),
        FOREIGN KEY (bookId) REFERENCES BOOK(bookId),
        FOREIGN KEY (categoryName) REFERENCES CATEGORY(categoryName)
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
        authorName VARCHAR(20),
        PRIMARY KEY (bookId, authorName),
        FOREIGN KEY (bookId) REFERENCES BOOK(bookId),
        FOREIGN KEY (authorName) REFERENCES AUTHOR(authorName)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS USER_LIBRARIAN (
        userId INT,
        librarianId VARCHAR(20),
        meetingDate DATE,
        meetingStartTime TIME,
        meetingDuration INT,
        PRIMARY KEY (userId, librarianId),
        FOREIGN KEY (userId) REFERENCES USER(userId),
        FOREIGN KEY (librarianId) REFERENCES LIBRARIAN(librarianId)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS MAKEADMIN (
        adminId INT,
        userId INT ,
        PRIMARY KEY (adminId,userId),
        FOREIGN KEY (userId) REFERENCES USER(userId),
        FOREIGN KEY (adminId) REFERENCES USER(userId)
    )
    """
]

    

    # Execute each SQL command
    for command in sql_commands:
        cursor.execute(command)

    
    # Sample data insertion (if necessary)
    insert_data = [
        """
        INSERT INTO USER (userId, firstName, lastName, isAdmin, interest, password)
        VALUES (1, 'Alice', 'Smith', true, 'Machine Learning', 'password1')
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

def get_all_borrowed_book_copies(db):
    with get_db() as db:
        cursor = db.cursor(dictionary=True)

        # Query to fetch all borrowed book copies
        cursor.execute("""
            SELECT bc.bookCopyId, bc.bookId, b.title, b.type, b.publisher, bc.userId, u.firstName, u.lastName
            FROM BOOKCOPY bc
            JOIN BOOK b ON bc.bookId = b.bookId
            LEFT JOIN USERS u ON bc.userId = u.userId
            WHERE bc.status = 'Borrowed'
        """)
        borrowed_copies = cursor.fetchall()
        cursor.close()
        return borrowed_copies





def select_all_books(db):
    with get_db() as db:
        cursor = db.cursor(dictionary=True)
        sql = "SELECT * FROM BOOK"
        cursor.execute(sql)
        books = cursor.fetchall()
        cursor.close()
        return books
    


# USER CRUD Operations
def get_all_librarians(db):
    with get_db() as db:
        cursor = db.cursor(dictionary=True)
        sql = "SELECT * FROM LIBRARIAN"
        cursor.execute(sql)
        librarians = cursor.fetchall()  # Fetch all rows
        cursor.close()  # Close the cursor
        return librarians  # Return the list of librarians
def add_librarian(db, librarian_data):
    with get_db() as db:
        cursor = db.cursor()
        sql = """
            INSERT INTO LIBRARIAN (librarianId, firstName, lastName, service, hourRate, webexRoom)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (
            librarian_data['librarianId'], librarian_data['firstName'],librarian_data['lastName'],
            librarian_data['service'],librarian_data['hourRate'],librarian_data['webexRoom']
        ))
        db.commit()  # Commit the changes
        cursor.close()  # Close the cursor
def relate_user_to_librarian(db, user_id, librarian_id, meeting_date, meeting_start_time, meeting_duration):
    """
    Relates a user to a librarian by inserting a record into the USER_LIBRARIAN table.
    """
    with get_db() as db:
        cursor = db.cursor()
    
        sql = """
            INSERT INTO USER_LIBRARIAN (userId, librarianId, meetingDate, meetingStartTime, meetingDuration)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (user_id, librarian_id, meeting_date, meeting_start_time, meeting_duration))
        db.commit()
        cursor.close()       



def create_authordb(db, user_data):
    with get_db() as db:
        cursor = db.cursor()
        sql = "INSERT INTO Author (authorName, biography) VALUES (%s, %s)"
        cursor.execute(sql, (
         user_data['authorName'], user_data['biography'], 
            
        ))
        db.commit()
        cursor.close()

def user_librarian():
    with get_db() as db:
        cursor = db.cursor()
        sql = "INSERT INTO USER_LIBRARIAN (USERID, LIBRARIANID) VALUES()" 
        cursor.execute(sql, (
            
        ))        

def create_categorydb(db, category_data):
    with get_db() as db:
        cursor = db.cursor()
        sql = "INSERT INTO Category VALUES (%s)"
        cursor.execute(sql, (
            category_data['categoryName'], 
            
        ))
        db.commit()
        cursor.close()

def get_userdb(get_db, user_id):
    # Use the context manager properly to get the database connection
    with get_db() as db:  # This opens the connection
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM USER WHERE userId = %s", (user_id,))
        user = cursor.fetchone()  # Assuming you want one user
        return user

def create_userdb(db,user_data):
    with get_db() as db:
        cursor = db.cursor()
        sql = "INSERT INTO USER (userId, firstName, lastName, isAdmin, interest, password) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (
            user_data['userId'], user_data['firstName'], user_data['lastName'], 
            user_data['isAdmin'], user_data['interest'], user_data['password']
        ))
        db.commit()
        cursor.close()

def get_userdb(db,user_id):
    with get_db() as db:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM USER WHERE userId = %s", (user_id,))
        user = cursor.fetchone()
        cursor.close()
        return user

def update_userdb(user_id, user_data):
    with get_db() as db:
        cursor = db.cursor()
        sql = "UPDATE USER SET firstName = %s, lastName = %s, isAdmin = %s, interest = %s, password = %s WHERE userId = %s"
        cursor.execute(sql, (
            user_data['firstName'], user_data['lastName'], user_data['isAdmin'], 
            user_data['interest'], user_data['password'], user_id
        ))
        db.commit()
        cursor.close()

def delete_userdb(user_id):
    with get_db() as db:
        cursor = db.cursor()
        sql = "DELETE FROM USER WHERE userId = %s"
        cursor.execute(sql, (user_id,))
        db.commit()
        cursor.close()

# BOOK CRUD Operations

def create_bookdb(db, book_data):
    with get_db() as db:
        cursor = db.cursor()
        sql = "INSERT INTO BOOK (bookId, title, type, purchasePrice, publisher, imageUrl, voiceSummaryUrl) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (
            book_data['bookId'], book_data['title'], book_data['type'], 
            book_data['purchasePrice'], book_data['borrowPrice'], book_data['publisher'], 
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
            book_data['title'], book_data['type'], book_data['purchasePrice'], book_data['borrowPrice'], 
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
        sql = "SELECT * FROM USER"
        cursor.execute(sql)
        users = cursor.fetchall()
        cursor.close()
        return users

# Sami's work

def get_all_categories(db):
    with get_db() as db:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM CATEGORY")
        categories = cursor.fetchall()
        cursor.close()
        return categories

def get_all_authors(db):
    with get_db() as db:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM AUTHOR")
        authors = cursor.fetchall()
        cursor.close()
        return authors

def get_all_book_views(db):
    with get_db() as db:
        cursor = db.cursor(dictionary=True)
        
        # Fetch book and book copy details
        cursor.execute("""
            SELECT b.bookId, b.title, b.type, b.purchasePrice, b.borrowPrice, b.publisher, b.imageUrl, b.voiceSummaryUrl,
                   COUNT(bc.bookCopyId) AS qty
            FROM BOOK b
            LEFT JOIN BOOKCOPY bc ON b.bookId = bc.bookId
            GROUP BY b.bookId
        """)
        books = cursor.fetchall()
        
        # Fetch authors for books
        cursor.execute("""
            SELECT ba.bookId, GROUP_CONCAT(a.authorName) AS authors
            FROM BOOK_AUTHOR ba
            JOIN AUTHOR a ON ba.authorName = a.authorName
            GROUP BY ba.bookId
        """)
        authors = {row['bookId']: row['authors'].split(',') for row in cursor.fetchall()}
        
        # Fetch categories for books
        cursor.execute("""
            SELECT bc.bookId, GROUP_CONCAT(c.categoryName) AS categories
            FROM BOOK_CATEGORY bc
            JOIN CATEGORY c ON bc.categoryName = c.categoryName
            GROUP BY bc.bookId
        """)
        categories = {row['bookId']: row['categories'].split(',') for row in cursor.fetchall()}
        
        # Combine data
        for book in books:
            book['authors'] = authors.get(book['bookId'], [])
            book['categories'] = categories.get(book['bookId'], [])
        
        cursor.close()
        return books
    

def add_book(db, bookView):
    with get_db() as db:
        cursor = db.cursor()
        
        # 1. Insert into BOOK table
        sql_insert_book = """
            INSERT INTO BOOK (bookId, title, type, purchasePrice, borrowPrice, publisher, imageUrl, voiceSummaryUrl)
            VALUES (%s, %s, %s, %s, %s, %s,%s, %s)
        """
        cursor.execute(sql_insert_book, (
            bookView['bookId'], bookView['title'], bookView['type'], bookView['purchasePrice'],
            bookView['borrowPrice'],
            bookView['publisher'], bookView['imageUrl'], bookView['voiceSummaryUrl']
        ))
        
        # 2. Insert copies into BOOKCOPY table
        sql_insert_bookcopy = """
            INSERT INTO BOOKCOPY (bookCopyId, bookId, status)
            VALUES (%s, %s, 'Available')
        """
        for i in range(bookView['qty']):
            bookCopyId = f"bkc{int(bookView['bookId'][2:]) * 1000 + i}"  # Generate unique bookCopyId
            cursor.execute(sql_insert_bookcopy, (bookCopyId, bookView['bookId']))
            
            db.commit()


def add_to_cart_for_purchase(db, shoppingCartId, bookCopyId):
    with get_db() as db:
        cursor = db.cursor()
        sql = """
            INSERT INTO SHOPPINGCART_BOOKCOPY (shoppingCartId, bookCopyId, type)
            VALUES (%s, %s, 'Purchase')
        """
        cursor.execute(sql, (shoppingCartId, bookCopyId))
        db.commit()
        cursor.close()

def add_to_cart_for_borrowing(db, shoppingCartId, bookCopyId):
    with get_db() as db:
        cursor = db.cursor()
        sql = """
            INSERT INTO SHOPPINGCART_BOOKCOPY (shoppingCartId, bookCopyId, type)
            VALUES (%s, %s, 'Borrow')
        """
        cursor.execute(sql, (shoppingCartId, bookCopyId))
        db.commit()
        cursor.close()

def remove_from_cart(db, shoppingCartId, bookCopyId):
    with get_db() as db:
        cursor = db.cursor()
        sql = """
            DELETE FROM SHOPPINGCART_BOOKCOPY 
            WHERE shoppingCartId = %s AND bookCopyId = %s
        """
        cursor.execute(sql, (shoppingCartId, bookCopyId))
        db.commit()
        cursor.close()


def make_admin(db, userId):
    with get_db() as db:
        cursor = db.cursor()
        sql = """
            UPDATE USERS 
            SET isAdmin = TRUE 
            WHERE userId = %s
        """
        cursor.execute(sql, (userId,))
        db.commit()
        cursor.close()

def create_credit_card(db, creditCard):
    with get_db() as db:
        cursor = db.cursor()
        sql = """
            INSERT INTO CREDITCARD (creditCardId, cardNumber, cardHolderName, expiryDate, cvv, userId)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (
            creditCard['creditCardId'], creditCard['cardNumber'], creditCard['cardHolderName'], 
            creditCard['expiryDate'], creditCard['cvv'], creditCard['userId']
        ))
        db.commit()
        cursor.close()


def delete_credit_card(db, creditCardId):
    with get_db() as db:
        cursor = db.cursor()
        sql = """
            DELETE FROM CREDITCARD 
            WHERE creditCardId = %s
        """
        cursor.execute(sql, (creditCardId,))
        db.commit()
        cursor.close()
