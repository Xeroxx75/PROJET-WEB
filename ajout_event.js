var nextEventId; // Variable globale pour stocker nextEventId

// Fonction pour afficher ou masquer le formulaire
function toggleForm() {
  var form = document.getElementById("eventForm");
  if (form.style.display === "none") {
    form.style.display = "block";
    //button.textContent = "Fermer";
  } else {
    form.style.display = "none";
    //button.textContent = "Ajouter";
  }
}

// Fonction pour envoyer les données du formulaire via Ajax
document.getElementById('eventForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  var date = document.getElementById('date').value;
  var images = document.getElementById('image').files;
  var nb_images = images.length;
  var formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('date', date);
  for (var i = 0; i < nb_images; i++) {
    formData.append('image'+i, images[i]);
  }
  formData.append('nb_images', nb_images);

  

  $.ajax({
    url: 'ajouter_evenement.php',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
      // Traitement réussi
      if (response === "false") {
        console.log("Erreur");
      } else {
        getLatestEventId();
      }
    },
    error: function() {
      // Traitement échoué
      console.log("Erreur");
    }
  });

  // Réinitialiser le formulaire si nécessaire
  document.getElementById('eventForm').reset();
  // Masquer le formulaire
  toggleForm();
});


function getLatestEventId() {
  // Création de l'objet XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // Définition de la fonction de rappel pour la réponse de la requête AJAX
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = xhr.responseText;
      var latestEventId = response;
      addCommentEmpty(latestEventId-1);
      loadUserEvents();
    }
  };

  // Envoi de la requête AJAX pour récupérer l'ID de la dernière insertion
  xhr.open("GET", "get_id_event.php", true);
  xhr.send();
}

document.getElementById('btn_ajout').addEventListener("click", toggleForm);
