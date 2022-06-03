class EndScene extends Phaser.Scene{
    constructor(){
        super("endScene");
    }

    create(){
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let menuConfig2 = {
            fontFamily: 'Georgia',
            fontSize: '28px',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2, 'What should we do from here?', menuConfig).setOrigin(0.5);
        this.time.delayedCall(6000, ()=>{
            this.add.text(game.config.width/2, game.config.height/2 + 100, 'Press M to go back to menu', menuConfig2).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 130, 'Press C for credit', menuConfig2).setOrigin(0.5);
        });

        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyM)){
            this.reset();
            this.scene.start("menuScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)){
            this.reset();
            this.scene.start("creditScene");
        }
    }

    reset(){
        Brian = 0;
        Carter = 0;
        Greig = 0;
        Haley = 0;
        Frank = 0;
        Delilah = 0;
        Emma = 0;
        Monster = 0;
        Simon = 0;
    }
}