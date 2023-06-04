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
    document.getElementById('photoProfil').src = 'photo_profil/' + photoProfil;
    document.getElementById('photoFond').src = 'image_fond/' + imageFond;
    document.getElementById('description').textContent = description;
  } else {
    // Les données de session n'existent pas ou ont expiré
    console.log('Aucune donnée de session trouvée');
  }
});


// Retour au réseau
function retourReseau() {
  // Supprimez la classe 'active' de tous les éléments li
  $('.navHeader ul li').removeClass('active');

  // Ajouter la classe active à l'élément <a> avec l'ID "vous"
  var elements = document.getElementsByTagName('a');
  var reseauLink = null;
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].getAttribute('href') === 'reseau') {
      reseauLink = elements[i];
      break;
    }
  }

  // Ajoutez la classe 'active' à l'élément li cliqué
  $(reseauLink).parent('li').addClass('active');
  var targetHref = $(reseauLink).attr('href');
  $('#general').load(targetHref + '.html');
  
}

// Attacher un gestionnaire d'événement au bouton
var boutonRetour = document.getElementById("buttonBack");
boutonRetour.addEventListener("click", retourReseau);

// Ajouter en ami
function AjouterAmi() {
  var profilData = sessionStorage.getItem('profilData');

  // Vérifier si les données existent
  if (profilData) {
    // Convertir les données de session en objet JavaScript
    var data = JSON.parse(profilData);
    var email = data.mail;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = xhr.responseText;
          var estAbonne = response;


          // Faites ce que vous souhaitez avec le booléen estAbonne
          if (estAbonne === "true") {
            desabonnement(); // Appeler la fonction "desabonnement"
          } else {
            abonnement(); // Appeler la fonction "abonnement"
          }


        } else {
          console.error("Erreur lors de la requête AJAX :", xhr.status);
        }
      }
    };

    // Effectuer une requête AJAX GET vers le script PHP en incluant l'e-mail cible dans l'URL
    xhr.open('GET', 'est_abonne.php?email_cible=' + encodeURIComponent(email));
    xhr.send();
  } else {
    // Les données de session n'existent pas ou ont expiré
    console.log('Aucune donnée de session trouvée');
  }
}

// Affichage du bouton ajouter en ami
function AfficherBoutonAmi() {
  var bouton = document.getElementById("buttonFriend");
  var profilData = sessionStorage.getItem('profilData');

  // Vérifier si les données existent
  if (profilData) {
    // Convertir les données de session en objet JavaScript
    var data = JSON.parse(profilData);
    email = data.mail;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = xhr.responseText;
          var estAbonne = response;


          // Faites ce que vous souhaitez avec le booléen estAbonne
          if (estAbonne === "true") {
            // Ajouter la classe "est_ami" au bouton
            bouton.classList.add("est_ami");
            bouton.textContent = "Abonné";
          } else {
            // Supprimer la classe "est_ami" du bouton
            bouton.classList.remove("est_ami");
            bouton.textContent = "S'abonner";
          }
        } else {
          console.error("Erreur lors de la requête AJAX :", xhr.status);
        }
      }
    };

    // Effectuer une requête AJAX GET vers le script PHP en incluant l'e-mail cible dans l'URL
    xhr.open('GET', 'est_abonne.php?email_cible=' + encodeURIComponent(email));
    xhr.send();
  } else {
    // Les données de session n'existent pas ou ont expiré
    console.log('Aucune donnée de session trouvée');
  }
}


// Désabonnement
function desabonnement() {
  var profilData = sessionStorage.getItem('profilData');

  // Vérifier si les données existent
  if (profilData) {
    // Convertir les données de session en objet JavaScript
    var data = JSON.parse(profilData);
    var email = data.mail;

    // Créer un objet FormData pour envoyer les données
    var formData = new FormData();
    formData.append('email', email);

    // Créer une requête AJAX
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Traitement de la réponse du script PHP en cas de succès
          var response = xhr.responseText;
          console.log(response);
        } else {
          // Traitement de la réponse du script PHP en cas d'erreur
          console.error('Erreur lors du désabonnement :', xhr.status);
        }
      }
    };

    // Envoyer la requête AJAX POST vers le fichier PHP avec les données de l'e-mail
    xhr.open('POST', 'desabonnement.php');
    xhr.send(formData);
  } else {
    // Les données de session n'existent pas ou ont expiré
    console.log('Aucune donnée de session trouvée');
  }
}


// Abonnement
function abonnement(email) {
  var profilData = sessionStorage.getItem('profilData');

  // Vérifier si les données existent
  if (profilData) {
    // Convertir les données de session en objet JavaScript
    var data = JSON.parse(profilData);
    var email = data.mail;

    // Créer un objet FormData pour envoyer les données
    var formData = new FormData();
    formData.append('email', email);
  
    // Créer une requête AJAX
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Traitement de la réponse du script PHP en cas de succès
          console.log('Abonnement réussi');
        } else {
          // Traitement de la réponse du script PHP en cas d'erreur
          console.error('Erreur lors de l\'abonnement :', xhr.status);
        }
      }
    };
  
    // Envoyer la requête AJAX POST vers le fichier PHP avec les données de l'e-mail
    xhr.open('POST', 'abonnement.php');
    xhr.send(formData);
  }else {
    // Les données de session n'existent pas ou ont expiré
    console.log('Aucune donnée de session trouvée');
  }
}



// Attacher un gestionnaire d'événement au bouton
var bouton = document.getElementById("buttonFriend");
bouton.addEventListener("click", AjouterAmi);
