var practica = new Vue({
	el: '#tutorial',
	data: {
		tutorialesObtenidos: [],
		tutoriales: [],
		preguntas: [],
		preguntasTutorial: [],
		profesor: {},
		tutorial: {
			nombre: '',
			tipo: 'tutorial'
		}
	},

	mounted: function(){
		$('.button-collapse').sideNav();
		$('.scrollspy').scrollSpy();
		$(".dropdown-button").dropdown();
		$('#modalEliminarPregunta').modal();
		$('#modalNuevoTutorial').modal();
		this.obtenerLogeado();
		this.obtenerTutoriales();
		//this.getPreguntas();
		
	},
	methods: {
		obtenerLogeado: function() {
      var self = this;
      this.$http.get('/api/session/usuario_conectado').
        then(res => {
          if (res.body.estado) {
          	self.profesor = res.body.datos;
          }
        });
    },
    obtenerTutoriales: function(){
    	var self = this;
    	var url = '/api/capitulos/'
    	self.$http.get(url).then(response => {
    		//SUCCESS CALLBACK
    		self.tutorialesObtenidos = response.body.datos;
    		$.each(self.tutorialesObtenidos, function(index, tutorial){
    			if(tutorial.tipo.toLowerCase()=='tutorial'){
    				self.tutoriales.push(tutorial);
    			}
    		});
    		self.obtenerPreguntas();
    	}, response => {
    		//ERROR CALLBACK
    		console.log('Hubo un error al obtener los tutoriales de la base de datos.');
    		console.log(response);
    	})
    },
    obtenerPreguntas: function(){
    	var self = this;
    	var url = '/api/preguntas/';
    	self.$http.get(url).then(response => {
    		//SUCCESS CALLBACK
    		self.preguntas = response.body.datos;
    		//Selecciono solo las que son de tutorial
    		$.each(self.preguntas, function(index, pregunta){
    			if(pregunta.tipoLeccion.toLowerCase()=='tutorial'){
    				self.preguntasTutorial.push(pregunta);
    			}
    		});
    		self.dividirPreguntasEnTutoriales();
    	}, response => {
    		//ERROR CALLBACK
    		console.log('Hubo un error al obtener las preguntas de la base de datos');
    	});
    },
    dividirPreguntasEnTutoriales: function(){
    	var self = this;
    	$.each(self.preguntasTutorial, function(index, pregunta){
    		$.each(self.tutoriales, function(j, tutorial){
    			if(pregunta.tutorial.toLowerCase()==tutorial.nombre.toLowerCase()){
    				tutorial.preguntas.push(pregunta);
    				return false;
    			}
    		});
    	});
    },
    crearTutorial: function(){
    	var self = this;
    	var url = '/api/capitulos/'
    	self.$http.post(url, self.tutorial).then(response => {
    		self.tutoriales.push(self.tutorial);
    		self.tutorial.nombre = '';
    	}, response => {
    		console.log('Hubo un error al crear el tutorial.')
    		console.log(response);
    	})
    },
		nuevaPregunta: function(){
			window.location.href = '/profesores/preguntas/nueva-pregunta'

		},
		eliminarPregunta: function(id){
			var url = '/api/preguntas/' + id;
			this.$http.delete(url).then(response => {
				console.log(response)
				//ELIMINAR LA PREGUNTA DE SELF.CAPITULOS
				self.tutoriales = [];
				self.preguntas = [];
				this.getPreguntas();
			}, response => {
				//error callback
				console.log(response)
			});
			
		},
		crearModalEliminarPregunta: function(id){
			var self = this;
			var preguntaId = id;
			//Primero hay que eliminar el modal-content. Sino cada vez que abran el modal se añadirá un p más
			$('#modalEliminarPreguntaContent').empty();
			//Ahora si añadir las cosas
			var modalContentH4 = $('<h4/>').addClass('center-align').text('Eliminar');
			var modalContentP = $('<p/>').text('Seguro que desea eliminar la pregunta: ' + preguntaId)
			modalContentP.addClass('center-align')
			$('#modalEliminarPreguntaContent').append(modalContentH4, modalContentP);
			//Lo mismo con el footer
			$('#modalEliminarPreguntaFooter').empty();
			var btnEliminar = $('<a/>').attr({
				'href': '#!',
				'class': 'modal-action modal-close waves-effect waves-green btn-flat'
			});			
			btnEliminar.text('Eliminar');
			btnEliminar.click(function(){
				self.eliminarPregunta(preguntaId);
			})
			var btnCancelar = $('<a/>').attr({
				'href': '#!',
				'class': 'modal-action modal-close waves-effect waves-green btn-flat'
			});
			btnCancelar.text('Cancelar');
			$('#modalEliminarPreguntaFooter').append(btnEliminar, btnCancelar)
			$('#modalEliminarPregunta').modal('open');
		},
		checkCreador: function(pregunta){
			var self = this;
			if(pregunta.creador==self.profesor._id) return true;
			return false
		},
	}
});

$('body').on("click", '#btnTutorialNuevo', function(){
	$('#modalNuevoTutorial').modal('open');
})

document.addEventListener("DOMContentLoaded", function(event) {
  $.get({
    url: "/../navbar/profesores",
    success: function(data) {
      document.getElementById('#navbar').innerHTML = data;
      $(".button-collapse").sideNav();
      $(".dropdown-button").dropdown();
    }
  })
});