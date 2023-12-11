import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import TodoListItem from '../components/TodoListItem';
import AddTodoModal from '../components/AddTodoModal';
import TodoListController from '../controllers/TodoListController';
import { useNavigation } from '@react-navigation/native';

const TodoListScreen = () => {
    const [todos, setTodos] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false); // New state for refresh
    const navigation = useNavigation();

    useEffect(() => {
        TodoListController.init();
        refreshTodoList();
    }, []);

    const refreshTodoList = () => {
        setIsRefreshing(true); // Set refreshing state to true
        TodoListController.getAllTodos((todos) => {
            setTodos(todos);
            setIsRefreshing(false); // Set refreshing state to false after fetching
        });
    };

    const handleAddTodo = (text) => {
        TodoListController.addTodo(text, (newTodo) => {
            setTodos([...todos, newTodo]);
        });
    };

    const handleDeleteTodo = (id) => {
        TodoListController.deleteTodo(id, (isDeleted) => {
            if (isDeleted) {
                setTodos(todos.filter((todo) => todo.id !== id));
            } else {
                Alert.alert('Error', 'Failed to delete todo');
            }
        });
    };

    const refreshList = () => {
        refreshTodoList();
    };

    const navigateToDBScreen = () => {
        navigation.navigate('DBScreen');
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TodoListItem todo={item} onDelete={handleDeleteTodo} />
                )}
                ListEmptyComponent={() => <Text>No todos available</Text>}
                refreshing={isRefreshing} // Set refreshing state
                onRefresh={refreshList} // Call refreshList on swipe down
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'grey' }]}
                    onPress={navigateToDBScreen}
                >
                    <Text style={styles.buttonText}>Import/Export DB</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'royalblue' }]}
                    onPress={() => setIsModalVisible(true)}
                >
                    <Text style={styles.buttonText}>Add Todo</Text>
                </TouchableOpacity>
            </View>
            <AddTodoModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onAddTodo={(text) => {
                    handleAddTodo(text);
                    setIsModalVisible(false);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 20,
        width: '100%',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        textTransform: 'none',
        color: 'white',
    },
});

export default TodoListScreen;