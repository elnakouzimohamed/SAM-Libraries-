CREATE DATABASE Library;
USE Library;

CREATE TABLE IF NOT EXISTS USER (
    userId INT PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    type VARCHAR(50),
    interest VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS BOOK (
    bookId INT PRIMARY KEY,
    title VARCHAR(255),
    type ENUM('Textbook', 'Magazine', 'Article', 'Research Paper'),
    purchasePrice DECIMAL(10, 2),
    publisher VARCHAR(255),
    imageUrl VARCHAR(255),
    voiceSummaryUrl VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS AUTHOR (
    authorId INT PRIMARY KEY,
    name VARCHAR(255),
    biography TEXT
);

CREATE TABLE IF NOT EXISTS RECOMMENDEDFOR (
    bookId INT,
    userId INT,
    PRIMARY KEY (bookId, userId),
    FOREIGN KEY (bookId) REFERENCES BOOK(bookId),
    FOREIGN KEY (userId) REFERENCES USER(userId)
);

CREATE TABLE IF NOT EXISTS CATEGORY (
    categoryId INT PRIMARY KEY,
    categoryName VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS BOOKCOPY (
    bookCopyId INT PRIMARY KEY,
    status VARCHAR(50),
    userId INT,
    bookId INT,
    FOREIGN KEY (userId) REFERENCES USER(userId),
    FOREIGN KEY (bookId) REFERENCES BOOK(bookId)
);

CREATE TABLE IF NOT EXISTS BORROW (
    userId INT,
    bookCopyId INT,
    borrowDate DATE,
    returnDate DATE,
    borrowCost DECIMAL(10, 2),
    PRIMARY KEY (userId, bookCopyId),
    FOREIGN KEY (userId) REFERENCES USER(userId),
    FOREIGN KEY (bookCopyId) REFERENCES BOOKCOPY(bookCopyId)
);

CREATE TABLE IF NOT EXISTS LIBRARIAN (
    librarianId INT PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    service VARCHAR(255),
    hourRate DECIMAL(10, 2),
    webexRoom VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS SHOPPINGCART (
    shoppingCartId INT PRIMARY KEY,
    dateCreated DATE,
    userId INT,
    FOREIGN KEY (userId) REFERENCES USER(userId)
);

CREATE TABLE IF NOT EXISTS CREDITCARD (
    creditCardId INT PRIMARY KEY,
    cardNumber VARCHAR(20),
    cardHolderName VARCHAR(255),
    expiryDate DATE,
    cvv INT,
    userId INT,
    FOREIGN KEY (userId) REFERENCES USER(userId)
);

CREATE TABLE IF NOT EXISTS `ORDER` (
    orderId INT PRIMARY KEY,
    orderDate DATE,
    shippingCompany VARCHAR(255),
    shippingFee DECIMAL(10, 2),
    address VARCHAR(255),
    shoppingCartId INT,
    userId INT,
    creditCardId INT,
    FOREIGN KEY (shoppingCartId) REFERENCES SHOPPINGCART(shoppingCartId),
    FOREIGN KEY (userId) REFERENCES USER(userId),
    FOREIGN KEY (creditCardId) REFERENCES CREDITCARD(creditCardId)
);

CREATE TABLE IF NOT EXISTS BOOK_CATEGORY (
    bookId INT,
    categoryId INT,
    PRIMARY KEY (bookId, categoryId),
    FOREIGN KEY (bookId) REFERENCES BOOK(bookId),
    FOREIGN KEY (categoryId) REFERENCES CATEGORY(categoryId)
);

CREATE TABLE IF NOT EXISTS SHOPPINGCART_BOOKCOPY (
    shoppingCartId INT,
    bookCopyId INT,
    type VARCHAR(50),
    PRIMARY KEY (shoppingCartId, bookCopyId),
    FOREIGN KEY (shoppingCartId) REFERENCES SHOPPINGCART(shoppingCartId),
    FOREIGN KEY (bookCopyId) REFERENCES BOOKCOPY(bookCopyId)
);

CREATE TABLE IF NOT EXISTS BOOK_AUTHOR (
    bookId INT,
    authorId INT,
    PRIMARY KEY (bookId, authorId),
    FOREIGN KEY (bookId) REFERENCES BOOK(bookId),
    FOREIGN KEY (authorId) REFERENCES AUTHOR(authorId)
);

CREATE TABLE IF NOT EXISTS USER_LIBRARIAN (
    userId INT,
    librarianId INT,
    meetingDate DATE,
    meetingStartTime TIME,
    meetingDuration INT,
    PRIMARY KEY (userId, librarianId),
    FOREIGN KEY (userId) REFERENCES USER(userId),
    FOREIGN KEY (librarianId) REFERENCES LIBRARIAN(librarianId)
);

CREATE TABLE IF NOT EXISTS MAKEADMIN (
    adminId INT PRIMARY KEY,
    userId INT UNIQUE,
    FOREIGN KEY (userId) REFERENCES USER(userId)
);
CREATE DATABASE SAMLibraries;
USE SAMLibraries;

CREATE TABLE IF NOT EXISTS USER (
    userId INT PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    type VARCHAR(50),
    interest VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS BOOK (
    bookId INT PRIMARY KEY,
    title VARCHAR(255),
    type ENUM('Textbook', 'Magazine', 'Article', 'Research Paper'),
    purchasePrice DECIMAL(10, 2),
    publisher VARCHAR(255),
    imageUrl VARCHAR(255),
    voiceSummaryUrl VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS AUTHOR (
    authorId INT PRIMARY KEY,
    name VARCHAR(255),
    biography TEXT
);

CREATE TABLE IF NOT EXISTS RECOMMENDEDFOR (
    bookId INT,
    userId INT,
    PRIMARY KEY (bookId, userId),
    FOREIGN KEY (bookId) REFERENCES BOOK(bookId),
    FOREIGN KEY (userId) REFERENCES USER(userId)
);

CREATE TABLE IF NOT EXISTS CATEGORY (
    categoryId INT PRIMARY KEY,
    categoryName VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS BOOKCOPY (
    bookCopyId INT PRIMARY KEY,
    status VARCHAR(50),
    userId INT,
    bookId INT,
    FOREIGN KEY (userId) REFERENCES USER(userId),
    FOREIGN KEY (bookId) REFERENCES BOOK(bookId)
);

CREATE TABLE IF NOT EXISTS BORROW (
    userId INT,
    bookCopyId INT,
    borrowDate DATE,
    returnDate DATE,
    borrowCost DECIMAL(10, 2),
    PRIMARY KEY (userId, bookCopyId),
    FOREIGN KEY (userId) REFERENCES USER(userId),
    FOREIGN KEY (bookCopyId) REFERENCES BOOKCOPY(bookCopyId)
);

CREATE TABLE IF NOT EXISTS LIBRARIAN (
    librarianId INT PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    service VARCHAR(255),
    hourRate DECIMAL(10, 2),
    webexRoom VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS SHOPPINGCART (
    shoppingCartId INT PRIMARY KEY,
    dateCreated DATE,
    userId INT,
    FOREIGN KEY (userId) REFERENCES USER(userId)
);

CREATE TABLE IF NOT EXISTS CREDITCARD (
    creditCardId INT PRIMARY KEY,
    cardNumber VARCHAR(20),
    cardHolderName VARCHAR(255),
    expiryDate DATE,
    cvv INT,
    userId INT,
    FOREIGN KEY (userId) REFERENCES USER(userId)
);

CREATE TABLE IF NOT EXISTS `ORDER` (
    orderId INT PRIMARY KEY,
    orderDate DATE,
    shippingCompany VARCHAR(255),
    shippingFee DECIMAL(10, 2),
    address VARCHAR(255),
    shoppingCartId INT,
    userId INT,
    creditCardId INT,
    FOREIGN KEY (shoppingCartId) REFERENCES SHOPPINGCART(shoppingCartId),
    FOREIGN KEY (userId) REFERENCES USER(userId),
    FOREIGN KEY (creditCardId) REFERENCES CREDITCARD(creditCardId)
);

CREATE TABLE IF NOT EXISTS BOOK_CATEGORY (
    bookId INT,
    categoryId INT,
    PRIMARY KEY (bookId, categoryId),
    FOREIGN KEY (bookId) REFERENCES BOOK(bookId),
    FOREIGN KEY (categoryId) REFERENCES CATEGORY(categoryId)
);

CREATE TABLE IF NOT EXISTS SHOPPINGCART_BOOKCOPY (
    shoppingCartId INT,
    bookCopyId INT,
    type VARCHAR(50),
    PRIMARY KEY (shoppingCartId, bookCopyId),
    FOREIGN KEY (shoppingCartId) REFERENCES SHOPPINGCART(shoppingCartId),
    FOREIGN KEY (bookCopyId) REFERENCES BOOKCOPY(bookCopyId)
);

CREATE TABLE IF NOT EXISTS BOOK_AUTHOR (
    bookId INT,
    authorId INT,
    PRIMARY KEY (bookId, authorId),
    FOREIGN KEY (bookId) REFERENCES BOOK(bookId),
    FOREIGN KEY (authorId) REFERENCES AUTHOR(authorId)
);

CREATE TABLE IF NOT EXISTS USER_LIBRARIAN (
    userId INT,
    librarianId INT,
    meetingDate DATE,
    meetingStartTime TIME,
    meetingDuration INT,
    PRIMARY KEY (userId, librarianId),
    FOREIGN KEY (userId) REFERENCES USER(userId),
    FOREIGN KEY (librarianId) REFERENCES LIBRARIAN(librarianId)
);

CREATE TABLE IF NOT EXISTS MAKEADMIN (
    adminId INT PRIMARY KEY,
    userId INT UNIQUE,
    FOREIGN KEY (userId) REFERENCES USER(userId)
);


    INSERT INTO USER (userId, firstName, lastName, type, interest, password)
    VALUES (1, 'Alice', 'Smith', 'Student', 'Machine Learning', 'password1'),
           (2, 'Bob', 'Johnson', 'Researcher', 'Robotics', 'password2'),
           (3, 'Cathy', 'Lee', 'Teacher', 'Computer Science', 'password3');

    INSERT INTO BOOK (bookId, title, type, purchasePrice, publisher, imageUrl, voiceSummaryUrl)
    VALUES (1, 'Introduction to Robotics', 'Textbook', 75.50, 'Pearson', 'image_url_1', 'voice_url_1'),
           (2, 'AI Magazine', 'Magazine', 15.00, 'AI Publisher', 'image_url_2', 'voice_url_2'),
           (3, 'Quantum Computing Basics', 'Research Paper', 0.00, 'IEEE', 'image_url_3', 'voice_url_3'),
           (4, 'Data Science Weekly', 'Article', 0.00, 'Data Journal', 'image_url_4', 'voice_url_4');

    INSERT INTO AUTHOR (authorId, name, biography)
    VALUES (1, 'Dr. John Doe', 'Expert in robotics and AI.'),
           (2, 'Dr. Jane Smith', 'Researcher in quantum computing.'),
           (3, 'Dr. Emily Brown', 'Data scientist and educator.');

    INSERT INTO RECOMMENDEDFOR (bookId, userId)
    VALUES (1, 1), (2, 2), (3, 3), (4, 1);

    INSERT INTO CATEGORY (categoryId, categoryName)
    VALUES (1, 'Science'), (2, 'Technology'), (3, 'Engineering'), (4, 'Mathematics');

    INSERT INTO BOOKCOPY (bookCopyId, status, userId, bookId)
    VALUES (1, 'Available', NULL, 1), (2, 'Borrowed', 1, 2), (3, 'Available', NULL, 3), (4, 'Available', NULL, 4);
   