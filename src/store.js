import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    updateTodo(state, todo, index) {
      state.todos[index] = todo;
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1);
    },
    markTodoToComplete(state, index) {
      state.todos = state.todos.map((item, i) =>
        i === index ? { ...item, completed: true } : item
      );
    },
    clearCompleted(state) {
      state.todos = state.todos.filter((item) => !item.completed);
    },
  },
  getters: {
    todosCount: (state) => {
      return state.todos.length;
    },
  },
});
