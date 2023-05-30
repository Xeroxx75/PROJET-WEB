

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

  // Chargez le contenu de la page cible via une requête AJAX
});