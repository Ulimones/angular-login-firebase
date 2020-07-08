import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


//


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme=false;

  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();
  }


  onSubmit(form:NgForm){

    if(form.invalid){return;}

    
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      title:'Registrando usuario',
      text: 'Espere por favor...',
    });
    Swal.showLoading();

    
    this.auth.registro(this.usuario)
    .subscribe(resp=>{

      Swal.close();

      if(this.recordarme){
        localStorage.setItem('email',this.usuario.email);
      }


      this.router.navigateByUrl('/home');
      Swal.fire({
        type:'success',
        title:'Registro exitoso',
        text: 'usuario registrado...',
      });


      console.log(resp);
      
    },(err)=>{

      Swal.fire({
        type:'error',
        title:'No se pudo registrar la información',
        text: err.error.error.message
      });
 



    console.log(err.error.error.message);

    });


    // console.log('formulario enviado...')
    // console.log(this.usuario);
    // console.log(form)
  }


}
