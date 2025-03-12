export default class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.sound1 = null;
        this.sound2 = null;
        this.soundElevator = null;
    }

    preload() {
        this.scene.load.audio("musique_1", "assets/globalmusique.mp3");
        this.scene.load.audio("sound3", "assets/sound3.mp3");
        this.scene.load.audio("ascenseur_sound", "assets/musique_ascenseur.mp3");
        this.scene.load.audio("croc","assets/croc.mp3");
    }

    create() {
        
        this.sound1 = this.scene.sound.add("musique_1", { loop: true, volume: 0.5 });
        this.sound2 = this.scene.sound.add("sound3", { loop: true, volume: 0.5 });
        this.sound_elevator=this.scene.sound.add("ascenseur_sound", { loop: false, volume: 0.5 });
        
        this.sound_elevator.play();
        
        this.sound1.on("complete", () => {  //sound2 se lance quand sound1 s arrete 
            this.playMusic2();
        });
 
    }

    
    stopElevatorAndPlayMusic1() {
        if (this.soundElevator && this.soundElevator.isPlaying) {
            this.soundElevator.stop(); // Arrête la musique d'ascenseur
        }
        this.playMusic1();
    }

    playMusic1() {
        if (this.sound1 && !this.sound1.isPlaying) {
            this.sound1.play();
        }
    }

    playMusic2() {
        if (this.sound2 && !this.sound2.isPlaying) {
            this.sound2.play();
        }
    }

    stopMusic2() {
        if (this.sound2 && this.sound2.isPlaying) {
            this.sound2.stop();
        }
    }
}
