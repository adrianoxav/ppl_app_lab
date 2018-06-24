const _SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");
const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x,i) => ({name:XLSX.utils.encode_col(i), key:i}));

var appVerLeccion = new Vue({
	el: '#appVerCurso',
	mounted: function(){
		this.obtenerCursoActual()
	},

	methods: {

	_file(file) {

						/* Boilerplate to set up FileReader */
						var reader = new FileReader();
						reader.onload = (e) => {
							/* Parse data */
							var bstr = e.target.result;
							var wb = XLSX.read(bstr, {type:'binary'});
							/* Get first worksheet */
							var wsname = wb.SheetNames[0];
							var ws = wb.Sheets[wsname];
							/* Convert array of arrays */
							var data = XLSX.utils.sheet_to_json(ws, {raw:true});
							/* Update state */
							this.lista = data;
							this.cols = make_cols(ws['!ref']);
							console.log(this.lista);

						};
						reader.readAsBinaryString(file);
						//console.log(this.data);
						console.log(this.lista);


		},
		Upload: function(){
					appVerCurso.lista=this.lista;
					console.log(appVerCurso.lista);

		},
		_change(evt) {
		const files = evt.target.files;
		if(files && files[0]) this._file(files[0]);
	},

	crearEstudiantesCurso: function() {
		var pathname = window.location.pathname;

		var idCurso = pathname.split('/')[3];

		var estudiantesporasignar= [];
		for(let l of this.lista){

			this.$http.post('/api/estudiantes/signup', l).then(response => {
				$('#myModal').modal('open');
			//	console.log(response);
				if(response.body.msg=="email already exists."){
	//				console.log("wiiiiii");
					var url = '/api/estudiantes/correo/' + l.correo;
					this.$http.get(url).then(response => {
				//		console.log(response);
							self.estudiante = response.body;
//							console.log(self.estudiante);
			var url1 = '/api/paralelos/' +idCurso + '/estudiantes/' + self.estudiante._id;
			this.$http.post(url1).then(response => {
				$('#myModal').modal('open');
				console.log(response);
			}, response => {
				console.log(response)
			});

		//					estudiantesporasignar.push(self.estudiante._id);

					}, response => {
						console.log(response)
					});
					}
					else{
				//		estudiantesporasignar.push(response.body._id);
			var url1 = '/api/paralelos/' +idCurso + '/estudiantes/' + response.body._id;
				this.$http.post(url1).then(response => {
					$('#myModal').modal('open');
					console.log(response);
				}, response => {
					console.log(response)
				});
					}

				/**
					*Not the best way, but a way. Una vez se haya creado la pregunta, se agregará un evento click al body
					*Al apretar cualquier parte del body, reenviará al menú de lecciones,
				**/

				//-------Fin de cerrar Modal-------------
			}, response => {
				//error callback
				//alert("ALGO SALIÓ MAL!" + response);
				console.log(response)
			});

}
console.log(estudiantesporasignar);

	},
		obtenerCursoActual: function(){
			var self = this;
			self.estu=[];
			var pathname = window.location.pathname;
			var idCurso = pathname.split('/')[3];
			console.log(idCurso);
			var url = '/api/paralelos/' + idCurso;
			self.$http.get(url).then(response => {
				console.log(response);
					self.curso = response.body.datos;
					console.log(self.curso);
					for(let l of self.curso.estudiantes){
						console.log(String(l));
						$.get({
							url: '/api/estudiantes/'+String(l),
							success: function(res){
								//console.error(res);
								self.estu.push(res.datos);
								console.log(self.estu);

							},
							error: function(err){
								console.log(res)
							}
						});


					}
					$.get({
						url: '/api/profesores/'+self.curso.profesor,
						success: function(res){
				//			console.error(res);
				res.datos.tipo="Principal";
							self.profes.push(res.datos);
							console.log(self.profes);

						},
						error: function(err){
							console.log(res)
						}
					});
					for(let l of self.curso.asistentes){
						console.log(String(l));
						$.get({
							url: '/api/profesores/'+String(l),
							success: function(res){
								//console.error(res);
								res.datos.tipo="Secundario";
								self.profes.push(res.datos);
								console.log(self.profes);

							},
							error: function(err){
								console.log(res)
							}
						});


					}

			}, response => {
				console.log(response)
			});
		},


		prueba: function(){
			var self = this;
			console.log(self.preguntas)
		},
		editar: function(){
			var self = this;
			var pathname = window.location.pathname;
			var idLeccion = pathname.split('/')[3];
			var url = '/profesores/leccion/modificar/' + idLeccion;
			window.location.href = url;
		}
	},
	data: {
		curso: {},
		lista: [],
		preguntas: [],
		estu:[],
		profes:[],
	estudiante:{},
est:{}	}
});
