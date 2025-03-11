export default class AudioManager {
    constructor(scene) {
        this.scene = scene;
    }

    preload() {
        this.scene.load.audio("musique_menu", "assets/son/musique_menu.mp3");
        this.scene.load.audio("clic_bouton", "assets/son/clic.mp3");
    }

    create() {
        this.musiqueMenu = this.scene.sound.add("musique_menu", { loop: true });
        this.clicBouton = this.scene.sound.add("clic_bouton");
    }