import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createTable, insertUser } from './databaseWriter';
import { getUsers, getSentencePairs, getFrySightWords } from './databaseReader';
import { setupDatabase } from './databaseInit';

const App = () => {
    const [users, setUsers] = useState([]);
    const [sents, setSents] = useState([]);
    const [displaySents, setDisplaySents] = useState([]);

    const [frySightWords, setFrySightWords] = useState([]); 
    const [selectedFrySightWord, setSelectedFrySightWord] = useState([]);

    useEffect(() => {
        createTable();
        setupDatabase();

        //fetchUsers();
        fetchSentences();
        fetchFrySightWords();
    }, []);

    const fetchUsers = async () => {
        const userList = await getUsers();
        setUsers(userList);
    };


    const fetchSentences = async () => {
        const sentencesList = await getSentencePairs();
        setSents(sentencesList);
        setDisplaySents(sentencesList)
    };

    const fetchFrySightWords = async () => {
        const frySightWordsList = await getFrySightWords();
        setFrySightWords(frySightWordsList);
    };

    const addUser = () => {
        const name = 'John Doe';
        const age = 25;
        insertUser(name, age);
        fetchUsers();
    };

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedFrySightWord}
                onValueChange={(itemValue, itemIndex) => {

                    const selectedWordSentences = sents.filter(sentence => sentence['word'].includes(itemValue));
                    setDisplaySents(selectedWordSentences);

                    setSelectedFrySightWord(itemValue)
                }}>
                    
                {frySightWords.map((word, index) => (
                    <Picker.Item label={word} value={word} key={index} />
                ))}
            </Picker>

            <FlatList
                data={displaySents}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.word}</Text>
                        <Text>{item.hindi}</Text>
                        <Text>{item.english}</Text>
                    </View>
                )}
            />

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default App;
