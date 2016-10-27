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
module scenes {
    export class Game extends objects.Scene {

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
        }

        // Run on every tick
        public update(): void {
            // Check Letter on each Key Pressed 
            if (keyPressed)
                this._checkLetter();
            // Add player's already guessed letters
            this._previousGuessesGO.text = "Previous Guesses: ";
            previousGuesses.forEach(element => {
                this._previousGuessesGO.text += element + ", ";
            });
            // Update Score
            this._scoreGO.text = "Score: " + globalScore.toString();
        }

        // Function for when NEXT button is pressed
        private _nextBtnClick(event: createjs.MouseEvent) {
            currentScene.removeChild(this._next);
            this._getWord();
        }

        // Function for setting up the WORDS for the game
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
            // Check if wordbank is correct
            //console.log(this._wordBank);
        }

        // Function for Checking the letter input by the player
        private _checkLetter(): void {
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
        }

        // Function for Handling the Pressed Key Event
        private _handleKeyUp(event: KeyboardEvent) {
            if (event.keyCode > 64 && event.keyCode < 91) {
                var input = String.fromCharCode(event.keyCode).toLowerCase();
                //console.log(input);
                // Pass to global space, so we can handle keys here
                keyPressed = true;
                keyToPass = input;
            }
        }

        // Function for Checking the Player's Answer
        private _correctAnswer() {
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
            };
        }

        // Function for Wrong Letter Guess
        private _wrongAnswer() {
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
        }

        // Function for Getting the Word to Play/Guess
        private _getWord() {
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
            this._clueTxtGO.text = "Clue: " +  this._chosenClue;
            this._categoryTxtGO.text = "Category: " + this._chosenCat;
            this._createPlaceholders();
        }

        // Function for Creating the Black Placeholders 
        // - to show how many letters user has to guess and number of letters in the word
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
            // Create the number of rectangles for each letter in the word 
            for (var i = 0; i < this._chosenWord.length; i++) {
                var ph = new createjs.Shape();
                ph.graphics.beginFill("#000").drawRect(150 + i * 30, 110, 20, 30);
                this._placeholders.push(ph);
                this.addChild(ph);
            }
        }

        // Function for Updating the Black Placeholders to actual letters
        private _updatePlaceholders(): void {
            for (var i = 0; i < currentWordArray.length; i++) {
                console.log(this._currentAnswerArray.length);
                for (var j = 0; j < this._currentAnswerArray.length; j++) {
                    if (currentWordArray[i] == this._currentAnswerArray[j]) {
                        currentScene.removeChild(this._placeholders[i]);
                        var letterToShow = new objects.Label(
                            currentWordArray[i], "20px Special Elite", "#000", 150 + i * 30, 110
                        );
                        this._lettersToShow.push(letterToShow);
                        this.addChild(letterToShow);
                    }
                }
            }
        }
    }
}