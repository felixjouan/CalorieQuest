groupe_etoiles = this.physics.add.group();   
  // on rajoute 10 étoiles avec une boucle for :
  // on répartit les ajouts d'étoiles tous les 70 pixels sur l'axe des x
  for (var i = 0; i < 10; i++) {
    var coordX = 70 + 70 * i;
    groupe_etoiles.create(coordX, 10, "img_etoile");
  } 
  this.physics.add.collider(groupe_etoiles, groupe_plateformes); // ajoute les collisions entre les étoiles et les plateformes
  groupe_etoiles.children.iterate(function iterateur(etoile_i) {
    // On tire un coefficient aléatoire de rerebond : valeur entre 0.4 et 0.8
    var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
    etoile_i.setBounceY(coef_rebond); // on attribut le coefficient de rebond à l'étoile etoile_i
  }); 



  function spawnStars() {     
    // On récupère la position du joueur
    var playerX = player.x; // Position en X
    var playerY = player.y; // Position en Y

    // Crée 3 étoiles au-dessus du joueur
    for (var i = 0; i < 3; i++) {
        // Calculer la position des étoiles à des intervalles autour du joueur
        var coordX = playerX - 70 + 70 * i; // Position en X (autour du joueur)
        var coordY = playerY - 50; // Position en Y (50 pixels au-dessus du joueur)

        // Créer l'étoile
        groupe_etoiles.create(coordX, coordY, 'img_etoile');
    }//fin du for

    // Appliquer les collisions entre les étoiles et les plateformes
    this.physics.add.collider(groupe_etoiles, groupe_plateformes);

    // Appliquer un rebond aléatoire sur chaque étoile
    groupe_etoiles.children.iterate(function(etoile_i) {
        var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
        etoile_i.setBounceY(coef_rebond); // Appliquer le rebond
    });
}

// Appeler la fonction à chaque frame ou lors d'un événement
this.time.addEvent({
    delay: 1000, // Temps en millisecondes avant de créer les étoiles
    callback: spawnStars, // Appeler la fonction pour faire spawn des étoiles
    loop: true // Boucle cette fonction toutes les 1 seconde
});


var numItem ; //salade, burger, soda, pomme
function spawnItems() {
    //On récupère la position du joueur
    var playerX = player.x;
    var playerY = player.y;
    for (var i = 0 ; i < 3 ; i++){
        numItem = getRandomInt(4) ; //expecting 0,1,2,3
        var coordX = playerX - 70 + 70 * i; // Position en X (autour du joueur)
        var coordY = playerY - 50; // Position en Y (50 pixels au-dessus du joueur)
        if (numItem == 0){
            groupe_salades.create(coordX, coordY, 'img_salade') ;
        }
        else if (numItem == 1){
            groupe_pommes.create(coordX,coordY,'img_pomme') ;
        }
        else if(numItem == 2){
            groupe_sodas.create(coordX,coordY,'img_soda')
        }
        else if(numItem == 3){
            groupr_burgers.create(coordX,coordY,'img_burger')
        }
    } //fin du for
    this.physics.add.collider(groupe_salades, groupe_plateformes);
    this.physics.add.collider(groupe_sodas, groupe_plateformes);
    this.physics.add.collider(groupe_burgers, groupe_plateformes);
    this.physics.add.collider(groupe_pommes, groupe_plateformes);

    groupe_salades.children.iterate(function(salade_i) {
        var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);      
        salade_i.setBounceY(coef_rebond); // Appliquer le rebond
    });
    groupe_burgers.children.iterate(function(burger_i) {
        var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
        burger_i.setBounceY(coef_rebond); // Appliquer le rebond
    });groupe_pommes.children.iterate(function(pomme_i) {
        var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
        pomme_i_i.setBounceY(coef_rebond); // Appliquer le rebond
    });groupe_sodas.children.iterate(function(soda_i) {
        var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
        soda_i.setBounceY(coef_rebond); // Appliquer le rebond
    });



}//fin de la fonction spawnItems

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }//fin de la fonction random