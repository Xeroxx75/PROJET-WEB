// Récupérer l'élément conteneur des emplois à gauche dans le HTML
var emploisContainer = document.getElementById('offre-emploi');



 //RECUPERATION DU MAIL DE L'UTILISATEUR CONNECTE 
$.ajax({
  url: 'session.php',
  type: 'GET',
  success: function(responseSession) {
    // Appeler la fonction pour traiter les données de session
    traiterSession(responseSession);
  },
  error: function(error) {
    console.log(error);
  }
});

var emailUtilisateur = '';
function traiterSession(responseSession) {
  emailUtilisateur = responseSession.trim();
}

/////////////////////////////////////////

//VERIFIE SI L'UTILISATEUR CONNECTE EST AUTEUR ET AFFICHE LES EMPLOIS 
$.ajax({
  url: 'profil.php',
  type: 'GET',
  success: function(responseProfil) {
    // Appeler la fonction pour traiter les données de profil
    traiterProfil(responseProfil);

    //RECUPERATION ET AFFICHAGE DES EMPLOIS
    $.ajax({
      url: 'emplois.php',
      type: 'GET',
      success: function(responseEmplois) {
        // Appeler la fonction pour traiter les données
        afficherEmplois(responseEmplois);
      
      },
      error: function(error) {
        console.log(error);
      }
    });

    $.ajax({
      url: 'emplois.php',
      type: 'GET',
      success: function(responseMesEmplois) {
        // Appeler la fonction pour traiter les données
        afficherMesEmplois(responseMesEmplois);
      },
      error: function(error) {
        console.log(error);
      }
    });
    
  },
  error: function(error) {
    console.log(error);
  }
});

var estAuteur;
function traiterProfil(responseProfil) {
  var profil = JSON.parse(responseProfil);

  for (var i = 0; i < profil.length; i++) {
              
    if (profil[i].mail === emailUtilisateur) {

      estAuteur = profil[i].est_auteur;
      
    }
  }
  
}


function afficherEmplois(responseEmplois) {
  var titreCDD = document.createElement('h2');
  titreCDD.textContent = 'CDD';
  document.getElementById("conteneur-cdd").appendChild(titreCDD);
  var titreCDI = document.createElement('h2');
  titreCDI.textContent = 'CDI';
  document.getElementById("conteneur-cdi").appendChild(titreCDI);
  var titreStage = document.createElement('h2');
  titreStage.textContent = 'Stage';
  document.getElementById("conteneur-stage").appendChild(titreStage);
  var titreAlternance = document.createElement('h2');
  titreAlternance.textContent = 'Alternance';
  document.getElementById("conteneur-alternance").appendChild(titreAlternance);
  var CDD=false,CDI=false,Stage=false,Alternance=false;
  


  var emploisObj = JSON.parse(responseEmplois)
  if (emploisObj.length > 0) {
    
    emploisObj.forEach(function(emploi) {
      // Créer les éléments HTML pour afficher les données de l'emploi
      
      var emploiDiv=  document.createElement('div');
      emploiDiv.classList.add('offre-emploi');

      var emploiTitre = document.createElement('h3');
      emploiTitre.textContent = `Titre : ${emploi.titre}`;

      var datePublication = document.createElement('p');
      datePublication.textContent = `Date de publication : ${emploi.date_publication}`;

      var auteurOffreMail = document.createElement('p');
      auteurOffreMail.textContent = `Auteur de l'offre (email) : ${emploi.auteur_offre_mail}`;

      var lieu = document.createElement('p');
      lieu.textContent = `Lieu : ${emploi.lieu}`;

      emploiDiv.appendChild(emploiTitre);
      emploiDiv.appendChild(datePublication);
      emploiDiv.appendChild(auteurOffreMail);
      emploiDiv.appendChild(lieu);

      var offreDetailsDiv = document.createElement('div');
      offreDetailsDiv.classList.add('offre-details');

      

      var dateEmbauche = document.createElement('p');
      dateEmbauche.textContent = `Date d'embauche : ${emploi.date_embauche}`;

      var duree = document.createElement('p');
      duree.textContent = `Durée : ${emploi.duree}`;

      var contrat = document.createElement('p');
      contrat.textContent = `Contrat : ${emploi.contrat}`;

      var description = document.createElement('p');
      description.textContent = `Description : ${emploi.description}`;

      var remuneration = document.createElement('p');
      remuneration.textContent = `Rémunération : ${emploi.remuneration}`;

      offreDetailsDiv.appendChild(description);
      offreDetailsDiv.appendChild(dateEmbauche);
      if(emploi.contrat!= 'CDI')
        offreDetailsDiv.appendChild(duree);
      offreDetailsDiv.appendChild(contrat);
      offreDetailsDiv.appendChild(remuneration);
      if(estAuteur == 0){
        var postulerButton = document.createElement('button');
        postulerButton.textContent = 'Postuler';
        postulerButton.classList.add('bouton2');
        postulerButton.addEventListener('click', function(event) {
          
          if(!emploi.profils_postulants.includes(emailUtilisateur)){
            
            event.stopPropagation(); // Empêcher d'agrandir l'offre d'emploi  en postulant
            emploi.profils_postulants += '\n' + emailUtilisateur;
            
            var data = {
              id: emploi.id_emplois,
              mail: emailUtilisateur
            };
            $.ajax({
              url: 'ajoutPostulant.php',
              type: 'POST',
              data: data,
              success: function(response) {
                console.log(response);
                updatePage();
              },
              error: function(error) {
                console.log(error);
              }
            });

            alert('Vous avez postulé à cet emploi !');
          }else{
            alert('Vous avez déjà postulé à cet emploi !');
          }
            
        });
        offreDetailsDiv.appendChild(postulerButton);
      }

      (function(emploiDiv, offreDetailsDiv) {
        var isDetailsVisible = false;

        emploiDiv.addEventListener('click', function() {
          if (isDetailsVisible) {
            offreDetailsDiv.style.display = 'none';
            isDetailsVisible = false;
          } else {
            offreDetailsDiv.style.display = 'block';
            isDetailsVisible = true;
          }
        });
      })(emploiDiv, offreDetailsDiv);

      offreDetailsDiv.style.display = 'none';
      
      emploiDiv.appendChild(offreDetailsDiv);

     if(emploi.contrat == 'CDD'){
        document.getElementById("conteneur-cdd").appendChild(emploiDiv);
        emploisContainer.appendChild(document.getElementById("conteneur-cdd"));
        CDD=true;
      }else if(emploi.contrat == 'CDI'){
        document.getElementById("conteneur-cdi").appendChild(emploiDiv);
        emploisContainer.appendChild(document.getElementById("conteneur-cdi"));
        CDI=true;
      }else if(emploi.contrat == 'Stage'){
        document.getElementById("conteneur-stage").appendChild(emploiDiv);
        emploisContainer.appendChild(document.getElementById("conteneur-stage"));
        Stage=true;
      }else if(emploi.contrat == 'Alternance'){
        document.getElementById("conteneur-alternance").appendChild(emploiDiv);
        emploisContainer.appendChild(document.getElementById("conteneur-alternance"));
        Alternance=true;
      }

      //emploisContainer.appendChild(emploiDiv);
    });

  } 
  
  if(!Alternance){
    var message=document.createElement('p');
    message.textContent = 'Aucune offre d\'emploi disponible';
    document.getElementById("conteneur-alternance").appendChild(message);
  }
  if(!CDD){
    var message=document.createElement('p');
    message.textContent = 'Aucune offre d\'emploi disponible';
    document.getElementById("conteneur-cdd").appendChild(message);
  }
  if(!CDI){
    var message=document.createElement('p');
    message.textContent = 'Aucune offre d\'emploi disponible';
    document.getElementById("conteneur-cdi").appendChild(message);
  }
  if(!Stage){
    var message=document.createElement('p');
    message.textContent = 'Aucune offre d\'emploi disponible';
    document.getElementById("conteneur-stage").appendChild(message);
  }
  

};
/////////////////////////////////////////



// AFFICHE LES EMPLOIS AUXQUELS L'UTILISATEUR CONNECTÉ A POSTULÉ OU QU'IL A POSTÉ
var emploisContainer2 = document.getElementById('conteneur');
var boolOffre = 0;

function afficherMesEmplois(responseMesEmplois) {
  
  var mesOffresButton = document.createElement('button');
  mesOffresButton.textContent = "Mes offres d'emploi";
  mesOffresButton.classList.add('bouton');
  
  var emploisObj2 = JSON.parse(responseMesEmplois);

  emploisContainer2.appendChild(mesOffresButton);
  

  
  if (emploisObj2.length > 0) {
    emploisObj2.forEach(function(emploi) {
      var emploiDiv2 = document.createElement('div');
      emploiDiv2.classList.add('offre-emploi2');
      if (estAuteur==1) {
        if (emploi.auteur_offre_mail === emailUtilisateur) {
          boolOffre = 1;
          // On a trouvé une des offres de l'auteur
          // On l'affiche et on permet de modifier
          

          var emploiTitre = document.createElement('h3');
          emploiTitre.textContent = `Titre :`;
          var titreInput = document.createElement('input');
          titreInput.value = emploi.titre;
          emploiTitre.appendChild(titreInput);

          var datePublication = document.createElement('p');
          datePublication.textContent = `Date de publication : ${emploi.date_publication}`;

          var lieu = document.createElement('p');
          lieu.textContent = `Lieu :`;
          var lieuInput = document.createElement('input');
          lieuInput.value = emploi.lieu;
          lieu.appendChild(lieuInput);
        
          var dateEmbauche = document.createElement('p');
          dateEmbauche.textContent = `Date d'embauche :`;
          var dateEmbaucheInput = document.createElement('input');
          dateEmbaucheInput.type = 'date';
          dateEmbaucheInput.value = emploi.date_embauche;
          dateEmbauche.appendChild(dateEmbaucheInput);
          
          var duree = document.createElement('p');
          duree.textContent = `Durée :`;
          var dureeInput = document.createElement('input');
          dureeInput.value = emploi.duree;
          duree.appendChild(dureeInput);

          var contrat = document.createElement('p');
          contrat.textContent = `Contrat :`;
          var contratInput = document.createElement('select');
          contratInput.name = "contrat";
          // Ajoutez les options au menu déroulant
          var cdiOption = document.createElement('option');
          cdiOption.text = "CDI";
          cdiOption.value = "CDI";
          contratInput.appendChild(cdiOption);
          var cddOption = document.createElement('option');
          cddOption.text = "CDD";
          cddOption.value = "CDD";
          contratInput.appendChild(cddOption);
          var stageOption = document.createElement('option');
          stageOption.text = "Stage";
          stageOption.value = "Stage";
          contratInput.appendChild(stageOption);
          var alternanceOption = document.createElement('option');
          alternanceOption.text = "Alternance";
          alternanceOption.value = "Alternance";
          contratInput.appendChild(alternanceOption);
          // Sélectionnez l'option pré-enregistrée
          contratInput.value = emploi.contrat;
          contrat.appendChild(contratInput);


          var description = document.createElement('p');
          description.textContent = `Description :`;
          var descriptionInput = document.createElement('input');
          descriptionInput.value = emploi.description;
          description.appendChild(descriptionInput);

          var remuneration = document.createElement('p');
          remuneration.textContent = `Rémunération :`;
          var remunerationInput = document.createElement('input');
          remunerationInput.type = 'number';
          remunerationInput.value = emploi.remuneration;
          remuneration.appendChild(remunerationInput);

          var deleteButton = document.createElement('button');
          deleteButton.textContent = 'Supprimer';
          deleteButton.classList.add('bouton2');
          
          
          deleteButton.addEventListener('click', function() {
            //stopper la propagation de l'événement
            var supprimerEmploi = 1;
            event.stopPropagation();
            var updatedEmploi = {
              id: emploi.id_emplois,
              supprimer: supprimerEmploi,
              titre: titreInput.value,
              date_publication: emploi.date_publication,
              lieu: lieuInput.value,
              date_embauche: dateEmbaucheInput.value,
              duree: dureeInput.value,
              contrat: contratInput.value,
              description: descriptionInput.value,
              remuneration: remunerationInput.value,
              
            };

            // Effectuez une requête à votre backend pour supprimer les données dans la base de données
            $.ajax({
              url: 'emploi_recup.php',
              type: 'POST',
              data: updatedEmploi,
              success: function(responseTEST) {
                // Les données ont été mises à jour avec succès
                //console.log("SUPPRIMER"+updatedEmploi.supprimer);
                console.log('Réponse du serveur :', responseTEST);
                updatePage();
              },
              error: function(error) {
                // Erreur lors de la mise à jour des données
                console.log(error);
              }
            });
          });
          
          

               

          // Ajoutez un bouton de sauvegarde pour permettre à l'utilisateur de mettre à jour les données
          var saveButton = document.createElement('button');
          saveButton.textContent = 'Enregistrer';
          saveButton.classList.add('bouton2');
          saveButton.addEventListener('click', function() {
            event.stopPropagation();
              var updatedId = emploi.id_emplois;
              var updatedTitre = titreInput.value;
              var updatedDatePublication = emploi.date_publication;
              var updatedLieu = lieuInput.value;
              var updatedDateEmbauche = dateEmbaucheInput.value;
              var updatedDuree = dureeInput.value;
              var updatedContrat = contratInput.value;
              var updatedDescription = descriptionInput.value;
              var updatedRemuneration = remunerationInput.value;
              var supprimerEmploi = 0;
            
              if (updatedTitre && updatedLieu && updatedDateEmbauche && updatedContrat && updatedDescription && updatedRemuneration) {
                var updatedEmploi = {
                  titre: updatedTitre,
                  id: updatedId,
                  date_publication: updatedDatePublication,
                  lieu: updatedLieu,
                  date_embauche: updatedDateEmbauche,
                  duree: updatedDuree,
                  contrat: updatedContrat,
                  description: updatedDescription,
                  remuneration: updatedRemuneration,
                  supprimer: supprimerEmploi,
                }; 
              
                
              // Effectuez une requête à votre backend pour mettre à jour les données dans la base de données
              $.ajax({
                url: 'emploi_recup.php',
                type: 'POST',
                data: updatedEmploi,
                success: function(responseTEST) {
                  // Les données ont été mises à jour avec succès
                  //console.log("NON SUPPRIMER"+updatedEmploi.supprimer);
                  console.log('Réponse du serveur :', responseTEST);
                  updatePage();
                },
                error: function(error) {
                  // Erreur lors de la mise à jour des données
                  console.log(error);
                }
              });
            } else {
              alert('Veuillez remplir tous les champs');
            }
            });

          emploiDiv2.appendChild(emploiTitre);
          emploiDiv2.appendChild(datePublication);
          emploiDiv2.appendChild(lieu);
          emploiDiv2.appendChild(description);
          emploiDiv2.appendChild(dateEmbauche);
          emploiDiv2.appendChild(duree);
          emploiDiv2.appendChild(contrat);
          emploiDiv2.appendChild(remuneration);
          // Ajoutez les autres éléments pour afficher les données de l'offre
          emploiDiv2.appendChild(deleteButton);
          emploiDiv2.appendChild(saveButton);
          

          var isDetailsVisible = false;
          mesOffresButton.addEventListener('click', function() {
            if (isDetailsVisible) {
              emploiDiv2.style.display = 'none';
              isDetailsVisible = false;
            } else {
              emploiDiv2.style.display = 'block';
              emploisContainer2.appendChild(emploiDiv2);
              isDetailsVisible = true;
            }
          }); 
        }
         
      } else {
        // parcourir emploi.profils_postulants pour trouver emailUtilisateur
        // Si l'utilisateur a postulé à cet emploi, afficher l'offre
        if (emploi.profils_postulants && emploi.profils_postulants.includes(emailUtilisateur)) {
          
          var emploiDiv = document.createElement('div');
          emploiDiv.classList.add('offre-emploi');

          var emploiTitre = document.createElement('h3');
          emploiTitre.textContent = `Titre : ${emploi.titre}`;

          var datePublication = document.createElement('p');
          datePublication.textContent = `Date de publication : ${emploi.date_publication}`;

          var auteurOffreMail = document.createElement('p');
          auteurOffreMail.textContent = `Auteur de l'offre (email) : ${emploi.auteur_offre_mail}`;

          var lieu = document.createElement('p');
          lieu.textContent = `Lieu : ${emploi.lieu}`;

          emploiDiv2.appendChild(emploiTitre);
          emploiDiv2.appendChild(datePublication);
          emploiDiv2.appendChild(auteurOffreMail);
          emploiDiv2.appendChild(lieu);

          var isDetailsVisible = false;

          mesOffresButton.addEventListener('click', function() {
            if (isDetailsVisible) {
              emploiDiv2.style.display = 'none';
              isDetailsVisible = false;
            } else {
              emploiDiv2.style.display = 'block';
              emploisContainer2.appendChild(emploiDiv2);
              isDetailsVisible = true;
            }
          });
          
        }
      }
      
    });
  }
  
    
    if (estAuteur==1) {
      // BOUTON POUR AJOUTER UNE OFFRE
      var ajouterOffreButton = document.createElement('button');
      ajouterOffreButton.textContent = "Ajouter une offre d'emploi";
      emploisContainer2.appendChild(ajouterOffreButton);
      ajouterOffreButton.classList.add('bouton');
      
      var emploiDiv3 = document.createElement('div');
      emploiDiv3.classList.add('offre-emploi2');
      

      var emploiTitre = document.createElement('h3');
      emploiTitre.textContent = `Titre :`;
      var titreInput = document.createElement('input');
      emploiTitre.appendChild(titreInput);

      var datePublication = document.createElement('p');
      var today = new Date();
      var year = today.getFullYear();
      var month = String(today.getMonth() + 1).padStart(2, '0');
      var day = String(today.getDate()).padStart(2, '0');

      var formattedDate = `${year}-${month}-${day}`;
      var datePublicationInput=formattedDate;
      //Afficher la date du jour
      datePublication.textContent = `Date de Publication : ${datePublicationInput}`;
      //Recuperer la date du jour

      var lieu = document.createElement('p');
      lieu.textContent = `Lieu :`;
      var lieuInput = document.createElement('input');
      lieu.appendChild(lieuInput);
    
      var dateEmbauche = document.createElement('p');
      dateEmbauche.textContent = `Date d'embauche :`;
      var dateEmbaucheInput = document.createElement('input');
      dateEmbaucheInput.type = 'date';
      dateEmbauche.appendChild(dateEmbaucheInput);
      
      var duree = document.createElement('p');
      duree.textContent = `Durée :`;
      var dureeInput = document.createElement('input');
      duree.appendChild(dureeInput);

      var contrat = document.createElement('p');
      contrat.textContent = `Contrat :`;
      var contratInput = document.createElement('select');
      contratInput.name = "contrat";
      // Ajoutez les options au menu déroulant
      var cdiOption = document.createElement('option');
      cdiOption.text = "CDI";
      cdiOption.value = "CDI";
      contratInput.appendChild(cdiOption);
      var cddOption = document.createElement('option');
      cddOption.text = "CDD";
      cddOption.value = "CDD";
      contratInput.appendChild(cddOption);
      var stageOption = document.createElement('option');
      stageOption.text = "Stage";
      stageOption.value = "Stage";
      contratInput.appendChild(stageOption);
      var alternanceOption = document.createElement('option');
      alternanceOption.text = "Alternance";
      alternanceOption.value = "Alternance";
      contratInput.appendChild(alternanceOption);
      contrat.appendChild(contratInput);

      var description = document.createElement('p');
      description.textContent = `Description :`;
      var descriptionInput = document.createElement('input');
      description.appendChild(descriptionInput);

      var remuneration = document.createElement('p');
      remuneration.textContent = `Rémunération :`;
      var remunerationInput = document.createElement('input');
      remunerationInput.type = 'number';
      remuneration.appendChild(remunerationInput);

      // Ajoutez un bouton de sauvegarde pour permettre à l'utilisateur de mettre à jour les données
      var Ajouter = document.createElement('button');
      Ajouter.textContent = 'Ajouter';
      Ajouter.classList.add('bouton2');
      Ajouter.addEventListener('click', function() {
        var Titre = titreInput.value;
        var DatePublication = datePublicationInput;
        var Lieu = lieuInput.value;
        var DateEmbauche = dateEmbaucheInput.value;
        var Duree = dureeInput.value;
        var Contrat = contratInput.value;
        var Description = descriptionInput.value;
        var Remuneration = remunerationInput.value;
        
        if (Titre && Lieu && DateEmbauche && Contrat && Description && Remuneration) {
          
          var AjoutEmploi = {
            titre: Titre,
            date_publication: DatePublication,
            lieu: Lieu,
            date_embauche: DateEmbauche,
            duree: Duree,
            contrat: Contrat,
            description: Description,
            remuneration: Remuneration,
            mail: emailUtilisateur
          };  
          
          // Effectuez une requête à votre backend pour mettre à jour les données dans la base de données
          $.ajax({
            url: 'emploi_ajout.php',
            type: 'POST',
            data: AjoutEmploi,
            success: function(responseTEST) {
              // Les données ont été mises à jour avec succès
              console.log('Réponse du serveur :', responseTEST);
              updatePage();
              

            },
            error: function(error) {
              // Erreur lors de la mise à jour des données
              console.log(error);
            }
          });
        }
        else{
          alert("Veuillez remplir tous les champs");
        }
        });
      

      emploiDiv3.appendChild(emploiTitre);
      emploiDiv3.appendChild(datePublication);
      emploiDiv3.appendChild(lieu);
      emploiDiv3.appendChild(description);
      emploiDiv3.appendChild(dateEmbauche);
      emploiDiv3.appendChild(duree);
      emploiDiv3.appendChild(contrat);
      emploiDiv3.appendChild(remuneration);
      // Ajoutez les autres éléments pour afficher les données de l'offre

      emploiDiv3.appendChild(Ajouter);

      

      var isDetailsVisible2 = false;
      ajouterOffreButton.addEventListener('click', function() {
        if (isDetailsVisible2) {
          emploiDiv3.style.display = 'none';
          isDetailsVisible2 = false;
        } else {
          emploiDiv3.style.display = 'block';
          emploisContainer2.appendChild(emploiDiv3);
          isDetailsVisible2 = true;
          
        }
      });
      
    }
  
  
}

//fonction pour mettre a jour la page sans la raffraichir
function updatePage() {
  //emploisContainer.innerHTML = '';
  //emploiDiv.innerHTML = '';
  document.getElementById("conteneur-cdd").innerHTML = '';
  document.getElementById("conteneur-cdi").innerHTML = '';
  document.getElementById("conteneur-stage").innerHTML = '';
  document.getElementById("conteneur-alternance").innerHTML = '';
  //SUPPRIMER LES TITRE h2
  var elementsH2 = emploisContainer.getElementsByTagName('h2');
  while (elementsH2.length > 0) {
    emploisContainer.removeChild(elementsH2[0]);
  }

  $.ajax({
    url: 'profil.php',
    type: 'GET',
    success: function(responseProfil) {
      // Appeler la fonction pour traiter les données de profil
      traiterProfil(responseProfil);
  
      //RECUPERATION ET AFFICHAGE DES EMPLOIS
      $.ajax({
        url: 'emplois.php',
        type: 'GET',
        success: function(responseEmplois) {
          // Appeler la fonction pour traiter les données
          afficherEmplois(responseEmplois);
        
        },
        error: function(error) {
          console.log(error);
        }
      });
    },
    error: function(error) {
      console.log(error);
    }
  });

  emploisContainer2.innerHTML = '';
  $.ajax({
    url: 'emplois.php',
    type: 'GET',
    success: function(responseMesEmplois) {
      // Appeler la fonction pour traiter les données
      afficherMesEmplois(responseMesEmplois);
    },
    error: function(error) {
      console.log(error);
    }
  });
}


