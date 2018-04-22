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
  import axios from './axios'
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
          axios.post('auth', {
            username: this.name,
            password: this.password
          }).then( (response) => {
            this.message = '';
            const token = response.data.access_token;
            axios.defaults.headers['Authorization'] = 'JWT '+token
            window.localStorage.setItem('token', token);
            router.push({'name':'saludo'});
          }).catch ( (response) => {
            this.message = response.message;
            axios.defaults.headers['Authorization'] = '';
            window.localStorage.removeItem('token')
          })
        }
      }
    }
  }
</script>
