// Fonction pour afficher ou masquer le formulaire
function toggleForm() {
    var form = document.getElementById("eventForm");
    var button = document.getElementById("toggleButton");
    
    if (form.style.display === "none") {
      form.style.display = "block";
      //button.textContent = "Fermer";
    } else {
      form.style.display = "none";
      //button.textContent = "Ajouter";
    }
  }

// Fonction pour envoyer les données du formulaire via Ajax
function submitForm() {
//event.preventDefault();
var title = document.getElementById("title").value;
var description = document.getElementById("description").value;
var date = document.getElementById("date").value;

var xhr = new XMLHttpRequest();
xhr.open("POST", "ajouter_evenement.php", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
    // Réponse du serveur
    console.log(xhr.responseText);
    }
};
xhr.send("title=" + encodeURIComponent(title) + "&description=" + encodeURIComponent(description) + "&date=" + encodeURIComponent(date));
}

// Création du bouton "Ajouter"
var addButton = document.createElement("button");
addButton.textContent = "Ajouter";
addButton.addEventListener("click", toggleForm);

// Insertion du bouton dans le div avec l'ID "boutonAjoutEvent"
var container = document.getElementById("boutonAjoutEvent");
container.appendChild(addButton);

// Création du formulaire
var form = document.createElement("form");
form.id = "eventForm";
form.style.display = "none";

// Champ de saisie du titre
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
submitButton.textContent = "Poster";
submitButton.addEventListener("click", submitForm);

// Ajout des éléments au formulaire
form.appendChild(titleLabel);
form.appendChild(document.createElement("br"));
form.appendChild(descriptionLabel);
form.appendChild(document.createElement("br"));
form.appendChild(dateLabel);
form.appendChild(document.createElement("br"));
form.appendChild(submitButton);

// Insertion du formulaire dans le div avec l'ID "boutonAjoutEvent"
container.appendChild(form);
