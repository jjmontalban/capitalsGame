let map;  // Instancia del mapa

// Inicializar el mapa
function initMap() {
    // Crear el mapa
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.924646, lng: 8.561119 },
        zoom: 3,
        styles: [
            { "elementType": "labels", "stylers": [{ "visibility": "off" }] },
            { "featureType": "road", "stylers": [{ "visibility": "off" }] }
        ]
    });
}

window.onload = function() {
    let capitals = [];
    let selectedCapitals = [];
    let km = 5000;
    let index = 0;

    // Load capitales from JSON
    fetch('capitals.json')
        .then(response => response.json())  // Convertir la respuesta en JSON
        .then(data => {
            capitals = data;
            selectedCapitals = getRandomCapitals(capitals, 5);  // 5 capitales aleatorias
            startGame();  // Iniciar el juego
        })
        .catch(error => console.error('Error cargando las ciudades:', error));

    // Seleccionar 5 capitales aleatorias
    function getRandomCapitals(capitalsArray, numberOfCapitals) {
        for (let i = capitalsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [capitalsArray[i], capitalsArray[j]] = [capitalsArray[j], capitalsArray[i]];
        }
        return capitalsArray.slice(0, numberOfCapitals);
    }

    function startGame() {
        welcomeMessage();
    }

    // Función para mostrar mensajes en el HTML
    function displayMessage(elementId, message) {
        const element = document.getElementById(elementId);
        if (message.trim()) {
            element.innerHTML = message;
            element.style.display = 'block';
        }
        
        ['result', 'city', 'distance'].forEach(id => {
            const el = document.getElementById(id);
            if (!el.innerHTML.trim()) {
                el.style.display = 'none';
            }
        });
    }
    
    // Mostrar mensaje de bienvenida con botón "Next"
    function welcomeMessage() {
        const message = `
            <p>El juego de las capitales!</p><br>
            <p>Empiezas el juego con 5000kms. Cada vez que cliques, los kilómetros entre el punto elegido y la capital a buscar se van reduciendo.</p><br>
            <p>Si te quedas sin kilómetros pierdes!</p><br>
            <p>¿Preparad@ para buscar la primera capital?</p>
            <button id="startGameBtn">Vamos!</button>
        `;
        displayMessage('popup', message);

        document.getElementById('startGameBtn').onclick = function() {
            document.getElementById('popup').style.display = 'none';
            initializeNextCapital();
        };
    }

    // Función para mostrar la siguiente capital
    function initializeNextCapital() {
        // Verificar que no se haya superado el límite de 5 capitales
        if (index < 5) {
            const cityMessage = `
                <p><strong>Localiza ${selectedCapitals[index].capitalCity}</strong></p>
                <button id="nextCapitalBtn">Ok!</button>
            `;
            displayMessage('city', cityMessage);

            document.getElementById('nextCapitalBtn').onclick = function() {
                document.getElementById('city').style.display = 'none';
                map.addListener('click', handleClick);  // Ahora el jugador puede hacer clic en el mapa
            };
        } else {
            // Si ya se han jugado 5 capitales, mostrar el mensaje final
            const finalMessage = `
                <p class="good"><strong>¡Felicidades!</strong></p>
                <p><strong>Tu puntuación es ${km} kms!</strong></p><br>
                <p>Coded by <a href="https://jjmontalban.github.io/">JJMöntabán</a></p>
            `;
            displayMessage('result', finalMessage);

            document.getElementById('distance').style.display = 'none';
            document.getElementById('city').style.display = 'none';
        }
    }

    // Función para manejar el clic en el mapa
    function handleClick(e) {
        const posA = new google.maps.LatLng(selectedCapitals[index].lat, selectedCapitals[index].long);
        const posB = e.latLng;

        // Marcar el intento y la referencia en el mapa
        new google.maps.Marker({
            position: posB,
            map: map,
            title: 'Attempt',
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        new google.maps.Marker({
            position: posA,
            map: map,
            title: 'Reference',
            animation: google.maps.Animation.DROP,
            draggable: false
        });

        // Calcular la distancia
        const distance = (google.maps.geometry.spherical.computeDistanceBetween(posA, posB) / 1000).toFixed(2);

        // Determinar si fue un buen intento
        let isGood = false;
        if (distance < 100) {
            isGood = true;
        } else {
            km -= distance;  // Reducir los km solo si la distancia es mayor a 100 kms
            km = km.toFixed(2);
        }

        const combinedMessage = `
            <p>${distance} kms. desde tu posición hasta ${selectedCapitals[index].capitalCity}!</p>
            <p class="${isGood ? 'good' : 'bad'}">${isGood ? 'Buena jugada! No tienes reducción de kms.' : `Te quedan ${km} kms!`}</p>
            <button id="nextAttemptBtn">Siguiente!</button>
        `;
        displayMessage('distance', combinedMessage);

        // Asegurar de que siempre se muestre el mensaje
        google.maps.event.clearListeners(map, 'click');

        // Espera a que el jugador presione "Next"
        document.getElementById('nextAttemptBtn').onclick = function() {
            document.getElementById('distance').style.display = 'none';
            index++;
            initializeNextCapital();  // Siguiente capital
        };

        if (km < 0) {
            // Game Over si los kilómetros se agotan
            displayMessage('result', `
                <p class="bad"><strong>Se acabaron los kilómetros!</strong></p><br>
                <p>Coded by <a href="https://jjmontalban.github.io/">JJMöntabán</a></p>
            `);

            document.getElementById('city').style.display = 'none';
            document.getElementById('distance').style.display = 'none';
            return;
        }
    }

};
