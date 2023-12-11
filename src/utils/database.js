import * as SQLite from 'expo-sqlite';

const dbName = 'todo-app.db';

const db = SQLite.openDatabase(dbName);

const database = {
    init: () => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)'
            );
        });
    },

    getDatabaseInstance: () => {
        return db;
    },
};

export default database;
