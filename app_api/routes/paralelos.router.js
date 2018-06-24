var router = require('express').Router();
const ParalelosController = require('../controllers/paralelos.controller');
var authApi = require('../config/auth.api')
var Paralelo = require('../models/paralelo.model.js');

router.get('/', ParalelosController.obtenerTodosParalelos);
router.get('/:id_paralelo', ParalelosController.obtenerParalelo);

router.post('/', function(req, res, next) {
  Paralelo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.put('/:id_paralelo', authApi.profesor, ParalelosController.actualizarParalelo);
router.delete('/:id_paralelo',authApi.profesor,  ParalelosController.eliminarParalelo);

// grupos
router.post('/:id_paralelo/grupos/:id_grupo', authApi.profesor, ParalelosController.anadirGrupoAParalelo);
router.delete('/:id_paralelo/grupos/:id_grupo',authApi.profesor, ParalelosController.eliminarGrupoDeParalelo);

// profesores
router.post('/:id_paralelo/profesores/:id_profesor', authApi.profesor, ParalelosController.anadirProfesorAParalelo);
router.delete('/:id_paralelo/profesores',authApi.profesor,  ParalelosController.eliminarProfesorDeParalelo);
router.get('/profesores/mis_paralelos', authApi.profesor, ParalelosController.obtenerParalelosProfesor);
//router.get('/profesores/paralelos_profesor/:idProfesor', authApi.profesor, ParalelosController.obtenerParalelosProfesorCurso);

/* GET SINGLE User BY email */
router.get('/profesores/paralelos_profesor/:idProfesor', authApi.profesor, function(req, res, next) {
  console.log(req.params);
  Paralelo.find({$or: [
    {profesor: req.params.idProfesor},
    {asistentes: req.params.idProfesor}
  ]
  }, function (err, post) {
    if (err) return next(err);
    res.json(post);
    console.log(post);

  });
});
router.post('/:id_paralelo/peers/:id_profesor',authApi.profesor, ParalelosController.anadirPeerAParalelo)

// estudiantes
router.post('/:id_paralelo/estudiantes/:id_estudiante',authApi.profesor, ParalelosController.anadirEstudianteAParalelo);
router.delete('/:id_paralelo/estudiantes/:id_estudiante', authApi.profesor,  ParalelosController.eliminarEstudianteDeParalelo);
router.get('/estudiante/:id_estudiante',authApi.estudiante, ParalelosController.obtenerParaleloDeEstudiante);


// Lecciones
router.post('/:id_paralelo/leccion/:id_leccion', authApi.estudiante, ParalelosController.dandoLeccion) // <= DOCUMENTACION
router.post('/:id_paralelo/leccion_ya_comenzo',authApi.estudiante,  ParalelosController.leccionYaComenzo)
router.get('/:id_paralelo/obtener_paralelo',authApi.profesor, ParalelosController.obtenerParaleloParaLeccion)
module.exports = router
