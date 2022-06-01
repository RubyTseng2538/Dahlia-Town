class Load extends Phaser.Scene{
    constructor(){
        super('loadScene');
    }

    preload(){
        // set load path
        this.load.path = 'assets/'

        // load background
        this.load.image('background', 'bg.png');
        this.load.image('factory', 'factory.png');
        this.load.image('forest', 'forest.png');

        //load floor
        this.load.image('ground', 'ground.png');
        this.load.image('ground2', 'factoryfloor.png');
        this.load.image('ground3', 'forestfloor.png');

        //load other
        this.load.image('f', 'fkey.png');
        this.load.image('textbox', 'textbox.png');
        this.load.image('title', 'title.png');
        this.load.image('fence', 'fence_blood.png');
        this.load.image('blood1', 'bloodspatter1.png');
        this.load.image('blood2', 'bloodspatter2.png');
        this.load.image('blood3', 'bloodspatter3.png');
        this.load.image('blood4', 'bloodspatter4.png');
        
        // load character
        this.load.atlas('player_atlas', 'playeratlas2.png', 'playeratlas2.json');
        this.load.image('brian', 'brian.png');
        this.load.image('carter', 'carter.png');
        this.load.image('frank', 'frank.png');
        this.load.image('greig', 'greig.png');
        this.load.image('haley', 'haley.png');
        this.load.image('delilah', 'delilah2.png');
        this.load.image('emma', 'emma2.png');
        this.load.image('monster_still', 'monster-1.png');
        this.load.image('simon', 'first_mate.png');

        this.load.spritesheet('char3', 'delilah.png', 
            {frameWidth: 123, frameHeight: 205, startFrame: 0, endFrame: 11});

        this.load.spritesheet('char4', 'emma.png', 
            {frameWidth: 123, frameHeight: 205, startFrame: 0, endFrame: 3});

        this.load.spritesheet('monster', 'monster.png',
            {frameWidth: 500, frameHeight: 300, startFrame: 0, endFrame: 10});
        
        this.load.spritesheet('brian_idle', 'brianidle.png', 
            {frameWidth: 123, frameHeight: 205, startFrame: 0, endFrame: 3});

        this.load.spritesheet('carter_idle', 'carteridle.png', 
            {frameWidth: 123, frameHeight: 205, startFrame: 0, endFrame: 3});

        this.load.spritesheet('simon_walk', 'first_mate_walk.png', 
            {frameWidth: 123, frameHeight:205, startFrame:0, endFrame: 11});
        
        //load audio here
        this.load.audio('bg_music', 'music1.mp3');
    }

    create() {
        // after load complete -> move to menu scene
        this.scene.start('menuScene');
    }
}