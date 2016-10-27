/// <reference path = "_reference.ts" />
/*
    File Name:             Core Game - TS|JS File
    Author:                Elaine Mae Villarino
    Last Modified By:      Elaine Mae Villarino
    Last Modified Date:    Wednesday, October 26th, 2016
    Website Name:          EV - COMP397 - Assignment 2
    Program Description:   JS file that contains the components that
                           are required to render the game's core.
    Revision History:      Added Hangman Vars
*/
// Global Variables
var assets;
var canvas;
var stage;
var currentScene;
var scene;
// Game scenes
var menuScene;
var gameScene;
// Set the HANGMAN variables
var globalScore = 0;
var wrongAnswers = 0;
var rightAnswers = 0;
var totalCorrect = 0;
var totalWrong = 0;
var previousGuesses;
var currentWordArray;
var keyPressed = false;
var keyToPass = "";
var waitingForNext = false;
// Preload Assets required
var assetData = [
    { id: "BG_Title", src: "../../Assets/images/bgTitle.png" },
    { id: "BG_Instr", src: "../../Assets/images/bgInstructions.png" },
    { id: "BG_HangM", src: "../../Assets/images/bgGame.png" },
    { id: "BTN_Play", src: "../../Assets/images/btnPlay.png" },
    { id: "BTN_Inst", src: "../../Assets/images/btnInstructions.png" },
    { id: "BTN_Next", src: "../../Assets/images/btnNext.png" },
    { id: "BTN_Back", src: "../../Assets/images/btnBack.png" }
];
function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    assets.installPlugin(createjs.Sound);
    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
function init() {
    // Reference to canvas element
    canvas = document.getElementById("canvas");
    // Tie canvas element to createjs stage container
    stage = new createjs.Stage(canvas);
    // Enable mouse events that are polled 20 times per tick
    stage.enableMouseOver(20);
    // Set FPS for game and register for "tick" callback function
    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);
    // Set initial scene to MENU scene and call changeScene().
    scene = config.Scene.MENU;
    changeScene();
}
function gameLoop(event) {
    // Update whatever scene is currently active.
    //console.log("gameLoop update");
    currentScene.update();
    stage.update();
}
function changeScene() {
    switch (scene) {
        case config.Scene.MENU:
            stage.removeAllChildren();
            menuScene = new scenes.Menu();
            currentScene = menuScene;
            console.log("Starting MENU scene");
            break;
        case config.Scene.INSTRUCTIONS:
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting Instructions scene");
            break;
        case config.Scene.NODE1:
            stage.removeAllChildren();
            currentScene = new scenes.Node1();
            console.log("Starting NODE1 scene");
            break;
        case config.Scene.GAME:
            stage.removeAllChildren();
            currentScene = new scenes.Game();
            console.log("Starting Game scene");
            break;
        case config.Scene.OVER:
            stage.removeAllChildren();
            currentScene = new scenes.Gameover();
            console.log("Starting Game OVER scene");
            break;
    }
}
// Check for Local Storage
function isLocalStorageWorking() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    }
    catch (e) {
        return false;
    }
}
// Show if localStorage works 
if (isLocalStorageWorking()) {
    // Working = YES
    document.getElementById("localStorageCheck").style.backgroundColor = "#00FF00";
}
else {
    // Working = NO 
    document.getElementById("localStorageCheck").style.backgroundColor = "#FF0000";
    // So Create Fake localStorage var to not Throw Error
    localStorage = [];
}
//# sourceMappingURL=game.js.map