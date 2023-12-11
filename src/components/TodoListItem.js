import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TodoListItem = ({ todo, onDelete }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{todo.text}</Text>
            <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        flex: 1,
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteText: {
        color: 'white',
    },
});

export default TodoListItem;