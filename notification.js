
var emploisContainer = document.getElementById('DerniereOffre');
$(document).ready(function() {
    $.ajax({
      url: 'notifEmploi.php',
      type: 'GET',
      success: function(response) {

            var emploiTitre = document.createElement('h3');
            emploiTitre.textContent = `Titre : ${response.titre}`;

            var datePublication = document.createElement('p');
            datePublication.textContent = `Date de publication : ${response.date_publication}`;

            var auteurOffreMail = document.createElement('p');
            auteurOffreMail.textContent = `Auteur de l'offre (email) : ${response.auteur_offre_mail}`;

            var dateEmbauche = document.createElement('p');
            dateEmbauche.textContent = `Date d'embauche : ${response.date_embauche}`;

            var duree = document.createElement('p');
            duree.textContent = `Durée : ${response.duree}`;

            var contrat = document.createElement('p');
            contrat.textContent = `Contrat : ${response.contrat}`;

            var description = document.createElement('p');
            description.textContent = `Description : ${response.description}`;

            var remuneration = document.createElement('p');
            remuneration.textContent = `Rémunération : ${response.remuneration}`;

            var lieu = document.createElement('p');
            lieu.textContent = `Lieu : ${response.lieu}`;

            emploisContainer.appendChild(emploiTitre);
            emploisContainer.appendChild(datePublication);
            emploisContainer.appendChild(auteurOffreMail);
            emploisContainer.appendChild(dateEmbauche);
            emploisContainer.appendChild(duree);
            emploisContainer.appendChild(contrat);
            emploisContainer.appendChild(description);
            emploisContainer.appendChild(remuneration);
            emploisContainer.appendChild(lieu);

        
      },
      error: function(xhr, status, error) {
        // Gestion des erreurs
        console.log(error);
      }
    }); 
  });
  
////////////////////////////////////////////////////////////////////////////////  

  $(document).ready(function() {
    $.ajax({
      url: 'notifEvent.php',
      type: 'GET',
      success: function(response) {
        var event = response;
          
        
        // Vérifier si un événement a été récupéré
        if (Object.keys(event).length === 0) {
      
          //console.log(event);
          // Aucun événement trouvé, afficher le message approprié
          var eventTitleElement = document.getElementById('event-title');
          eventTitleElement.textContent = "Pas d'événement cette semaine";
          
  
          // Masquer le carrousel d'images et la description de l'événement
          document.getElementById('carousel').style.display = 'none';
          document.getElementById('DernierEvenement').style.display = 'none';
        } else {
          // Afficher l'événement récupéré
          
          
          var eventTitleElement = document.getElementById('event-title');
          eventTitleElement.textContent = event.nom_evenement;
  
          var eventDescriptionElement = document.getElementById('DernierEvenement');
          eventDescriptionElement.innerHTML = '<h3>' + "Description de l'evenement :" + '</h3>' + event.description;
  
          var slidesContainer = document.querySelector('.slides');
          slidesContainer.innerHTML = '';
  
          if (event.images[0] !== null) {
            event.images.forEach(function(image, index) {
              var imgElement = document.createElement('img');
              imgElement.src = image;
              imgElement.classList.add('slide');
              if (index === 0) {
                imgElement.style.display = 'block';
              } else {
                imgElement.style.display = 'none';
              }
              slidesContainer.appendChild(imgElement);
            });
          }
        }
      },
      error: function(xhr, status, error) {
        // Gestion des erreurs
        console.log(error);
      }
    }); 
  });

  
  var slideIndex = 1;
  showSlide(slideIndex);
  
  function changeSlide(n) {
    slideIndex += n;
    showSlide(slideIndex);
  }
  
  function showSlide(n) {
    var slides = document.getElementsByClassName("slide");
    if (slides.length === 0) {
      return; // Aucune diapositive trouvée, arrêter l'exécution de la fonction
    }
    
    if (n > slides.length) {
      slideIndex = 1;
    } else if (n < 1) {
      slideIndex = slides.length;
    } else {
      slideIndex = n;
    }
  
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
  
    slides[slideIndex - 1].style.display = "block";
    
  }
  
 ////////////////////////////////////////////////////////////////////////////////////
  $(document).ready(function() {
    $.ajax({
      url: 'notifEventAmis.php',
      type: 'GET',
      success: function(response) {
        var event = response;
        // Vérifier si des événements ont été récupérés
        if (event.length === 0) {
            // Aucun événement trouvé, afficher le message approprié
            var eventContainer = document.getElementById('DernierEvenementAmis');
            eventContainer.innerHTML = "<div>Aucun événement trouvé.</div>";
        } else {
            // Afficher les événements récupérés
            var eventContainer = document.getElementById('DernierEvenementAmis');
            eventContainer.innerHTML = ""; // Vider le conteneur des événements précédents

                var eventDiv = document.createElement('div');

                var eventTitleElement = document.createElement('div');
                eventTitleElement.textContent = event.nom_evenement;
                eventDiv.appendChild(eventTitleElement);

                // Vérifier si la photo de profil est NULL
                if (event.images[0] !== null) {
                    var eventImageElement = document.createElement('img');
                    eventImageElement.src = event.images[0];
                    eventDiv.appendChild(eventImageElement);
                }

                var eventDescriptionElement = document.createElement('div');
                eventDescriptionElement.innerHTML = '<h3>' + "Description de l\'événement :" + '</h3>' + event.description;
                eventDiv.appendChild(eventDescriptionElement);

                eventContainer.appendChild(eventDiv);
            
        }
      },
      error: function(xhr, status, error) {
        // Gestion des erreurs
        console.log(error);
      }
    }); 
  });

  ///////////////////////////////////////////////////

  $(document).ready(function() {
    $.ajax({
      url: 'notifEventAmisAmis.php',
      type: 'GET',
      success: function(response) {
        var event = response;
        // Vérifier si des événements ont été récupérés
        if (event.length === 0) {
            // Aucun événement trouvé, afficher le message approprié
            var eventContainer = document.getElementById('DernierEvenementAmisAmis');
            eventContainer.innerHTML = "<div>Aucun événement trouvé.</div>";
        } else {
            // Afficher les événements récupérés
            var eventContainer = document.getElementById('DernierEvenementAmisAmis');
            eventContainer.innerHTML = ""; // Vider le conteneur des événements précédents

                var eventDiv = document.createElement('div');

                var eventTitleElement = document.createElement('div');
                eventTitleElement.textContent = event.nom_evenement;
                eventDiv.appendChild(eventTitleElement);

                // Vérifier si la photo de profil est NULL
                if (event.images[0] !== null) {
                    var eventImageElement = document.createElement('img');
                    eventImageElement.src = event.images[0];
                    eventDiv.appendChild(eventImageElement);
                }

                var eventDescriptionElement = document.createElement('div');
                eventDescriptionElement.innerHTML = '<h3>' + "Description de l\'événement :" + '</h3>' + event.description;
                eventDiv.appendChild(eventDescriptionElement);

                eventContainer.appendChild(eventDiv);
            
        }
      },
      error: function(xhr, status, error) {
        // Gestion des erreurs
        console.log(error);
      }
    }); 
  });
  

  