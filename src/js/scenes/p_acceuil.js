export default class p_acceuil extends Phaser.scenes {
    constructor() {
      super({ key: "menu" });
    }
    //on charge les images
    preload() {
      this.load.image("menu_fond", "assets/imagemario.jpg");
      this.load.image("imageBoutonPlay", "assets/play-button.png");
    }
  
    create() {
     // on place les éléments de fond
      this.add
        .image(0, 0, "menu_fond")
        .setOrigin(0)
        .setDepth(0);
  
      //on ajoute un bouton de clic, nommé bouton_play
      var bouton_play = this.add.image(300, 450, "imageBoutonPlay").setDepth(1);
     
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
        this.scene.start("niveau 1");
      });
    }
  } 