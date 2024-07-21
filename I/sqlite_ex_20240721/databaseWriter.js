import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'testDB',
        location: 'default',
    },
    () => { },
    error => {
        console.log(error);
    }
);

export const createTable = () => {
    db.transaction(txn => {
        txn.executeSql(
            //'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30), age INTEGER)',

            `CREATE TABLE IF NOT EXISTS HindiToEnglishApp (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                word TEXT NOT NULL, 
                hindi TEXT NOT NULL, 
                english TEXT NOT NULL, 
                UNIQUE (word, hindi, english)
            );`,

            [],
            (sqlTxn, res) => {
                console.log('Table created successfully');
            },
            error => {
                console.log('Error creating table: ' + error.message);
            }
        );
    });
};

export const insertUser = (name, age) => {
    db.transaction(txn => {
        txn.executeSql(
            'INSERT INTO Users (name, age) VALUES (?, ?)',
            [name, age],
            (sqlTxn, res) => {
                console.log(`${name} added successfully`);
            },
            error => {
                console.log('Error inserting a user: ' + error.message);
            }
        );
    });
};



export const insertWord = (word, hindi, english) => {
    db.transaction(txn => {

        txn.executeSql(
            'INSERT INTO HindiToEnglishApp (word, hindi, english) VALUES (?, ?, ?)',
            [word, hindi, english],
            (sqlTxn, res) => {
                console.log(`${word} ${hindi} ${english} added successfully`);
            },
            error => {
                console.log('Error inserting a user: ' + error.message);
            }
        );
    });
};