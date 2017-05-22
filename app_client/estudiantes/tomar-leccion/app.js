var socket = io('/tomando_leccion');
var app = new Vue({
  el: '#app',
  methods: {
    verificarEstudiantPuedeDarLeccion: function() {
      if (!app.codigo_leccion) {
        Materialize.toast('Ingrese el código', 4000)
      } else {
        $.ajax({
          method: 'GET',
          url: '/api/estudiantes/tomar_leccion/'+ app.codigo_leccion,
          success: function(res) {
            var res = res.datos
            if (!res.tieneGrupo) {
              Materialize.toast('No esta asignado a ningun grupo', 4000)
              return
            }
            if (!res.paraleloDandoLeccion) {
              Materialize.toast('El paralelo no esta dando lección', 4000)
              return
            }
            if (!res.leccionYaComenzo && res.codigoLeccion) {
              var load = document.getElementById('loading')
              load.setAttribute('class', 'enable')
              var a = document.getElementById('app')
              a.setAttribute('class', 'disabled')
              return
            } else {
              if (!res.codigoLeccion) {
                Materialize.toast('El código de la lección no es valido', 4000)
                return
              }
            }
            if (res.leccionYaComenzo) {
              window.location.href = '/estudiantes/leccion'
            }
          }
        })
      }
    },
    estado: function() { // usado cuando recarga la pagina
      $.get({
        url: '/api/session/usuario_conectado',
        success: function(user) {
          var usuario = user.datos
          app.estudiante = user.datos
          socket.emit('usuario', user.datos)
          $.get({
            url: '/api/paralelos/estudiante/'+ usuario._id,
            success: function(par) {
              var paralelo = par.datos
              if (usuario.codigoIngresado && !paralelo.leccionYaComenzo) {
                var load = document.getElementById('loading')
                load.setAttribute('class', 'enable')
                var a = document.getElementById('app')
                a.setAttribute('class', 'disabled')
              }
              if (usuario.codigoIngresado && paralelo.leccionYaComenzo) {
                window.location.href = '/estudiantes/leccion'
              }
            }
          })
        }
      })
    }
  },
  data: {
    estudiante: {},
    codigo_leccion: ''
  }
})

app.estado()

socket.on('empezar leccion', function(data) {
  if (data) {
    window.location.href = '/estudiantes/leccion'
  }
})

Offline.on('down', function(data) {
  console.log('desconectado');
})

Offline.on('up', function(data) {
  app.estado()
  console.log('conectado');
})

socket.on('connect', function() {
  // $("#desconectado").disable();
  document.getElementById("desconectado").classList.add("borrar");
  document.getElementById('conectado').classList.remove("borrar");
  console.log('conectado');
  // pedir tiempo
})

socket.on('disconnect', function() {
  document.getElementById('desconectado').classList.remove("borrar")
  document.getElementById("conectado").classList.add("borrar");
  console.log('desconectado');
})

/*
confirmed-up: A connection test has succeeded, fired even if the connection was already up
confirmed-down: A connection test has failed, fired even if the connection was already down
checking: We are testing the connection
reconnect:started: We are beginning the reconnect process
reconnect:stopped: We are done attempting to reconnect
reconnect:tick: Fired every second during a reconnect attempt, when a check is not happening
reconnect:connecting: We are reconnecting now
reconnect:failure: A reconnect check attempt failed
requests:flush: Any pending requests have been remade
requests:hold: A new request is being held
 */
