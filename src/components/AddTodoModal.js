import React, { useState } from 'react';
import { View, TextInput, Modal, StyleSheet, TouchableOpacity, Text } from 'react-native';

const AddTodoModal = ({ visible, onClose, onAddTodo }) => {
    const [todoText, setTodoText] = useState('');

    const handleAddTodo = () => {
        if (todoText.trim() !== '') {
            onAddTodo(todoText);
            setTodoText('');
            onClose();
        }
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your todo..."
                    onChangeText={(text) => setTodoText(text)}
                    value={todoText}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'royalblue' }]} onPress={handleAddTodo}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
        padding: 10,
        width: '80%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default AddTodoModal;
