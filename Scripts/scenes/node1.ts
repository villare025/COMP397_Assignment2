/*
	File Name:             Scene Node 1 - TS|JS File 
	Author:                Elaine Mae Villarino
    Last Modified By:      Elaine Mae Villarino 
	Last Modified Date:    Wednesday, October 26th, 2016
	Website Name:          EV - COMP397 - Assignment 2
	Program Description:   JS file that contains the components that 
                           are required to render the game's Node 1 scene.
    Revision History:      Make HANGMAN work
*/

module scenes {
    export class Node1 extends objects.Scene {

        private _bg: createjs.Bitmap;
        private _next: objects.Button;

        // GO (game object)
        private _clueTxtGO: objects.Label;
        private _categoryTxtGO: objects.Label;
        private _previousGuessesGO: objects.Label;
        private _scoreGO: objects.Label;
        private _previousGuessesTXT: string = "";

        private _wordBank: string[][];
        private _placeholders: createjs.Shape[];
        private _lettersToShow: objects.Label[];
        private _currentAnswerArray: string[] = [];

        private _chosenWord: string = "";
        private _chosenClue: string = "";
        private _chosenCat: string = "";

        constructor() {
            super();
            window.onkeyup = this._handleKeyUp;
        }

        public start(): void {
            waitingForNext = false;
            totalWrong = 0;
            totalCorrect = 0;
            wrongAnswers = 0;
            globalScore = 0;

            this._placeholders = [];
            this._lettersToShow = [];

            this._prepareWordBank();

            this._bg = new createjs.Bitmap(assets.getResult("BG_HangM"));
            this.addChild(this._bg);
            
            this._scoreGO = new objects.Label("Score: " + globalScore.toString(), "20px Arial", "#000", 50, 50);
            this.addChild(this._scoreGO);

            this._clueTxtGO = new objects.Label("Clue: " + this._chosenClue, "20px Arial", "#000", 50, 175);
            this.addChild(this._clueTxtGO);

            this._categoryTxtGO = new objects.Label("Category: " + this._chosenCat, "20px Arial", "#000", 50, 250);
            this.addChild(this._categoryTxtGO);

            this._previousGuessesGO = new objects.Label("Previous Guesses: ", "20px Arial", "#000", 50, 300);
            this.addChild(this._previousGuessesGO);

            this._next = new objects.Button("BTN_Next", 475, 400);
            this._next.on("click", this._nextBtnClick, this);

            this._getWord();
            stage.addChild(this);
        }

        public update(): void {
            if (keyPressed)
                this._checkLetter();

            this._previousGuessesGO.text = "Previous Guesses: ";
            previousGuesses.forEach(element => {
                this._previousGuessesGO.text += element + ", ";
            });

            this._scoreGO.text = "Score: " + globalScore.toString();
        }

        private _nextBtnClick(event: createjs.MouseEvent) {
            currentScene.removeChild(this._next);
            this._getWord();
        }

        private _prepareWordBank(): void {
            this._wordBank = [,];
            var guessMeArray = [
                { word: "strawberry", clue: "There are 200 seeds in this red fruit", category: "Food" },
                { word: "sugar", clue: "Humans are born craving this taste", category: "Food" },
                { word: "wine", clue: "When drunk regularly it can actually \nhelp you boost your sex drive", category: "Beverage" },
            ];
            for (var i = 0; i < guessMeArray.length; i++) {
                this._wordBank[i] = [];
                this._wordBank[i][0] = guessMeArray[i].word;
                this._wordBank[i][1] = guessMeArray[i].clue;
                this._wordBank[i][2] = guessMeArray[i].category;
            }
            console.log(this._wordBank);
        }

        private _checkLetter(): void {
            if (waitingForNext)
                return;
            console.log("wrongAnswers counter : " + wrongAnswers);
            keyPressed = false;
            var found = false;
            var previouslyEntered = false;
            for (var i = 0; i < previousGuesses.length; i++) {
                if (keyToPass == previousGuesses[i]) {
                    previouslyEntered = true;
                }
            }
            if (!previouslyEntered) {
                previousGuesses.push(keyToPass);
                for (i = 0; i < currentWordArray.length; i++) {
                    if (keyToPass == currentWordArray[i]) {
                        found = true;
                        this._currentAnswerArray.push(keyToPass);
                    }
                }

                if (found) {
                    this._checkAnswer();
                }
                else {
                    this._wrongAnswer();
                }
            }
        }

        private _handleKeyUp(event: KeyboardEvent) {
            if (event.keyCode > 64 && event.keyCode < 91) {
                var input = String.fromCharCode(event.keyCode).toLowerCase();
                console.log(input);
                //passing to global space, so we can handler keys here
                keyPressed = true;
                keyToPass = input;
            }
        }

        private _checkAnswer() {
            console.log("Correct: " + keyToPass);
            console.log(this._currentAnswerArray);
            this._updatePlaceholders();
            var currentAnswer = "";
            for (var i = 0; i < this._chosenWord.length; i++) {
                //currentAnswer += ($('#t' + i).text());
            }
            if (this._currentAnswerArray.length == currentWordArray.length) {
                totalCorrect++;
                globalScore = globalScore + 100;
                console.log(globalScore);
                this.addChild(this._next);
                
                waitingForNext = true;
            };
        }

        private _wrongAnswer() {
            wrongAnswers++;
            if (wrongAnswers == 6) {
                totalWrong++;
                this.addChild(this._next);
                wrongAnswers = 0;
                waitingForNext = true;
            }
        }

        private _getWord() {
            waitingForNext = false;
            previousGuesses = [];
            this._currentAnswerArray = [];
            if (this._wordBank.length == 0) {
                waitingForNext = true;
                scene = config.Scene.OVER;
                changeScene();
                return;
            }
            var rand = Math.floor(Math.random() * this._wordBank.length);
            this._chosenWord = this._wordBank[rand][0];
            this._chosenClue = this._wordBank[rand][1];
            this._chosenCat = this._wordBank[rand][2];
            this._wordBank.splice(rand, 1);
            currentWordArray = this._chosenWord.split("");
            console.log(this._chosenWord);
            this._clueTxtGO.text = "Clue: " +  this._chosenClue;
            this._categoryTxtGO.text = "Category: " + this._chosenCat;
            this._createPlaceholders();
        }

        private _createPlaceholders() {
            // Clean Previous Values
            if (this._placeholders != undefined) {
                this._lettersToShow.forEach(element => {
                    currentScene.removeChild(element);
                });
                this._placeholders.forEach(element => {
                    currentScene.removeChild(element);
                });
                this._lettersToShow = [];
                this._placeholders = [];

            }
            for (var i = 0; i < this._chosenWord.length; i++) {
                var ph = new createjs.Shape();
                ph.graphics.beginFill("#000").drawRect(150 + i * 30, 110, 20, 30);
                this._placeholders.push(ph);
                this.addChild(ph);
            }
        }

        private _updatePlaceholders(): void {
            for (var i = 0; i < currentWordArray.length; i++) {
                console.log(this._currentAnswerArray.length);
                for (var j = 0; j < this._currentAnswerArray.length; j++) {
                    if (currentWordArray[i] == this._currentAnswerArray[j]) {
                        currentScene.removeChild(this._placeholders[i]);
                        var letterToShow = new objects.Label(
                            currentWordArray[i], "20px Arial", "#000", 150 + i * 30, 110
                        );
                        this._lettersToShow.push(letterToShow);
                        this.addChild(letterToShow);
                    }
                }
            }
        }
    }
}