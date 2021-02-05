import axios from '../base_url';

const TodoState = {
    namespace: true,
    state: {
        todos: [],
    },
    mutations: {
        GET_TODO(state, todos) {
            state.todos = todos
        },
        SET_NEW_TODO(state, todo) {
            state.todos.unshift(todo)
        },
        DELETE_TODO(state, id) {
            state.todos = state.todos.filter(todo => todo.id !== id)
        }
    },  
    actions: {
        async fetchAllTodo(context) {
            try {
                const req = await axios.get('/todos')
                const {data} = await req
                context.commit('GET_TODO', data)
              } catch(error) {
                console.log(error)
              }
        },
        async addTodo(context, title) {
            try {
                const req = await axios.post('/todos', {title, completed: false});
                const {data} = await req
                context.commit('SET_NEW_TODO', data)
            } catch(error) {
                console.log(error)
            }
        },
        async deleteTodo(context,id) {
            try {
                await axios.delete(`/todos/${id}`)
                context.commit('DELETE_TODO', id)
            } catch(error) {
                console.log(error)
            }
        }
    },
    getters: {
        getAllTodo(state) {
            return state.todos
        }
    }
}

export default TodoState;