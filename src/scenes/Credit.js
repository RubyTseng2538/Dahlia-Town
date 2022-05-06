class Credit extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }
    preload(){
        this.load.image('bg', './assets/seabackground.png');
    }

    create(){
        let creditConfig = {
            fontFamily: 'monospace',
            fontSize: '28px',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixWidth: 0
        }
        let creditConfig2 = {
            fontFamily: 'monospace',
            fontSize: '18px',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixWidth: 0
        }
        this.bg = this.add.tileSprite(0, 0, 640, 480, 'bg').setOrigin(0, 0);
        this.add.text(game.config.width/2, game.config.height/2-100, 'Game Over', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 -70, 'Your Score:'+game.config.point, creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 -30, 'Credit', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +10, 'Design: Patrick Queiroz', creditConfig2).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +40, 'Code: Ruby Tseng', creditConfig2).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +70, 'Art: Emery Plyler', creditConfig2).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +100, 'Music: Patrick Queiroz', creditConfig2).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +130, 'Press R to restart', creditConfig).setOrigin(0.5);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.add.text(game.config.width/2, game.config.height/2 +160, 'Press M to menu', creditConfig).setOrigin(0.5);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.sound.stopByKey('bg_music');
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start("playScene");
        }if(Phaser.Input.Keyboard.JustDown(keyM)){
            this.scene.start("menuScene");
        }
    }
}