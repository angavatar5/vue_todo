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
        COMPLETE_TODO(state, completeTodo) {
            const index = state.todos.findIndex(todo => todo.id === completeTodo.id)
            if(index !== -1) {
                state.todos.splice(index, 1, completeTodo)
            }
        },
        UPDATE_TODO(state, updateTodo) {
            state.todos.findIndex(todo => todo.id === updateTodo.id)
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
        async completeTodo({commit}, completeTodo) {
            try {
                const req = await axios.put(`/todos/${completeTodo.id}`, completeTodo)
                commit('COMPLETE_TODO', req.data)
            } catch(error) {
                console.log(error)
            }
        },
        async updateTodo({commit},updTodo) {
            const req = await axios.put(`/todos/${updTodo.id}`, updTodo)
            commit('UPDATE_TODO', req.data)
        }
    },
    getters: {
        getAllTodo(state) {
            return state.todos
        }
    }
}

export default TodoState;