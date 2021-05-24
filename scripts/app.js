Vue.component('mi-form', {
    data: function () {
        return {
            nombre: null,
            apellido: null,
            correo: null,
            tel: null,
            fechaEntrada:null,
            fechaSalida:null,
            seleccion: [],
            comentario: "",


            arr: [],
            errores: [],
            submitted: false,
        }

    },
    computed: {
        hayErrores: function () {
            return this.errores.length; // Devuelve cantidad errores
        }
    },
    template: `<div class="form row">
    <h2>Reservar Habitación</h2>
		<form v-on:submit.prevent="guardar" novalidate >
             <div class="row">
                <div class="input-field col s12 m6">
                 
                <i class="material-icons prefix">person</i>
                <input type="text" v-model="nombre" id="nombre"  name="nombre" required  class="validate" />
                <label for="nombre">Nombre</label>
                </div>
                  <div class="input-field col s12 m6">
                    <i class="material-icons prefix">person</i>
                    <input type="text" v-model="apellido" id="apellido"  name="apellido" required class="validate" />
                    <label for="apellido">apellido</label>
                   </div>
             </div>

             <div class="row">
                <div class="input-field col s12 m7">
                    <i class="material-icons prefix">mail</i>
                    <input type="email" v-model="correo" id="correo"  name="correo" required   class="validate"/>
                    <label for="correo">Correo electrónico</label>
                </div>
                  <div class="input-field col s12 m5">
                    <i class="material-icons prefix">phone_iphone</i>
                    <input v-model.number="tel" name="tel" type="number" required id="tel"   class="validate"/>    
                    <label for="tel">Número de Teléfono</label>
                   </div>
             </div>

             <div class="row">
                <div class="input-field col s12 m4">
                    <i class="material-icons prefix">perm_contact_calendar</i>
                    <input type="date" v-model="fechaEntrada" id="fechaEntrada"   name="fechaIngreso" required min="2021-05-25" max="2021-06-05" class="validate" />
                    <label for="fechaEntrada">Fecha de ingreso</label>
                </div>
                <div class="input-field col s12 m4">
                    <i class="material-icons prefix">perm_contact_calendar</i>
                    <input type="date" v-model="fechaSalida"  id="fechaSalida" name="fechaIngreso" required  min="2021-05-25" max="2021-06-07" class="validate"/>
                    <label for="fechaSalida">Fecha de salida</label>
                </div>
                <div class="input-field col s12 m4">
                    <i class="material-icons prefix">hotel</i>
                    <select v-model="seleccion" class="input-field col s12"  name="seleccion">
                        <option selected disabled>¿Cual habitación desea?</option>  
                        <option>Habitación simple</option>
                        <option>Habitación doble</option>
                        <option>Habitación triple</option>
                       
                    </select>
                </div>
            </div>
        
            <div class="row">
                <div class="input-field col s12">
                <i class="material-icons prefix">insert_comment</i>
                <textarea v-model="comentario" name="comentario" class="materialize-textarea" id="textoComentarios" data-length="150"></textarea>
                <label for="textoComentarios">Comentarios</label>
                </div>
            </div>
            <div class="row">
            
            
             <div class="col s12 m6">
                 <a href="#datosguardados" class="waves-effect waves-light btn modal-trigger  blue-grey ">Ver datos cargados</a>
               </div>
               
                 <div class="col s12 m6">
                          <button  class="btn waves-effect waves-light pulse  " type="submit"> Enviar
                               
                         <i class="material-icons right">send</i>
                         </button>
                </div>
                
                
            </div>
            
		</form>
		
   
   
        
            <div v-if="submitted === true" >
              
                    <div v-if="hayErrores" class="error  ">
                         <ul>
                             <li v-for="x in errores" >{{x}}</li>
                        </ul>
                    </div>
                    <div v-else class="enviado ">
                          <span>Enviado con éxito</span>
                    </div>
            </div>
		
 
 	
		
 		
         <div id="datosguardados" class="modal teal lighten-1">
               <div v-if="this.arr.length > 0"  class="container  " >
                    <h2>Datos de la reserva</h2>
                
             
				<ul v-for="item in arr">
					<li>Nombre: {{item.nombre}}</li>
					<li> Apellido: {{item.apellido}} </li>
                    <li>Correo electrónico:{{item.correo}} </li>
                    <li>Teléfono:{{item.tel}} </li>
                    <li>Fecha de ingreso: {{item.fechaEntrada}} </li>
                    <li>Fecha de salida: {{item.fechaSalida}} </li>
                    <li>Habitación seleccionada: {{item.seleccion}} </li>
                    <li>Observaciones: {{item.comentario}} </li>
				</ul>
	
                  
        
                </div>
                <div v-else class="classerror">
                    <p>No hay datos cargados, por favor ingresalos.</p>
                </div>
                
                <div class="modal-footer teal darken-4">
                  <a href="#!" class="modal-close waves-effect waves-green btn-flat teal lighten-1">De acuerdo</a>
                </div>
        </div>
		

		
	    </div>`,


    methods: {
        guardar: function (e) {

            //validacion
            this.submitted = true;
            this.errores = []

            if (!this.nombre) {
                this.errores.push('El nombre es obligatorio.');

            }
            if (this.nombre && this.nombre.length < 2) {
                this.errores.push('El nombre debe tener mas de 2 caracteres.');

            }
            if (!this.apellido) {
                this.errores.push('El apellido es obligatorio.');

            }
            if (this.apellido && this.apellido.length < 3) {
                this.errores.push('El apellido debe tener mas de 3 caracteres.');

            }
            if ( this.correo && this.correo.length < 5) {
                this.errores.push('El email debe ser mayor de 5 caracteres');
            }else if (!this.validEmail(this.correo)) {
                this.errores.push('El correo electrónico debe ser válido.');
            }
            if (!this.tel) {
                this.errores.push('El número de teléfono es obligatorio.');

            }
            if (!this.fechaEntrada) {
                this.errores.push('seleccione una fecha de ingreso por favor.');

            }

            if (!this.fechaSalida) {
                this.errores.push('seleccione una fecha de salida por favor.');

            }

            if (this.fechaEntrada  > this.fechaSalida) {
                this.errores.push('La fecha de entrada no puede ser después a la de salida');

            }

            if (!this.seleccion[0]) {
                this.errores.push('Debe seleccionar una habitación');
            }


            if (this.errores.length == 0) {

                let nuevoObj = {

                    nombre: this.nombre,
                    apellido: this.apellido,
                    correo: this.correo,
                    tel: this.tel,
                    fechaEntrada: this.fechaEntrada,
                    fechaSalida: this.fechaSalida,
                    seleccion: this.seleccion,
                    comentario: this.comentario,



                }

                if (!localStorage.dato) {
                    this.arr = []
                } else {
                    this.arr = JSON.parse(localStorage.getItem("reserva"))
                }

                this.arr.push(nuevoObj)
                localStorage.setItem("reserva", JSON.stringify(this.arr))
            }
        },
        validEmail: function (correo) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(correo);
        }

    },

    mounted: function () {
        this.arr = JSON.parse(localStorage.getItem("reserva")) || []

    }

});


Vue.component('habitaciones-hotel', {

    props:['id','tipodehabitacion', 'texto', 'aminities', 'img', 'alt','precio'  ],
    template: `
            <div class="col s12 m4">
                <div class="card habitaciones hoverable">
                    <div class="card-image waves-effect waves-block waves-light">
                       
                        <img class="activator" v-bind:src="img" v-bind:alt="alt"/>
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">{{ tipodehabitacion | capitalize }}<i class="material-icons right">more_vert</i></span>
                        <p>{{texto}}</p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">{{ tipodehabitacion | capitalize }}<i class="material-icons right">close</i></span>
                        <p>{{aminities}}</p>
                        <p>{{precio}}</p>
                    </div>
                </div>
            </div>       
	`,

});


var app = new Vue({
    el: ".app",
    data: {
        habitaciones:[
            {   id: 1,
                tipodehabitacion: 'habitación simple',
                texto: 'Nuestras habitaciones individuales se caracterizan por su amplitud, tienen una cama de 2 plazas, de medidas 150 cm de ancho por 190 cm de largo, son amplias de gran tamaño y confort.',
                aminities: 'Adicionalmente nuestras habitaciones cuentan con:\n' +
                    '• Bañera\n' +
                    '• Caja fuerte\n' +
                    '• Citófono\n' +
                    '• Aire acondicionado\n' +
                    '• Escritorio\n' +
                    '• Artículos de aseo gratis\n' +
                    '• Baño privado\n' +
                    '• Calefacción\n' +
                    '• Canales vía satélite HD\n' +
                    '• Smart tv\n' +
                    '• Servicio de despertador\n' +
                    '• Armario\n' +
                    '• Vistas a la ciudad',
                img: "imgs/habSimple.jpg",
                alt: 'habitación simple',
                precio: '$2500 por noche',
            },
            {   id: 2,
                tipodehabitacion: 'habitación doble',
                texto: 'Nuestras habitaciones son amplias de gran tamaño y confort, cuenta con dos camas de 1 ½ plaza, de medidas 105 cm de ancho por 190 cm de largo, para asegurar un buen descanso.',
                aminities: 'Adicionalmente nuestras habitaciones cuentan con:\n' +
                    '• Bañera\n' +
                    '• Caja fuerte\n' +
                    '• Citófono\n' +
                    '• Aire acondicionado\n' +
                    '• Escritorio\n' +
                    '• Artículos de aseo gratis\n' +
                    '• Baño privado\n' +
                    '• Calefacción\n' +
                    '• Canales vía satélite HD\n' +
                    '• Smart tv\n' +
                    '• Servicio de despertador\n' +
                    '• Armario\n' +
                    '• Vistas a la ciudad\n' +
                    '• Toallas\n' +
                    '• Ropa de cama',
                img: "imgs/habDoble.jpg",
                alt: 'habitación doble',
                precio: '$3500 por noche',
            },
            {   id: 3,
                tipodehabitacion: 'habitación triple',
                texto: 'Nuestras habitaciones triples para grandes grupos están pensadas para el descanso de la familia. Posee 3 camas de 1 ½ plaza  de medidas 105 cm de ancho por 190 cm, para asegurar un buen descanso.',
                aminities: 'Adicionalmente nuestras habitaciones cuentan con:\n' +
                    '• Bañera\n' +
                    '• Caja fuerte\n' +
                    '• Citófono\n' +
                    '• Aire acondicionado\n' +
                    '• Escritorio\n' +
                    '• Artículos de aseo gratis\n' +
                    '• Baño privado\n' +
                    '• Calefacción\n' +
                    '• Canales vía satélite HD\n' +
                    '• Smart tv\n' +
                    '• Servicio de despertador\n' +
                    '• Armario\n' +
                    '• Vistas a la ciudad\n' +
                    '• Toallas\n' +
                    '• Ropa de cama',
                img: "imgs/habtriple.jpg",
                alt: 'habitación triple',
                precio: '$4500 por noche',
            }
        ],
    }

})




