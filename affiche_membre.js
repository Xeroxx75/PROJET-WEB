function afficherMembres() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'afficher_membre.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Réponse du serveur
            var membres = JSON.parse(xhr.responseText);
            for (i = 0; i < membres.length; i++) {
                var membre = membres[i];
                var doc_membre = document.createElement('div');
                doc_membre.innerHTML = membre['mail']
                doc_membre.classList.add('membre');
                doc_membre.id = 'membre_' + membre['mail'];
                document.getElementById('membres').appendChild(doc_membre);
                var image_membre = document.createElement('img');
                image_membre.classList.add('photo_profil');
                image_membre.src = 'photo_profil/' + membre['photo_profil'];
                document.getElementById('membre_'+membre['mail']).appendChild(image_membre);
            }
          }
        };
    xhr.send();
}

// Quand la page est chargée, on appelle la fonction afficherMembres()
$(document).ready(afficherMembres()); 



  
  
  