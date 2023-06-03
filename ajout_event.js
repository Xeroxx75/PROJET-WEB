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
      if (response === "false"){
        console.log("Erreur");
      }
      else {
        loadUserEvents();
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


document.getElementById('btn_ajout').addEventListener("click", toggleForm);
