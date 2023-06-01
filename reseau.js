function chargerDonnees() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {

                // Traitement des données reçues
                var startIndex = xhr.responseText.indexOf('{'); // Trouver l'index du premier '{'
                var jsonStr = xhr.responseText.substring(startIndex); // Extraire la partie JSON de la réponse
                var donnees = JSON.parse(jsonStr); // Parser la partie JSON

                
                
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
                            getProfilData(abonnement.email); // Appel de getProfileInformation
                            // Supprimer la classe active de tous les éléments <a> de la liste
                            var navLinks = document.querySelectorAll('.navHeader ul li a');
                            for (var i = 0; i < navLinks.length; i++) {
                                navLinks[i].classList.remove('active');
                            }

                            // Ajouter la classe active à l'élément <a> avec l'ID "ghost"
                            var ghostLink = document.getElementById('ghost');
                            ghostLink.classList.add('active');
                            var targetHref = $(ghostLink).attr('href');
                            $('#general').load(targetHref + '.html');
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

function getProfilData(email) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            // Stocker les données dans le stockage local
            localStorage.setItem('profilData', JSON.stringify(data));
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.error('Erreur lors de la récupération des données du profil:', xhr.status);
        }
    };

    xhr.open('GET', 'reseau_info_membre.php?email=' + email);
    xhr.send();
}
  


chargerDonnees();