  loadUserEvents();


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
            eventDiv.className = 'event';
            eventDiv.setAttribute('data-id', event.id_evenement);
            
            var eventTitleElement = document.createElement('div');
            eventTitleElement.textContent = event.nom_evenement;
            eventTitleElement.className = 'event-title';
            eventDiv.appendChild(eventTitleElement);

            var eventImageElement = document.createElement('img');
            eventImageElement.src = event.images[0];
            eventDiv.appendChild(eventImageElement);

            var eventDescriptionElement = document.createElement('div');
            eventDescriptionElement.innerHTML = '<h3>' + "Description de l'événement :" + '</h3>' + event.description;
            eventDiv.appendChild(eventDescriptionElement);

            // Appeler la fonction pour récupérer les commentaires correspondant à l'événement
            getCommentaires(event.id_evenement, eventDiv);

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




/// récupérer les commentaires correspondant à l'événement
function getCommentaires(id_evenement, eventDiv) {
  var xhr = new XMLHttpRequest();
  var idEvenement = id_evenement;

  xhr.onreadystatechange = function() {

    if (xhr.readyState === 4 && xhr.status === 200) {

      if (xhr.responseText === 'error') {

        // Une erreur est survenue lors de l'exécution de la requête
        return;
      } else {
        var data = JSON.parse(xhr.responseText);

        // Les données ont été récupérées avec succès
        var commentairesContainer = document.createElement('div'); // Conteneur des commentaires
        var titreSection = document.createElement('h3');
        titreSection.textContent = 'Commentaires :';

        if (data.length > 0) {
          commentairesContainer.appendChild(titreSection);
        }

        for (var i = 0; i < data.length; i++) {
          var commentaire = data[i].texte;
          var auteurNom = data[i].nom;
          var auteurPrenom = data[i].prenom;

          // Créez les éléments HTML pour afficher les informations du commentaire
          var commentaireElement = document.createElement('div');
          commentaireElement.className = 'commentaire';
          commentaireElement.textContent = commentaire;

          var auteurElement = document.createElement('div');
          auteurElement.className = 'auteur';
          auteurElement.textContent = auteurNom + ' ' + auteurPrenom;

          // Ajoutez les éléments au conteneur des commentaires
          commentairesContainer.appendChild(auteurElement);
          commentairesContainer.appendChild(commentaireElement);
        }

        // Supprimer les anciens commentaires s'ils existent
        var existingCommentsContainer = eventDiv.querySelector('.commentaires-container');
        if (existingCommentsContainer) {
          existingCommentsContainer.remove();
        }

        // Ajoutez le conteneur des commentaires au conteneur de l'événement
        commentairesContainer.className = 'commentaires-container';
        eventDiv.appendChild(commentairesContainer);

        // Créez le bouton d'ajout de commentaire
        var ajouterCommentaireButton = document.createElement('button');
        ajouterCommentaireButton.className = 'buttonCommentaire';
        ajouterCommentaireButton.textContent = 'Ajouter un commentaire';
        ajouterCommentaireButton.addEventListener('click', function() {
          // Afficher le formulaire pour ajouter un commentaire
          showCommentForm(eventDiv, idEvenement);
        });

        // Ajoutez le bouton au conteneur de l'événement
        eventDiv.appendChild(ajouterCommentaireButton);
      }
    } else {
      // Une erreur s'est produite lors de la récupération des données
      //console.log("Erreur lors de la récupération des commentaires. Statut : " + xhr.status);
    }
  };

  xhr.open('GET', 'accueil_recup_com.php?id_evenement=' + idEvenement, true);
  xhr.send();
}





// Afficher le formulaire pour ajouter un commentaire
function showCommentForm(eventDiv, idEvenement) {
  // Vérifier si le formulaire est déjà ouvert
  var commentForm = eventDiv.querySelector('.comment-form');
  if (commentForm && commentForm.style.display !== 'none') {
    // Le formulaire est déjà ouvert, le fermer
    hideCommentForm();
    return;
  }

  // Créez le formulaire pour ajouter un commentaire
  commentForm = document.createElement('form');
  commentForm.className = 'comment-form comment-form-visible'; // Ajouter la classe "comment-form-visible"

  var commentInput = document.createElement('textarea');
  commentInput.className = 'comment-input';
  commentInput.placeholder = 'Entrez votre commentaire ici';
  commentForm.appendChild(commentInput);

  var submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.className = 'buttonEnvoyerCommentaire';
  submitButton.textContent = 'Ajouter';
  submitButton.addEventListener('click', function() {
    var commentaireText = commentInput.value;

    // Vérifiez si le commentaire n'est pas vide
    if (commentaireText.trim() !== '') {
      // Envoyer le commentaire au serveur
      addComment(idEvenement, commentaireText);
    }

    // Réinitialiser le champ de saisie du commentaire
    commentInput.value = '';
  });
  commentForm.appendChild(submitButton);

  // Ajoutez le formulaire au conteneur de l'événement
  eventDiv.appendChild(commentForm);
}



// Envoyer le commentaire au serveur
function addComment(idEvenement, commentaireText) {
  // Effectuer une requête POST au serveur pour ajouter le commentaire
  var xhr = new XMLHttpRequest();

  // Paramètres à envoyer au serveur (id de l'événement et texte du commentaire)
  var params = 'id_evenement=' + encodeURIComponent(idEvenement) + '&commentaire=' + encodeURIComponent(commentaireText);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Le commentaire a été ajouté avec succès
        //console.log('Le commentaire a été ajouté');
        //console.log(params);
        // Mettre à jour l'affichage des commentaires
        updateCommentsDisplay(idEvenement);
        // Fermer le formulaire
        hideCommentForm();
      } else {
        // Une erreur s'est produite lors de l'ajout du commentaire
        console.error('Erreur lors de l\'ajout du commentaire : ' + xhr.status);
      }
    }
  };

  xhr.open('POST', 'ajouter_com.php', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);
}


function hideCommentForm() {
  var commentForm = document.querySelector('.comment-form-visible'); // Utiliser la classe "comment-form-visible"
  if (commentForm) {
    commentForm.style.display = 'none';
    commentForm.classList.remove('comment-form-visible'); // Supprimer la classe "comment-form-visible"
  }
}


// Mettre à jour l'affichage des commentaires pour un événement donné
function updateCommentsDisplay(idEvenement) {
  // Récupérer le conteneur de l'événement correspondant à son ID
  var eventContainer = document.getElementById('evenement_reseau');
  var eventDiv = eventContainer.querySelector('[data-id="' + idEvenement + '"]');

  if (eventDiv) {
    // Supprimer les commentaires existants
    var commentairesContainer = eventDiv.querySelector('.commentaires-container');
    if (commentairesContainer) {
      commentairesContainer.innerHTML = '';
    }

    // Supprimer le premier bouton "Ajouter un commentaire" s'il existe
    var ajouterCommentaireButton = eventDiv.querySelector('.buttonCommentaire');
    if (ajouterCommentaireButton) {
      ajouterCommentaireButton.remove();
    }

    // Appeler la fonction pour récupérer les commentaires correspondant à l'événement
    getCommentaires(idEvenement, eventDiv, commentairesContainer);
  }
}


function addCommentEmpty(idEvenement) {

    var id_evenement= idEvenement-'\r\n';
    var commentaire= "";
    var auteur= "auteur_fantome";


  // Paramètres à envoyer au serveur (id de l'événement et texte du commentaire)
  var params = 'id_evenement=' + encodeURIComponent(id_evenement) + '&commentaire=' + encodeURIComponent(commentaire)+ '&auteur=' + encodeURIComponent(auteur);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Le commentaire a été ajouté avec succès
        //console.log('Le commentaire a été ajouté');
        //console.log(params);
        // Mettre à jour l'affichage des commentaires
        updateCommentsDisplay(idEvenement);
        // Fermer le formulaire
        hideCommentForm();
      } else {
        // Une erreur s'est produite lors de l'ajout du commentaire
        console.error('Erreur lors de l\'ajout du commentaire : ' + xhr.status);
      }
    }
  };

  xhr.open('POST', 'ajouter_com_vide.php', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);
}


