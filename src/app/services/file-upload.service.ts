import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  /**
  * @name actualizarFoto
  * @description Este método se encarga de subir un archivo de imagen al servidor para un usuario, médico o hospital específico.
  * Utiliza el método HTTP PUT para enviar el archivo al endpoint correspondiente, incluyendo un token de autenticación en los headers.
  * Si la subida es exitosa, devuelve el nombre del archivo; en caso contrario, devuelve false y muestra un mensaje de error en la consola.
  * @param arcchivo - El archivo de imagen que se desea subir.
  * @param tipo - Tipo de entidad a la que pertenece la imagen (puede ser 'usuarios', 'medicos' o 'hospitales').
  * @param id - ID del usuario, médico o hospital para el que se está actualizando la imagen.
  * @returns - Devuelve el nombre del archivo subido si la operación es exitosa; de lo contrario, devuelve false.
  */
  async actualizarFoto(
    arcchivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string,
  ) {

    try {
      const url = `${ base_url }/upload/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append( 'imagen', arcchivo );

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem( 'token' ) || '',
        },
        body: formData,
      });

      const data = await resp.json();
      
      if ( data.ok ) {
        return data.nombreArchivo;
      } else {
        console.error( data.msg );
        return false;
      };

    } catch ( error ) {
      console.log( error );
      return false;
    };
  };
}
