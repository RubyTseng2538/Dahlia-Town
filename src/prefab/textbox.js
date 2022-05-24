class Textbox extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.Xtext = 300;
        this.Ytext = 100;
        this.content = "";
        this.cur = [];
        this.msg = scene.make.text({
            x: this.x -450,
            y: this.y -70,
            text: this.content,
            style: {
                fontSize: '18px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'left',
                wordWrap: { width: 900 }
            },
        });
    }
    update(){
        ;
    }

    loadText(string){
        this.msg.visible = true;
        this.msg.x = this.x - 450;
        this.content = string;
        this.msg.text = this.content;

    }
    hideText(){
        this.msg.visible = false;
    }
    switchText(count, array){
        this.cur = array;
        return this.cur[count];
    }
};
