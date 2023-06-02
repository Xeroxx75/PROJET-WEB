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

    // Afficher les données dans la page membre.html
    document.getElementById('nomProfil').textContent = nom;
    document.getElementById('prenomProfil').textContent = prenom;
    document.getElementById('emailProfil').textContent = email;
    
} else {
    // Les données de session n'existent pas ou ont expiré
}

});
