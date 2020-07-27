<template>
  <div>
    <div class="language">
      <a-button
        v-if="languageText === 'en'"
        @click="setLocale('tr')"
        type="success"
        shape="circle">
        Tr
      </a-button>
      <a-button
        v-if="languageText === 'tr' || languageText === ''"
        @click="setLocale('en')"
        type="success"
        shape="circle">
        En
      </a-button>
    </div>
    <span
      :class="logoutClass"
      class="log-out"
    >
      <a-button type="link" @click="logout">
        {{$t('logout')}}
      </a-button>
    </span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        languageText: '',
      }
    },
    methods: {
      setLocale (locale) {
        localStorage.setItem('language', locale)
        this.languageText = locale
        import(`../locales/${locale}.json`).then(msg => {
          this.$i18n.setLocaleMessage(locale, msg)
          this.$i18n.locale = locale
        })
      },
      logout () {
        this.$store.dispatch('logOut')
        this.$router.replace('/auth')
      }
    },
    computed: {
      logoutClass () {
        return {
          'd-none': !this.$store.getters.isAuthenticated
        }
      }
    }
  }
</script>
