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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Gameover = (function (_super) {
        __extends(Gameover, _super);
        // CONSTRUCTOR
        function Gameover() {
            _super.call(this);
        }
        // PUBLIC FUNCTIONS
        Gameover.prototype.start = function () {
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
        };
        Gameover.prototype.update = function () {
            // Update objects
        };
        return Gameover;
    }(objects.Scene));
    scenes.Gameover = Gameover;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map