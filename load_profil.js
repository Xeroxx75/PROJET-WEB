function chargement_profil() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'load_profil.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Réponse du serveur
            var response = JSON.parse(xhr.responseText);
            var global = response[0]; // Contient toutes les informations du profil sauf nb abonnes et nb abonnements
            var nb_abonnenement = response[1]['nombre_abonnements'];
            var nb_abonne = response[2]['nombre_abonnes'];

            // Sélectionner la div par son ID
            // Lien des images
            var imageLinks = ['image_fond/'+global['image_fond'], 'photo_profil/'+global['photo_profil']];
            var id = ["fond", "pp"];

            // Sélectionner le conteneur parent
            var imageContainer = document.getElementById("info_profil");

            // Parcourir les liens des images
            for (var i = 0; i < imageLinks.length; i++) {
              // Créer un nouvel élément <img>
              var imgElement = document.createElement("img");

              // Définir le lien source de l'image
              imgElement.src = imageLinks[i];
              imgElement.id = id[i];

              // Ajouter l'image au conteneur parent
              imageContainer.appendChild(imgElement);
            }

            //paragraphe biographie
            var parentElement = document.getElementById("info_profil");
            var newparaph = document.createElement("p");
            for (var key in global) {
                if (global[key] === '/') {
                    global[key] = 'non renseigné';
                }
              }
              


            newparaph.textContent = global['prenom'] +" " + global['nom'] +"  "+ " Abonnes : " + nb_abonne +" "+"Abonnements : " + nb_abonnenement + " " +global['description']+" "+ global['lieu_travail'];
            newparaph.setAttribute("id", "bio");
            parentElement.appendChild(newparaph);

            //var formation = response['formations'] ? response['formations'].match(/\b\w+\b/g) : null;
            var formation = global['formations'].split("|").map(function(item){
                return item.trim();
            })
            const tableau_formation = [];
            if ((formation === null) || (formation === "Pas renseigné")){
                console.log("formation null");
                formation = [];
                document.getElementById("formations").style.border="none";
            }
            var texteElement = document.getElementById('titre_form');
            var lienElement = document.getElementById('lien_form');
            // Vérifier si la valeur de nbLigne est égale à 0
            if (formation.length === 0) {
              // Supprimer le texte en définissant le contenu de l'élément sur une chaîne vide
              texteElement.textContent = '';
              lienElement.textContent='';
            }
            if (formation.length !== 0) {
                const nb_mots_ligne = 4; // Nombre de mots par ligne
                for (let i = 0; i < formation.length; i += nb_mots_ligne) {
                    tableau_formation.push(formation.slice(i, i + nb_mots_ligne));
                }

                var r = document.querySelector(':root');
                r.style.setProperty('--nb_ligne_formation', tableau_formation.length);

                var container = document.getElementById("lien_img"); // Conteneur pour les images
                container.innerHTML = ""; // Réinitialiser le contenu
                for (var i = 0; i < tableau_formation.length; i++) {
                    var lien = tableau_formation[i][0];
                    var imgElement = document.createElement("img"); // Créer une nouvelle balise <img>
                    imgElement.src = lien; // Définir le lien source de l'image
                    container.appendChild(imgElement); // Ajouter l'image au conteneur
                    for (var j = 1; j < 4; j++) {
                      document.getElementById("info_form").innerHTML += " " + tableau_formation[i][j] + " ";
                    }
                    document.getElementById("info_form").innerHTML += "<br><hr>";
                    container.innerHTML += "<br>"; // Ajouter une balise <br> pour un saut de ligne
                }
            }
            var projet = global['projets'] ? global['projets'].match(/\b\w+\b/g) : null;
            const tableau_projet = [];
            if (projet === null) {
                projet = [];
            }
            var texteElement_projet = document.getElementById('titre_projets');
            var lienElement_projet = document.getElementById('lien_projets');
            // Vérifier si la valeur de nbLigne est égale à 0
            if (projet.length === 0) {
              // Supprimer le texte en définissant le contenu de l'élément sur une chaîne vide
              texteElement_projet.textContent = '';
              lienElement_projet.textContent='';
              document.getElementById("projets").style.border="none";
            }
            if (projet.length !== 0) {
                const nb_mots_ligne_projet = 5; // Nombre de mots par ligne
                for (let i = 0; i < projet.length; i += nb_mots_ligne_projet) {
                    tableau_projet.push(projet.slice(i, i + nb_mots_ligne_projet));
                }
                r.style.setProperty('--nb_ligne_projet', tableau_projet.length);
            }
        }
    };
    xhr.send();
}

if (document.getElementById("general").style.display === "none") {
    chargement_profil();
}

document.getElementById('loginForm').addEventListener('submit', chargement_profil());

console.log("chargement profil");
