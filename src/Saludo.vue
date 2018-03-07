<template>
  <v-card>
    <v-card-text>
      {{ token }}
      {{message}}
      <div v-for="item in lista" :key="item">
        {{ item }}
      </div>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="URL"
          v-model="url"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field
          label="Alt"
          v-model="alt"
          required
        ></v-text-field>
        <v-btn @click="send" :disabled="!valid" color="primary">Ingresar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
  import axios from 'axios'
  export default {
    data: () => {
      return {
        valid: false,
        loading: true,
        message: '',
        lista: [],
        url: '',
        alt: ''
      }
    },
    mounted() {
      
      let token = window.localStorage.getItem('token');
      console.log('hola', token)
      axios.get('http://localhost:5000/imagenes', {
        headers: {'Authorization': 'JWT '+token}
      }).then( (response) => {
        console.log(response.data.hello)
        //this.message = 'Hola ' + response.data.hello
        this.lista = response.data.images
        console.log(response)
      })
    },
    props: ['token'],
    methods: {
      send() {
        console.log(this.name)
        window.localStorage.getItem(key);
        if (this.$refs.form.validate()) {
          axios.post('http://localhost:5000/imagenes', {
            url: this.url,
            alt: this.alt,
            headers: {'Authorization': 'JWT '+token}
          }).then( (response) => {
            console.log(response.data)
            //this.message = 'Hola ' + response.data.hello
            this.lista = response.data.images
          })
        }
      }
    }
  }
</script>
