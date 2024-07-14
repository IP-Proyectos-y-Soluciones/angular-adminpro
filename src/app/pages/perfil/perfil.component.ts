import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: ``
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File = null as any;
  public imgTemp: string | null = null;

  /**
  * @constructor
  * @description Inicializa el componente inyectando las dependencias necesarias.
  * @param { FormBuilder } fb - Servicio de Angular para crear formularios reactivos.
  * @param { UsuarioService } usuarioService - Servicio para manejar las operaciones relacionadas con el usuario.
  */
  constructor(
    private fb: FormBuilder, 
    private usuarioService: UsuarioService, 
    private fileUploadService: FileUploadService,
  ) { 
    this.usuario = this.usuarioService.usuario;
  }

  /**
   * @name ngOnInit
   * @description Inicializa el formulario de edición de perfil
   * Se establecen los validadores requeridos para los campos 'name' y 'email'
   * y se establece un valor inicial para el campo 'name' basado en el nombre del usuario actual.
   * @returns { void }
   */
  ngOnInit (): void {
    this.perfilForm = this.fb.group({
      name: [
        this.usuario.name, 
        [ Validators.required, Validators.minLength( 3 ) ]
      ],
      email: [
        this.usuario.email, 
        [ Validators.required, Validators.email ]
      ],
    });
  };

  /**
  * @name actualizarPerfil
  * @description Este método se encarga de actualizar el perfil del usuario.
  * Toma los valores del formulario de perfil y envía una solicitud HTTP para actualizar
  * el perfil del usuario en el servidor. Incluye el rol del usuario, asegurando que siempre
  * tenga un valor por defecto si el rol actual no está definido.
  * Utiliza SweetAlert2 para mostrar notificaciones de éxito o error según corresponda.
  * @returns { void } - No retorna ningún valor directamente, pero actualiza la información 
  * del usuario en el cliente y maneja la respuesta del servidor.
  */
  actualizarPerfil(): void {
    this.usuarioService.actualizarPerfil({ 
      ...this.perfilForm.value, 
      role: this.usuarioService.usuario.role || 'USER_ROLE',
    })
      .subscribe( resp => {
        const { name, email } = this.perfilForm.value;
        this.usuario.name = name;
        this.usuario.email = email;

        /**
         * Mostrar alerta de éxito
         */
        Swal.fire({
          icon: 'success',
          title: 'Perfil actualizado',
          text: 'La información del perfil ha sido actualizada correctamente.'
        });
      },
      error => {
        /**
         * Mostrar alerta de error
         */
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar perfil',
          text: error.error.msg || 'Ocurrió un error al actualizar el perfil.'
        });
      }
    );
  };

  cambiarImagen( event: Event ) {

    const input = event.target as HTMLInputElement;

    if ( input.files && input.files.length > 0 ) {
      this.imagenSubir = input.files[0];
      // console.log( this.imagenSubir );

      if ( !input.files ) {
        return this.imgTemp = null;
      }

      const reader = new FileReader();
      reader.readAsDataURL( this.imagenSubir );

      reader.onloadend = () => {
        this.imgTemp = reader.result as string
        // console.log( reader.result );
      };
    } else {
      console.log( 'No se seleccionó ningún archivo.' );
    };




  };

  subirImagen() {

    if ( !this.usuario.uid ) {
      console.error("El ID de usuario no está definido.");
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID de usuario no está definido.'
      });
      return;
    }

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
      .then( img => {
        this.usuario.img = img;
      });
  };
}
