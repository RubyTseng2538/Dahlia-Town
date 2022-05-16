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
        this.add.image(0, 0, 'background').setOrigin(0);
        this.add.image(0, 448, 'ground').setOrigin(0);
       // this.title = this.add.tileSprite(0, 0, 640, 480, 'title').setOrigin(0, 0);
        this.add.text(game.config.width/2, game.config.height/2+200, 'Use ←→ arrows to control the character', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 250, 'Press F to start', menuConfig).setOrigin(0.5);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.start("townScene");
        }
    }
}