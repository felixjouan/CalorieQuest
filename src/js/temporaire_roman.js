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





  function ramasserSoda(un_player, un_soda){ //fonction pour ramasser les burgers
    un_burger.disableBody(true,true); //enlève la texture du burger
    speedjump = 0.5*speed ; //on divise par 2 la vitesse de saut
    //setTimeout(speedjump=speedjump/10 , 500000) ;
    setTimeout(() => {
      speedjump = speed*2;
    }, 5000); // 5000 pour  secondes
    //La variable speedjump ne va être remise à sa valeur initiale qu'après un retard de 5 secondes
    score -= 50 ;
  }//fin de la fonction ramasserBurger
  this.physics.add.overlapp(player, groupe_sodas,ramasserSoda, null, this) ;
