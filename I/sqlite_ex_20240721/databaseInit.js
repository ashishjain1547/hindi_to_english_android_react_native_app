import SQLite from 'react-native-sqlite-storage';

import { createTable, insertWord } from './databaseWriter';

import { parseCsvViaReactNativeCsv as parseCsv, parseCsvManually } from './parseCsv';
import { frySightWords } from './assets/sentencePairs';

const readCSVFromAssets = () => {
    //   const csvPath =
    //     Platform.OS === 'android'
    //       ? RNFS.DocumentDirectoryPath + '/data.csv'
    //       : RNFS.MainBundlePath + '/data.csv';

    //   try {
    //     const csvContent = await RNFS.readFile(csvPath, 'utf8');
    //     return csvContent;
    //   } catch (error) {
    //     console.error('Error reading CSV file:', error);
    //     return null;
    //   }


    console.log(frySightWords);
    return frySightWords['of'].trim();
};


export const setupDatabase = () => {


    console.log("Inserting records");

    for (word in frySightWords) {
        sentences_pairs = frySightWords[word].trim();

        try {
            const csvContent = sentences_pairs;
    
            // console.log(csvContent);
    
            if (csvContent) {
                const results = parseCsv(csvContent);
    
    
                results.forEach((row) => {
                    insertWord(word, row.hindi, row.english);
                });
                console.log('Database setup completed.');
            }
        } catch (error) {
            console.error('Error setting up database:', error);
        }

    }

    return true;
};


