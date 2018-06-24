var curso ={}
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
                  curso.profesor=this.profesor._id;
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
                    window.location.replace("/profesores/cursos");

                },


    obtenerUsuario: function() {
      this.$http.get('/api/session/usuario_conectado').then(response => {
        this.profesor = response.body.datos;
        console.log(this.profesor);
      });
    },

    runme: selected => {
      curso.termino=curso.termino.label;
      console.log(curso.termino);
        //  alert(`label: ${selected.label} value: ${selected.value}`);
        },
  },
  data: {
    options: [
      {value: 1, label: '1s'},
      {value: 3, label: '2s'}    ],
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
    preguntasSel       : []
  },
});
