CREATE TABLE inventory (
    id          INT     PRIMARY KEY,
    name        VARCHAR NOT NULL,
    description TEXT,
    price       INT     DEFAULT (0),
    quantity    INT     DEFAULT (0) 
);



CREATE TABLE orders (
    id           INT     PRIMARY KEY
                         UNIQUE,
    email        VARCHAR NOT NULL,
    firstname    VARCHAR,
    lastname     VARCHAR,
    inventory_id INT,
    quantity     INT     DEFAULT (1),
    date         DATE,
    status       INT     DEFAULT (1) 
                         NOT NULL,
    FOREIGN KEY (
        inventory_id
    )
    REFERENCES inventory (ID) 
);

