/*
Flujo: profesorLogeado => obtenerTodosParalelosProfesor => obtenerTodosGrupos => estudiantesNoEnGrupo

 */
// TODO: que no recage todo el dom al eliminar, cambiar de grupo o anadir a grupo
// TODO: al crear un grupo que lo anada a los grupos

var grupos_animation

var appProfes = new Vue({
  mounted: function(){
    $('.button-collapse').sideNav();
    $(".dropdown-button").dropdown({ hover: false });
    $('select').material_select();
  },
  created: function(){
		this.obtenerUsuario();
    this.obtenerTodosProfesores();

	},
	mounted: function(){
	},
	el: '#profe',
  data: {

		profesor : {},			//JSON con la información del profesor conectado
		profes: [],			//Array de ids de paralelos de los cuales el usuario es profesor o peer 1
    todasLecciones: [],
		leccionesId: [],
	 	gruposParaleloId: [],
		paralelosDatos: [],
	 	nombreParalelo: [],
		nombreMateria: [],
		nombreLecciones: [],
		profesorConectado: '',
		anioActual: '',
		paraleloId: '',
		calificaciones: []
  },
  methods: {

    obtenerUsuario: function() {
      $.get({
      	url: '/api/session/usuario_conectado',
      	success: function(res){
          console.error(res);

      		appProfes.profesor = res.datos;
      	}
      });
    },
    obtenerTodosProfesores: function(){
    	$.get({
    		url: '/api/profesores/',
    		success: function(res){
					console.error(res);
          appProfes.profes=res;
    		},
    		error: function(err){
    			console.log(res)
    		}
    	});
    },



  },

});
