function chargerDonnees() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {

                // Traitement des données reçues
                var startIndex = xhr.responseText.indexOf('{'); // Trouver l'index du premier '{'
                var jsonStr = xhr.responseText.substring(startIndex); // Extraire la partie JSON de la réponse
                var donnees = JSON.parse(jsonStr); // Parser la partie JSON

                
                //console.log("ICI");
                
                // Vérifiez si les abonnements sont disponibles dans la réponse
                if (donnees.abonnements) {
                    var abonnements = donnees.abonnements;

                    // Parcourir les abonnements et générer le contenu HTML
                    for (var i = 0; i < abonnements.length; i++) {
                        (function(abonnement) {
                            var nom = abonnement.nom;
                            var prenom = abonnement.prenom;
                            var photoProfil = abonnement.photo_profil;
                            var description = abonnement.description;

                        // Créer les éléments HTML pour afficher l'abonnement
                        var profilDiv = document.createElement('div');
                        profilDiv.classList.add('profil-abonnement');

                        var h3 = document.createElement('h3');
                        h3.textContent = prenom + ' ' + nom;

                        var a = document.createElement('a');
                        a.href = '#';
                        a.addEventListener('click', function() {
                          loadMembres(abonnement.email);
                        });

                        var img = document.createElement('img');
                        img.src = 'photo_profil/' + photoProfil;

                        var p = document.createElement('p');
                        p.textContent = description;

                        // Ajouter l'image à l'élément <a>
                        a.appendChild(img);

                        // Ajouter les éléments au conteneur
                        profilDiv.appendChild(h3);
                        profilDiv.appendChild(a); // Ajouter le lien hypertexte au lieu de l'image directement
                        profilDiv.appendChild(p);

                        // Ajouter le conteneur à la section d'abonnements
                        var abonnementsSection = document.getElementById('abonnements');
                        abonnementsSection.appendChild(profilDiv);
                    })(abonnements[i]);
                }
                } 
                else {
                    console.error("Les abonnements sont indisponibles dans la réponse.");
                }
            } 
            else {
                console.error("Erreur de chargement des données : " + xhr.status);
            }
        }
    };

  xhr.open("GET", "reseau.php", true);
  xhr.send();
}

function loadMembres(email) {
    // Faites quelque chose avec l'e-mail de l'abonnement
    console.log(email);
}

chargerDonnees();