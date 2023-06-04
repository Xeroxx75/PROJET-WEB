function genererCV(){
	
	var paragraphe = document.getElementById("bio");
	var formation = document.getElementById("info_form");
	formation = formation.textContent.split("  ");
	var projet = document.getElementById("info_projets")
	projet = projet.textContent.split("  ");
	console.log(projet);

	// Séparez le contenu du paragraphe en utilisant l'espace comme délimiteur
	var mots = paragraphe.textContent.split(" ");

	// Récupérez le premier mot
	var prenom = mots[0];
	var nom = mots[1];


	// Création d'un document XML vide
	var xmlDoc = document.implementation.createDocument(null, "utilisateur", null);

	// Création des éléments XML et ajout des données
	var utilisateurElement = xmlDoc.documentElement;

	var nomElement = xmlDoc.createElement("nom");
	nomElement.textContent = nom;
	utilisateurElement.appendChild(nomElement);

	var prenomElement = xmlDoc.createElement("prenom");
	prenomElement.textContent = prenom;
	utilisateurElement.appendChild(prenomElement);

	var formationElement = xmlDoc.createElement("formation");
	formationElement.textContent = formation;
	utilisateurElement.appendChild(formationElement);

	var projetElement = xmlDoc.createElement("projet");
	projetElement.textContent = projet;
	utilisateurElement.appendChild(projetElement);

	// Création d'un document PDF
	var doc = new jsPDF();

	// Sérialisation du XML en une chaîne de caractères
	var serializer = new XMLSerializer();
	var xmlString = serializer.serializeToString(xmlDoc);

	// Conversion de la chaîne de caractères en un objet Blob
	var blob = new Blob([xmlString], { type: "text/xml" });

	// Enregistrement du fichier
	saveAs(blob, "fichier.xml");

	nom = xmlDoc.querySelector("nom").textContent;
  	prenom = xmlDoc.querySelector("prenom").textContent;
  	//formation = xmlDoc.querySelector("formation").textContent;
 	const tableau_formation = [];;
    // Vérifier si la valeur de nbLigne est égale à 0
    if (formation.length === 1) {
      // Supprimer le texte en définissant le contenu de l'élément sur une chaîne vide
      tableau_formation.push('aucune formation');
    }
    else if (formation.length !== 1) {
        const nb_mots_ligne = 3; // Nombre de mots par ligne
        for (let i = 0; i < formation.length; i += nb_mots_ligne) {
            tableau_formation.push(formation.slice(i, i + nb_mots_ligne));
		}
	}
	console.log(tableau_formation);

	const tableau_projet = [];;
    // Vérifier si la valeur de nbLigne est égale à 0
    if (projet.length === 1) {
      // Supprimer le texte en définissant le contenu de l'élément sur une chaîne vide
      tableau_projet.push("aucun projet");
    }
    else if (projet.length !== 1) {
        const nb_mots_ligne_projet = 4; // Nombre de mots par ligne
        for (let i = 0; i < projet.length; i += nb_mots_ligne_projet) {
            tableau_projet.push(projet.slice(i, i + nb_mots_ligne_projet));
		}
	}
	console.log(tableau_projet);
	
	// Chargement de l'image à l'aide de XMLHttpRequest
	function getImageAsBase64(imagePath, callback) {
	  var xhr = new XMLHttpRequest();
	  xhr.onload = function () {
	    var reader = new FileReader();
	    reader.onloadend = function () {
	      callback(reader.result);
	    };
	    reader.readAsDataURL(xhr.response);
	  };
	  xhr.open('GET', imagePath);
	  xhr.responseType = 'blob';
	  xhr.send();
	}

	// Utilisation de la fonction pour convertir l'image en base64
	var imagePath = document.getElementById('pp'); // Chemin vers votre image
	imagePath = imagePath.src;
	console.log(tableau_formation);
	getImageAsBase64(imagePath, function (base64Image) {
		// Ajout de l'image au document PDF
		var imgWidth = 50; // Largeur de l'image en points
		var imgHeight = 50; // Hauteur de l'image en points
		var xPos = 10; // Position horizontale de l'image en points
		var yPos = 10; // Position verticale de l'image en points
		console.log(base64Image);
	  	doc.addImage(base64Image, 'PNG', xPos, yPos, imgWidth, imgHeight);
	  	// Ajout du texte formaté au document PDF
		doc.text(nom +' '+ prenom, 70, 20);
		doc.text("Formations", 85, 40);

		if (tableau_formation == "aucune formation") {
			doc.text(tableau_formation,70,50);
		}
		else{
			for (var i = 0; i < tableau_formation.length; i++) {
				for (var j = 0; j <3; j++) {
					doc.text(tableau_formation[i][j],70+j*30,50+i*10);
				console.log(formation);
				}
			}
		}

		doc.text("projet", 85,50+10*(tableau_formation.length+1));
		if (tableau_projet =="aucun projet") {
			doc.text(tableau_projet, 70,60+(tableau_formation.length+1)*10);
		}
		else{
			for (var i = 0; i < tableau_projet.length; i++) {
				for (var j = 0; j <4; j++) {
					doc.text(tableau_projet[i][j],70+j*30,60+(i+tableau_formation.length+1)*10);
				}
			}
		}
		doc.save('fichier.pdf');
	});
}