class Load extends Phaser.Scene{
    constructor(){
        super('loadScene');
    }

    preload(){
        // set load path
        this.load.path = 'assets/';

        // load things here
    }

    create() {
        // after load complete -> move to menu scene
        this.scene.start('menuScene');
    }
}