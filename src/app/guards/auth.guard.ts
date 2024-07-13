import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = ( route, state ) => {

  const usuarioService = inject( UsuarioService );
  const router = inject( Router );

  return usuarioService.validarToken().pipe(
    tap(( isAuthenticated ) => {
      if ( !isAuthenticated ) {
        router.navigateByUrl( '/login' );
      };
    })
  );

};
