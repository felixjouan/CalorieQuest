export default class AudioManager {
    constructor(scene) {
        this.scene = scene;
    }

    preload() {
        this.scene.load.audio("musique_1", "assets/globalmusique.mp3");
        this.scene.load.audio("ascenseur_sound", "assets/musique_ascenseur.mp3");
    }

    create() {
        var sound1;
        var sound_elevator;
        sound1 = this.scene.sound.add('musique_1');
        sound_elevator=this.scene.sound.add('ascenseur_sound');
        sound_elevator.play();

        
    }
}