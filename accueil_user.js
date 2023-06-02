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
                        //console.log(event);
                        var eventDiv = document.createElement('div');
                        eventDiv.className = 'event';

                        var eventTitleElement = document.createElement('div');
                        eventTitleElement.textContent = event.nom_evenement;
                        eventTitleElement.className = 'event-title';
                        eventDiv.appendChild(eventTitleElement);

                        // Vérifier si la photo de profil est NULL
                        if (event.images[0] !== null) {
                            var eventImageElement = document.createElement('img');
                            eventImageElement.src = event.images[0];
                            eventDiv.appendChild(eventImageElement);
                        }

                        var eventDescriptionElement = document.createElement('div');
                        eventDescriptionElement.innerHTML = '<h3>' + "Description de l\'événement :" + '</h3>' + event.description;
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
