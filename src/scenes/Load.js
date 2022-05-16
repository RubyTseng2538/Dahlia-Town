class Load extends Phaser.Scene{
    constructor(){
        super('loadScene');
    }

    preload(){
        // set load path
        this.load.path = 'assets/';
        // load things here
        this.load.image = ('bg', 'bg.png');
        this.load.image = ('mc', 'char1.png');
        this.load.image = ('char2', 'char2.png');
        this.load.image = ('f', 'fkey.png')
        this.load.image = ('ground', 'ground.png');
        this.load.image = ('textbox', 'textbox.png');
        this.load.image = ('p1', 'profile1.png');
        this.load.image = ('p2', 'profile2.png');
    }

    create() {
        // after load complete -> move to menu scene
        this.scene.start('menuScene');
    }
}