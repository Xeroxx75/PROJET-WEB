
function loadEvent() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var event = JSON.parse(xhr.responseText);

        // Vérifier si un événement a été récupéré
        if (Object.keys(event).length === 0) {
          // Aucun événement trouvé, afficher le message approprié
          var eventTitleElement = document.getElementById('event-title');
          eventTitleElement.textContent = "Pas d'événement cette semaine";
          

          // Masquer le carrousel d'images et la description de l'événement
          document.getElementById('carousel').style.display = 'none';
          document.getElementById('event-description').style.display = 'none';
        } else {
          // Afficher l'événement récupéré
          var eventTitleElement = document.getElementById('event-title');
          eventTitleElement.textContent = event.nom_evenement;

          var eventDescriptionElement = document.getElementById('event-description');
          eventDescriptionElement.innerHTML = '<h3>' + "Description de l'evenement :" + '</h3>' + event.description;

          var slidesContainer = document.querySelector('.slides');
          slidesContainer.innerHTML = '';

          if (event.images && event.images.length > 0) {
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
      } else {
        console.error('Erreur de la requête : ' + xhr.status);
      }
    }
  };

  xhr.open('GET', 'accueil.php', true);
  xhr.send();
}

loadEvent();

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
