function genererCV(){
	// Sélectionnez l'élément contenant le paragraphe
	var paragraphe = document.getElementById("bio");

	// Séparez le contenu du paragraphe en utilisant l'espace comme délimiteur
	var mots = paragraphe.textContent.split(" ");

	// Récupérez le premier mot
	var prenom = mots[0];
	var nom = mots[1];
	
	// Affichez le premier mot dans la console
}