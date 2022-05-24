class Town extends Phaser.Scene{
    constructor(){
        super("townScene");
    }
    create(){
        const gui = new dat.GUI();
        this.width = 1280;
        this.height = 720;
        this.VELOCITY = 1000;
        this.cameras.main.setBackgroundColor('#666');
        this.cameras.main.setBounds(0, 0, 4532, this.height);
        this.cameras.main.setZoom(1);
        this.cameras.main.setScroll(0, this.height);

        gui.addFolder("Main Camera");
        gui.add(this.cameras.main, 'scrollX');
        gui.add(this.cameras.main, 'scrollY');
        gui.add(this.cameras.main, 'zoom');

        this.add.image(0, 0, 'background').setOrigin(0);
        this.factory = this.add.image(0, 0, 'factoryentry').setOrigin(0);

        //add ground
        this.ground = this.add.group();
        this.groundSprite = this.physics.add.sprite(2265, this.height-120, 'ground').setScale(1);
        this.groundSprite.body.immovable = true;
        this.groundSprite.body.allowGravity = false;
        this.ground.add(this.groundSprite);


        //cursor
        cursors = this.input.keyboard.createCursorKeys();
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        this.npc = this.physics.add.sprite(2100, 400, 'char2').setScale(0.8);
        this.player = this.physics.add.sprite(1550, 400, 'mc').setScale(0.8);
        this.physics.world.setBounds( 0, 0, 4532, 720);
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
        this.music = this.sound.add('bg_music', musicConfig);
        this.music.play();
        // set up animations
        //this.goodEnding = false;
        
        this.f = this.add.image(100, 300,'f').setScale(0.5);
        this.f.visible = false;
        this.text01 = new Textbox(this, 2100, 600,'textbox');
        this.text01.visible = false;
        this.fcount = 0;
        this.texts = ["Hiya! Whatcha up to today?", "Oh, you’re looking for Elevate?", "Well my buddy Carter actually introduced me to it a while ago.", "We were playing chess after a long day at work. He brought over some homemade lemon squares and Elevate and we had a grand ole time.", "Can’t remember where he got it from though.", "I think he works in the factory. Why don’t you try asking Carter about it, he’ll probably know more than me."];
        this.text2 = ["Hiya! How’d it go with Carter?", "Well glad you found him. Can’t wait for another game of chess, it’s been a while."];
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
        if(this.checkOverlap(this.player, this.factory) == true){
            this.f.x = 150;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.scene.start("factoryScene");
                this.music.stop();
            }
        }
        /*if(Phaser.Input.Keyboard.JustDown(keyF) && (this.checkCollision(player, factory))){
            this.scene.start("alleyScene");
            music.stop();
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && (this.checkCollision(player, factory))){
            this.scene.start("woodsScene");
            music.stop();
        }*/
        if(this.checkOverlap(this.player, this.npc) == true){
            this.f.x = 2100;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(this.fcount<6 && game.config.Carter == 0){
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.texts));
                    this.fcount++;
                }else if(this.fcount < 2 && game.config.Carter == 1){
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text2));
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                    game.config.Brian = 1;
                }
            }
                //textbox code
        }if(!this.checkOverlap(this.player, this.npc) && !this.checkOverlap(this.player, this.factory)){
            this.f.visible = false;
        }if(Phaser.Input.Keyboard.JustDown(keyM)){
            music.stop();
            this.scene.start("menuScene");
        }
    }

    checkOverlap(A,  B){
        var boundA = A.getBounds();
        var boundB = B.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundA, boundB);
    }
    
}