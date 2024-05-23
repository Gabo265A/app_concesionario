<h1 align="center">Aplicación sobre concesionario</h1>
<p align="center"> Logo de nuestra aplicación</p>
<p align="center"><img src="https://i.ibb.co/ts5QR3Z/ic-launcher.png"/></p>

## Tabla de contenidos:

---

- [Descripción](#descripción)
- [Guía de usuario](#guía-de-usuario)
- [Guía de instalación](#guía-de-instalación)
- [Cómo contribuir](#cómo-contribuir)
- [Autor/es](#autores)

## Descripción

---

Esta es una aplicación android sobre un concesionaro. Es una aplicación que se trabajo durante 6 meses para la entrega final de construcción 5, una materia de nuestro último semestre universitario. Durante todo este tiempo buscamos hacer una aplicación con un diseño llamativo y funcional.

La aplicación esta desarrollada con el framework de react-native. Es funcional exclusivamente en sistemas operativos android, y hace uso de bases de datos no relacionales, especificamente de firebase.

## Guía de usuario

---

Durante todo el desarrollo buscamos hacer una aplicación intuitiva y fácil de usar para los usuarios, maneja diferentes válidaciones en los inputs y el control de errores con alertas personalizadas.

Para obtener la experiencia completa, lo ideal es que el usuario se registro o loguee en la aplicación.

Cada usuario puede ver el cátalogo, buscar vehículos especificos o solicitar pruebas de manejo, solicitar servicios en el taller, activar las ofertas, solicitar cotizaciones.

Para los usuarios que se logueen en la aplicación podrán ver el historial de servicios que esta vinculado con sus cuentas.

## Guía de instalación

---

En este archivo tienes una guía paso a paso para que configures todo el entorno: https://heyzine.com/flip-book/c5d86388f5.html

### Primer paso: Iniciar el servidor metro

Para iniciar **Metro** ubicate en la carpeta raíz del proyecto y ejecuta alguno de los siguientes comandos:

    ```bash
    # using npm
    npm start

    # OR using Yarn
    yarn start
    ```

### Segundo paso: Iniciar la aplicación

Cuando se inicia Metro este se ejecuta en su propia terminal. Abre otra terminal y vuelve a ubicarte en la carpeta raíz del proyecto.

Como esta aplicación solo funciona en _Android_ ejecuta el siguiente comando en esa nueva terminal:

    ```bash
    # using npm
    npm run android

    # OR using Yarn
    yarn android
    ```

Si todo salío bien, deberías ver como se ejecuta la aplicación en tu emulador de android o disposito real.

### Dependencias

En general la mayoría de librerías que usamos es para mejorar la parte gráfica de la aplicación. Usamos librerías que permite el uso de iconos personalizados y componentes ya diseñados. De igual manera nuestro proyecto utiliza librerías de firebase para permitir la conexión con la base de datos. Usamos librerías de react para permitir la navegación entre pantallas y el uso de algunas animaciones para los componentes.

Para instalar las librerías de una manera más rápida se puede usar el comando

    ```bash
    npm install
    ```

este comando instalara todas las líbrerias que se encuentran dentro del package.json

De manera más detallada estas son las líbrerias que se usaron:

    npm install react-native-gesture-handler
    npm install react-native-reanimated
    npm install @react-navigation/drawer
    npm install react-native-screens
    npm install react-native-safe-area-context
    npm install @react-navigation/native
    npm install react-native-paper
    npm install react-native-vector-icons
    npm install @react-navigation/stack
    npm install react-native-paper-dates --save
    npm install @rneui/themed @rneui/base
    npm install react-native-url-polyfill
    npm install @react-native-firebase/app
    npm install @react-native-firebase/auth
    npm install @react-native-firebase/firestore
    npm install firebase
    npm install lodash
    npm install @react-native-async-storage/async-storage

## Cómo contribuir

---

Estamos dispuestos a leer y considerar cualquier tipo de mejora que se quiera hacer al proyecto.

Para solicitar acceso escribe directamente al usuario Gabo265A.

## Autor/es

---

Gabriel Jaime Loaiza Arboleda [Gabo265A](https://github.com/Gabo265A)

Mariana Garces Palacios [mariana-pixel](https://github.com/mariana-pixel)

Juan Fernando Cano [Juancahe123](https://github.com/Juancahe123)
