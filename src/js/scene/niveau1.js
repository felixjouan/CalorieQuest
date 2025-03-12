
export default class niveau1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    // chargement images
    this.load.image("tjc", "src/assets/image/tuilesJeu copie.png");
    this.load.image("grotte", "src/assets/image/grotte.jpg");
    this.load.image("fond", "src/assets/image/back.png");
    this.load.image("portail", "src/assets/image/gate.webp");

    // chargement de la carte
    this.load.tilemapTiledJSON("map1a", "src/assets/image/map1a.tmj");

    // chargement du personnage dude
    this.load.spritesheet("dude", "src/assets/image/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 1", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte1");
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

    this.player = this.physics.add.sprite(100, 450, "img_perso");
    // Ajuster la boîte de collision du joueur pour de meilleurs déplacements
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
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "anim_tourne_gauche",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "anim_face",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });

  }

  update() {
    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-550);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(550);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face");
    }
    if (this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-550);
    }

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        this.scene.switch("selection");
      }
    }
  }
}
