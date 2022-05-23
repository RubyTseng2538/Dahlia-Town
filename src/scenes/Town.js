class Town extends Phaser.Scene{
    constructor(){
        super("townScene");
    }
    create(){
        const gui = new dat.GUI();
        this.width = 1280;
        this.height = 720;
        this.VELOCITY = 200;
        this.cameras.main.setBackgroundColor('#666');
        this.cameras.main.setBounds(0, 0, 1400, this.height);
        this.cameras.main.setZoom(1);
        this.cameras.main.setScroll(0, this.height);

        gui.addFolder("Main Camera");
        gui.add(this.cameras.main, 'scrollX');
        gui.add(this.cameras.main, 'scrollY');
        gui.add(this.cameras.main, 'zoom');

        this.add.image(0, 0, 'background').setOrigin(0);

        //add ground
        this.ground = this.add.group();
        this.groundSprite = this.physics.add.sprite(500, this.height, 'ground').setScale(1);
        this.groundSprite.body.immovable = true;
        this.groundSprite.body.allowGravity = false;
        this.ground.add(this.groundSprite);


        //cursor
        cursors = this.input.keyboard.createCursorKeys();
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        this.npc = this.physics.add.sprite(600, 448, 'char2').setScale(0.5);
        this.player = this.physics.add.sprite(200, 448, 'mc').setScale(0.5);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;   
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.npc, this.ground);
        let musicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        let music = this.sound.add('bg_music', musicConfig);
        music.play();
        // set up animations
        //this.goodEnding = false;
        
        this.f = this.add.image(600, 450,'f').setScale(0.5);
        this.f.visible = false;
        this.text01 = new Textbox(this, 650, 600,'textbox');
        this.text01.visible = false;
        this.fcount = 0;
        this.texts = ["Hey! Haven’t seen you in a while. How are you?", "I’m doing great too!"];
    }

    update(){
        if(cursors.left.isDown && this.text01.visible == false) {
            this.player.body.setVelocityX(-this.VELOCITY);
            //this.player.anims.play('run_left', true);

        } else if(cursors.right.isDown && this.text01.visible == false) {
            this.player.body.setVelocityX(this.VELOCITY);
            //this.player.anims.play('run_right', true);

        } else if (!cursors.right.isDown && !cursors.left.isDown) {
            this.player.body.setVelocityX(0);
            // add code for idle animation play here:
   
        }
        /*if(Phaser.Input.Keyboard.JustDown(keyF) && (this.checkCollision(player, factory))){
            this.scene.start("factoryScene");
            music.stop();
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && (this.checkCollision(player, factory))){
            this.scene.start("alleyScene");
            music.stop();
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && (this.checkCollision(player, factory))){
            this.scene.start("woodsScene");
            music.stop();
        }*/
        if(this.checkOverlap(this.player, this.npc) == true){
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(this.fcount<2){
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.texts));
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                }
            }
                //textbox code
        }if(!this.checkOverlap(this.player, this.npc)){
            this.f.visible = false;
        }if(Phaser.Input.Keyboard.JustDown(keyM)){
            music.stop();
            this.scene.start("menuScene");
        }
        this.physics.world.wrap(this.player, 0);
    }

    checkOverlap(A,  B){
        var boundA = A.getBounds();
        var boundB = B.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundA, boundB);
    }
    
}