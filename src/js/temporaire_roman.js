groupe_burgers = this.physics.add.group();
    
    //ajoute la physique aux burgers
    for (var i = 0; i < 10; i++) {
      var coordX = 70 + 70 * i;
      groupe_burgers.create(coordX, 10, "img_burger");
    } 
    this.physics.add.collider(groupe_burgers, groupe_plateformes); // ajoute les collisions entre les burgers et les plateformes
    groupe_burgers.children.iterate(function iterateur(burger_i) {
    // On tire un coefficient aléatoire de rerebond : valeur entre 0.4 et 0.8
    var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
    burger_i.setBounceY(coef_rebond); // on attribut le coefficient de rebond au burger burger_i
    }); 


function ramasserBurger(un_player, un_burger){ //fonction pour ramasser les burgers
    un_burger.disableBody(true,true); //enlève la texture du burger
    speedjump = 0.5*speedjump ; //on divise par 2 la vitesse de saut
    //setTimeout(speedjump=speedjump/10 , 500000) ;
    setTimeout(() => {
      speedjump = speedjump*2;
    }, 5000); // 5000 pour  secondes
    //La variable speedjump ne va être remise à sa valeur initiale qu'après un retard de 5 secondes
    score -= 50 ;
  }//fin de la fonction ramasserBurger
  this.physics.add.overlapp(player, groupe_burgers,ramasserBurger, null, this) ;





    



  /*********************************************************************************** */





  function ramasserSoda(un_player, un_soda){ //fonction pour ramasser les sodas
    un_burger.disableBody(true,true); //enlève la texture du soda
    speed = 0.5*speed ; //on divise par 2 la vitesse de déplacement
    setTimeout(() => {
      speed = speed*2;
    }, 5000); // 5000 pour  secondes
    //La variable speed ne va être remise à sa valeur initiale qu'après un retard de 5 secondes
    score -= 50 ;
  }//fin de la fonction ramasserBurger
  this.physics.add.overlapp(player, groupe_sodas,ramasserSoda, null, this) ;


  //**************************************************************************
  function ramasserRedbull(un_player, un_redbull){
    un_redbull.disableBody(true,true);
    un_player.setVelocityY(-1500);
    speedjump = 0.3 * speedjump ;
    setTimeout(() => {
      speedjump = 10*speedjump ;
      speedjump = speedjump / 3 ;
    }, 5000);
    //La variable speedjump remise à sa valeur initiale au bout d'une certaine durée 


  }//fin de la fonction ramasserRedbull
  this.physics.add.overlapp(player, groupe_redbulls, ramasserRedbull, null, this);
