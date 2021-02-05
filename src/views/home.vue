<template>
    <div>
        <div class="todos">
            <div 
                class="todo-card"
                v-for="data in getAllTodo"
                :key="data.id"
            >
                <p>{{data.title}}</p>
                <button @click="deleteTodo(data.id)" class="delete">Delete</button>
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
    methods: {
        ...mapActions(['fetchAllTodo', 'deleteTodo'])
    },
    beforeMount() {
        this.fetchAllTodo();
    }
}
</script>

<style lang="scss" scoped>
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
</style>