# Capitals Game

Puedes probar el juego **[AQUÍ](https://jjmontalban.github.io/capitalsGame/)**.

Capitals Game es un juego interactivo en JavaScript, totalmente responsive, que funciona en navegadores de escritorio y móviles.

## Descripción del Juego

El jugador verá un mapa sin calles ni ciudades, mostrando solo las fronteras de los países. El objetivo es localizar correctamente las ciudades mencionadas en el mapa. Después de colocar el marcador en el mapa, el juego mostrará la ubicación correcta de la ciudad y la diferencia en kilómetros entre la posición del jugador y la ciudad real. Si la selección está a menos de 50 km de la ciudad, se considerará "correcta".

## Cómo Jugar

1. **Lista de Ciudades**: El juego utiliza un archivo JSON que contiene una lista de ciudades con sus coordenadas de latitud y longitud. 
2. **Coloca el Marcador**: Intenta localizar cada ciudad en el mapa y coloca un marcador en la posición que creas correcta.
3. **Resultado**: El juego te mostrará la distancia en kilómetros entre tu marcador y la ubicación real de la ciudad.
4. **Puntuación**: Si tu marcador está a menos de 50 km de la ciudad, se considerará un buen intento.

## Lógica del Juego

- El jugador comienza con una puntuación inicial de **5000 kilómetros**.
- En cada ronda, la diferencia en kilómetros entre la ciudad real y tu marcador se resta de tu puntuación total.
- El objetivo es mantener la mayor cantidad de kilómetros posible mientras encuentras las ciudades.

## Fin del Juego

- El juego termina cuando te quedas sin kilómetros.
- Tu puntuación final será la cantidad de ciudades que has logrado encontrar correctamente o la cantidad de kilómetros que te quedan al final del juego.

## Construido con 🛠️

- **HTML5**: Para la estructura del juego.
- **CSS3**: Para el diseño responsive en varios dispositivos.
- **JavaScript**: Para la lógica del juego y la integración con Google Maps.
- **Google Maps API**: Para la funcionalidad del mapa interactivo.
- **Fetch API**: Para la carga dinámica del archivo JSON con las ciudades y coordenadas.

## Licencia 📄

Este proyecto es de código abierto bajo la [Licencia MIT](https://opensource.org/licenses/MIT).

## Agradecimientos 🎁

* Dale una estrella a este proyecto