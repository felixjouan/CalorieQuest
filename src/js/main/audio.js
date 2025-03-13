export default class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.sound1 = null;
        this.sound2 = null;
        this.soundElevator = null;
    }

    preload() {
        this.load.audio("musique_1", "/src/assets/globalmusique.mp3");
        this.load.audio("sound3", "/src/assets/sound3.mp3");
        this.load.audio("ascenseur_sound", "/src/assets/musique_ascenseur.mp3");
        this.load.audio("croc","/src/assets/croc.mp3");
    }

    create() {
        
        this.sound1 = this.sound.add("musique_1", { loop: true, volume: 0.5 });
        this.sound2 = this.sound.add("sound3", { loop: true, volume: 0.5 });
        this.sound_elevator=this.sound.add("ascenseur_sound", { loop: false, volume: 0.5 });
        
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
