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
        UPDATE_TODO(state, updateTodo) {
            const index = state.todos.findIndex(todo => todo.id === updateTodo.id)
            if(index !== -1) {
                state.todos.splice(index, 1, updateTodo)
            }
        },
        DELETE_TODO(state, id) {
            state.todos = state.todos.filter(todo => todo.id !== id)
        }
    },  
    actions: {
        async fetchAllTodo({commit}) {
            try {
                const req = await axios.get('/todos')
                const {data} = await req
                commit('GET_TODO', data)
              } catch(error) {
                console.log(error)
              }
        },
        async addTodo({commit}, title) {
            try {
                const req = await axios.post('/todos', {title, completed: false});
                const {data} = await req
                commit('SET_NEW_TODO', data)
            } catch(error) {
                console.log(error)
            }
        },
        async deleteTodo({commit},id) {
            try {
                await axios.delete(`/todos/${id}`)
                commit('DELETE_TODO', id)
            } catch(error) {
                console.log(error)
            }
        },
        async updateTodo({commit},updTodo) {
            try {
                const req = await axios.put(`/todos/${updTodo.id}`, updTodo)
                commit('UPDATE_TODO', req.data)
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