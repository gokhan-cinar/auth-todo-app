<template>
  <div class="auth-wrapper">
    <a-form :wrapper-col="{ span: 24 }">
      <h1>
        <span>{{ $t('todoTitle') }} |</span>
        {{ isUser ? $t('loginText') : $t('registerText') }}
      </h1>
      <a-form-item>
        <a-input
          v-model="user.email"
          :placeholder="$t('email')"
        />
        <span class="field-error" v-if="!$v.user.email.required && submitted">Field is required</span>
        <span class="field-error" v-if="!$v.user.email.email && submitted">Invalid e-mail</span>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model="user.password"
          type="password"
          :placeholder="$t('password')"
        />
        <span class="field-error" v-if="!$v.user.password.required && submitted">Field is required</span>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 24 }">
        <a-button
          :loading="loading"
          @click.prevent="handleSubmit"
          :class="{ 'btn-login': isUser, 'btn-register': !isUser }">
          {{ isUser ? $t('loginText') : $t('registerText') }}
        </a-button>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 24 }">
        <button
          class="is-login-register-btn"
          @click="isUser=!isUser">
          {{ isUser ? $t('notMembership') : $t('membership') }}
        </button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    name: 'Auth',
    data () {
      return {
        loading: false,
        formLayout: 'horizontal',
        isUser: false,
        submitted: false,
        user: {
          email: null,
          password: null
        }
      }
    },
    validations: {
      user: {
        email: {
          required,
          email
        },
        password: {
          required,
        }
      },
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault()
        this.submitted = true
        if (this.$v.$invalid) {
          console.log(': ')
        } else {
          this.loading = true
          this.$store.dispatch('login', {
            ...this.user,
            isUser: this.isUser
          })
            .then(() => {
              this.$router.push('/')
            })
        }
      }
    },
    watch: {
      '$route' (to) {
        document.title = to.meta.title || 'Todo'
      }
    },
  }
</script>
