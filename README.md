# Adminpro - Médicos

## Creación del Proyecto

```sh
ng new <nombre de la aplicación> --standalone false
```

## Creación de repositorio en GitHub

```sh
git remote add origin git@<tu-proyecto-git>
git branch -M main
git push -u origin main
```

## Proyecto AdminPro - Médicos

Para agregar las carpetas `environments` y los archivos `environment.prod.ts` y `environment.ts` en un proyecto de Angular, puedes usar la línea de comandos. Aquí tienes una guía paso a paso:

### 1. Crear la carpeta `environments` y los archivos `environment.ts` y `environment.prod.ts`

Abre tu terminal y navega al directorio raíz de tu proyecto Angular. Luego, crea la carpeta y los archivos con los siguientes comandos:

```sh
mkdir -p src/environments
touch src/environments/environment.ts
touch src/environments/environment.prod.ts
```

### 2. Agregar contenido básico a los archivos de entorno

Después de crear los archivos, agrega contenido básico a cada archivo. Puedes hacer esto utilizando la línea de comandos o abriendo los archivos en un editor de texto.

**Agregar contenido a `environment.ts`**:

```sh
echo "export const environment = {
  production: false
};" > src/environments/environment.ts
```

**Agregar contenido a `environment.prod.ts`**:

```sh
echo "export const environment = {
  production: true
};" > src/environments/environment.prod.ts
```

### 3. Configurar Angular CLI para usar los archivos de entorno

Asegúrate de que tu proyecto Angular esté configurado para utilizar los archivos de entorno al compilar. Abre el archivo `angular.json` y verifica que las configuraciones para `fileReplacements` estén presentes en las secciones de `build` y `serve`:

```json
{
  ...
  "projects": {
    "your-project-name": {
      ...
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              ...
            }
          }
        },
        "serve": {
          "configurations": {
            "production": {
              "browserTarget": "your-project-name:build:production"
            }
          }
        }
      }
    }
  }
}
```

Reemplaza `your-project-name` con el nombre de tu proyecto tal como está definido en el archivo `angular.json`.

### Resumen de Comandos

```sh
# Navegar al directorio del proyecto
cd tu-proyecto-angular

# Crear la carpeta environments y los archivos de entorno
mkdir -p src/environments
touch src/environments/environment.ts
touch src/environments/environment.prod.ts

# Agregar contenido a environment.ts
echo "export const environment = {
  production: false
};" > src/environments/environment.ts

# Agregar contenido a environment.prod.ts
echo "export const environment = {
  production: true
};" > src/environments/environment.prod.ts
```

---

## Creación de componentes, módulos, services, guard, pipe y build

- **Auth**

```sh
ng g c auth/login --skip-test -s
ng g c auth/register --skip-tests -s
```

- **Pages**

```sh
ng g c pages/nopagefound --skip-tests -s
ng g c pages/dashboard --skip-tests -s
ng g c pages/progress --skip-tests -s
ng g c pages/grafica1 --skip-tests -s
ng g c pages/pages --flat --skip-tests -s
ng g c pages/accountSettings --skip-tests -s
ng g c pages/promesas --skip-tests -s
ng g c pages/rxjs --skip-tests -s
ng g c pages/perfil --skip-tests -s
ng g c pages/mantenimientos/usuarios --skip-tests -s
ng g c pages/mantenimientos/hospitales --skip-tests -s
ng g c pages/mantenimientos/medicos --skip-tests -s
ng g c pages/mantenimientos/medicos/medico --skip-tests -s --flat
ng g c pages/busqueda --skip-tests -s
```

- **Shared**

```sh
ng g c shared/breadcrumbsC --skip-tests -s
ng g c shared/sidebar --skip-tests -s
ng g c shared/header --skip-tests -s
```

- **Módulos**

```sh
ng g m pages/pages --flat
ng g m shared/shared --flat
ng g m auth/auth --flat
ng g m components/components --flat
ng g m pipes/pipes --flat
ng g m pages/childRoutes --flat
```

- **Components**

```sh
ng g c components/incrementador --skip-tests -s
ng g c components/dona --skip-tests -s
ng g c components/modalImagen --skip-tests -s
```

- **Services**

```sh
ng g s services/settings --skip-tests
ng g s services/sidebar --skip-tests
ng g s services/usuario --skip-tests
ng g s services/fileUpload --skip-tests
ng g s services/busquedas --skip-tests
ng g s services/modalImagen --skip-tests
ng g s services/hospital --skip-tests
ng g s services/medico --skip-tests
```

- **Guards**

```sh
ng g g guards/auth --skip-tests
ng g g guards/admin --skip-tests
```

- **Pipe**

```sh
ng g p pipes/imagen --skip-tests
```

- **Build**

```sh
ng build --configuration production
```

## Creacion y eliminación de tag

- Confirmar tag

```sh
git tag 
```

- Desplegar a GitHub

```sh
git push --tags
```

- Eliminar un tag localmente

```sh
git tag -d <version-del-tag>
```

- Eliminar un tag del repositorio remoto en GitHub

```sh
git push origin --delete <version-del-tag>
```

## Creación de Release en GitHub

```sh
git tag -a v1.0.0 -m "Diseño Listo"
```

- Uso del template administrativo
- Código fuente del template
- Uso de librerías externas
- Creación de los primeros componentes
- Separar el Login del template administrativo, ya que tienen estructuras diferentes
- Animaciones por CSS
- Respaldos en GitHub
- Preparar el proyecto que usaremos a lo largo del curso

```sh
git tag -a v1.5.0 -m "Rutas Listas"
```

- Crear un módulo personalizado
- Crear rutas hijas

```sh
git tag -a v1.6.0 -m "@Inputs, @Outputs y Gráficos"
```

- Outputs, Inputs y ViewChild
- Atributos personalizados
- Componente re utilizable con una funcionalidad en especifico
- Referencias a elementos HTML
- Tips de JavaScript puro: colocar el foco en elementos
- Uso de gráficas como componentes personalizados

```sh
git tag -a v1.7.0 -m "Servicios básicos, temas, rutas básicas y persistenciade los ajustes"
```

- Módulo para agrupar todos los servicios
- Ejecutar scripts en archivos de JavaScript puros, en TypeScript
- LocalStorage
- Cambiar CSS de forma dinámica
- Crear un componente para los ajustes del tema
- Tips de JavaScript que se pueden usar en TypeScript
- Preparar el servicio del Sidebar, el cual usaremos más adelante para crear nuestro menú dinámico en base a las respuestas de nuestro backend server

```sh
git tag -a v1.8.0 -m "Observables y Promesas"
```

- Promesas y funciones que retornan promesas
- Crear un observable manualmente
- Operadores de los observables como:
  - Retry
  - Map
  - Filter
  - Next
- Funciones que retornan observables
- Componente de seguimiento de la página actual
- Observables para leer parámetros de configuración de las rutas que son diferentes a los parámetros de las rutas por url
- Cambiar los metatags dependiendo de la página donde nos encontremos
- Cambiar el titulo de la página actual

```sh
git tag -a v1.14.0 -m "Implementar el login y registro de usuarios en el Frontend"
```

- Conectar el Front-end con el Back-end (login)
- Usar Sweet Alert para mostrar mensajes
- Login normal de usuario
- Login de Google
- LocalStorage para almacenar tokens
- Protección básica de rutas
- Logout

```sh
git tag -a v1.15.0 -m "Perfil de Usuario, Subida de fotografía"
```

- Subida de imagen desde el Front-end hasta el Back-end
- Crear el componente del perfil del usuario
- Notificar actualización de imagen
- Vista previa de la imagen seleccionada en tiempo real (sin subirla al backend)

```sh
git tag -a v1.16.0 -m "Mantenimiento de Usuarios y modal de carga de imágenes"
```

- Crear componente de usuarios
- Búsqueda de usuarios
- Borrar usuario
- Actualizar Rol del usuario
- Crear un modal para la subida de la imagen
- Emitir notificaciones de cambio en imagenes

```sh
git tag -a v1.17.0 -m "Médicos y Hospitales"
```

- Explicación de la tarea
- Documentos de la tarea
- Detalles sobre el pipe de las imagenes
- Resolución de la tarea
- Componente de Médico y Médicos
- Borrar médicos
- Crear nuevo médico
- Mostrar información en base a una selección de un hospital
- Cargar médico
- Actualizar registro de un médico

```sh
git tag -a v1.18.0 -m "Buscador, servicios del menú y AdminGuard"
```

- Componente de búsqueda global
- Menú del lado del servidor
- AdminGuard - Un guard para verificar si es administrador
- Recuperar información del TOKEN desde el front-end sin comunicación intermedia
- Manejo de errores

```sh
git tag -a v2.0.0 -m "Producción lista"
```

- Lazyload
- Función para renovar el token
- Guard de renovación de token
- Leer el token localmente sin comunicación con el servidor
- Optimizar el tiempo de renovación de token
- Resolver problema con las imágenes mal ubicadas en la versión de distribución
- Crear la versión de distribución

---
