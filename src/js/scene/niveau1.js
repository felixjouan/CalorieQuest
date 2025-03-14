//import { spawnItems } from './selection';
//import spawnItems from "/src/js/scene/selection";
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
var numItem;

var x;
var y;

//On récupère la position du joueur
  var x;
  var y;
  
  
export default class niveau1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  } //fin du constructeur

 
  
  

  preload() {
    // chargement images
    this.load.image("tjc", "src/assets/image/tuilesJeu copie.png");
    this.load.image("grotte", "src/assets/image/grotte.jpg");
    this.load.image("fond", "src/assets/image/back.png");
    this.load.image("portail", "src/assets/image/gate.webp");
    this.load.image("img_ciel", "src/assets/image/sky.png");
    this.load.image("img_pomme", "src/assets/image/food/apple.png");
    this.load.image("img_salade", "src/assets/image/food/salada.png");
    this.load.image("img_carotte", "src/assets/image/food/carrot.png");
    this.load.image("img_burger", "src/assets/image/food/burger.png");
    this.load.image("img_banane", "src/assets/image/food/banana.png");
    this.load.image("img_soda", "src/assets/image/food/coca.png");
    this.load.image("img_redbull", "src/assets/image/food/redbull.png");

    //this.load.image("img_ciel", "src/assets/image/sky.png");
    //this.load.image("img_ciel", "src/assets/image/sky.png");

    this.load.audio("musique_1", "/src/assets/globalmusique.mp3");



    // chargement de la carte
    this.load.tilemapTiledJSON("map1a", "src/assets/image/map1a.tmj");

    // chargement du personnage dude
    this.load.spritesheet("dude", "src/assets/image/ptitgars.png", {
      frameWidth: 184,
      frameHeight: 275
    });
  }

  create() {
    
    setInterval(spawnItems, 5000); //exécute la fonnction toute les 5 secondes

    // ajout d'un texte distintcif  du niveau
    //this.audioManager = new AudioManager(this);
    //this.audioManager.create();
    this.musiquego = this.sound.add("musique_1", { loop: false, volume: 0.5 });
    this.musiquego.play();

    this.add.text(400, 100, "Vous êtes dans le niveau 1", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    this.portes = this.physics.add.staticGroup();
    this.portes.create(100, 550, "portail"); 
    //this.portes.create(600, 550, "portail"); 
    this.portes.create(9500, 550, "portail");
    const carteDuNiveau = this.make.tilemap({ key: "map1a" });

    // Chargement du jeu de tuiles
    // Utiliser le nom exact correspondant au tileset dans votre fichier TMJ
    const tileset = carteDuNiveau.addTilesetImage("tuilesdejeu copie", "tjc");
    const tileset1 = carteDuNiveau.addTilesetImage("grotte.jpg", "grotte");
    const tileset2 = carteDuNiveau.addTilesetImage("back", "fond");
    const tileset3 = carteDuNiveau.addTilesetImage("gate.webp", "portail");



    // Ajout des calques (ordre correct pour ne pas masquer les éléments)
    const back = carteDuNiveau.createLayer("back", tileset2, 0, 0);
    const cave = carteDuNiveau.createLayer("cave", tileset1, 0, 0);
    const decors = carteDuNiveau.createLayer("decors", tileset, 0, 0);
    const plateforme = carteDuNiveau.createLayer("plateforme", tileset, 0, 0);
    const portail = carteDuNiveau.createLayer("portail", tileset3, 0, 0);

    plateforme.setCollisionByProperty({ estSolide: true });

    this.player = this.physics.add.sprite(100, 450, "dude");
    // Ajuster la boîte de collision du joueur pour de meilleurs déplacements
    this.player.setScale(0.2);

    this.player.body.setSize(this.player.width * 0.7, this.player.height * 0.95);
    this.player.body.setOffset(5, 2);


    // Ajout de la collision entre le joueur et les plateformes
    this.physics.add.collider(this.player, plateforme);


    // Redimensionnement du monde
    this.physics.world.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
    this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);

    // Ancrage de la caméra sur le joueur avec un zoom ajusté
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setZoom(1); // Zoom réduit pour voir plus de terrain

    // Récupération des touches clavier
    this.clavier = this.input.keyboard.createCursorKeys();

    // Animations du joueur
    this.anims.create({
      key: "anim_tourne_droite",
      frames: this.anims.generateFrameNumbers("dude", { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "anim_tourne_gauche",
      frames: this.anims.generateFrameNumbers("dude", { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "anim_face",
      frames: [{ key: "dude", frame: 0 }],
      frameRate: 20
    });

    //setInterval(spawnItems, 5000); //exécute la fonnction toute les 5 secondes

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    
    }

    /**************************************************

         * CREATION ET GESTION DES ALIMENTS*

     **************************************************/
    
    
    this.groupe_salades = this.physics.add.group();
    this.groupe_burgers = this.physics.add.group();
    this.groupe_sodas = this.physics.add.group();
    this.groupe_redbulls = this.physics.add.group();
    this.groupe_sodas = this.physics.add.group();
    this.groupe_redbulls = this.physics.add.group();

    this.physics.add.collider(this.groupe_salades, this.groupe_plateformes);
    this.physics.add.collider(this.groupe_sodas, this.groupe_plateformes);
    this.physics.add.collider(this.groupe_burgers, this.groupe_plateformes);
    this.physics.add.collider(this.groupe_redbulls, this.groupe_plateformes);
    this.physics.add.collider(this.groupe_sodas, this.groupe_plateformes);
    this.physics.add.collider(this.groupe_redbulls,this.groupe_plateformes);

    this.groupe_salades.children.iterate(function (salade_i) {
      var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
      salade_i.setBounceY(coef_rebond); // Appliquer le rebond
    });
    this.groupe_burgers.children.iterate(function (burger_i) {
      var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
      burger_i.setBounceY(coef_rebond); // Appliquer le rebond
    }); 
    this.groupe_redbulls.children.iterate(function (pomme_i) {
      var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
      pomme_i_i.setBounceY(coef_rebond); // Appliquer le rebond
    }); 
    this.groupe_sodas.children.iterate(function (soda_i) {
      var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
      soda_i.setBounceY(coef_rebond); // Appliquer le rebond
    });
    /*
    function spawnItems() {

      //On récupère la position du joueur             
      var playerX = this.player.x ;    
      var playerY = this.player.y ;    
      for (var i = 0; i < 3; i++) {
    
        numItem = getRandomInt(4); //expecting 0,1,2,3
        var coordX = playerX - 70 + 70 * i; // Position en X (autour du joueur)
        var coordY = playerY - 50; // Position en Y (50 pixels au-dessus du joueur)
    
        if (numItem == 0) {
          groupe_salades.create(coordX, coordY, 'img_salade');
        }
        else if (numItem == 1) {
          groupe_redbulls.create(coordX, coordY, 'img_redbull');
        }
        else if (numItem == 2) {
          groupe_sodas.create(coordX, coordY, 'img_soda')
        }
        else if (numItem == 3) {
          groupe_burgers.create(coordX, coordY, 'img_burger')
        }
      } //fin du for
    }//fin de la fonction spawnItems
    */


//setInterval(spawnItems, 5000);
function spawnItems() {

  //On récupère la position du joueur
 
  var playerX = this.playerx;
  var playerY = this.playery;
  for (var i = 0; i < 2; i++) {

    numItem = getRandomInt(5); //expecting 0,1,2,3
    var coordX = playerX - 70 + 140 * i; // Position en X (autour du joueur)
    var coordY = playerY - 250; // Position en Y (50 pixels au-dessus du joueur)

    if (numItem == 0 || numItem == 1) {
      this.groupe_salades.create(this.coordX, this.coordY, 'img_salade');
    }
    else if (numItem == 2) {
      this.groupe_redbulls.create(this.coordX, this.coordY, 'img_redbull');
    }
    else if (numItem == 3) {
      this.groupe_sodas.create(coordX, coordY, 'img_soda')
    }
    else if (numItem == 4) {
      this.groupe_burgers.create(coordX, coordY, 'img_burger')
    }
    if (numItem == 5 || numItem == 6) {
      this.groupe_carrots.create(coordX, coordY, 'img_simg_carrotte');
    }
    if (numItem == 0 || numItem == 8) {
      this.groupe_bananes.create(coordX, coordY, 'img_banane');
    }
  } //fin du for
}//fin de la fonction spawnItems
  }//fin de la fonction create

  update() {

    if (this.player.body.touching.left || this.player.body.touching.right || this.player.body.touching.top || this.player.body.touching.bottom) {
      this.gameOver = true;
    }
    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face");
    }
    if (this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-400);
    }

    if(this.clavier.down.isDown){
      this.player.anims.play("anim_face");
      this.player.setVelocityY(200);
    }
    

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.portes)) {
        this.musiquego.stop(); 
        this.scene.switch("selection");
      }
    }
  }//fin de la fonction update
}

