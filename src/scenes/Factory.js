class Factory extends Phaser.Scene{
    constructor(){
        super("factoryScene");
    }
    create(){
        this.width = 1280;
        this.height = 720;
        this.VELOCITY = 1000;
        this.cameras.main.setBackgroundColor('#666');
        this.cameras.main.setBounds(0, 0, 2239, this.height);
        this.cameras.main.setZoom(1);
        this.cameras.main.setScroll(0, this.height);

        this.add.image(0, 0, 'factory').setOrigin(0);
        this.door = this.add.rectangle(2100, 400, 200, 300, 0x000000);
        this.door.visible = false;

        this.ground = this.add.group();
        this.groundSprite = this.physics.add.sprite(1120, this.height-120, 'ground2').setScale(1);
        this.groundSprite.body.immovable = true;
        this.groundSprite.body.allowGravity = false;
        this.ground.add(this.groundSprite);

        cursors = this.input.keyboard.createCursorKeys();
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        
        this.createAnimation();

        this.npc1 = this.physics.add.sprite(450, 400, 'carter').setScale(0.8);
        this.npc2 = this.physics.add.sprite(1600, 400, 'greig').setScale(0.8);
        this.player = this.physics.add.sprite(2000, 400, 'player_atlas', 'idle_left_0001').setScale(0.8);
        this.player.body.setCollideWorldBounds(true);
        this.physics.world.setBounds( 0, 0, 2239, 720);
        this.player.body.onWorldBounds = true;   
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.npc1, this.ground);
        this.physics.add.collider(this.npc2, this.ground);

        this.f = this.add.image(100, 300,'f').setScale(0.5);
        this.f.visible = false;
        this.text01 = new Textbox(this, 650, 600,'textbox');
        this.text01.visible = false;
        this.fcount = 0;

        this.text1 = ["Work is tough, but I do it all for my daughter Haley.", "Hopefully the Elevate I’ve been taking will kick in soon."];
        this.text2 = ["Do I know anything about Elevate?", "Sure I do. I’ve been taking it for months now, it’s an absolutely amazing drug. Completely got rid of my depression. Lately it also feels like it’s been making me get my work done twice as fast!", 
            "I feel as spry as a young gazelle prancing through the fields at full speed.",
            "Why do you ask? Brian said I had some, didn’t he. That motherfucker, I knew he’d do something like that, he’s always been a no good –",
            "Oh…",
            "He told you I knew where to find some…",
            "…Well in that case yeah I know who sells some. I think he’s actually out on a run for a new client right now.",
            "I think she lives at the edge of town near the forest. You’ll find my supplier Frank there now probably. Have a terrific day stranger!"];
        this.text3 = ["Where did Carter go? Not sure, he was supposed to be here for the rest of the day.",
            "Why don’t you go ask the people in town if they’ve seen anything."];
        this.text4 = ["Hey! Any luck finding Carter?",
            "He’s turned into a hideous monster and ran out into the forest?!",
            "And my daughter just started taking Elevate too. Thank you so much for letting me know…",
           "…Am I gonna do anything about it? Well, Elevate really works. I mean it’s just begun to really kick in for me and I can’t imagine my life without it now. This work would just be too hard.",
            "Either way, my family ends up starving or turning into monsters, so might as well stay happy doing it."];
    }

    update(){
        this.npc1.anims.play('carteridle', true);
        if(Frank == 1){
            this.npc1.visible = false;
            this.npc2.x = 450;
        }
        if(Phaser.Input.Keyboard.JustDown(keyM)){
            this.scene.start("menuScene");
        }
        if(cursors.left.isDown && this.text01.visible == false) {
            this.player.body.setVelocityX(-this.VELOCITY);
            this.player.anims.play('walk_left', true);

        } else if(cursors.right.isDown && this.text01.visible == false) {
            this.player.body.setVelocityX(this.VELOCITY);
            this.player.anims.play('walk_right', true);

        } else if (!cursors.right.isDown && !cursors.left.isDown) {
            this.player.body.setVelocityX(0);
            // add code for idle animation play here:
            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'walk_left') {
                this.player.anims.play('idle_left');
            }
            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'walk_right') {
               this.player.anims.play('idle_right');
            }
   
        }if(this.checkOverlap(this.player, this.door) == true){
            this.f.x = 2100;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.scene.start("townScene");
            }
        }
        
        if(this.checkOverlap(this.player, this.npc1) == true && this.npc1.visible == true){
            this.f.x = 450;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(this.fcount<1 && Brian == 0){
                    this.text01.x = 700;
                    this.text01.visible = true;
                    this.text01.loadText("Whew! Work is hard but Elevate makes everything easier.", "Carter");
                    this.fcount++;
                }else if(this.fcount<7 && Brian == 1){
                    this.text01.x = 700;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text2), "Carter");
                    this.fcount++;
                }else if (this.fcount==7 && Brian == 1){
                    this.text01.hideText();
                    this.text01.boldText(this.text01.switchText(this.fcount, this.text2), "Carter");
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                    if(Brian == 1){
                        Carter = 1;
                    }
                }
            }

        }if(this.checkOverlap(this.player, this.npc2) == true && this.npc1.visible == true){
            this.f.x = 1600;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(this.fcount<2){
                    this.text01.x = 1600;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text1), "Greig");
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                }
            }
        }if(this.checkOverlap(this.player, this.npc2) == true && this.npc1.visible == false){
            this.f.x = 450;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(this.fcount<1 && Monster == 0){
                    this.text01.x = 700;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text3), "Greig");
                    this.fcount++;
                }else if(this.fcount==1 && Monster == 0){
                    this.text01.hideText();
                    this.text01.boldText(this.text01.switchText(this.fcount, this.text3), "Greig");
                    this.fcount++;
                }else if (this.fcount < 5 && Monster == 1){
                    this.text01.x = 700;
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text4), "Greig");
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                    Greig = 1;
                    if(Monster == 1){
                        Greig = 2;
                    }
                }
            }
        }
        if(!this.checkOverlap(this.player, this.npc1) && !this.checkOverlap(this.player, this.npc2) && !this.checkOverlap(this.player, this.door)){
            this.f.visible = false;
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
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'carteridle',
            frames: this.anims.generateFrameNumbers('carter_idle', {start: 0, end: 3, first: 0}),
            frameRate: 4,
            repeat: -1
        })
    }
}