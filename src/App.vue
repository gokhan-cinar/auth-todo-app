<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
        <Header/>
      </a-layout-header>
      <a-layout-content>
        <router-view/>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
  import Header from './components/Header'

  export default {
    components: {
      Header
    }
  }
</script>
