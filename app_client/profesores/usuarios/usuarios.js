/*
Flujo: profesorLogeado => obtenerTodosParalelosProfesor => obtenerTodosGrupos => estudiantesNoEnGrupo

 */
// TODO: que no recage todo el dom al eliminar, cambiar de grupo o anadir a grupo
// TODO: al crear un grupo que lo anada a los grupos

var grupos_animation

var app = new Vue({
  mounted: function(){
    $('.button-collapse').sideNav();
    $(".dropdown-button").dropdown({ hover: false });
    $('select').material_select();
  },
  created: function(){
		this.obtenerUsuario();
    this.obtenerTodosEstudiantes();

	},
	mounted: function(){
	},
	el: '#usuarios',
  data: {
    paralelos : [],
    leccionesAMostrar : [],	//Array solo de las lecciones a mostrar en la vista
		lecciones: [],			//Array de lecciones de los paralelos del profesor conectado
		profesor : {},			//JSON con la información del profesor conectado
		usuarios: [],			//Array de ids de paralelos de los cuales el usuario es profesor o peer 1
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

      		app.profesor = res.datos;
      	}
      });
    },
    obtenerTodosEstudiantes: function(){
    	$.get({
    		url: '/api/estudiantes/',
    		success: function(res){
					console.error(res);
          app.usuarios=res.datos;
    		},
    		error: function(err){
    			console.log(res)
    		}
    	});
    },



  },

});
