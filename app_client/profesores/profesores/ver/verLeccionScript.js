var appVerLeccion = new Vue({
	el: '#appVerCurso',
	mounted: function(){
		this.obtenerProfesorActual();
		this.obtenerTodosParalelosProfesor();
	},

	methods: {


	asignarAcurso: function() {
		var pathname = window.location.pathname;

		var idProfesor = pathname.split('/')[3];

		var estudiantesporasignar= [];
		for(let l of this.lista){
}
console.log(estudiantesporasignar);

	},
		obtenerProfesorActual: function(){
			var self = this;
			var pathname = window.location.pathname;
			var idProfesor = pathname.split('/')[3];
			console.log(idProfesor);
			var url = '/api/profesores/' + idProfesor;
			self.$http.get(url).then(response => {
				console.log(response);
					appVerLeccion.profesor = response.body.datos;
					console.log(appVerLeccion.profesor);

			}, response => {
				console.log(response)
			});
		},

		obtenerTodosParalelosProfesor: function(){
			var pathname = window.location.pathname;
			var idProfesor = pathname.split('/')[3];
			$.get({
				url: '/api/paralelos/profesores/paralelos_profesor/'+idProfesor,
				success: function(res){
					console.error(res);
					appVerLeccion.cursos=res;
					console.log(appVerLeccion.cursos);

				},
				error: function(err){
					console.log(res)
				}
			});
		},
		editar: function(){
			var self = this;
			var pathname = window.location.pathname;
			var idLeccion = pathname.split('/')[3];
			var url = '/profesores/leccion/modificar/' + idLeccion;
			window.location.href = url;
		}
	},
	data: {
		profesor: {},
		lista: [],
		cursos: [],

	}
});
