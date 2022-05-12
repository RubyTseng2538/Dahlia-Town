class Play extends Phaser.Scene{
    constructor(){
        super("townScene");
    }
    preload(){
        ;
    }

    create(){
        this.camera.main.setBounds(0, 0, game.config.width, game.config.height);
        this.add.tileSprite(0, 0, x, y, 'map').setOrigin(0);
        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(0, 0);

        //add ground
        this.ground = this.add.group();
        this.groundSprite = this.physics.add.sprite(0, game.config.height - this.GROUND_HEIGHT, 'ground').setScale(2);
        this.groundSprite.body.immovable = true;
        this.groundSprite.body.allowGravity = false;
        this.ground.add(this.groundSprite);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        //cursor
        cursors = this.input.keyboard.createCursorKeys();
        /*let musicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        let music = this.sound.add('bg_music', musicConfig);
        music.play(); // seaweed */
        // set up animations

        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'character').setScale(1);
        //this.goodEnding = false;
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyF) && ()){
            this.scene.start("factoryScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && ()){
            this.scene.start("alleyScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && ()){
            this.scene.start("woodsScene");
        }
        /*if(this.checkCollision(this.pShrimp, this.rockObs)){
            this.sound.play('chomp');
            this.gameOver = true;
        }*/
        
    }

    checkCollision(shrimp, obs){
        if(shrimp.x<obs.x+obs.width &&
           shrimp.x + shrimp.width > obs.x &&
           shrimp.y < obs.y + obs.height &&
           shrimp.height + shrimp.y > obs.y){
               return true;
        }else{
            return false;
        }
    }
}