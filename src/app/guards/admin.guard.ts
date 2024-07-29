import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

export const adminGuard: CanActivateFn = ( route, state ) => {

  const usuarioService = inject( UsuarioService );
  const router = inject( Router );

  // Verifica si usuario está definido
  if ( usuarioService.usuario && usuarioService.role === 'ADMIN_ROLE' ) {
    return true;
  } else {
    router.navigateByUrl( '/dashboard' );
    return false;
  }

  // Verifica el rol del usuario
  // return usuarioService.role === 'ADMIN_ROLE';
};
