class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.image('title', './assets/title.png');
        this.load.image('bg', './assets/seabackground.png');
        this.load.audio('bg_music', './assets/Background_Music_1.wav');
        this.load.audio('chomp', './assets/Fish_2.wav');
        this.load.audio('fishing', './assets/Hook_2.wav');
        this.load.audio('trash', './assets/Trash_2.wav');
        this.load.audio('shock', './assets/eel_2.wav');
    }

    create(){
        let menuConfig = {
            fontFamily: 'monospace',
            fontSize: '28px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.bg = this.add.tileSprite(0, 0, 640, 480, 'bg').setOrigin(0, 0);
        this.title = this.add.tileSprite(0, 0, 640, 480, 'title').setOrigin(0, 0);
        this.add.text(game.config.width/2, game.config.height/2+100, 'Use ↑↓ arrows to control the shrimp', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize+borderPadding+100, 'Press P to start', menuConfig).setOrigin(0.5);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyP)){
            this.scene.start("playScene");
        }
    }
}