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
        passkey VARCHAR(100) NOT NULL,
        type TINYINT UNSIGNED NOT NULL DEFAULT 0,
        active BOOLEAN NOT NULL DEFAULT 1
    );

CREATE TABLE
    notes (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        details TEXT NOT NULL,
        uid INT NOT NULL,
        created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        modification TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        completed BOOLEAN DEFAULT 0
    );

INSERT INTO
    users (username, fname, lname, email, passkey, active)
VALUES
    (
        'batman',
        'Bruce',
        'Wayne',
        'bruce@wayne.com',
        'ec0e2603172c73a8b644bb9456c1ff6e',
        0
    );

INSERT INTO
    users (username, fname, lname, email, passkey)
VALUES
    (
        'anurag_verma',
        'Anurag',
        'Verma',
        'anurag@gmail.com',
        '5f4dcc3b5aa765d61d8327deb882cf99'
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