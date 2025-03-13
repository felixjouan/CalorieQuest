// chargement des librairies
import audio from "/src/js/main/audio.js";
import p_acceuil from "/src/js/scene/p_acceuil.js";
import niveau1 from "/src/js/scene/niveau1.js";
import selection from "/src/js/selection.js";
import niveau2 from "/src/js/scene/niveau2.js";


// configuration générale du jeu
var config = {
  type: Phaser.AUTO,
  width: 800, // largeur en pixels
  height: 600, // hauteur en pixels
  physics: {
    // définition des parametres physiques
    default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
    arcade: {
      // parametres du mode arcade
      gravity: {
        y: 300 // gravité verticale : acceleration ddes corps en pixels par seconde
      },
      debug: true // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
    }
  },
  scene: [audio,p_acceuil,niveau1, selection, niveau2, ]
};

// création et lancement du jeu
var game = new Phaser.Game(config);
game.scene.start("p_acceuil");
