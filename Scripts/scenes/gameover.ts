/*
	File Name:             Scene Game Over - TS|JS File 
	Author:                Elaine Mae Villarino
    Last Modified By:      Elaine Mae Villarino 
	Last Modified Date:    Wednesday, October 26th, 2016
	Website Name:          EV - COMP397 - Assignment 2
	Program Description:   JS file that contains the components that
                           are required to render the game's Game Over scene.
    Revision History:      Make Game Over Scene Work
*/

module scenes {
    export class Gameover extends objects.Scene {

        // PRIVATE VARIABLES
        private _bg: createjs.Bitmap;
        private _score: objects.Label;
        private _scorePrevious: objects.Label;
        private _scoreNow: objects.Label;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC FUNCTIONS
        public start(): void {
            // Add objects to the scene
            console.log("Game scene started");

            this._bg = new createjs.Bitmap(assets.getResult("BG_Title"));
            this.addChild(this._bg);

            this._score = new objects.Label("Score: " + globalScore.toString(), "30px Arial", "#FFF", 50, 200);
            this.addChild(this._score);

            this._scorePrevious = new objects.Label("Previous High Score: ", "30px Arial", "#FFF", 50, 300);
            this.addChild(this._scorePrevious);

            this._scoreNow = new objects.Label("Your High Score: " + globalScore.toString(), "30px Arial", "#FFF", 50, 350);
            this.addChild(this._scoreNow);

            // Add gamescene to main stage container. 
            stage.addChild(this);
        }

        public update(): void {
            // Update objects
        }
    }
}