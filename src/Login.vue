<template>
  <v-card>
    <v-card-text>
      {{ message }}
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Nombre"
          v-model="name"
          :rules="nameRules"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="Clave"
          v-model="password"
          :rules="passRules"
          required
        ></v-text-field>
        <v-btn @click="login" :disabled="!valid" color="primary">Ingresar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
  import router from './router'
  import axios from 'axios'
  export default {
    data: () => {
      return {
        'valid': false,
        'name': '',
        'nameRules': [
          (v) => !!v || 'El nombre es requerido',
          (v) => v.length <= 10 || 'El nombre debe tener menos de 10 caracteres'
        ],
        'password': '',
        'passRules': [
          (v) => !!v || 'Contraseña es requerida',
        ],
        'message': ''
      }
    },
    methods: {
      login() {
        console.log(this.name)
        if (this.$refs.form.validate()) {
          axios.post('http://localhost:5000/auth', {
            username: this.name,
            password: this.password
          }).then( (response) => {
            this.message = ''
            window.localStorage.setItem('token', response.data.access_token);
            router.push({'name':'saludo'});
          }).catch ( (response) => {
            this.message = response.message;
          })
        }
      }
    }
  }
</script>
