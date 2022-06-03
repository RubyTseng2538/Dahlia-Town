/*
Collaborator: Patrick Queiroz, Emery Plyler, Ruby Tseng
Game title: Dahlia Town
*/
'use strict';
let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 1000
            }
        }
    },
    backgroundColor: '0x000000',
    scene: [Load, Menu, Town, Factory, Woods, EndScene, Credit]
};

let game = new Phaser.Game(config);
let cursors;
let keyF, keyC, keyM, keyW;
let forest = 0;
let factory = 0;
let Brian = 0;
let Carter = 0;
let Greig = 0;
let Haley = 0;
let Frank = 0;
let Delilah = 0;
let Emma = 0;
let Monster = 0;
let Simon = 0;
let play = false;