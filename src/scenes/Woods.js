class Woods extends Phaser.Scene{
    constructor(){
        super("woodsScene");
    }
    create(){
        this.width = 1280;
        this.height = 720;
        this.VELOCITY = 500;
        this.cameras.main.setBackgroundColor('#666');
        this.cameras.main.setBounds(0, 0, 3537, this.height);
        this.cameras.main.setZoom(1);
        this.cameras.main.setScroll(0, this.height);

        this.add.image(0, 0, 'forest').setOrigin(0);

        this.ground = this.add.group();
        this.groundSprite = this.physics.add.sprite(1770, this.height-120, 'ground3').setScale(1);
        this.groundSprite.body.immovable = true;
        this.groundSprite.body.allowGravity = false;
        this.ground.add(this.groundSprite);

        cursors = this.input.keyboard.createCursorKeys();
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        this.createAnimation();

        this.npc = this.physics.add.sprite(1800, 400, 'simon').setScale(0.8);
        this.npc.visible = false;
        this.physics.add.collider(this.npc, this.ground);
        
        this.scratch = this.physics.add.sprite(700, 300, 'scratch');
        this.scratch.body.allowGravity = false;

        this.player = this.physics.add.sprite(200, 400, 'player_atlas', 'idle_right_0001').setScale(0.8);
        this.physics.world.setBounds( 0, 0, 3537, 720);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;   
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.ground);

        this.monster = this.physics.add.sprite(2950, 200, 'monster_still').setScale(0.8);
        this.physics.add.collider(this.monster, this.ground);
        
        this.fence = this.physics.add.sprite(2900, 437, 'fence').setScale(0.8);
        this.fence.body.immovable = true;
        this.fence.body.allowGravity = false;
        this.physics.add.collider(this.player, this.fence);
        
        this.blood1 = this.physics.add.sprite(1100, 500, 'blood1');
        this.blood1.body.allowGravity = false;
        this.blood2 = this.physics.add.sprite(1500, 550, 'blood2');
        this.blood2.body.allowGravity = false;
        this.blood3 = this.physics.add.sprite(1570, 520, 'blood3');
        this.blood3.body.allowGravity = false;
        this.blood4 = this.physics.add.sprite(1900, 540, 'blood4');
        this.blood4.body.allowGravity = false;
        this.photo = this.physics.add.sprite(1000, 510, 'photo');
        this.photo.body.allowGravity = false;
        
        this.rec1 = this.add.rectangle(700, 400, 200, 300);
        this.rec2 = this.add.rectangle(1000, 400, 200, 300);
        //this.rec3 = this.add.rectangle();

        this.town = this.add.rectangle(0, 400, 200, 300, 0x000000);
        this.town.visible = false;

        this.coll = this.add.rectangle(2650, 400, 200, 300, 0x000000);
        this.coll.visible = false;

        this.f = this.add.image(100, 300,'f').setScale(0.5);
        this.f.visible = false;
        this.text01 = new Textbox(this, 0, 600,'textbox');
        this.text01.visible = false;
        this.fcount = 0;

        this.speaker = ["Monster", "Alex", "???", "???", "Alex", "Simon", "Alex", "Simon", 
        "Alex", "Simon", "Alex", "Simon", "Alex", "Simon", "Alex", "Simon", "Alex", "Simon", "Alex"];

        this.texts = ["RaaAaaAwwwWrrRrrrrrrr!!!!!",
            "Oh my God... What the hell is that thing?",
            "Word on the street is someone’s been sticking their nose where it doesn’t belong. You know what we do with people that learn a little too much about our operation…",
            "Oh… Alex, it’s you.",
            "Simon?",
            "Alex, what are you doing here?",
            "I’m just here to see how Elevate sales are going from the ground floor. I think something’s really wrong with our product. Do you know anything about that?",
            "Product testing isn’t really my expertise, so I haven’t been paying too much attention. I’m pretty sure it’s working the way it’s supposed to though.",
            "I mean yeah, but people keep missing, and what’s up with this… thing? Why is it all caged up?",
            "Wait, you don’t know? If taken daily, Elevate can turn people into these monsters.",
            "So you’re telling me this thing is Carter?!",
            "I don’t know who Carter is, but if he’s been taking Elevate there’s certainly a possibility.",
            "This is a lot to take in, I didn’t realize any of this was happening. What about the people? Do they know that any of this is happening?",
            "Well, consumers have been buying our product at the same rate they always have. Considering how many people have gone missing, I’m assuming it hasn’t affected them in any way. Sales have actually gone up in the last few months. You could always go survey your customers?",
            "That’s a good idea, I’ll be right back.",
            "Wait! Before you go, what do you want me to do with this thing?",
            "You mean Carter? What do you usually do?",
            "Usually we catch ‘em once they sneak off into the woods, like we did here, and take ‘em out before anyone can notice. Keeps everything a little more under the radar.",
            "Jesus Christ."];

        if(Monster == 1){
            this.npc.x = 2400;
            this.npc.visible = true; 
        }
        this.majortalk = 0;
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyM)){
            this.scene.start("menuScene");
        }
        
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

        if(this.checkOverlap(this.player, this.town) == true){
            this.f.x = 150;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.cameras.main.fade(2000);
                this.time.delayedCall(2000, ()=>{
                    this.scene.start("townScene");
                });
            }
        }

        this.monster.anims.play('monster_move', true);

        if(this.checkOverlap(this.player, this.coll) == true){
            this.f.x = 2800;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.majortalk = 1;
                this.text01.x = 2550;
                this.text01.visible = true;
                if(this.fcount<1){
                    this.cameras.main.shake(250);
                    this.text01.hideText();
                    this.text01.boldText(this.text01.switchText(this.fcount, this.texts), this.speaker[this.fcount]);
                    this.fcount++;
                }else if(Monster == 0 && this.fcount < 19){
                    this.player.anims.play('idle_left');
                    this.text01.hideText();
                    this.text01.loadText(this.text01.switchText(this.fcount, this.texts), this.speaker[this.fcount]);
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                    Monster = 1;
                }
            }
        }
        if(this.checkOverlap(this.player, this.npc) && this.npc.visible== true){
            this.f.x = 2400;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(Monster == 1 && this.fcount <1 && !(Brian ==2 && Greig == 2 && Delilah == 2&& Emma == 2 && Haley == 1)){
                    this.text01.x = 2400;
                    this.text01.visible = true;
                    this.text01.boldText("Come back to me once you’ve talked to everyone in town.", "Simon");
                    this.fcount++;
                }else if(Brian ==2 && Greig == 2 && Delilah == 2&& Emma == 2 && Haley == 1 && this.fcount<1){
                    this.text01.x = 2400;
                    this.text01.visible = true;
                    this.text01.loadText("So you’ve made your decision.", "Simon");
                    this.fcount++

                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                    if(Brian ==2 && Greig == 2 && Delilah == 2&& Emma == 2 && Haley == 1){
                        Simon = 1;
                    }
                }
            }
        }

        if(this.checkOverlap(this.player, this.rec1)){
            this.f.x = 700;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(this.fcount <1){
                    this.text01.x = 700;
                    this.text01.visible = true;
                    this.text01.loadText("Deep gouges in the bark of the tree. The tearing around the edges says it probably wasn't a blade.", "Alex");
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                }
            }
        }

        if(this.checkOverlap(this.player, this.rec2)){
            this.f.x = 1000;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(this.fcount <1){
                    this.text01.x = 1000;
                    this.text01.visible = true;
                    this.text01.loadText("A photo of Emma and someone. Judging from the stains, it was dropped here a long time ago.", "Alex");
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                }
            }
        }

        if(Simon == 1){
            this.cameras.main.fade(2000);
            this.fadeOut();
        }

        if(this.majortalk == 1){
            this.npc.visible = true;
            if(this.npc.x <= 2400){
                this.npc.body.setVelocityX(200);
                this.npc.anims.play('simonwalk', true);
            }else{
                this.npc.body.setVelocityX(0);
                this.npc.anims.play('simonidle', true);
            }
        }
        if(!(this.checkOverlap(this.player, this.npc) && this.npc.visible == true) && !this.checkOverlap(this.player, this.town) && !this.checkOverlap(this.player, this.rec1) && !this.checkOverlap(this.player, this.rec2) && !this.checkOverlap(this.player, this.coll)){
            this.f.visible = false;
        }

    }

    checkOverlap(A,  B){
        var boundA = A.getBounds();
        var boundB = B.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundA, boundB);
    }

    fadeOut(){
        this.time.delayedCall(2000, ()=>{
                this.scene.start('endScene');
        });
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
            frameRate: 15,
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
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'monster_move',
            frames: this.anims.generateFrameNumbers('monster', {start: 0, end: 10, first: 0}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'simonwalk',
            frames: this.anims.generateFrameNumbers('simon_walk', {start: 0, end: 11, first: 0}),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'simonidle',
            frames: this.anims.generateFrameNumbers('simon_idle', {start: 0, end: 3, first: 0}),
            frameRate: 4,
            repeat: -1
        });
    }
}