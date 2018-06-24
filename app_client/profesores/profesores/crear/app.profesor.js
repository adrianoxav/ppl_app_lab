var usuario ={}
var tipo={}
Vue.component('v-select', VueSelect.VueSelect)

var App = new Vue({
  created: function() {
    this.obtenerUsuario();
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



    //////////////////////////////////////////////
    //Llamadas api
    //////////////////////////////////////////////
    addProduct: function()
              {
                  // Validation
                  var self = this;
                  console.log(usuario);

                  this.$http.post('/api/profesores/', usuario).then(response => {
                    $('#myModal').modal('open');
                    console.log(response)
                    /**
                      *Not the best way, but a way. Una vez se haya creado la pregunta, se agregará un evento click al body
                      *Al apretar cualquier parte del body, reenviará al menú de lecciones,
                    **/
                    if(response.ok==true){
                      alert("Profesor creado correctamente");
                       window.location.replace("/profesores/profesores");
                    }
                    //-------Fin de cerrar Modal-------------
                  }, response => {
                    //error callback
                    alert("Profesor ya existente, o complete los campos correctamente" + response);
                    console.log(response)
                  });

                  //

                },


    obtenerUsuario: function() {
      this.$http.get('/api/session/usuario_conectado').then(response => {
        this.profesor = response.body.datos;
        console.log(this.profesor);
      });
    },
    runme: selected => {
      usuario.tipo=usuario.tipo.label;
      console.log(usuario.tipo);
        //  alert(`label: ${selected.label} value: ${selected.value}`);
        },


  },
  data: {
    options: [
      {value: 1, label: 'Titular'},
      {value: 3, label: 'Asistente'}    ],
    tipo: '',
    capitulosMostrar   : [],   //Capítulos que se mostrarán en el DOM
    capitulosObtenidos : [], //Capítulos obtenidos de la base de datos (no se altera)
    leccion_nueva      : {
      nombre        : '',
      tiempoEstimado: 0,
      tipo          : '',
      fechaInicio   : moment().add(1, 'day').format('YYYY-MM-DD'),
      preguntas     : [],
      puntaje       : 0,
      paralelo      : '',
      nombreParalelo: '',
      nombreMateria : '',
      codigoMateria : ''
    },
    paralelos          : [],        //Paralelos obtenidos de la base de datos
    preguntas          : [],        //Preguntas obtenidas de la base de datos
    preguntas_escogidas: {
      preguntas  : [],
      tiempoTotal: 0
    },
    paraleloEscogido   : {
      nombre: '',
      id    : ''
    },
    DOMupdated         : false,
    CollapsibleOpen    : false,
    profesor           : {},
  },
});
