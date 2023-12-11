import DBController from './DBController';

const TodoListController = {
    init: () => {
        DBController.createTable();
    },

    getAllTodos: (callback) => {
        DBController.getAllTodos(callback);
    },

    addTodo: (text, callback) => {
        DBController.addTodo(text, callback);
    },

    deleteTodo: (id, callback) => {
        DBController.deleteTodo(id, callback);
    },
};

export default TodoListController;