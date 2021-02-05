<template>
    <div class="new-todo">
        <h1>Add to do</h1>
        <form @submit="newTodo">
            <input type="text" v-model="title" placeholder="Add Todo" name="" id="">
            <input type="submit" value="Submit">
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name: 'AddTodo',
    data() {
        return {
            title: ''
        }
    },
    methods: {
        ...mapActions(['addTodo']),
        newTodo(e) {
            e.preventDefault();
            this.addTodo(this.title);
        }
    }
}
</script>

<style lang="scss" scoped>
    .new-todo {
        margin-bottom: 30px;
        form {
            display: flex;
        }
        input[type="text"] {
            flex: 10;
            padding: 10px;
            border: 1px solid #41b883;
            outline: 0;
        }
        input[type="submit"] {
            flex: 2;
            background: #41b883;
            color: #fff;
            border: 1px #41b883 solid;
            cursor: pointer;
        }
    }
</style>