<template>
  <div id="app">
    <div class="container">
      <div class="todos-wrapper">
        <h1>todos</h1>
        <div class="todos-inner">
          <div class="todos-input">
            <i class="fa fa-chevron-down"></i>
            <input
              type="text"
              v-model="todoForm.title"
              placeholder="What needs to be done?"
              @change="handleTodoCreation"
            />
          </div>
          <ul class="todos-list">
            <li class="todos-item" v-for="(item, index) in filteredTodos" :key="index">
              <span class="checkbox">
                <input
                  @change="handleItemCheck(index)"
                  :checked="item.completed"
                  class="checkbox-input"
                  type="checkbox"
                  :id="index"
                />
                <label class="checkbox-label" :for="index">
                  <span>
                    <i class="fa fa-check"></i>
                  </span>
                </label>
              </span>
              <div
                class="content"
                :class="{ lineThrough: item.completed }"
                @dblclick="showEditableIndex(index)"
              >
                <input
                  type="text"
                  v-model="item.title"
                  v-if="editableTodoId !== null && index === editableTodoId"
                  @change="handleTodoUpdation($event, index)"
                />
                <span v-else>{{ item.title }}</span>
              </div>
              <i class="fa fa-times" @click="handleItemDeletion(index)"></i>
            </li>
          </ul>
          <div class="todos-footer" v-if="todosCount > 0">
            <span class="item-left">{{ filteredTodos.length }} items left</span>
            <span class="todos-filter">
              <span
                v-for="(item, index) in filters"
                :key="index"
                :class="{ active: filterType === item.title }"
                @click="handleTodoFilter(item.title)"
              >{{ item.title }}</span>
            </span>
            <span class="todos-clear" @click="clearOnCompleted">Clear completed</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";
export default {
  data: () => {
    return {
      todoForm: {
        title: ""
      },
      filters: [
        {
          title: "All",
          active: true
        },
        {
          title: "Active",
          active: false
        },
        {
          title: "Completed",
          active: false
        }
      ],
      filterType: "All",
      editableTodoId: null
    };
  },
  computed: {
    ...mapState(["todos"]),
    ...mapGetters(["todosCount"]),
    filteredTodos() {
      if (this.filterType === "All") {
        return this.todos;
      } else if (this.filterType === "Active") {
        return this.todos.filter(el => el.completed === false);
      } else if (this.filterType === "Completed") {
        return this.todos.filter(el => el.completed === true);
      }

      return this.todos;
    }
  },
  methods: {
    ...mapMutations([
      "addTodo",
      "updateTodo",
      "removeTodo",
      "markTodoToComplete",
      "clearCompleted"
    ]),
    handleTodoCreation() {
      const todo = {
        title: this.todoForm.title,
        completed: false
      };
      this.addTodo(todo);
      this.todoForm.title = "";
    },
    handleTodoUpdation(e, index) {
      this.updateTodo({ title: e.target.value, completed: false }, index);
      this.editableTodoId = null;
    },
    handleItemDeletion(index) {
      this.removeTodo(index);
    },
    handleItemCheck(index) {
      this.markTodoToComplete(index);
    },
    handleTodoFilter(title) {
      this.filterType = title;
    },
    clearOnCompleted() {
      this.clearCompleted();
    },
    showEditableIndex(id) {
      this.editableTodoId = id;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap");

*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: inherit;
}

html {
  font-family: "Nunito", sans-serif;
  font-size: 10px;
  box-sizing: border-box;
}

body {
  background: #fafafa;
}

p {
  font-size: 1.6rem;
}

ul {
  list-style: none;
}

button:focus,
button:active,
button:hover {
  border: none;
  outline: none;
  cursor: pointer;
}

input:focus,
input:active,
input:hover {
  border: none;
  outline: none;
}

.container {
  max-width: 114rem;
  padding: 2rem;
  margin: 0 auto;
}

.todos-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
}

.todos-wrapper h1 {
  color: salmon;
  opacity: 0.2;
  font-size: 8rem;
  margin-bottom: 1rem;
}

.todos-inner {
  width: 100%;
  height: auto;
  padding: 1rem;
  max-width: 50rem;
  margin: 0 auto;
  background: #fff;
  border-radius: 2px;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.12);
  position: relative;
}

.todos-inner::after {
  content: "";
  width: calc(100% - 1rem);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0.5rem) translateY(0.5rem);
  border-radius: 2px;
  background: inherit;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.12);
  z-index: -1;
}

.todos-inner::before {
  content: "";
  width: calc(100% - 2rem);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(1rem) translateY(1rem);
  border-radius: 2px;
  background: inherit;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.12);
  z-index: -1;
}

.todos-input {
  width: 100%;
  height: 5rem;
  display: flex;
}

.todos-input i {
  width: 5rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #aaa;
  opacity: 0.4;
}

.todos-input input {
  width: calc(100% - 5rem);
  height: 100%;
  border: none;
  font-size: 1.6rem;
  color: #aaa;
}

.todos-input input::placeholder {
  font-family: "Nunito", sans-serif;
  font-size: 1.8rem;
  font-style: italic;
  font-weight: 400;
  opacity: 0.4;
  color: #aaa;
}

.todos-list {
  width: 100%;
  height: auto;
}

.todos-item {
  width: 100%;
  height: 5rem;
  overflow: hidden;
  display: flex;
  border-top: 1px solid rgba(170, 170, 170, 0.3);
}

.checkbox {
  width: 5rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox input {
  display: none;
}

.checkbox label {
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid rgba(170, 170, 170, 0.3);
  border-radius: 100%;
  cursor: pointer;
}

.checkbox-label span {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(170, 170, 170, 0.3);
  display: none;
}

.checkbox-label span i {
  font-size: 1.8rem;
  color: #fafafa;
}

.checkbox-input:checked ~ .checkbox-label span {
  display: flex;
}

.lineThrough {
  text-decoration: line-through;
}

.content {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: #aaa;
}

.content input {
  flex: 1;
  height: 100%;
  border: none;
  font-size: 1.6rem;
  color: #aaa;
}

.content:focus,
.content:active {
  outline: none;
}

.fa-times {
  width: 2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  color: #aaa;
  opacity: 0.4;
  cursor: pointer;
  display: none;
  margin-right: 1rem;
}

.todos-item:hover > i {
  display: flex;
}

.todos-footer {
  width: 100%;
  height: auto;
  border-top: 1px solid rgba(170, 170, 170, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
}

.item-left {
  font-size: 1.6rem;
  color: #aaa;
}

.todos-filter span {
  color: #aaa;
  font-size: 1.4rem;
  margin: 0 0.5rem;
  cursor: pointer;
}

.active {
  border: 1px solid rgba(170, 170, 170, 0.3);
  padding: 0.2rem 1rem;
  border-radius: 2px;
}

.todos-clear {
  color: #aaa;
  font-size: 1.4rem;
  margin: 0 0.5rem;
  cursor: pointer;
}

.todos-clear:hover {
  text-decoration: underline;
}
</style>
