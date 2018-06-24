
var curso ={}
var App = new Vue({
  created: function() {
    this.obtenerProfesores();
  },
  mounted: function(){
    this.inicializarMaterialize();
  },
  updated: function(){
    var self = this;

      self.DOMupdated = true;
  },
  el: '#app',

  methods: {
    inicializarMaterialize: function(){
      $('ul.tabs').tabs();
      $('.button-collapse').sideNav();
      $(".dropdown-button").dropdown({ hover: false });
      $('.scrollspy').scrollSpy();
      $('.modal').modal();
      $('select').material_select();
      $('.modal').modal();
      $('.collapsible').collapsible({
        onOpen: function(el) {
          var self = this;
          self.CollapsibleOpen = true
        }
      });

},

showTooltip: function(preguntaID, descripcion, tiempo){
    var tooltipID = "#tooltip-" + preguntaID;
    var max_width = ( 50 * $( window ).width() )/100;
    var max_height = ( 50 * $( window ).width() )/100;
    descripcion.concat("<br><hr>");
    descripcion.concat(tiempo);
    console.log();
    $(tooltipID).tooltipster({
      theme: 'tooltipster-light',
      position: 'bottom',
      maxWidth: max_width,
      height: max_height,
      contentCloning: true,
      arrow: false,
      delay: 100,
      multiple: true,
      contentAsHTML: true})
      .tooltipster('content', descripcion)
      .tooltipster('open');
},
anadirProfe: function(profe){
console.log(profe);
},
    //////////////////////////////////////////////
    //Llamadas api
    //////////////////////////////////////////////
    addProduct: function()
              {
                var pathname = window.location.pathname;

            		var idCurso = pathname.split('/')[3];
                  // Validation
                  var self = this;
                  console.log(curso);

                  this.$http.post('/api/paralelos/', curso).then(response => {
                    $('#myModal').modal('open');
                    console.log(response)
                    /**
                      *Not the best way, but a way. Una vez se haya creado la pregunta, se agregará un evento click al body
                      *Al apretar cualquier parte del body, reenviará al menú de lecciones,
                    **/

                    //-------Fin de cerrar Modal-------------
                  }, response => {
                    //error callback
                    alert("ALGO SALIÓ MAL!" + response);
                    console.log(response)
                  });

                    window.location.replace("/profesores/cursos/"+idCurso);

                },


    obtenerProfesores: function() {
      $.get({
    		url: '/api/profesores/',
    		success: function(res){
					console.error(res);
          self.profesores=res;
          console.log(self.profesores);
    		},
    		error: function(err){
    			console.log(res)
    		}
    	});
    },
    statusSelected (evt) {
      console.log(JSON.parse(evt.target.value))
    },
    runme: selected => {

      console.log(self.profesorSel );
        //  alert(`label: ${selected.label} value: ${selected.value}`);
        },
  },
  data: {

      profesores     : [],
    profesor           : {},
    profesorSel       : ""
  },
  props: {
    // The disabled option is necessary because
    // otherwise it isn't possible to select the
    // first item on iOS devices. This prop can
    // be used to configure the text for the
    // disabled option.
    disabledOption: {
      type: String,
      default: 'Seleccionar un Profesor',
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: null,
    },
  },

});
