/*
Collaborator: Patrick Queiroz, Emery Plyler, Ruby Tseng
Game title: Shrimp Tail
Date completed: 5/3/2022
For our game we wanted to create a cute, simple endless runner. To amplify our game a bit we decided to make one of 
the obstacles a plastic bag to create a bit of social commentary on pollution. We implemented enemies such as fishing 
rod, and eels, which are dependent on the position of the enemies. Fishing rod also has a pause before moving back up. 
While we didn’t use this specific function in game (because it ends up looking buggy), our programmer learned to check
for adjacency of objects to make sure obstacles are not colliding or congesting. 
For the audio we learned how to use Bosca Ceoil to create a looping soundtrack imitating other ocean themed pixel 
games. Sound effects were all crafted on our own and edited using Reaper and the spitfire audio extension.
For the art, multiple art programs were used to create the visual assets. There were some issues with the transparent 
plastic bag which took some creativity to crop and edit. Many reference pictures of sea creatures were pulled up to 
create the sprites with the goal of making the animals recognizable and a bit realistic.
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    points: 0,
    scene: [Menu, Play, Credit]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;
let keyUp, keyDown, keyP, keyR, keyM;