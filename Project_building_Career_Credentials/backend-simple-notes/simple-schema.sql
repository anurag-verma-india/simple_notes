CREATE DATABASE simple_notes;

USE simple_notes;

CREATE TABLE
    user_types (
        id INT (3) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        user_type VARCHAR(50) NOT NULL,
        description VARCHAR(250)
    );

CREATE TABLE
    users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL UNIQUE,
        fname VARCHAR(100) NOT NULL,
        lname VARCHAR(100) NOT NULL,
        email VARCHAR(250) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        passkey VARCHAR(100) NOT NULL,
        type TINYINT UNSIGNED NOT NULL DEFAULT 0,
        active BOOLEAN NOT NULL DEFAULT 1
    );

CREATE TABLE
    notes (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        details TEXT NOT NULL,
        -- uid INT NOT NULL,
        email VARCHAR(250) NOT NULL,
        created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        modification TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        completed BOOLEAN DEFAULT 0
    );

INSERT INTO
    users (
        username,
        fname,
        lname,
        email,
        phone,
        passkey,
        active
    )
VALUES
    (
        'batman',
        'Bruce',
        'Wayne',
        'bruce@wayne.com',
        '9999999999',
        '1532e76dbe9d43d0dea98c331ca5ae8a65c5e8e8b99d3e2a42ae989356f6242a',
        0
    );

INSERT INTO
    users (username, fname, lname, email, phone, passkey)
VALUES
    (
        'anurag_verma',
        'Anurag',
        'Verma',
        'anurag@gmail.com',
        '8888888888',
        '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
    );

INSERT INTO
    users (username, fname, lname, email, phone, passkey)
VALUES
    (
        'sample-user',
        'Sample',
        'Sam',
        'sample@gmail.com',
        '00000000',
        'af2bdbe1aa9b6ec1e2ade1d694f41fc71a831d0268e9891562113d8a62add1bf'
    );

INSERT INTO
    users (username, fname, lname, email, phone, passkey)
VALUES
    (
        'user',
        'Sample',
        'Sam',
        'a@s.d',
        '00000000',
        '18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4'
    );

-- INSERT INTO
-- INSERT INTO
--     users()
-- INSERT INTO
--     notes (title, contents, uid)
-- VALUES
--     ('My first note', 'A note about something'),
--     ('My second note', 'A note about something else');
-- reference
-- Show schema 
-- describe [db_name.]table_name;
-- DROP DATABASE simple_notes;