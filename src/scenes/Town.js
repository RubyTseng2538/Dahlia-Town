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
        this.cameras.main.setBounds(0, 0, 1280, this.height);
        this.cameras.main.setZoom(1);
        this.cameras.main.setScroll(this.width, this.height);

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

        //keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        //cursor
        cursors = this.input.keyboard.createCursorKeys();

        this.npc = this.physics.add.sprite(600, 448, 'char2').setScale(0.5);
        this.player = this.physics.add.sprite(800, 448, 'mc').setScale(0.5);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.npc, this.ground);
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
        //this.goodEnding = false;
        this.f = this.add.image(600, 450,'f').setScale(0.5);
        this.f.visible = false;
        this.text01 = new Textbox(this, 0, 0, 'textbox');
        this.text01.visible = false;

            
    }
    update(){
        if(cursors.left.isDown) {
            this.player.body.setVelocityX(-this.VELOCITY);
            //this.player.anims.play('run_left', true);

        } else if(cursors.right.isDown) {
            this.player.body.setVelocityX(this.VELOCITY);
            //this.player.anims.play('run_right', true);

        } else if (!cursors.right.isDown && !cursors.left.isDown) {
            this.player.body.setVelocityX(0);
            // add code for idle animation play here:
   
        }
        /*if(Phaser.Input.Keyboard.JustDown(keyF) && (this.checkCollision(player, factory))){
            this.scene.start("factoryScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && (this.checkCollision(player, factory))){
            this.scene.start("alleyScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && (this.checkCollision(player, factory))){
            this.scene.start("woodsScene");
        }*/
        if(this.checkCollision(this.player, this.npc)){
            this.f.visible = true;
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                //textbox code
                /*this.text01.visible = true;
                this.add.text(50, 528, "aHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");*/
            }
        }if(!this.checkCollision(this.player, this.npc)){
            this.f.visible = false;
        }
        
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