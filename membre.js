

$(document).ready(function() {

// Récupérer les données du stockage local
var profilData = JSON.parse(localStorage.getItem('profilData'));

// Vérifier si les données existent
if (profilData) {
    var nom = profilData.nom;
    var prenom = profilData.prenom;

    // Afficher les données dans la page membre.html
    document.getElementById('nomProfil').textContent = nom;
    document.getElementById('prenomProfil').textContent = prenom;

}

localStorage.removeItem('profilData');

});
