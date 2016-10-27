/*
	File Name:             Scene Instructions - TS|JS File 
	Author:                Elaine Mae Villarino
    Last Modified By:      Elaine Mae Villarino 
	Last Modified Date:    Wednesday, October 26th, 2016
	Website Name:          EV - COMP397 - Assignment 2
	Program Description:   JS file that contains the components that 
                           are required to render the game's Instructions scene.
    Revision History:      Make Instruction Scene Work
*/

module scenes {
    export class Instructions extends objects.Scene {

        // PRIVATE VARIABLES
        private _bg: createjs.Bitmap;
        private _instructionsBtnStart: objects.Button;
        private _instructionsBtnBack: objects.Button;
        private _instructionsTitle: objects.Label;
        private _instructionsParagraph: objects.Label;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC FUNCTIONS
        public start(): void {
            // Add objects to the scene
            console.log("Game scene started");

            // Create BG for scene and add to Game Scene container
            this._bg = new createjs.Bitmap(assets.getResult("BG_Instr"));
            this.addChild(this._bg);

            // Add START Button to scene. Register for click callback function
            this._instructionsBtnStart = new objects.Button("BTN_Play", config.Screen.CENTER_X + 150, config.Screen.CENTER_Y + 160);
            this.addChild(this._instructionsBtnStart);
            this._instructionsBtnStart.on("click", this._startButtonClick, this);

            // Create RETURN Button for scene and add to Game Scene container. Register for onclick event
            this._instructionsBtnBack = new objects.Button("BTN_Back", config.Screen.CENTER_X - 190, config.Screen.CENTER_Y + 160);
            this.addChild(this._instructionsBtnBack);
            this._instructionsBtnBack.on("click", this._onBackButtonClick, this);

            // Add gamescene to main stage container. 
            stage.addChild(this);
        }

        // Run on every tick
        public update(): void {
            // Update objects
        }

        // Function for when button is pressed
        private _startButtonClick(event: createjs.MouseEvent) {
            // Change global scene variable to GAME. Call global changeScene() function
            scene = config.Scene.NODE1;
            changeScene();
        }
        private _onBackButtonClick(event: createjs.MouseEvent) {
            // Set global variable to NODE1 Scene and call changescene function
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}