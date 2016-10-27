var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
    File Name:             Scene Game - TS|JS File
    Author:                Elaine Mae Villarino
    Last Modified By:      Elaine Mae Villarino
    Last Modified Date:    Wednesday, October 26th, 2016
    Website Name:          EV - COMP397 - Assignment 2
    Program Description:   JS file that contains the components that
                           are required to render the game's Game scene.
    Revision History:      Clean and Comment Code
*/
var scenes;
(function (scenes) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this);
            this._previousGuessesTXT = "";
            this._currentAnswerArray = [];
            this._chosenWord = "";
            this._chosenClue = "";
            this._chosenCat = "";
            window.onkeyup = this._handleKeyUp;
        }
        Game.prototype.start = function () {
            // Initialize Game Values
            waitingForNext = false;
            totalWrong = 0;
            totalCorrect = 0;
            wrongAnswers = 0;
            globalScore = 0;
            this._placeholders = [];
            this._lettersToShow = [];
            // Start the Words!
            this._prepareWordBank();
            // Create BG for scene and add to Game Scene container
            this._bg = new createjs.Bitmap(assets.getResult("BG_HangM"));
            this.addChild(this._bg);
            // Add SCORE Label to scene.
            this._scoreGO = new objects.Label("Score: " + globalScore.toString(), "20px Special Elite", "#000", config.Screen.CENTER_X - 225, 50);
            this.addChild(this._scoreGO);
            // Add CLUE Label to scene.
            this._clueTxtGO = new objects.Label("Clue: " + this._chosenClue, "20px Special Elite", "#000", 125, 175);
            this.addChild(this._clueTxtGO);
            // Add CATEGORY Label to scene.
            this._categoryTxtGO = new objects.Label("Category: " + this._chosenCat, "20px Special Elite", "#000", 142, 250);
            this.addChild(this._categoryTxtGO);
            // Add PREVIOUS GUESSES Label to scene.
            this._previousGuessesGO = new objects.Label("Previous Guesses: ", "20px Special Elite", "#000", 135, 300);
            this.addChild(this._previousGuessesGO);
            // Add NEXT Button to scene. Register for click callback function
            this._next = new objects.Button("BTN_Next", 475, 400);
            this._next.on("click", this._nextBtnClick, this);
            // Get THE Word!
            this._getWord();
            // Add GAME scene to main stage container. 
            stage.addChild(this);
        };
        // Run on every tick
        Game.prototype.update = function () {
            var _this = this;
            // Check Letter on each Key Pressed 
            if (keyPressed)
                this._checkLetter();
            // Add player's already guessed letters
            this._previousGuessesGO.text = "Previous Guesses: ";
            previousGuesses.forEach(function (element) {
                _this._previousGuessesGO.text += element + ", ";
            });
            // Update Score
            this._scoreGO.text = "Score: " + globalScore.toString();
        };
        // Function for when NEXT button is pressed
        Game.prototype._nextBtnClick = function (event) {
            currentScene.removeChild(this._next);
            this._getWord();
        };
        // Function for setting up the WORDS for the game
        Game.prototype._prepareWordBank = function () {
            this._wordBank = [,];
            var guessMeArray = [
                { word: "strawberry", clue: "There are 200 seeds in this red fruit.", category: "Food" },
                { word: "sugar", clue: "Humans are born craving this taste.", category: "Food" },
                { word: "wine", clue: "When drunk regularly it can actually \nhelp you boost your sex drive.", category: "Beverage" },
                { word: "fovglove", clue: "Getting a growth spurt in our \nimagination leading to new ideas.", category: "Flower Symbolism and Superstitions" },
                { word: "bluebell", clue: "Ring to call the fairies! \nBut if you hear it ring, \nsomeone close to you will die.", category: "Flower Symbolism and Superstitions" },
                { word: "persephone", clue: "Goddess of the Underworld.", category: "Gods and Goddesses" },
                { word: "styx", clue: "The famous river between \nEarth and the Underworld; \nremember to seek passage from the ferryman Charon.", category: "Gods and Goddesses" },
                { word: "dryads", clue: "Tree-dwelling, playful, female creatures.", category: "Creatures" },
                { word: "toothfairy", clue: "She is a kindly creature who \nkeeps a tooth collection.", category: "Creatures" },
                { word: "smaug", clue: "A powerful, fearsome black dragon who \nterrorizes the people of Dale, \nLake-town and the Dwarves of Erebor.", category: "Creatures" },
                { word: "paarthurnax", clue: "A wise old dragon met at the Throat of the World. \nAlso the master of the Greybeards, \nand their Way of the Voice.", category: "Creatures" },
                { word: "alduin", clue: "The people of Skyrim know him as \n'The World Eater' or \n'Nordic God of Destruction.'", category: "Creatures" },
                { word: "nutella", clue: "The brand name of a \nsweetened hazelnut cocoa spread.", category: "Food" },
                { word: "angelstrumpet", clue: "If it's fragrant during the daytime, \nit means that someone nearby you has died. \nUnder the influence of this scent, \nyou may see his or her ghost.", category: "Flower Symbolism and Superstitions" },
                { word: "yellowjessamine", clue: "The flower's powerful symbolism \nmeans to enhance positive \naffection, friendship, joy and intellect.", category: "Flower Symbolism and Superstitions" }
            ];
            for (var i = 0; i < guessMeArray.length; i++) {
                this._wordBank[i] = [];
                this._wordBank[i][0] = guessMeArray[i].word;
                this._wordBank[i][1] = guessMeArray[i].clue;
                this._wordBank[i][2] = guessMeArray[i].category;
            }
            // Check if wordbank is correct
            //console.log(this._wordBank);
        };
        // Function for Checking the letter input by the player
        Game.prototype._checkLetter = function () {
            if (waitingForNext)
                return;
            //console.log("wrongAnswers counter : " + wrongAnswers);
            keyPressed = false;
            var isInWord = false;
            var previouslyEntered = false;
            for (var i = 0; i < previousGuesses.length; i++) {
                if (keyToPass == previousGuesses[i]) {
                    previouslyEntered = true;
                }
            }
            // If letter is not entered yet
            if (!previouslyEntered) {
                previousGuesses.push(keyToPass);
                for (i = 0; i < currentWordArray.length; i++) {
                    if (keyToPass == currentWordArray[i]) {
                        isInWord = true;
                        this._currentAnswerArray.push(keyToPass);
                    }
                }
                // If letter is in the word
                if (isInWord) {
                    this._correctAnswer();
                }
                else {
                    this._wrongAnswer();
                }
            }
        };
        // Function for Handling the Pressed Key Event
        Game.prototype._handleKeyUp = function (event) {
            if (event.keyCode > 64 && event.keyCode < 91) {
                var input = String.fromCharCode(event.keyCode).toLowerCase();
                //console.log(input);
                // Pass to global space, so we can handle keys here
                keyPressed = true;
                keyToPass = input;
            }
        };
        // Function for Checking the Player's Answer
        Game.prototype._correctAnswer = function () {
            //console.log("Correct: " + keyToPass);
            //console.log(this._currentAnswerArray);
            this._updatePlaceholders();
            var currentAnswer = "";
            // If word and answer array length match player successfully guessed the word
            if (this._currentAnswerArray.length == currentWordArray.length) {
                // Update Player Wins && Score
                totalCorrect++;
                globalScore = globalScore + 100;
                //console.log(globalScore);
                // Add Next Button
                this.addChild(this._next);
                waitingForNext = true;
            }
            ;
        };
        // Function for Wrong Letter Guess
        Game.prototype._wrongAnswer = function () {
            wrongAnswers++;
            // If wrong answer == 5 player loses
            if (wrongAnswers == 5) {
                // Update Player Loses & Score
                totalWrong++;
                // Add Next Button
                this.addChild(this._next);
                wrongAnswers = 0;
                waitingForNext = true;
            }
        };
        // Function for Getting the Word to Play/Guess
        Game.prototype._getWord = function () {
            // Initialize game play
            waitingForNext = false;
            previousGuesses = [];
            this._currentAnswerArray = [];
            // If there are no more words for the player to Guess, game ends
            if (this._wordBank.length == 0) {
                waitingForNext = true;
                // Change global scene variable to game OVER
                // Call global changeScene() function
                scene = config.Scene.OVER;
                changeScene();
                return;
            }
            // Randomly Select the Word
            var rand = Math.floor(Math.random() * this._wordBank.length);
            this._chosenWord = this._wordBank[rand][0];
            this._chosenClue = this._wordBank[rand][1];
            this._chosenCat = this._wordBank[rand][2];
            this._wordBank.splice(rand, 1);
            currentWordArray = this._chosenWord.split("");
            // Cheat and View the Word
            //console.log(this._chosenWord);
            // Show the clue, category, placeholders (no. of black squares) to help player guess the word
            this._clueTxtGO.text = "Clue: " + this._chosenClue;
            this._categoryTxtGO.text = "Category: " + this._chosenCat;
            this._createPlaceholders();
        };
        // Function for Creating the Black Placeholders 
        // - to show how many letters user has to guess and number of letters in the word
        Game.prototype._createPlaceholders = function () {
            // Clean Previous Values
            if (this._placeholders != undefined) {
                this._lettersToShow.forEach(function (element) {
                    currentScene.removeChild(element);
                });
                this._placeholders.forEach(function (element) {
                    currentScene.removeChild(element);
                });
                this._lettersToShow = [];
                this._placeholders = [];
            }
            // Create the number of rectangles for each letter in the word 
            for (var i = 0; i < this._chosenWord.length; i++) {
                var ph = new createjs.Shape();
                ph.graphics.beginFill("#000").drawRect(150 + i * 30, 110, 20, 30);
                this._placeholders.push(ph);
                this.addChild(ph);
            }
        };
        // Function for Updating the Black Placeholders to actual letters
        Game.prototype._updatePlaceholders = function () {
            for (var i = 0; i < currentWordArray.length; i++) {
                console.log(this._currentAnswerArray.length);
                for (var j = 0; j < this._currentAnswerArray.length; j++) {
                    if (currentWordArray[i] == this._currentAnswerArray[j]) {
                        currentScene.removeChild(this._placeholders[i]);
                        var letterToShow = new objects.Label(currentWordArray[i], "20px Special Elite", "#000", 150 + i * 30, 110);
                        this._lettersToShow.push(letterToShow);
                        this.addChild(letterToShow);
                    }
                }
            }
        };
        return Game;
    }(objects.Scene));
    scenes.Game = Game;
})(scenes || (scenes = {}));
//# sourceMappingURL=game.js.map