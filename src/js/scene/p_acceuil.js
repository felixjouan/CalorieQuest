export default class p_acceuil extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }
  //on charge les images
  preload() {
    this.load.image("menu_fond", "/src/assets/image/image_fond.png");
    this.load.image("imageBoutonPlay", "/src/assets/image/button.png");
    this.load.audio("ascenseur_sound", "/src/assets/musique_ascenseur.mp3");

  }

  create() {
    this.soundElevator = this.sound.add("ascenseur_sound", { loop: false, volume: 0.5 });
    this.soundElevator.play();
    let background = this.add.image(0, 0, "menu_fond").setOrigin(0); // Positionnement en haut à gauche
    background.setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Redimensionner l'image pour couvrir toute la scène

    // Si tu veux centrer le fond (en le redimensionnant pour couvrir l'écran) :
    // background.setOrigin(0.5, 0.5); // Définir l'origine de l'image au centre
    // background.setPosition(this.cameras.main.centerX, this.cameras.main.centerY); // Positionner l'image au centre

    // on ajoute un bouton de clic, nommé bouton_play
    var bouton_play = this.add.image(this.cameras.main.centerX, 300, "imageBoutonPlay").setDepth(1);

    // Redimensionner le bouton si nécessaire pour ne pas qu'il soit trop gros
    bouton_play.setScale(1); // Réduire la taille du bouton

    //=========================================================
    //on rend le bouton interratif
    bouton_play.setInteractive();

    //Cas ou la souris passe sur le bouton play
    bouton_play.on("pointerover", () => {
      bouton_play.setScale(1.2);
      this.tweens.add({
        targets: bouton_play,
        x: bouton_play.x + 5, // Bouge un peu à droite
        yoyo: true, // Revient à sa position initiale
        duration: 100
      });
    });

    //Cas ou la souris ne passe plus sur le bouton play
    bouton_play.on("pointerout", () => {
      bouton_play.setScale(1);
    });


    //Cas ou la sourris clique sur le bouton play :
    // on lance le niveau 1
    bouton_play.on("pointerup", () => {
      this.soundElevator.stop(); 
      this.scene.start("niveau1");
    });
  }
} 