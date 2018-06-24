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
    this.obtenerTodosParalelos();

	},
	mounted: function(){
	},
	el: '#paralelos',
  data: {
    paralelos : [],
    leccionesAMostrar : [],	//Array solo de las lecciones a mostrar en la vista
		lecciones: [],			//Array de lecciones de los paralelos del profesor conectado
		profesor : {},			//JSON con la información del profesor conectado
		paralelos: [],			//Array de ids de paralelos de los cuales el usuario es profesor o peer 1
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
    obtenerTodosParalelos: function(){
    	$.get({
    		url: '/api/paralelos/',
    		success: function(res){
					console.error(res);
          app.paralelos=res.datos;
    		},
    		error: function(err){
    			console.log(res)
    		}
    	});
    },



  },

});
