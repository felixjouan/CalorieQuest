export function doNothing() {
    // cette fonction ne fait rien.
    // c'est juste un exemple pour voir comment mettre une fonction
    // dans un fichier et l'utiliser dans les autres
}


export function doAlsoNothing() {
    // cette fonction ne fait rien non plus.
    
 }

// code Yava

// chargement des librairies

/***********************************************************************/
/** CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
/***********************************************************************/

// configuration générale du jeu
var config = {
    type: Phaser.AUTO,
    width: 800, // largeur en pixels
    height: 600, // hauteur en pixels
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 300 },
        debug: true // Activé pour débogage
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  // création et lancement du jeu
  new Phaser.Game(config);
  
  /***********************************************************************/
  /** FONCTION PRELOAD 
  /***********************************************************************/
  
  /** La fonction preload est appelée une et une seule fois,
   * lors du chargement de la scene dans le jeu.
   * On y trouve surtout le chargement des assets (images, son ..)
   */
  function preload() {
    // chargement images
    this.load.image("tjc", "src/assets/tuilesJeu copie.png");
    this.load.image("grotte", "src/assets/grotte.jpg");
    this.load.image("fond", "src/assets/back.png");
    this.load.image("portail", "src/assets/gate.webp");
  
    // chargement de la carte
    this.load.tilemapTiledJSON("map1a", "src/assets/map1a.tmj");
  
    // chargement du personnage dude
    this.load.spritesheet("dude", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }
  
  /***********************************************************************/
  /** FONCTION CREATE 
  /***********************************************************************/
  
  /* La fonction create est appelée lors du lancement de la scene
   * si on relance la scene, elle sera appelée a nouveau
   * on y trouve toutes les instructions permettant de créer la scene
   */
  function create() {
    // Définir une couleur de fond pour éviter le fond noir
    this.cameras.main.setBackgroundColor('#4488AA');
    
    // Chargement de la carte du niveau
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
    player = this.physics.add.sprite(100, 100, "dude");
    
    player.setCollideWorldBounds(true);
    
    // Ajuster la boîte de collision du joueur pour de meilleurs déplacements
    player.body.setSize(player.width * 0.7, player.height * 0.95);
    player.body.setOffset(5, 2);
  
    // Ajout de la collision entre le joueur et les plateformes
    this.physics.add.collider(player, plateforme);
  
    // Redimensionnement du monde
    this.physics.world.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
    this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
  
    // Ancrage de la caméra sur le joueur avec un zoom ajusté
    this.cameras.main.startFollow(player, true, 0.05, 0.05);
    this.cameras.main.setZoom(1); // Zoom réduit pour voir plus de terrain
  
    // Récupération des touches clavier
    clavier = this.input.keyboard.createCursorKeys();
  
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
  
  /***********************************************************************/
  /** FONCTION UPDATE 
  /***********************************************************************/
  
  /** La fonction update est appelée à chaque rafraîchissement de l'écran
   * elle permet de gérer les déplacements et autres actions dynamiques
   */
  function update() {
  
    // Meilleure gestion des déplacements
    const speed = 160;
    
    if (clavier.right.isDown) {
      player.setVelocityX(speed);
      player.anims.play("anim_tourne_droite", true);
    } else if (clavier.left.isDown) {
      player.setVelocityX(-speed);
      player.anims.play("anim_tourne_gauche", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("anim_face", true);
    }
  
    if (clavier.up.isDown && player.body.blocked.down) {
      player.setVelocityY(-350);
    }
  
  }
  
  /***********************************************************************/
  /** VARIABLES GLOBALES 
  /***********************************************************************/
  var player;
  var clavier;

  //////////////////////////////////////////// map niveau 2
  
  // chargement des librairies

/***********************************************************************/
/** CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
/***********************************************************************/

// configuration générale du jeu
var config = {
    type: Phaser.AUTO,
    width: 800, // largeur en pixels
    height: 600, // hauteur en pixels
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 300 },
        debug: true // Activé pour débogage
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  // création et lancement du jeu
  new Phaser.Game(config);
  
  /***********************************************************************/
  /** FONCTION PRELOAD 
  /***********************************************************************/
  
  /** La fonction preload est appelée une et une seule fois,
   * lors du chargement de la scene dans le jeu.
   * On y trouve surtout le chargement des assets (images, son ..)
   */
  function preload() {
    // chargement images
    this.load.image("tjc", "src/assets/tuilesJeu copie.png");
    this.load.image("enfer", "src/assets/enfer.jpg");
    this.load.image("enfer1", "src/assets/enfer1.jpg");
    this.load.image("portail", "src/assets/gate.webp");
  
    // chargement de la carte
    this.load.tilemapTiledJSON("map1b", "src/assets/map1b.tmj");
  
    // chargement du personnage dude
    this.load.spritesheet("dude", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }
  
  /***********************************************************************/
  /** FONCTION CREATE 
  /***********************************************************************/
  
  /* La fonction create est appelée lors du lancement de la scene
   * si on relance la scene, elle sera appelée a nouveau
   * on y trouve toutes les instructions permettant de créer la scene
   */
  function create() {
    // Définir une couleur de fond pour éviter le fond noir
    this.cameras.main.setBackgroundColor('#4488AA');
    
    // Chargement de la carte du niveau
    const carteDuNiveau = this.make.tilemap({ key: "map1b" });
  
    // Chargement du jeu de tuiles
    // Utiliser le nom exact correspondant au tileset dans votre fichier TMJ
    const tileset = carteDuNiveau.addTilesetImage("tuilesdejeu copie", "tjc");
    const tileset1 = carteDuNiveau.addTilesetImage("enfer.jpg", "enfer");
    const tileset2 = carteDuNiveau.addTilesetImage("enfer1.jpg", "enfer1");
    const tileset3 = carteDuNiveau.addTilesetImage("gate.webp", "portail");
    
  
  
    // Ajout des calques (ordre correct pour ne pas masquer les éléments)
    const back = carteDuNiveau.createLayer("background", tileset2, 0, 0);
    const cave = carteDuNiveau.createLayer("background", tileset1, 0, 0);
    const decors = carteDuNiveau.createLayer("decors", tileset, 0, 0);
    const plateforme = carteDuNiveau.createLayer("platf", tileset, 0, 0);
    const portail = carteDuNiveau.createLayer("portail", tileset3, 0, 0);
  
    plateforme.setCollisionByProperty({ estSolide: true });
    player = this.physics.add.sprite(100, 100, "dude");
    
    player.setCollideWorldBounds(true);
    
    // Ajuster la boîte de collision du joueur pour de meilleurs déplacements
    player.body.setSize(player.width * 0.7, player.height * 0.95);
    player.body.setOffset(5, 2);
  
    // Ajout de la collision entre le joueur et les plateformes
    this.physics.add.collider(player, plateforme);
  
    // Redimensionnement du monde
    this.physics.world.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
    this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
  
    // Ancrage de la caméra sur le joueur avec un zoom ajusté
    this.cameras.main.startFollow(player, true, 0.05, 0.05);
    this.cameras.main.setZoom(1); // Zoom réduit pour voir plus de terrain
  
    // Récupération des touches clavier
    clavier = this.input.keyboard.createCursorKeys();
  
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
  
  /***********************************************************************/
  /** FONCTION UPDATE 
  /***********************************************************************/
  
  /** La fonction update est appelée à chaque rafraîchissement de l'écran
   * elle permet de gérer les déplacements et autres actions dynamiques
   */
  function update() {
  
    // Meilleure gestion des déplacements
    const speed = 160;
    
    if (clavier.right.isDown) {
      player.setVelocityX(speed);
      player.anims.play("anim_tourne_droite", true);
    } else if (clavier.left.isDown) {
      player.setVelocityX(-speed);
      player.anims.play("anim_tourne_gauche", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("anim_face", true);
    }
  
    if (clavier.up.isDown && player.body.blocked.down) {
      player.setVelocityY(-350);
    }
  
  }
  
  /***********************************************************************/
  /** VARIABLES GLOBALES 
  /***********************************************************************/
  var player;
  var clavier;