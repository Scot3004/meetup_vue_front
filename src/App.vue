<template>
  <v-app>
    <v-content>
      <v-container fluid>
        Hola
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        title: 'VueJS'
      }
    }
  }
</script>
