<template>
  <v-card>
    <v-card-text>
      {{message}}
      <div v-for="item in lista" :key="item._id">
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
  import axios from './axios'
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
    created() {
      axios.get('imagenes')
      .then( (response) => {
        this.lista = response.data.result
      })
    },
    methods: {
      send() {
        if (this.$refs.form.validate()) {
          axios.post('imagenes', {
            url: this.url,
            alt: this.alt
          }).then( (response) => {
            console.log(response.data)
            //this.message = 'Hola ' + response.data.hello
            this.lista.push({'url': this.url, 'alt': this.alt, id: response.data});
          })
        }
      }
    }
  }
</script>
