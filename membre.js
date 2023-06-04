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

    // Afficher le bouton ajouter en ami
    AfficherBoutonAmi();
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
  var reseauLink = $('a[href="reseau"]');
  reseauLink.parent('li').addClass('active');
  var targetHref = reseauLink.attr('href');
  $('#general').load(targetHref + '.html');
  sessionStorage.removeItem('profilData');
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
            desabonnement(email); // Appeler la fonction "desabonnement" en passant l'e-mail en argument
          } else {
            abonnement(email); // Appeler la fonction "abonnement" en passant l'e-mail en argument
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
    console.log('Aucune donnée de session trouvée');
  }
}

// Afficher le bouton Ajouter/Supprimer en ami en fonction de l'état actuel de l'abonnement
function AfficherBoutonAmi() {
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

          // Modifier l'apparence du bouton en fonction de l'état de l'abonnement
          if (estAbonne === "true") {
            /*document.getElementById('amiButton').textContent = 'Supprimer de mes amis';
            document.getElementById('amiButton').classList.remove('btn-primary');
            document.getElementById('amiButton').classList.add('btn-danger');*/
            bouton.textContent = 'Se désabonner';
            //mettre à jour la page

          } else {
            /*document.getElementById('amiButton').textContent = 'Ajouter en ami';
            document.getElementById('amiButton').classList.remove('btn-danger');
            document.getElementById('amiButton').classList.add('btn-primary');*/
            bouton.textContent = 'S\'abonner';
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
  } else {
    // Les données de session n'existent pas ou ont expiré
    console.log('Aucune donnée de session trouvée');
  }
}




// Attacher un gestionnaire d'événement au bouton
var bouton = document.getElementById("buttonFriend");
bouton.addEventListener("click", function() {
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

          // Mettre à jour l'apparence du bouton directement au clic
          if (estAbonne === "true") {
            
            desabonnement(); // Appeler la fonction "desabonnement"
            //AfficherBoutonAmi();
            bouton.textContent = 'S\'abonner';
            //mettre à jour la page

          } else {
            
            abonnement(); // Appeler la fonction "abonnement"
            //AfficherBoutonAmi();
            bouton.textContent = 'Se désabonner';
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
});
