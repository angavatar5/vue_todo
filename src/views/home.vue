<template>
    <div>
        <div class="edit-todo">
            <input 
                type="text" 
                name="update_input" id="update_input" 
                class="edit-todo" 
                placeholder="Update todo"
                v-model="update_todo"
                @input="getValueChange($event)"
            >
            <button 
                class="submit-todo"
                @click="updateValue"
            >Update</button>
        </div>
        <div class="todos">
            <div 
                class="todo-card"
                v-bind:class="{'is-complete':data.completed}" 
                @dblclick="updateDoubleClick(data)"
                v-for="data in getAllTodo"
                :key="data.id"
            >
                <p>
                    {{data.title}}
                </p>
                <button @click="deleteTodo(data.id)" class="delete">Delete</button>
                <button class="update" @click="getTodo(data)">Update</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex';
export default {
    name: 'Home',
    computed: {
        ...mapGetters(['getAllTodo'])
    },
    data() {
        return {
            id: '',
            update_todo: ''
        }
    },
    methods: {
        ...mapActions(['fetchAllTodo', 'deleteTodo', 'updateTodo']),
        updateDoubleClick(todo){
            const complTodo = {
                id: todo.id,
                title: todo.title,
                completed: !todo.completed
            }
            this.updateTodo(complTodo);
        },
        getTodo(todo) {
            this.id = todo.id
            this.update_todo = todo.title;
        },
        getValueChange(event) {
            this.update_todo = event.target.value
        },
        updateValue() {
            const updTodo = {
                id: this.id,
                title: this.update_todo
            }
            this.updateTodo(updTodo)
        },
    },
    beforeMount() {
        this.fetchAllTodo();
    }
}
</script>

<style lang="scss" scoped>
    .edit-todo {
        width: 100%;
        display: flex;
        margin-bottom: 20px;
    }
    .todos {
        display: grid;
        grid-template-columns: repeat(3,1fr);
        grid-gap: 1rem;
    }

    .todo-card {
        border: 1px solid #ccc;
        background: #41b883;
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
        position: relative;
        padding: 20px;
        cursor: pointer;
        .delete {
            position: absolute;
            bottom: 0;
            right: 10px;
        }
    }
    .is-complete {
        background: #35405e;
        color: #fff;
    }
</style>