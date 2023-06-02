$(document).ready(function() {
    // Récupérer les données de session
    var profilData = sessionStorage.getItem('profilData');
  
    // Vérifier si les données existent
    if (profilData) {
      // Convertir les données de session en objet JavaScript
      var data = JSON.parse(profilData);
      var nom = data.nom;
      var prenom = data.prenom;
      var email = data.mail;
      var photoProfil = data.photo_profil; // Chemin vers la photo de profil
      var imageFond = data.image_fond; // Chemin vers la photo de fond
      var description = data.description;
  
      // Afficher les données dans la page membre.html
      document.getElementById('nomProfil').textContent = nom;
      document.getElementById('prenomProfil').textContent = prenom;
      document.getElementById('emailProfil').textContent = email;
      document.getElementById('photoProfil').src = 'photo_profil/'+photoProfil;
      document.getElementById('photoFond').src = 'image_fond/'+imageFond;
      document.getElementById('description').textContent = description;
    } else {
      // Les données de session n'existent pas ou ont expiré
      console.log('Aucune donnée de session trouvée');
    }
  });
  