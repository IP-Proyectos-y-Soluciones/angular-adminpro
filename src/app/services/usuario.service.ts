import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interfaces';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /**
 * @name constructor
 * @description Inicializa el servicio inyectando una instancia de HttpClient, 
 * que se utiliza para realizar solicitudes HTTP.
 * @param {HttpClient} http - El cliente HTTP de Angular utilizado para enviar solicitudes HTTP al servidor.
 */
  constructor( private http: HttpClient ) { }

/**
 * @name crearUsuario
 * @description Este método envía una solicitud HTTP POST para crear un nuevo usuario en el servidor.
 * Toma los datos del formulario de registro y los envía al endpoint correspondiente de la API.
 * @param { RegisterForm } formData - Los datos del formulario de registro que contienen el nombre, correo electrónico, 
 * contraseña, confirmación de contraseña y aceptación de términos.
 * @returns { Observable<any> } - Retorna un observable que se puede suscribir para manejar la respuesta del servidor.
 */
  crearUsuario( formData: RegisterForm ) {
    return this.http.post( `${ base_url }/usuarios`, formData );
  };
}
