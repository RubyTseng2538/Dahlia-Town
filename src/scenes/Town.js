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
        this.wood = this.add.image(4350, 0, 'forestdoor').setOrigin(0);

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

        this.npc = this.physics.add.sprite(2100, 400, 'brian').setScale(0.8);
        this.npc2 = this.physics.add.sprite(2900, 400, 'delilah').setScale(0.8);
        this.npc3 = this.physics.add.sprite(800, 400, 'emma').setScale(0.8);
        this.npc4 = this.physics.add.sprite(3500, 400, 'haley').setScale(0.8);
        this.npc5 = this.physics.add.sprite(3600, 400, 'frank').setScale(0.8);
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
        const music = this.sound.add('bg_music', musicConfig);
        if(play == false){
            console.log('music is not playing');
            music.play();
            play = true;
        }
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
        this.text5 = ["Has my husband gone missing? You know he hasn’t been home in months, but I’m sure he’s just off having fun.",
            "Am I worried at all? Well why would I be? He’s a grown man who can take care of himself. Elevate seems to have made my claws slightly sharper so John should be prepared to take on anything if that happened to him too.",
            "You know now that you say something I guess Carter may have gone into the forest too. That’s where I remember seeing my husband go off to when he left town.",
            "You should check the forest for clues about Carter."];
        this.text6 = ["Sure I know about Elevate, but what you really want to know about is how every day at 6am on the dot, Brian leaves his house to go somewhere.",
            "Sure it might be to go to work, but that’s too simple. I think he has a secret lover in the neighboring town.",
            "Why do I think that? Well the smell of steak and womens perfume on his clothes slaps me in the face every time I’m about to hop into bed. And boy does that steak smell expensive.",
            "You didn’t hear that from me though."];
        this.text7 = ["What’s that you say? Carter’s gone missing? Now that’s some juicy gossip! Sorry, I haven't heard anything about Carter though.",
        "I did hear that something very similar happened to Emma though with her husband. One day he just got up and left town, never was seen again.",
        "I’d talk to Emma about her missing husband John. She might know more than I do. And if there’s anything good, let me know all about it, hehe."];
    }

    update(){
        this.npc2.anims.play('char3', true);
        this.npc3.anims.play('char4', true);
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
            }
        }
        if((this.checkOverlap(this.player, this.wood))){
            this.f.x = 4350;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                /*if(Emma == 1){*/
                    this.scene.start("woodsScene");
                /*}else if(this.fcount <1){
                    this.text01.x = 4000;
                    this.text01.visible = true;
                    this.text01.loadText("You don't have time to stroll in the woods right now.");
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                }*/
            }
        }
        if(this.checkOverlap(this.player, this.npc) == true){
            this.f.x = 2100;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(Carter == 0 && this.fcount<5){
                    this.text01.x = 2100;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.texts), "Brian");
                    this.fcount++;
                }else if(Carter == 0 && this.fcount==5){
                    this.text01.hideText();
                    this.text01.boldText(this.text01.switchText(this.fcount, this.texts), "Brian");
                    this.fcount++;
                }
                else if(Carter == 1 && this.fcount < 2 && Greig == 0){
                    this.text01.x = 2100;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text2), "Brian");
                    this.fcount++;
                }else if (Greig == 1 && this.fcount <4){
                    this.text01.x = 2100;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text4), "Brian");
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                    Brian = 1;
                }
            }
                //textbox code
        }if(this.checkOverlap(this.player, this.npc2) == true){
            this.f.x = 2900;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(Greig == 0 && this.fcount<4){
                    this.text01.x = 2900;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text6), "Delilah");
                    this.fcount++;
                }else if(this.fcount < 2 && Greig == 1){
                    this.text01.x = 2900;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text7), "Delilah");
                    this.fcount++;
                }else if (this.fcount == 2 && Greig == 1){
                    this.text01.hideText();
                    this.text01.boldText(this.text01.switchText(this.fcount, this.text7), "Delilah");
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                    if(Greig == 1){
                        Delilah = 1;
                    }
                }
            }
        }if(this.checkOverlap(this.player, this.npc3) == true){
            this.f.x = 800;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(this.fcount<1 && Greig == 0){
                    this.text01.x = 800;
                    this.text01.visible = true;
                    this.text01.loadText("What a beautiful day out today, huh? Elevate seems to just make the sun shine brighter and the flowers smell sweeter.", "Emma");
                    this.fcount++;
                }else if(this.fcount < 1 && Greig == 1){
                    this.text01.x = 800;
                    this.text01.visible = true;
                    this.text01.loadText("Sorry, say that again? Carter’s gone missing? Well I’m sure you’ll find him soon!", "Emma");
                    this.fcount++;
                }else if (Delilah == 1 && this.fcount <3){
                    this.text01.x = 800;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text5), "Emma");
                    this.fcount++;
                }else if(Delilah == 1 && this.fcount ==3){
                    this.text01.hideText();
                    this.text01.boldText(this.text01.switchText(this.fcount, this.text5), "Emma");
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                    if(Delilah == 1){
                        Emma = 1;
                    }
                }
            }
        }if(this.checkOverlap(this.player, this.npc4) == true){
            this.f.x = 3500;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(Carter == 0 && this.fcount<1){
                    this.text01.x = 3500;
                    this.text01.visible = true;
                    this.text01.loadText("Daddy says I’m not allowed to talk to strangers, but he also says I’m not allowed to eat ice cream in bed so what does he know.", "Haley");
                    this.fcount++;
                }else if(Carter == 1 && this.fcount <1){
                    this.text01.x = 3500;
                    this.text01.visible = true;
                    this.text01.loadText("I’m so excited to finally start Elevate for myself. Daddy says I’m too young but I don’t care.", "Haley");
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
                if(this.fcount<4){
                    this.text01.x = 3600;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text3), "Frank");
                    this.fcount++;
                }else if(this.fcount==4){
                    this.text01.hideText();
                    this.text01.boldText(this.text01.switchText(this.fcount, this.text3), "Frank");
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                    Frank = 1;
                }
            }
        }
        
        if(!this.checkOverlap(this.player, this.npc) && !this.checkOverlap(this.player, this.factory) && !this.checkOverlap(this.player, this.npc4) && !(this.checkOverlap(this.player, this.npc5)&& this.npc5.visible == true) && !this.checkOverlap(this.player, this.npc2) && !this.checkOverlap(this.player, this.npc3) && !this.checkOverlap(this.player, this.wood)){
            this.f.visible = false;
        }if(Phaser.Input.Keyboard.JustDown(keyM)){
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
            frameRate: 10,
            repeat: -1,
            repeatDelay: 3000,
            yoyo: true
        });

        this.anims.create({
            key: 'char4',
            frames: this.anims.generateFrameNumbers('char4', {start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1,
            repeatDelay: 1000,
            yoyo: true
        });
    }
}