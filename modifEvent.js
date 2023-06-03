// Fonction pour afficher ou masquer le formulaire
function toggleForm2() {
    var form = document.getElementById("eventForm2");
    var button = document.getElementById("toggleButton2");
    
    if (form.style.display === "none") {
       form.innerHTML = '';
      form.style.display = "block";
      //button.textContent = "Fermer";
    getEvents();
    } else {
      form.style.display = "none";
      //button.textContent = "Ajouter";
    }
  }


// Fonction pour envoyer les données du formulaire via Ajax
function submitForm(id,title,description,date) {
event.preventDefault();

var supprimer = 0;


var xhr = new XMLHttpRequest();
xhr.open("POST", "event_recup.php", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
    location.reload()
    }
};
xhr.send("titre=" + encodeURIComponent(title) + "&description=" + encodeURIComponent(description) + "&date=" + encodeURIComponent(date) + "&supprimer=" + encodeURIComponent(supprimer) + "&id=" + encodeURIComponent(id));
}


function getEvents() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "modifEvent.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Réponse du serveur
        var response = xhr.responseText;
        
        // Convertir la réponse JSON en objet JavaScript
        var evenements = JSON.parse(response);;
        // Parcourir les événements et traiter les données
        for (var i = 0; i < evenements.length; i++) {
            (function() {  
          var evenement = evenements[i];
          

            //Champ de saisie du titre
            var titleLabel = document.createElement("label");
            titleLabel.textContent = "Titre : ";
            var titleInput = document.createElement("input");
            titleInput.value = evenement.nom_evenement;
            titleLabel.appendChild(titleInput);

            // Champ de saisie de la description
            var descriptionLabel = document.createElement("label");
            descriptionLabel.textContent = "Description : ";
            var descriptionInput = document.createElement("textarea");
            descriptionInput.value = evenement.description;
            descriptionLabel.appendChild(descriptionInput);

            //Champ de saisie de la date
            var dateLabel = document.createElement("label");
            dateLabel.textContent = "Date : ";
            var dateInput = document.createElement("input");
            dateInput.type = "date";
            dateInput.value = evenement.date_evenement;
            dateLabel.appendChild(dateInput);
            //console.log("titre=" + encodeURIComponent(titleInput.value) + "&description=" + encodeURIComponent(descriptionInput.value) + "&date=" + encodeURIComponent(dateInput.value)   + "&id=" + encodeURIComponent(evenement.id_evenement));
            // Bouton "Poster"
            var submitButton = document.createElement("button");
            submitButton.textContent = "Modifier";
            submitButton.addEventListener("click", function() {
                var title = titleInput.value;
                var description = descriptionInput.value;
                var date = dateInput.value;
                submitForm(evenement.id_evenement,title,description,date);
              });

            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';

            deleteButton.addEventListener('click', function() {
                
                event.stopPropagation();
                var updatedEvent = {
                  id: evenement.id_evenement,
                  supprimer: 1,
                  titre: evenement.nom_evenement,
                  date: evenement.date_evenement,
                  description: evenement.description
                  
                };
    
                // Effectuez une requête à votre backend pour supprimer les données dans la base de données
                $.ajax({
                  url: 'event_recup.php',
                  type: 'POST',
                  data: updatedEvent,
                  success: function(responseTEST) {
                    // Les données ont été mises à jour avec succès
                    //console.log("SUPPRIMER"+updatedEmploi.supprimer);
                    console.log('Réponse du serveur :', responseTEST);
                  },
                  error: function(error) {
                    // Erreur lors de la mise à jour des données
                    console.log(error);
                  }
                });
              });

            // Ajout des éléments au formulaire
            form.appendChild(titleLabel);
            form.appendChild(document.createElement("br"));
            form.appendChild(descriptionLabel);
            form.appendChild(document.createElement("br"));
            form.appendChild(dateLabel);
            form.appendChild(document.createElement("br"));
            form.appendChild(submitButton);
            form.appendChild(deleteButton);
          // ... Faire d'autres traitements ou affichages
        })();
        }
      }
    };
    xhr.send();
  }
  

// Création du bouton "Ajouter"
var addButton = document.createElement("button");
addButton.textContent = "Mes Events";
addButton.addEventListener("click", toggleForm2);

// Insertion du bouton dans le div avec l'ID "boutonAjoutEvent"
var container = document.getElementById("boutonAfficherEvent");
container.appendChild(addButton);

// Création du formulaire
var form = document.createElement("form");
form.id = "eventForm2";
form.style.display = "none";

/*// Champ de saisie du titre
var titleLabel = document.createElement("label");
titleLabel.textContent = "Titre : ";
var titleInput = document.createElement("input");
titleInput.type = "text";
titleInput.id = "title";
titleLabel.appendChild(titleInput);

// Champ de saisie de la description
var descriptionLabel = document.createElement("label");
descriptionLabel.textContent = "Description : ";
var descriptionInput = document.createElement("textarea");
descriptionInput.id = "description";
descriptionLabel.appendChild(descriptionInput);

//Champ de saisie de la date
var dateLabel = document.createElement("label");
dateLabel.textContent = "Date : ";
var dateInput = document.createElement("input");
dateInput.type = "date";
dateInput.id = "date";
dateLabel.appendChild(dateInput);

//Champ de saisie de l'image
var imageLabel = document.createElement("label");
imageLabel.textContent = "Image : ";
var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.id = "image";
imageLabel.appendChild(imageInput);

// Bouton "Poster"
var submitButton = document.createElement("button");
submitButton.textContent = "Modifier";
submitButton.addEventListener("click", submitForm);

// Ajout des éléments au formulaire
form.appendChild(titleLabel);
form.appendChild(document.createElement("br"));
form.appendChild(descriptionLabel);
form.appendChild(document.createElement("br"));
form.appendChild(dateLabel);
form.appendChild(document.createElement("br"));
form.appendChild(submitButton);*/

// Insertion du formulaire dans le div avec l'ID "boutonAjoutEvent"
container.appendChild(form);
