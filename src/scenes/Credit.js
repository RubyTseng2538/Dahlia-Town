class Credit extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }

    create(){
        let creditConfig = {
            fontFamily: 'Georgia',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixWidth: 0
        }
        let creditConfig2 = {
            fontFamily: 'Georgia',
            fontSize: '28px',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 -100, 'Credit', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 -50, 'Design: Patrick Queiroz', creditConfig2).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 -10, 'Code: Ruby Tseng', creditConfig2).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +30, 'Art: Emery Plyler', creditConfig2).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +70, 'Music: Patrick Queiroz', creditConfig2).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +120, 'Press M to menu', creditConfig).setOrigin(0.5);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.sound.stopByKey('bg_music');
        play = false;
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyM)){
            this.scene.start("menuScene");
        }
    }
}