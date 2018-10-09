Vue.component('login', {
	template: `
		<section id="login">
			<form @submit.prevent="accesarUsuario()" method="post">
				<img src="default-user-image.png">
				<input id="usuario" name="usuario" type="text" placeholder="Usuario..." v-model='user'>
				<input id="contrasena" name="contrasena" type="password" placeholder="Password..." v-model='pass'>
				<input id="manda" name="manda" type="submit" value="Accesar">
			</form>
		</section>
	`,
	mounted(){
	},
	data(){
		return {
			usuarioNuevo: null,
			usuarios:[],
			user: null,
			pass: null
		}
	},
	methods: {
		accesarUsuario(){
			this.usuarios.unshift(this.usuarioNuevo);
			this.usuarioNuevo=null;
			let datos = {
				  user: this.user,
				  pass: this.pass
				};
	         this.$http.post('posts.php', 
	         	datos
	         ).then(function(response){ 
			    console.log(response.data.json );
			    elegido='inicio';
	         }, function(){
	            alert('Error!')
	         });

		}
	}
});
Vue.component('inicio', {
	template: `
	<section id="inicio">
	<p>TITULO</p>
	</section>
	`,
	mounted(){
	},
	data(){
		return {
		}
	},
	methods: {
	}
});

new Vue ({
	el:'component',
	mounted(){
	},
	data: {
		elegido: 'login'
	}
});

/*const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<p>home page</p>' }
const About = { template: '<p>About Page</p>' }
const Login = login
const routes = {
  '/otros/': Login,
  '/otros/login/': Login,
  '/otros/login/about/': About
}
new Vue({
	el:'component',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) },
  components: {Home,About}
});
*/