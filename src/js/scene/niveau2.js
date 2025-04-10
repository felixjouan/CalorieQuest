export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
  this.load.image("tjc", "src/assets/image/tuilesJeu copie.png");
  this.load.image("enfer", "src/assets/image/enfer.jpg");
  this.load.image("portail", "src/assets/image/gate.webp");
  this.load.image("img_pomme", "src/assets/image/food/apple.png");
  this.load.image("enfer1", "src/assets/image/enfer1.jpg")
  this.load.image("img_salade", "src/assets/image/food/salada.png");
  this.load.image("img_carotte", "src/assets/image/food/carrot.png");
  this.load.image("img_burger", "src/assets/image/food/burger.png");
  this.load.image("img_banane", "src/assets/image/food/banana.png");
  this.load.image("img_soda", "src/assets/image/food/coca.png");
  this.load.image("img_redbull", "src/assets/image/food/redbull.png");

  this.load.audio("musique_2", "/src/assets/sound3.mp3");

  this.load.tilemapTiledJSON("map1b", "src/assets/image/map1b.tmj");
  this.load.spritesheet("dude", "src/assets/image/ptitgars.png", {
     frameWidth: 184,
     frameHeight: 275
   });
 }
  create() {

    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 2", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    this.musiquedark = this.sound.add("musique_2", { loop: false, volume: 0.5 });
    this.musiquedark.play();

    
    const carteDuNiveau = this.make.tilemap({ key: "map1b" });

    // Chargement du jeu de tuiles
    // Utiliser le nom exact correspondant au tileset dans votre fichier TMJ
    const tileset = carteDuNiveau.addTilesetImage("tuilesJeu copie.png", "tjc");
    const tileset1 = carteDuNiveau.addTilesetImage("enfer.jpg", "enfer");
    const tileset2 = carteDuNiveau.addTilesetImage("enfer1.jpg", "enfer1");
    const tileset3 = carteDuNiveau.addTilesetImage("gate.webp", "GATE");
    // Ajout des calques (ordre correct pour ne pas masquer les éléments)
     const background = carteDuNiveau.createLayer("background", tileset1 && tileset2, 0, 0);
     const decors = carteDuNiveau.createLayer("decors", tileset, 0, 0);

     const platf = carteDuNiveau.createLayer("platf", tileset, 0, 0);


     this.porte_retour = this.physics.add.staticGroup();
     this.porte_retour.create(100, 550, "portail"); 

     //background.setOrigin(0.5, 0.5); // Définir l'origine de l'image au centre

     background.setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Redimensionner l'image pour couvrir toute la scène
 
     platf.setCollisionByProperty({ estSolide: true });

    this.player = this.physics.add.sprite(100, 450, "dude");
    // Ajuster la boîte de collision du joueur pour de meilleurs déplacements
    this.player.setScale(0.2);

    this.player.body.setSize(this.player.width * 0.7, this.player.height * 0.95);
    this.player.body.setOffset(5, 2);
    this.physics.add.collider(this.player, platf);

    // Redimensionnement du monde
    this.physics.world.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
    this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);

    // Ancrage de la caméra sur le joueur avec un zoom ajusté
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setZoom(1); // Zoom réduit pour voir plus de terrain

    // Récupération des touches clavier
    this.clavier = this.input.keyboard.createCursorKeys();

  }

  update() {
    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-300);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(300);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face");
    }
    if (this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-400);
    }
    if (this.clavier.down.isDown) {
      this.player.setVelocityY(400);
    }
if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        this.musiquedark.stop(); 
        console.log("niveau 3 : retour vers selection");
        this.scene.switch("selection");
      }
    }
  }
}
