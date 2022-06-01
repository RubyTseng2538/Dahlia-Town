class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
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
        this.add.image(0, 0, 'title').setOrigin(0);
       // this.title = this.add.tileSprite(0, 0, 640, 480, 'title').setOrigin(0, 0);
        this.add.text(game.config.width/2, game.config.height -100, 'Press F to start', menuConfig).setOrigin(0.5);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.sound.stopByKey('bg_music');
        play = false;
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.start("townScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)){
            this.scene.start("endScene");
        }
    }
}