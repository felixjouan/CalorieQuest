export default class AudioManager {
    constructor(scene) {
        this.scene = scene;
    }

    preload() {
        this.load.audio("musique_1", "assets/globalmusique.mp3");
        this.load.audio("ascenseur_sound", "assets/musique_ascenseur.mp3");
    }

    create() {
        this.musiqueMenu = this.scene.sound.add("musique_menu", { loop: true });
        this.clicBouton = this.scene.sound.add("clic_bouton");
    }