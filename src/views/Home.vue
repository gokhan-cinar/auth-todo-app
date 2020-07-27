<template>
  <div class="todos-wrapper">
    <a-form layout="inline" @submit.prevent="handleSubmit">
      <a-form-item>
        <a-input
          type="text"
          :placeholder="$t('addNewTask')"
          v-model="newTodo"
          v-on:keyup.enter="addItem"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="link"
          @click="addItem"
          class="add-btn"
        >
          <a-icon type="plus-circle"/>
        </a-button>
      </a-form-item>
    </a-form>
    <div class="todo-list-content">
      <transition-group tag="ul" name="list-content">
        <li
          :class="{complete: pending.status}"
          v-for="(pending, index) in pendingTodoList"
          :key="index"
        >
          <a-button
            @click="todoStatus(pending)"
            type="link"
          >
            {{pending.text}}
          </a-button>
          <a-button
            @click="todoDelete(index)"
            type="link"
          >
            <a-icon type="close-circle"/>
          </a-button>
        </li>
      </transition-group>
      <template v-if="pendingTodoList.length <= 0">
        <span class="pending-messages">Time to chill!</span>
      </template>
      <div
        v-if="completeShow && computedTodoList.length > 0"
        class="complete-list"
      >
        <span class="title">{{$t('completeTask')}}:</span>
        <transition-group tag="ul" name="list-content">
          <li
            v-for="(computed, index) in computedTodoList"
            :key="index"
          >
            <a-button
              @click="todoStatus(computed)"
              type="link"
            >
              {{ computed.text }}
            </a-button>
            <a-button
              @click="todoDelete(index)"
              type="link"
            >
              <a-icon type="close-circle"/>
            </a-button>
          </li>
        </transition-group>
      </div>
    </div>
    <div
      v-if="computedTodoList.length > 0"
      class="footer-content"
    >
      <a-button
        @click="showHideComplete"
        type="link"
      >
        {{$t('completeTask')}}
      </a-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        todoList: [],
        newTodo: '',
        completeShow: false,
      }
    },
    created () {
      this.getTodoContent()
    },
    methods: {
      getTodoContent () {
        if (localStorage.getItem('todoList')) {
          this.todoList = JSON.parse(localStorage.getItem('todoList'))
        }
      },
      addItem () {
        if (this.newTodo) {
          this.todoList.push({
            text: this.newTodo,
            status: false
          })
        }
        this.newTodo = ''
      },
      todoStatus (pending) {
        pending.status = !pending.status
      },
      todoDelete (index) {
        this.todoList.splice(index, 1)
      },
      showHideComplete () {
        this.completeShow = !this.completeShow
      }
    },
    computed: {
      pendingTodoList () {
        return this.todoList.filter(item => {
          return !item.status
        })
      },
      computedTodoList () {
        return this.todoList.filter(item => {
          return item.status
        })
      }
    },
    watch: {
      todoList: {
        handler: function (updatedTodo) {
          localStorage.setItem('todoList', JSON.stringify(updatedTodo))
        },
        deep: true
      }
    }
  }
</script>
