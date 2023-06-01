// Récupérer les données du stockage local
var profilData = JSON.parse(localStorage.getItem('profilData'));

// Utiliser les données récupérées
if (profilData) {
    var nom = profilData.nom;
    var prenom = profilData.prenom;

    // Afficher les données dans la page membre.html
    document.getElementById('nomProfil').textContent = nom;
    document.getElementById('prenomProfil').textContent = prenom;
}