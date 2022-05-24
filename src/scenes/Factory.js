class Factory extends Phaser.Scene{
    constructor(){
        super("factoryScene");
    }
    create(){
        const gui = new dat.GUI();
        this.width = 1280;
        this.height = 720;
        this.VELOCITY = 1000;
        this.cameras.main.setBackgroundColor('#666');
        this.cameras.main.setBounds(0, 0, 1281, this.height);
        this.cameras.main.setZoom(1);
        this.cameras.main.setScroll(0, this.height);

        gui.addFolder("Main Camera");
        gui.add(this.cameras.main, 'scrollX');
        gui.add(this.cameras.main, 'scrollY');
        gui.add(this.cameras.main, 'zoom');

        this.add.image(0, 0, 'factory').setOrigin(0);
        this.door = this.add.image(1050, 300,'factorydoor').setOrigin(0);

        this.ground = this.add.group();
        this.groundSprite = this.physics.add.sprite(2265, this.height-120, 'ground').setScale(1);
        this.groundSprite.body.immovable = true;
        this.groundSprite.body.allowGravity = false;
        this.ground.add(this.groundSprite);

        cursors = this.input.keyboard.createCursorKeys();
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.npc1 = this.physics.add.sprite(200, 400, 'char2').setScale(0.8);
        this.npc2 = this.physics.add.sprite(800, 400, 'char2').setScale(0.8);
        this.player = this.physics.add.sprite(1270, 400, 'mc').setScale(0.8);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;   
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.npc1, this.ground);
        this.physics.add.collider(this.npc2, this.ground);
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

        this.f = this.add.image(100, 300,'f').setScale(0.5);
        this.f.visible = false;
        this.text01 = new Textbox(this, 650, 600,'textbox');
        this.text01.visible = false;
        this.fcount = 0;

        this.text1 = ["Work is tough, but I do it all for my daughter Haley.", "Hopefully the Elevate I’ve been taking will kick in soon."];
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyM)){
            music.stop();
            this.scene.start("menuScene");
        }
        if(cursors.left.isDown && this.text01.visible == false) {
            this.player.body.setVelocityX(-this.VELOCITY);
            //this.player.anims.play('run_left', true);

        } else if(cursors.right.isDown && this.text01.visible == false) {
            this.player.body.setVelocityX(this.VELOCITY);
            //this.player.anims.play('run_right', true);

        } else if (!cursors.right.isDown && !cursors.left.isDown) {
            this.player.body.setVelocityX(0);
            // add code for idle animation play here:
   
        }if(this.checkOverlap(this.player, this.door) == true){
            this.f.x = 1100;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.scene.start("townScene");
                this.music.stop();
            }
        }
        
        if(this.checkOverlap(this.player, this.npc1) == true){
            this.f.x = 200;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(this.fcount<1){
                    this.text01.visible = true;
                    this.text01.loadText("Whew! Work is hard but Elevate makes everything easier.");
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                    game.config.Carter = 1;
                }
            }

        }if(this.checkOverlap(this.player, this.npc2) == true){
            this.f.x = 800;
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                if(this.fcount<2){
                    this.text01.visible = true;
                    this.text01.loadText(this.text01.switchText(this.fcount, this.text1));
                    this.fcount++;
                }else{
                    this.text01.hideText();
                    this.text01.visible = false;
                    this.fcount = 0;
                    game.config.Greig = 1;
                }
            }
        }if(!this.checkOverlap(this.player, this.npc1) && !this.checkOverlap(this.player, this.npc2) && !this.checkOverlap(this.player, this.door)){
            this.f.visible = false;
        }

    }

    checkOverlap(A,  B){
        var boundA = A.getBounds();
        var boundB = B.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundA, boundB);
    }
}