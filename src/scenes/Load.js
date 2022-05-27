class Load extends Phaser.Scene{
    constructor(){
        super('loadScene');
    }

    preload(){
        // set load path
        this.load.path = 'assets/'
        // load things here
        this.load.atlas('player_atlas', 'playeratlas.png', 'playeratlas.json');
        this.load.image('background', 'bg.png');
        this.load.image('f', 'fkey.png')
        this.load.image('ground', 'ground.png');
        this.load.image('textbox', 'textbox.png');
        this.load.image('p1', 'profile1.png');
        this.load.image('p2', 'profile2.png');
        this.load.image('factoryentry', 'factoryentry.png');
        this.load.image('factory', 'factory.png');
        this.load.image('ground2', 'factoryfloor.png');
        this.load.image('factorydoor', 'factorydoor.png');
        this.load.image('forestdoor', 'forestdoor.png');
        this.load.image('forest', 'forest.png');
        this.load.image('ground3', 'forestfloor.png');
        this.load.image('towndoor', 'towndoor.png');
        this.load.image('brian', 'brian.png');
        this.load.image('carter', 'carter.png');
        this.load.image('frank', 'frank.png');
        this.load.image('greig', 'greig.png');
        this.load.image('haley', 'haley.png');
        this.load.image('delilah', 'delilah2.png');
        this.load.image('emma', 'emma2.png');

        this.load.spritesheet('char3', 'delilah.png', 
            {frameWidth: 123, frameHeight: 205, startFrame: 0, endFrame: 11});

        this.load.spritesheet('char4', 'emma.png', 
            {frameWidth: 123, frameHeight: 205, startFrame: 0, endFrame: 3});

        //load audio here
        this.load.audio('bg_music', 'music1.mp3');
    }

    create() {
        // after load complete -> move to menu scene
        this.scene.start('menuScene');
    }
}