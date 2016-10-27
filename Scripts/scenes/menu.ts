/*
	File Name:             Scene Menu - TS|JS File 
	Author:                Elaine Mae Villarino
    Last Modified By:      Elaine Mae Villarino 
	Last Modified Date:    Wednesday, October 26th, 2016
	Website Name:          EV - COMP397 - Assignment 2
	Program Description:   JS file that contains the components that 
                           are required to render the game's Menu scene.
    Revision History:      Initial Commit
*/

module scenes {
    export class Menu extends objects.Scene {

        // PRIVATE VARIABLES
        private _bg: createjs.Bitmap;
        private _menuBtnStart: objects.Button;
        private _menuBtnInstructions: objects.Button;

        // Menu Class Contructor
        constructor() {
            super();
        }

        public start(): void {
            // Add objects to the scene
            console.log("Menu Scene Started");

            // Start Music
            //createjs.Sound.stop();
            //var bgAll = createjs.Sound.play("MUSIC_All");
            //bgAll.play({ interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 1 });

            // Create BG for scene and add to Game Scene container
            this._bg = new createjs.Bitmap(assets.getResult("BG_Title"));
            this.addChild(this._bg);

            // Add START Button to scene. Register for click callback function
            this._menuBtnStart = new objects.Button("BTN_Play", config.Screen.CENTER_X - 185, config.Screen.CENTER_Y + 85);
            this.addChild(this._menuBtnStart);
            this._menuBtnStart.on("click", this._startButtonClick, this);

            // Add instructions Button to scene. Register for click callback function
            this._menuBtnInstructions = new objects.Button("BTN_Inst", config.Screen.CENTER_X + 145, config.Screen.CENTER_Y + 85);
            this.addChild(this._menuBtnInstructions);
            this._menuBtnInstructions.on("click", this._instructionsButtonClick, this);

            // Add menu scene to global stage container
            stage.addChild(this);
        }

        // Run on every tick
        public update(): void {
            // Update objects
        }

        // Function for when PLAY/START button is pressed
        private _startButtonClick(event: createjs.MouseEvent) {
            // Change global scene variable to GAME. Call global changeScene() function
            scene = config.Scene.NODE1;
            changeScene();
        }
        // Function for when INSTRUCTION button is pressed
        private _instructionsButtonClick(event: createjs.MouseEvent) {
            // Change global scene variable to INSTRUCTIONS. Call global changeScene() function
            scene = config.Scene.INSTRUCTIONS;
            changeScene();
        }
    }
}