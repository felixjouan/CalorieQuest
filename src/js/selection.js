
/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var player; // désigne le sprite du joueur coucou la zone
var clavier; // pour la gestion du clavier
var groupe_plateformes;

let keyQ;
let keyD;
let keyZ;

var groupe_salades ;
var zone_texte_score  ; //variable pour afficher le score 
var score = 0;

var speed = 160 ; //variable pour changer la vitesse de déplacement du personnage
var speedjump = 330 ; //variable de la vitesse de saut 

var groupe_carrots ; //groupe qui va contenir les carottes 
var groupe_coca ; 
var groupe_bananes ; 
var groupe_burgers ; 

// définition de la classe "selection"
export default class selection extends Phaser.Scene {
  constructor() {
    super({ key: "selection" }); // mettre le meme nom que le nom de la classe
  }

  /***********************************************************************/
  /** FONCTION PRELOAD 
/***********************************************************************/

  /** La fonction preload est appelée une et une seule fois,
   * lors du chargement de la scene dans le jeu.
   * On y trouve surtout le chargement des assets (images, son ..)
   */
  preload() {
    // tous les assets du jeu sont placés dans le sous-répertoire src/assets/
    this.load.image("img_ciel", "/src/assets/image/sky.png");
    this.load.image("img_plateforme", "/src/assets/image/platform.png");
    this.load.spritesheet("img_perso", "/src/assets/image/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  
    this.load.image("img_porte1", "/src/assets/image/door1.png");
    this.load.image("img_porte2", "/src/assets/image/door2.png");
    this.load.image("img_porte3", "/src/assets/image/door3.png");

    this.load.image("img_salada", "/src/assets/image/food/salada.png");
    this.load.image("img_carotte", "/src/assets/image/food/carrot.png");
    this.load.image("img_burger", "/src/assets/image/food/burger.png");
    this.load.image("img_banane","/src/assets/image/food/banana.png");

  }

  /***********************************************************************/
  /** FONCTION CREATE 
/***********************************************************************/

  /* La fonction create est appelée lors du lancement de la scene
   * si on relance la scene, elle sera appelée a nouveau
   * on y trouve toutes les instructions permettant de créer la scene
   * placement des peronnages, des sprites, des platesformes, création des animations
   * ainsi que toutes les instructions permettant de planifier des evenements
   */
  create() {
      fct.doNothing();
      fct.doAlsoNothing();

    /*************************************
     *  CREATION DU MONDE + PLATEFORMES  *
     *************************************/

    // On ajoute une simple image de fond, le ciel, au centre de la zone affichée (400, 300)
    // Par défaut le point d'ancrage d'une image est le centre de cette derniere
    this.add.image(400, 300, "img_ciel");

    // la création d'un groupes permet de gérer simultanément les éléments d'une meme famille
    //  Le groupe groupe_plateformes contiendra le sol et deux platesformes sur lesquelles sauter
    // notez le mot clé "staticGroup" : le static indique que ces élements sont fixes : pas de gravite,
    // ni de possibilité de les pousser.
    groupe_plateformes = this.physics.add.staticGroup();
    // une fois le groupe créé, on va créer les platesformes , le sol, et les ajouter au groupe groupe_plateformes

    // l'image img_plateforme fait 400x32. On en met 2 à coté pour faire le sol
    // la méthode create permet de créer et d'ajouter automatiquement des objets à un groupe
    // on précise 2 parametres : chaque coordonnées et la texture de l'objet, et "voila!"
    groupe_plateformes.create(200, 584, "img_plateforme");
    groupe_plateformes.create(600, 584, "img_plateforme");

    //  on ajoute 3 platesformes flottantes
    groupe_plateformes.create(600, 450, "img_plateforme");
    groupe_plateformes.create(50, 300, "img_plateforme");
    groupe_plateformes.create(750, 270, "img_plateforme");

    /****************************
     *  Ajout des portes   *
     ****************************/
    this.porte1 = this.physics.add.staticSprite(600, 414, "img_porte1");
    this.porte2 = this.physics.add.staticSprite(50, 264, "img_porte2");
    this.porte3 = this.physics.add.staticSprite(750, 234, "img_porte3");

    /****************************
     *  CREATION DU PERSONNAGE  *
     ****************************/

    // On créée un nouveeau personnage : player
    player = this.physics.add.sprite(100, 450, "img_perso");

    //  propriétées physiqyes de l'objet player :
    player.setBounce(0.2); // on donne un petit coefficient de rebond
    player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde

    /***************************
     *  CREATION DES ANIMATIONS *
     ****************************/
    // dans cette partie, on crée les animations, à partir des spritesheet
    // chaque animation est une succession de frame à vitesse de défilement défini
    // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
    // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche
    this.anims.create({
      key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", {
        start: 0,
        end: 3
      }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });

    // creation de l'animation "anim_tourne_face" qui sera jouée sur le player lorsque ce dernier n'avance pas.
    this.anims.create({
      key: "anim_face",
      frames: [{ key: "img_perso", frame: 4 }],
      frameRate: 20
    });

    // creation de l'animation "anim_tourne_droite" qui sera jouée sur le player lorsque ce dernier tourne à droite
    this.anims.create({
      key: "anim_tourne_droite",
      frames: this.anims.generateFrameNumbers("img_perso", {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });

    /***********************
     *  CREATION DU CLAVIER *
     ************************/
    // ceci permet de creer un clavier et de mapper des touches, connaitre l'état des touches
    clavier = this.input.keyboard.createCursorKeys();

    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    
    /*****************************************************
     *  GESTION DES INTERATIONS ENTRE  GROUPES ET ELEMENTS *
     ******************************************************/

    //  Collide the player and the groupe_etoiles with the groupe_plateformes
    this.physics.add.collider(player, groupe_plateformes);

/**************************************************
     * CREATION ET GESTION DES ALIMENTS*
 **************************************************/

    groupe_salades = this.physics.add.group();
    //ajoute la physique aux salades 
    for (var i = 0; i < 10; i++) {
      var coordX = 70 + 70 * i;
      groupe_salades.create(coordX, 10, "img_salada");
    } 
    this.physics.add.collider(groupe_salades, groupe_plateformes); // ajoute les collisions entre les étoiles et les plateformes
    groupe_salades.children.iterate(function iterateur(salade_i) {
    // On tire un coefficient aléatoire de rerebond : valeur entre 0.4 et 0.8
    var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
    salade_i.setBounceY(coef_rebond); // on attribut le coefficient de rebond à l'étoile etoile_i
    }); 


    function ramasserSalade(un_player, une_salade){
      une_salade.disableBody(true,true) ;
      //On désactive lme corps physique de la salade mais aussi sa texture

      // deux élement qui se sont superposés : le player, et la salade en question
      // les actions à entreprendre seront écrites dans la fonction ramasserSalade
      //this.physics.add.overlap(player, groupe_salades, ramasserSalade, null, this);
      // on regarde le nombre de salades qui sont encore actives (non ramassées)
      if (groupe_salades.countActive(true) === 0) {
      // si ce nombre est égal à 0 : on va réactiver toutes les étoiles désactivées
      // pour chaque salade salade_i du groupe, on réacttive salade_i avec la méthode enableBody
      // ceci s'ecrit bizarrement : avec un itérateur sur les enfants (children) du groupe (equivalent du for)
      groupe_salades.children.iterate(function iterateur(salade_i) {
      salade_i.enableBody(true, salade_i.x, 0, true, true);
      });
      }//fin du if()

      score += 10; // A chaque fois que la fonction est exécutée le score est incrémenté de 10 
      zone_texte_score.setText("Score: " + score); //Affichage du score 
    }//fin de la fonction rammasserSalade


    this.physics.add.overlap(player, groupe_salades, ramasserSalade, null, this);  //Enlève le corps de la salade
    zone_texte_score = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' }); //placement du score à ces coordonnées

    groupe_carrots = this.physics.add.group();
    this.physics.add.collider(groupe_carrots, groupe_plateformes); // ajoute les collisions entre les carottes et les plateformes
  
    var une_carotte = groupe_carrots.create(100, 16, "img_carotte");
    une_carotte.setBounce(1);
    une_carotte.setCollideWorldBounds(true);
    une_carotte.setVelocity(Phaser.Math.Between(-200, 200), 20);
    une_carotte.allowGravity = false;


    function ramasserCarotte(un_player, une_carotte){ //fonction pour ramasser les carottes
      une_carotte.disableBody(true,true); //enlève la texture de la carotte
      speedjump = 5 * speedjump ; //on double la vitesse de saut
      //setTimeout(speedjump=speedjump/10 , 500000) ;
      setTimeout(() => {
        speedjump = speedjump/5;
      }, 5000); // 5000 pour  secondes
      //La variable speedjump ne va être remise à sa valeur initiale qu'après un retard de 5 secondes
      score += 50 ;
    }//fin de la fonction ramasserCarotte

    this.physics.add.overlap(player, groupe_carrots, ramasserCarotte, null , this); //enlève le corps de la carotte
    /*
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
    */

    groupe_bananes = this.physics.add.group();
    this.physics.add.collider(groupe_bananes, groupe_plateformes); // ajoute les collisions entre les carottes et les plateformes
  
    var une_banane = groupe_bananes.create(100, 16, "img_banane") ;
    une_banane.setBounce(1) ;
    une_banane.setCollideWorldBounds(true) ;
    une_banane.setVelocity(Phaser.Math.Between(-200, 200), 20) ;
    une_banane.allowGravity = false ;

    function ramasserBanane(un_player, une_banane){
      une_banane.disableBody(true,true);
      speed = 5 * speed ; 
      setTimeout(() => {
        speed = speed/5;
      }, 5000); // 5000 pour  millisecondes
      //La variable speedjump ne va être remise à sa valeur initiale qu'après un retard de 5 secondes
      score += 20 ;

    }//fin de la fonction ramasserBanane
    this.physics.add.overlap(player, groupe_bananes, ramasserBanane, null , this); //enlève le corps de la banane

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
  
  
  }//fin de la fonction create

  /***********************************************************************/
  /** FONCTION UPDATE 
/***********************************************************************/

  update() {
    
    if (clavier.right.isDown == true) { //Si on appuie sur la flèche droite, on a une vitesse de 160 pixel par seconde 
      player.setVelocityX(speed);
      player.anims.play('anim_tourne_droite', true); //l'animation du sprite
    } 
    else if (clavier.left.isDown == true) { //Si on appuie sur la flèche gauche, on a une vitesse de 160 pixel par seconde 
      player.setVelocityX(-speed);
      player.anims.play('anim_tourne_gauche', true); //l'animation du sprite
    } 
    else if (keyQ.isDown == true ){ //Pour la touche Q 
      player.setVelocityX(-speed);
      player.anims.play('anim_tourne_gauche', true); //l'animation du sprite
    }
    else if (keyD.isDown == true ){ //Pour la touche D
      player.setVelocityX(speed);
      player.anims.play('anim_tourne_droite', true); //l'animation du sprite
    }
    else {
      player.setVelocityX(0);
      player.anims.play('anim_rester_droit');
    }
    if (clavier.up.isDown == true && player.body.touching.down) { //pour la flèche du haut
      player.setVelocityY(-speedjump) /*appliquer une velocite de -speedjump verticalement*/
    }
    if (keyZ.isDown == true && player.body.touching.down) { //pour la touche Z
      player.setVelocityY(-speedjump) //appliquer une velocite de -speedjump verticalement
    }
    /*else {
      player.setVelocityX(0)
      player.anims.play('anim_rester_droit');
    }*/


    if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
      if (this.physics.overlap(player, this.porte1))
        this.scene.switch("niveau1");
      if (this.physics.overlap(player, this.porte2))
        this.scene.switch("niveau2");
      if (this.physics.overlap(player, this.porte3))
        this.scene.switch("niveau3");
    }
  }
}

/***********************************************************************/
/** CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
/***********************************************************************/
