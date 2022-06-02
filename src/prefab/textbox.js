class Textbox extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.Xtext = 300;
        this.Ytext = 100;
        this.catName = "";
        this.content = "";
        this.cur = [];
        this.beep = scene.sound.add('speak1');
        this.msg = scene.make.text({
            x: this.x -450,
            y: this.y -30,
            text: this.content,
            style: {
                fontSize: '20px',
                fontFamily: 'Georgia',
                fontStyle: '',
                color: '#ffffff',
                align: 'left',
                wordWrap: { width: 900 }
            },
        });
        this.msg2 = scene.make.text({
            x: this.x -450,
            y: this.y -30,
            text: this.content,
            style: {
                fontSize: '20px',
                fontFamily: 'Georgia',
                fontStyle: 'bold',
                color: '#ADD8E6',
                align: 'left',
                wordWrap: { width: 900 }
            },
        });
        this.name = scene.make.text({
            x: this.x -450,
            y: this.y -70,
            text: this.catName,
            style: {
                fontSize: '26px',
                fontFamily: 'Georgia',
                color: '#ffffff',
                align: 'left',
                wordWrap: { width: 900 }
            },
        });
    }
    update(){
        ;
    }

    loadText(string, name){
        this.name.visible = true;
        this.name.x = this.x - 450;
        this.catName = name;
        this.name.text = this.catName;
        this.msg.visible = true;
        this.msg.x = this.x - 450;
        this.content = string;
        this.msg.text = this.content;
        //this.beep.play();
    }

    boldText(string, name){
        this.name.visible = true;
        this.name.x = this.x - 450;
        this.catName = name;
        this.name.text = this.catName;
        this.msg2.visible = true;
        this.msg2.x = this.x - 450;
        this.content = string;
        this.msg2.text = this.content;
        //this.beep.play();
    }

    hideText(){
        this.msg.visible = false;
        this.name.visible = false;
        this.msg2.visible = false;
    }
    switchText(count, array){
        this.cur = array;
        return this.cur[count];
    }
};
