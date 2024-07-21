
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'testDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  }
);

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM Users',
        [],
        (sqlTxn, res) => {
          console.log('Users retrieved successfully');
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
            resolve(results);
          } else {
            resolve([]);
          }
        },
        error => {
          console.log('Error retrieving users: ' + error.message);
          reject([]);
        }
      );
    });
  });
};





export const getSentencePairs = () => {
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql(
          'SELECT * FROM HindiToEnglishApp',
          [],
          (sqlTxn, res) => {
            console.log('Users retrieved successfully');
            let len = res.rows.length;
  
            if (len > 0) {
              let results = [];
              for (let i = 0; i < len; i++) {
                let item = res.rows.item(i);
                results.push(item);
              }
              resolve(results);
            } else {
              resolve([]);
            }
          },
          error => {
            console.log('Error retrieving sentence pairs: ' + error.message);
            reject([]);
          }
        );
      });
    });
  };


export const getFrySightWords = () => {
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql(
          "SELECT DISTINCT word FROM HindiToEnglishApp",
          [],
          (sqlTxn, res) => {
            console.log('Unique words retrieved successfully');
            let len = res.rows.length;
  
            if (len > 0) {
              let results = [];
              for (let i = 0; i < len; i++) {
                let item = res.rows.item(i);
                results.push(item.word);
              }
              resolve(results);
            } else {
              resolve([]);
            }
          },
          error => {
            console.log('Error retrieving unique words: ' + error.message);
            reject([]);
          }
        );
      });
    });
  };

  