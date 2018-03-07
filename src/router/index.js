import Login from '../Login.vue'
import Saludo from '../Saludo.vue'
import VueRouter from 'vue-router'
const Home = { template: '<div>Home</div>' }

var router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      { path: '/', component: Home, name:'home'},
      { path: '/login', component: Login, name: 'login'},
      { path: '/saludo', component: Saludo, name: 'saludo', default: true}
    ]
});

export default router;
