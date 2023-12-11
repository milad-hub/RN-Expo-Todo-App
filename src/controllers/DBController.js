import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todo-app.db');
const DBController = {
    createTable: () => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)'
            );
        });
    },

    getAllTodos: (callback) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM todos', [], (_, { rows }) => {
                const todos = rows._array;
                callback(todos);
            });
        });
    },

    addTodo: (text, callback) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO todos (text) VALUES (?)', [text], (_, { insertId }) => {
                callback({ id: insertId, text });
            });
        });
    },

    deleteTodo: (id, callback) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM todos WHERE id = ?', [id], (_, { rowsAffected }) => {
                callback(rowsAffected > 0);
            });
        });
    },
};

export default DBController;