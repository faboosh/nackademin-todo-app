<template>
  <div id="todos">
    <ul>
      <li v-for="todo in todos" :key="todo._id">
        <input v-model="todo.title" type="text" @input="changeTodoTitle(todo._id)"><span @click="checkTodo(todo._id)" class="checkbox" :class="{'checked': todo.done}"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Todos',
  props: ['msg'],
  data() {
    return {
      todos: [],
      apiRoute: "http://localhost:3000/api"
    }
  },
  beforeMount() {
    this.getTodos();
  },
  methods: {
    getTodos() {
      fetch(`${this.apiRoute}/todos`)
        .then(todos => todos.json())
        .then(todos => {
          todos.forEach(todo => {
            this.todos.push(todo);
          })
      })
    },
    checkTodo(_id) {
      const todoIndex = this.todos.findIndex(todo => todo._id == _id);
      this.todos[todoIndex].done = !this.todos[todoIndex].done;
      const body = {done: this.todos[todoIndex].done};

      this.changeTodo(_id, body);
    },

    changeTodoTitle(_id) {
      const todoIndex = this.todos.findIndex(todo => todo._id == _id);
      const body = {title: this.todos[todoIndex].title};

      this.changeTodo(_id, body); 
    },

    changeTodo(_id, body) {
      fetch(`${this.apiRoute}/todos/${_id}`, 
        {
          method: 'PUT',     
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
        })  
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #todos {
    max-width: 800px;
    margin: 0 auto;
  }

  ul {
    list-style-type: none;
    padding-top: 20px;
  }

  ul li {
    margin: 15px 0;
    border-bottom: 4px solid #566C86;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul li:focus-within {
    border-bottom: 4px solid #F4F4F4;
  }

  .checkbox {
    display: inline-block;
    height: 30px;
    width: 30px;
    border: 4px dashed white;
    position: relative;
    margin-bottom: 6px;
  }

  .checkbox.checked:after {
    content:"V";
    top: 3px;
    left: 4px;
    font-family: 'Press Start 2P', cursive;
    position: absolute;
    color: #A7F070;    
  }
</style>
