class Town extends Phaser.Scene{
    constructor(){
        super("townScene");
    }
    create(){
        this.width = 1280;
        this.height = 720;
        this.VELOCITY = 1000;
        this.cameras.main.setBackgroundColor('#666');
        this.cameras.main.setBounds(0, 0, 4532, this.height);
        this.cameras.main.setZoom(1);
        this.cameras.main.setScroll(0, this.height);

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

        //create animation
        this.createAnimation();

        this.npc = this.physics.add.sprite(2100, 400, 'char2').setScale(0.8);
        this.npc2 = this.physics.add.sprite(2900, 400, 'char2').setScale(0.8);
        this.npc3 = this.physics.add.sprite(800, 400, 'char2').setScale(0.8);
        this.npc4 = this.physics.add.sprite(3500, 400, 'char2').setScale(0.8);
        this.npc5 = this.physics.add.sprite(3600, 400, 'char2').setScale(0.8);
        this.npc5.visible = false;
        this.physics.add.collider(this.npc, this.ground);
        this.physics.add.collider(this.npc2, this.ground);
        this.physics.add.collider(this.npc3, this.ground);
        this.physics.add.collider(this.npc4, this.ground);
        this.physics.add.collider(this.npc5, this.ground);
        
        this.player = this.physics.add.sprite(1550, 400, 'player_atlas', 'idle_right_0001').setScale(0.8);
        this.physics.world.setBounds( 0, 0, 4532, 720);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;   
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.ground);
        
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
        this.text3 = ["Hello Miss. Were you looking to buy some Elevate?",
        "Great! If you don’t mind me asking who recommended you to me?",
        "Ahhh yes Carter! One of my best customers. He’s been coming to me for years. And what a spectacular change to his life it’s made.",
        "You know, I actually think I have Carter's next bottle here with me. Would you mind running it back to him for me?",
        "Thank you so much! Makes my job ten times easier. Carter doesn’t get off for another hour so he should still be in the Factory. Farewell!"];
        this.text4 = ["Hiya friend!",
            "Have I seen Carter? No sorry sorry not since the last time we played chess together actually. It’s been three, maybe four months?", 
            "He kind of started becoming distant since then. Hope everything is alright. Sorry to be such a debbie downer, might have to start upping my dose on Elevate.",
            "Can’t keep ruining people’s day with bad news like that."];
    }

    update(){
        //this.npc.anims.play('char3');
        if(cursors.left.isDown && this.text01.visible == false) {
            this.player.body.setVelocityX(-this.VELOCITY);
            this.player.anims.play('walk_left', true);
            //this.player.anims.play('run_left', true);

        } else if(cursors.right.isDown && this.text01.visible == false) {
            this.player.body.setVelocityX(this.VELOCITY);
            this.player.anims.play('walk_right', true);
            //this.player.anims.play('run_right', true);

        } else if (!cursors.right.isDown && !cursors.left.isDown) {
            this.player.body.setVelocityX(0);
            // add code for idle animation play here:
            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'walk_left') {
                this.player.anims.play('idle_left');
            }
            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'walk_right') {
               this.player.anims.play('idle_right');
            }
   
        }
        if(Carter == 1 && Greig != 1){
            this.npc5.visible = true;
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
                if(Carter == 0 && this.fcount<6){
                    this.text01.x = 2100;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.texts));
                    this.fcount++;
                }else if(Carter == 1 && this.fcount < 2 && Greig == 0){
                    this.text01.x = 2100;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text2));
                    this.fcount++;
                }else if (Greig == 1 && this.fcount <4){
                    this.text01.x = 2100;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text4));
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                    Brian = 1;
                }
            }
                //textbox code
        }if(this.checkOverlap(this.player, this.npc4) == true){
            this.f.x = 3500;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(Carter == 0 && this.fcount<1){
                    this.text01.x = 3500;
                    this.text01.visible = true;
                    this.text01.loadText("Daddy says I’m not allowed to talk to strangers, but he also says I’m not allowed to eat ice cream in bed so what does he know.");
                    this.fcount++;
                }else if(Carter == 1 && this.fcount <1){
                    this.text01.x = 3500;
                    this.text01.visible = true;
                    this.text01.loadText("I’m so excited to finally start Elevate for myself. Daddy says I’m too young but I don’t care.");
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                }
            }
        }if(this.checkOverlap(this.player, this.npc5) == true && this.npc5.visible == true){
            this.f.x = 3600;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(this.fcount<5){
                    this.text01.x = 3600;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text3));
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                    Frank = 1;
                }
            }
        }
        
        if(!this.checkOverlap(this.player, this.npc) && !this.checkOverlap(this.player, this.factory) && !this.checkOverlap(this.player, this.npc4) && !(this.checkOverlap(this.player, this.npc5)&& this.npc5.visible == true)){
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
    
    createAnimation(){
        this.anims.create({
            key: 'idle_left',
            frames: this.anims.generateFrameNames('player_atlas', {
                prefix: 'idle_left_',
                start: 1,
                end: 15,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1,
            repeatDelay: 5000,
            yoyo: true
        });

        this.anims.create({
            key: 'idle_right',
            frames: this.anims.generateFrameNames('player_atlas', {
                prefix: 'idle_right_',
                start: 1,
                end: 15,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1,
            repeatDelay: 5000,
            yoyo: true
        });

        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNames('player_atlas', {
                prefix: 'walk_left_',
                start: 1,
                end: 12,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNames('player_atlas', {
                prefix: 'walk_right_',
                start: 1,
                end: 12,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'char3',
            frames: this.anims.generateFrameNumbers('char3', {start: 0, end: 11, first: 0}),
            frameRate: 1,
            repeat: -1
        });
    }
}