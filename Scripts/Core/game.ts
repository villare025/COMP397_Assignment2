/// <reference path = "_reference.ts" />
/*
	File Name:             Core Game - TS|JS File 
	Author:                Elaine Mae Villarino
    Last Modified By:      Elaine Mae Villarino 
	Last Modified Date:    Wednesday, October 26th, 2016
	Website Name:          EV - COMP397 - Assignment 2
	Program Description:   JS file that contains the components that 
                           are required to render the game's core.
    Revision History:      Initial Commit
*/

// Global Variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;

var currentScene : objects.Scene;
var scene: number;

// Game scenes
var menuScene : scenes.Menu;
var gameScene : scenes.Game;

// Preload Assets required
var assetData:objects.Asset[] = [
    {id: "Start", src:"../../Assets/images/btnTitleStart.png"}, 
    {id: "Preface", src:"../../Assets/images/btnTitlePreface.png"}, 
    {id: "Return", src:"../../Assets/images/return.png"},
    {id: "Switch", src:"../../Assets/images/btnSwitch.png"},
    {id: "BG_Title", src:"../../Assets/images/bgTitle.jpg"},
    { id: "BG_Node1", src: "../../Assets/images/bgNode1.jpg" },
    {id: "BadEnd", src:"../../Assets/images/btnBadEnd.png"},
    {id: "GoodEnd", src:"../../Assets/images/btnGoodEnd.png"}
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

function gameLoop(event: createjs.Event): void {
    // Update whatever scene is currently active.
    //console.log("gameLoop update");
    currentScene.update();
    stage.update();
}

function changeScene() : void {
    
    // Simple state machine pattern to define scene swapping.
    switch(scene)
    {
        case config.Scene.MENU :
            stage.removeAllChildren();
            menuScene = new scenes.Menu();
            currentScene = menuScene;
            console.log("Starting MENU scene");
            break;
        case config.Scene.INSTRUCTIONS :
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting Instructions scene");
            break;
        case config.Scene.NODE1 :
            stage.removeAllChildren();
            currentScene = new scenes.Node1();
            console.log("Starting NODE1 scene");
            break;
        case config.Scene.NODE2 :
            stage.removeAllChildren();
            currentScene = new scenes.Node2();
            console.log("Starting NODE2 scene");
            break;
        case config.Scene.NODE3 :
            stage.removeAllChildren();
            currentScene = new scenes.Node3();
            console.log("Starting NODE3 scene");
            break;
        case config.Scene.OVER :
            stage.removeAllChildren();
            currentScene = new scenes.Gameover();
            console.log("Starting GAME OVER scene");
            break;
    }
    
}