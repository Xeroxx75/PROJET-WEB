$(document).ready(function() {
  // Définir la page "Accueil" comme active par défaut
  $('.navHeader ul li:first-child').addClass('active');

  // Charger le contenu de la page "Accueil"
  var currentPage = window.location.pathname.split('/').pop(); // Obtenir le nom du fichier actuel
  if (currentPage == 'admin.html') {
    $('#general').load('ajout_membre.html');
  }
  else{
    $('#general').load('accueil.html');
    sessionStorage.removeItem('profilData');

  }
  

  // Gestion du clic sur les liens de la barre de navigation
  $('.navHeader ul li a').on('click', function(e) {
  
    e.preventDefault(); // Empêche le comportement de lien par défaut
    // Supprimez la classe 'active' de tous les éléments li
    $('.navHeader ul li').removeClass('active');

    // Ajoutez la classe 'active' à l'élément li cliqué
    $(this).parent('li').addClass('active');
    // Récupérez l'attribut href du lien cliqué
    var targetHref = $(this).attr('href');
    $('#general').load(targetHref + '.html');
    sessionStorage.removeItem('profilData');


    // Chargez le contenu de la page cible via une requête AJAX
  });
});

