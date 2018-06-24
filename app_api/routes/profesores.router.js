var authApi = require('../config/auth.api')
var router = require('express').Router();
const ProfesorController = require('../controllers/profesores.controller')
var Profesor = require('../models/profesor.model.js');

//router.get('/', authApi.estudiante, ProfesorController.obtenerTodosProfesores);
router.get('/:id_profesor', authApi.estudiante, ProfesorController.obtenerProfesor);
router.get('/', authApi.profesor, ProfesorController.obtenerTodosProfesores);
router.get('/all', function(req, res, next) {
  Profesor.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});
router.post('/',  authApi.profesor,function(req, res, next) {
  Profesor.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/**
  * @api {put} estudiantes/calificar/leccion/:id_leccion/estudiante/:id_estudiante Calificar leccion de estudiante
  * @apiName CalificarLeccion
  * @apiGroup Estudiantes
  * @apiParamExample {json} Request-Example:
  *     {
  *       "_id": "B1-gxdLCJ-"
  *     }
**/
module.exports = router;
