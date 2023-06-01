function loadUserEvents() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var events = JSON.parse(xhr.responseText);

                // Vérifier si des événements ont été récupérés
                if (events.length === 0) {
                    // Aucun événement trouvé, afficher le message approprié
                    var eventContainer = document.getElementById('evenement_reseau');
                    eventContainer.innerHTML = "<div>Aucun événement trouvé.</div>";
                } else {
                    // Afficher les événements récupérés
                    var eventContainer = document.getElementById('evenement_reseau');
                    eventContainer.innerHTML = ""; // Vider le conteneur des événements précédents

                    for (var i = 0; i < events.length; i++) {
                        var event = events[i];

                        var eventDiv = document.createElement('div');

                        var eventTitleElement = document.createElement('div');
                        eventTitleElement.textContent = event.nom_evenement;
                        eventDiv.appendChild(eventTitleElement);

                        var eventImageElement = document.createElement('img');
                        eventImageElement.src = event.images[0] || ''; // Définissez une image par défaut ou laissez la source vide
                        eventImageElement.style.display = eventImageElement.src ? 'block' : 'none'; // Masquez l'élément si aucune image n'est disponible
                        eventDiv.appendChild(eventImageElement);

                        var eventDescriptionElement = document.createElement('div');
                        eventDescriptionElement.innerHTML = '<h3>' + "Description de l'événement :" + '</h3>' + event.description;
                        eventDiv.appendChild(eventDescriptionElement);

                        eventContainer.appendChild(eventDiv);
                    }
                }
            } else {
                console.error('Erreur de la requête : ' + xhr.status);
            }
        }
    };

    xhr.open('GET', 'accueil_user.php', true);
    xhr.send();
}

loadUserEvents();
