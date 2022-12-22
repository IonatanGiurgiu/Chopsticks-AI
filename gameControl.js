var minNumber = 2;
var maxNumber = 30;

var handDiesAt;
var canSplit;
var showGameValue;
var turn = 0; // 1 = bottom player, -1 = top player
var startOnLongestWin;
var playAI;

var topLeftSelected = false;
var topRightSelected = false;
var bottomLeftSelected = false;
var bottomRightSelected = false;

var alltxt = [];
var positionValues = {};
var longestWin = "";
var currPosVal = 0;


// Takes 2 values, and returns true if a split is possible/allowed
function isValidSplit(value1, value2){
    // If split setting is not allowed
    if (!canSplit){
        return false;
    }
    // If neither value is 0
    if (value1 != 0 && value2 != 0){
        return false;
    }
    // If the sum is odd
    if ((value1 + value2) % 2 == 1){
        return false;
    }
    return true;
}

// Takes 2 values, returns true if the move is legal
function isValidMove(value1, value2){
    if (value1 != 0 && value2 != 0){
        return true;
    }
    return false;
}

// Takes 2 boxes, and plays the move "box1 hits box2"
function playHit(attackingHand, targetHand){
    totalHands = parseInt(attackingHand.innerHTML) + parseInt(targetHand.innerHTML);
    if (totalHands >= handDiesAt){
        totalHands = 0;
    }
    targetHand.innerHTML = totalHands;
    turn *= -1;
    clearHandSelection();
    return;
}

//Takes 2 boxes, and plays a split
function playSplit(hand1, hand2){

    valAfterSplit = parseInt((parseInt(hand1.innerHTML) + parseInt(hand2.innerHTML)) / 2);
    hand1.innerHTML = valAfterSplit;
    hand2.innerHTML = valAfterSplit;
    turn *= -1;
    clearHandSelection();
    return;
}



// 2 squares should be selected by the player (or computer), now see if we can complete the move
function makePlayerMove(){
    bottomLeftBox = document.getElementById("bottom-left-hand");
    bottomRightBox = document.getElementById("bottom-right-hand");
    topLeftBox = document.getElementById("top-left-hand");
    topRightBox = document.getElementById("top-right-hand");

    bottomLeftValue = parseInt(bottomLeftBox.innerHTML);
    bottomRightValue = parseInt(bottomRightBox.innerHTML);
    topLeftValue = parseInt(topLeftBox.innerHTML);
    topRightValue = parseInt(topRightBox.innerHTML);

    // Top 2 boxes are selected
    if (topLeftSelected && topRightSelected){
        // If we're playing against the AI, not a valid move
        if (playAI && turn == 1){
            clearHandSelection();
            return;
        }
        // If turn is 1, it's bottom player's turn, so not valid
        if (turn == 1){
            clearHandSelection();
            return;
        }
        // If split is legal, play it
        if (isValidSplit(topLeftValue, topRightValue)){
            playSplit(topLeftBox, topRightBox);
            return;
        }
        // Otherwise
        clearHandSelection();
        return;
    }

    // Bottom 2 boxes are selected
    if (bottomLeftSelected && bottomRightSelected){
        // If turn is -1, it's the top player's turn, so not valid
        if (turn == -1){
            clearHandSelection();
            return;
        }
        // If split is valid, play it
        if (isValidSplit(bottomLeftValue, bottomRightValue)){
            playSplit(bottomRightBox, bottomLeftBox);
            return;
        }
        // Otherwise
        clearHandSelection();
        return;
    }

    // Otherwise, it's one of each
    // 1st element is the attacker, 2nd element is the target
    selectedBoxes = [];
    if (bottomLeftSelected){
        selectedBoxes.push(bottomLeftBox);
    }
    if (bottomRightSelected){
        selectedBoxes.push(bottomRightBox);
    }
    if (topLeftSelected){
        selectedBoxes.push(topLeftBox);
    }
    if (topRightSelected){
        selectedBoxes.push(topRightBox);
    }
    // There should only be 2 boxes selected
    if (selectedBoxes.length != 2){
        alert("ERROR: There should be only 2 boxes selected");
        return;
    }
    if (isValidMove(parseInt(selectedBoxes[0].innerHTML), parseInt(selectedBoxes[1].innerHTML))){
        // Who hits who depends on whose turn it is
        if (turn == 1){
            playHit(selectedBoxes[0], selectedBoxes[1]);
        } else {
            playHit(selectedBoxes[1], selectedBoxes[0]);
        }
        return;
    }
    // If it's not valid
    clearHandSelection();
    return;





    // OLD CODE, TO DELETE
    if (playAI){
        // If top squares are selected, it's illegal
        if (topLeftSelected && topRightSelected){
            clearHandSelection();
            return;
        }
        // If bottom squares are selected, maybe split
        if (bottomLeftSelected && bottomRightSelected){
            // If splitting is not allowed, clear and return
            if (!canSplit){
                clearHandSelection();
                return;
            }
            // If neither square is 0, clear and return.
            if (bottomLeftValue != 0 && bottomRightValue != 0){
                clearHandSelection();
                return;
            }
            // If they sum to an odd number, split not possible
            if ((bottomLeftValue + bottomRightValue) % 2 == 1){
                clearHandSelection();
                return;
            }
            // If this is reached, split!
            finalVal = parseInt((bottomLeftValue + bottomRightValue) / 2);
            bottomLeftBox.innerHTML = finalVal;
            bottomRightBox.innerHTML = finalVal;
            turn = -1;
            clearHandSelection();
            return;
        }
        // Here, 1 bottom and 1 top are selected
        // Checking ALL 4 cases
        if (bottomLeftSelected && topLeftSelected){
            // If neither squares are 0, update value
            if (bottomLeftValue != 0 && topLeftValue != 0){
                topLeftBox.innerHTML = bottomLeftValue + topLeftValue;
                turn = -1;
                if (bottomLeftValue + topLeftValue >= handDiesAt){
                    topLeftBox.innerHTML = 0;
                }
            }
            clearHandSelection();
            return;
        }
        if (bottomLeftSelected && topRightSelected){
            if (bottomLeftValue != 0 && topRightValue != 0){
                topRightBox.innerHTML = bottomLeftValue + topRightValue;
                turn = -1;
                if (bottomLeftValue + topRightValue >= handDiesAt){
                    topRightBox.innerHTML = 0;
                }
            }
            clearHandSelection();
            return;
        }
        if (bottomRightSelected && topLeftSelected){
            if (bottomRightValue != 0 && topLeftValue != 0){
                topLeftBox.innerHTML = bottomRightValue + topLeftValue;
                turn = -1;
                if (bottomRightValue + topLeftValue >= handDiesAt){
                    topLeftBox.innerHTML = 0;
                }
            }
            clearHandSelection();
            return;
        }
        if (bottomRightSelected && topRightSelected){
            if (bottomRightValue != 0 && topRightValue != 0){
                topRightBox.innerHTML = bottomRightValue + topRightValue;
                turn = -1;
                if (bottomRightValue + topRightValue >= handDiesAt){
                    topRightBox.innerHTML = 0;
                }
            }
            clearHandSelection();
            return;
        }
        alert("This shouldn't have been reached (1)");
    }
    

}


// Position = [myHand1, myHand2, oppHand1, oppHand2], move = [x hits, y]
function getMoveValue(position, move){
    handHit = move[1];
    // Check if we're hitting oppHand1
    if (position[2] == handHit){
        position[2] += move[0];
        // Check if over limit
        if (position[2] >= handDiesAt){
            position[2] = 0;
        }
    } 
    // Check if we're hitting oppHand2
    else if (position[3] == handHit){
        position[3] += move[0];
        // Check if over limit
        if (position[3] >= handDiesAt){
            position[3] = 0;
        }
    } else {
        // Just in case error message
        alert("ERROR: We're trying to hit something that isn't there");
        return;
    }

    // Now that we've updated the move, return its value
    // Check if the order of oppHands has changed
    // We also need to switch players (that's what happens once a move is played)
    if (position[2] > position[3]){
        return positionValues[`${position[3]},${position[2]},${position[0]},${position[1]}`];
    } else {
        return positionValues[`${position[2]},${position[3]},${position[0]},${position[1]}`];
    }
}

// Function by ChatGPT that returns either the highest negative, otherwise 0, otherwise largest positive.
// Akin to finding the quickest win, otherwise settling for a draw, otherwise only allowing the longest win.
function getBestChoice(arr) {
    // Find the highest negative number in the array
    const highestNegative = arr.filter(num => num < 0).sort((a, b) => b - a)[0];
    // Check if the array contains 0
    const containsZero = arr.includes(0);
  
    // Return the highest negative number if it exists, 0 if the array contains 0, and the highest positive number otherwise
    return highestNegative || (containsZero ? 0 : Math.max(...arr));
}

// On computer's turn, he will find the best move, select the correct squares, then call makePlayerMove()
function computerTurn(){

    // Get all relevant game information.

    // Game values
    topLeft =     parseInt(document.getElementById("top-left-hand").innerHTML);
    topRight =    parseInt(document.getElementById("top-right-hand").innerHTML);
    bottomLeft =  parseInt(document.getElementById("bottom-left-hand").innerHTML);
    bottomRight = parseInt(document.getElementById("bottom-right-hand").innerHTML);
    
    // Making sure the values are in increasing order
    if (bottomLeft > bottomRight){
        [bottomLeft, bottomRight] = [bottomRight, bottomLeft];
    }
    if (topLeft > topRight){
        [topLeft, topRight] = [topRight, topLeft];
    }
 

    // Pass game info to find all possible moves
    
    // The list stores a move: [a hand with x fingers, hits a hand with y fingers]
    all_legal_moves = [];
    comp_hand = [topLeft, topRight];
    human_hand = [bottomLeft, bottomRight];

    // Get all hit combinations
    for (var i = 0; i < 2; i++){
        if (comp_hand[i] != 0){
            for (var j = 0; j < 2; j++){
                if (human_hand[j] != 0){
                    all_legal_moves.push([comp_hand[i], human_hand[j]]);
                }
            }
        }
    }

    // Code by ChatGPT to remove duplicate arrays from an array
    var legal_moves = all_legal_moves.filter((el, index, self) => {
        // Check if the element is not already in the deduplicated array
        return !self.slice(0, index).some((existing) => existing[0] === el[0] && existing[1] === el[1]);
    });

    
    
    // Use a function that takes in a (position and move) and returns the value
    move_values = [];
    for (var i = 0; i < legal_moves.length; i++){
        move_values.push(getMoveValue([topLeft, topRight, bottomLeft, bottomRight], legal_moves[i]));
    }

    // Check the value of a split, if it is legal.
    splitValid = isValidSplit(topLeft, topRight);
    if (splitValid) {
        splitTo = parseInt((topLeft + topRight) / 2);
        splitVal = positionValues[`${bottomLeft},${bottomRight},${splitTo},${splitTo}`];
        legal_moves.push("S");
        move_values.push(splitVal);
    }

    // Determine the best move, if more than 1, choose random move
    bestChoiceValue = getBestChoice(move_values);
    onlyBestMoves = [];
    for (var i = 0; i < legal_moves.length; i++){
        if (move_values[i] == bestChoiceValue){
            onlyBestMoves.push(legal_moves[i]);
        }
    }
    // If there are multiple move choices, choose 1
    if (onlyBestMoves.length > 1){
        // Code by ChatGPT to choose a random element from the array of best moves
        const randomIndex = Math.floor(Math.random() * onlyBestMoves.length);
        moveToPlay = onlyBestMoves[randomIndex];
    } else {
        moveToPlay = onlyBestMoves[0];
    }

    // Reinitialize square values to their correct numbers now
    topLeft =     parseInt(document.getElementById("top-left-hand").innerHTML);
    topRight =    parseInt(document.getElementById("top-right-hand").innerHTML);
    bottomLeft =  parseInt(document.getElementById("bottom-left-hand").innerHTML);
    bottomRight = parseInt(document.getElementById("bottom-right-hand").innerHTML);

    // Get the correct 2 squares selected
    computerSquare1 = "";
    computerSquare2 = "";
    // Check if chosen move is a split
    if (moveToPlay === "S"){
        topLeftSelected = true;
        topRightSelected = true;

        if (topLeft != 0) {
            computerSquare1 = document.getElementById("top-left-hand");
            computerSquare2 = document.getElementById("top-right-hand");
        } else {
            computerSquare1 = document.getElementById("top-right-hand");
            computerSquare2 = document.getElementById("top-left-hand");
        }
    }
    // Choose between the other 4 move combinations
    else {
        if (topLeft == moveToPlay[0]){
            topLeftSelected = true;
            computerSquare1 = document.getElementById("top-left-hand");
        } else {
            topRightSelected = true;
            computerSquare1 = document.getElementById("top-right-hand");
        }

        if (bottomLeft == moveToPlay[1]){
            bottomLeftSelected = true;
            computerSquare2 = document.getElementById("bottom-left-hand");
        } else {
            bottomRightSelected = true;
            computerSquare2 = document.getElementById("bottom-right-hand");
        }
    }



    // Show the computer's move by highlighting squares and using delays
    setTimeout(() => {
        computerSquare1.style.border = "4px solid gold";
        computerSquare1.style.borderRadius = "5px";
    }, 500);

    setTimeout(() => {
        computerSquare2.style.border = "4px solid gold";
        computerSquare2.style.borderRadius = "5px";
    }, 1000);

    // Call function to complete move.
    setTimeout(() => {
        makePlayerMove();
        return;
    }, 1500);





    return;
}




function startGame(){

    handDiesAt = document.getElementById("number-input").value;
    if (handDiesAt < minNumber || handDiesAt > maxNumber){
        alert("Number not in range!");
        return;
    }

    // Reset any variables from previous rounds
    positionValues = {};
    longestWin = "";
    clearHandSelection();

    // Get game settings
    canSplit = document.getElementById("checkbox-split").checked;
    showGameValue = document.getElementById("checkbox-showresult").checked;
    if (document.getElementById("checkbox-whostarts").checked){
        turn = 1;
    } else {
        turn = -1;
    }
    startOnLongestWin = document.getElementById("checkbox-longestwin").checked;
    playAI = document.getElementById("radio1").checked;

    // Update title
    titleText = `Hand dies at ${handDiesAt}`;
    if (canSplit){
        titleText += ", even split allowed";
    }
    document.getElementById("game-info").innerHTML = titleText;

    // Load solution into memory
    if (canSplit){
        filename = `G${handDiesAt}S.txt`;
    } else {
        filename = `G${handDiesAt}.txt`;
    }
    readFile(filename);
    fillSolutions();

    // Set starting position
    if (startOnLongestWin){
        findLongestWin();
        lw_pos = longestWin.split(",");
        if (turn == 1) {
            document.getElementById("top-left-hand").innerHTML = lw_pos[2];
            document.getElementById("top-right-hand").innerHTML = lw_pos[3];
            document.getElementById("bottom-left-hand").innerHTML = lw_pos[0];
            document.getElementById("bottom-right-hand").innerHTML = lw_pos[1];
        } else {
            document.getElementById("top-left-hand").innerHTML = lw_pos[0];
            document.getElementById("top-right-hand").innerHTML = lw_pos[1];
            document.getElementById("bottom-left-hand").innerHTML = lw_pos[2];
            document.getElementById("bottom-right-hand").innerHTML = lw_pos[3];
        }

    } else {
        document.getElementById("top-left-hand").innerHTML = 1;
        document.getElementById("top-right-hand").innerHTML = 1;
        document.getElementById("bottom-left-hand").innerHTML = 1;
        document.getElementById("bottom-right-hand").innerHTML = 1;
    }

    // Update information about the game
    updateGameInfo();

    // If computer starts
    if (playAI && turn == -1){
        computerTurn();
    }
}

function handClicked(id){
    // If the game is over or not started, don't allow clicking
    if (currPosVal == -1 || turn == 0){
        return;
    }
    // If it's the computer's move, don't allow clicking
    if (playAI && turn == -1){
        return;
    }

    
    // If a square is clicked, switch it status between selected and not selected.
    switch (id){
        case "top-left-hand":
            topLeftSelected = !topLeftSelected;
            break;
        case "top-right-hand":
            topRightSelected = !topRightSelected;
            break;
        case "bottom-left-hand":
            bottomLeftSelected = !bottomLeftSelected;
            break;
        case "bottom-right-hand":
            bottomRightSelected = !bottomRightSelected;
            break;
    }
    
    var numSelected = 0;
    if (topLeftSelected){
        numSelected += 1;
    }
    if (topRightSelected){
        numSelected += 1;
    }
    if (bottomLeftSelected){
        numSelected += 1;
    }
    if (bottomRightSelected){
        numSelected += 1;
    }


    // If no boxes are selected, make sure any borders disappear.
    if (numSelected == 0){
        clearHandSelection();
    }
        // If only 1 box is selected, give it a border to visually see it
    else if (numSelected == 1){
        if (topLeftSelected){
            box = document.getElementById("top-left-hand");
        }
        if (topRightSelected){
            box = document.getElementById("top-right-hand");
        }
        if (bottomLeftSelected){
            box = document.getElementById("bottom-left-hand");
        }
        if (bottomRightSelected){
            box = document.getElementById("bottom-right-hand");
        }

        box.style.border = "4px solid red";
        box.style.borderRadius = "5px";
    }
    // If 2 boxes are selected, a move has been made; try to play it
    else if (numSelected == 2){
        makePlayerMove();

        if (currPosVal == -1){
            return;
        }

        if (playAI && turn == -1){
            computerTurn();
        }
    }
}



// Functions that won't need to be changed.

function clearHandSelection(){
    document.getElementById("top-left-hand").style.border = "None";
    document.getElementById("top-left-hand").style.borderRadius = "None";

    document.getElementById("top-right-hand").style.border = "None";
    document.getElementById("top-right-hand").style.borderRadius = "None";

    document.getElementById("bottom-left-hand").style.border = "None";
    document.getElementById("bottom-left-hand").style.borderRadius = "None";

    document.getElementById("bottom-right-hand").style.border = "None";
    document.getElementById("bottom-right-hand").style.borderRadius = "None";

    topLeftSelected = false;
    topRightSelected = false;
    bottomLeftSelected = false;
    bottomRightSelected = false;

    updateGameInfo();
}

function readFile(file)
{
    var f = new XMLHttpRequest();
    f.open("GET", file, false);
    f.onreadystatechange = function ()
    {
        if(f.readyState === 4)
        {
            if(f.status === 200 || f.status == 0)
            {
                alltxt = f.responseText.split("\n");
            }
        }
    }
    f.send(null);
}

// When all lines of the solution file are loaded, get "pos: val" pairs.
function fillSolutions(){
    alltxt.pop();

    let i = 0;
    while (i < alltxt.length){
        line = alltxt[i].split(";");
        positionValues[line[0]] = parseInt(line[1]);
        i++;
    }
    alltxt = [];
}

function findLongestWin(){
    longest_value = -1;
    for (const [key, value] of Object.entries(positionValues)) {
        if (value > longest_value){
            longest_value = value;
            longestWin = key;
        }
    }
}

function findCurrPosVal() {
    topLeft =     parseInt(document.getElementById("top-left-hand").innerHTML);
    topRight =    parseInt(document.getElementById("top-right-hand").innerHTML);
    bottomLeft =  parseInt(document.getElementById("bottom-left-hand").innerHTML);
    bottomRight = parseInt(document.getElementById("bottom-right-hand").innerHTML);

    
    if (bottomLeft > bottomRight){
        [bottomLeft, bottomRight] = [bottomRight, bottomLeft];
    }
    if (topLeft > topRight){
        [topLeft, topRight] = [topRight, topLeft];
    }

    if (turn == 1){
        currPosVal = positionValues[`${bottomLeft},${bottomRight},${topLeft},${topRight}`];
    } else {
        currPosVal = positionValues[`${topLeft},${topRight},${bottomLeft},${bottomRight}`];
    }
}

// Updates information about who is winning, and in how many moves.
function updateGameInfo(){
    var gameValInfo = document.getElementById("game-value-info");

    findCurrPosVal();

    if (!showGameValue){
        // If game is lost, actually have to update message
        if (currPosVal == -1){
            // If we're playing the AI
            if (playAI){
                if (turn == 1){
                    gameValInfo.innerHTML = "You have won!";
                } else {
                    gameValInfo.innerHTML = "The computer has won!";
                }
            // If it's 2 player mode
            } else {
                if (turn == -1){
                    gameValInfo.innerHTML = "Bottom player has won!";
                } else {
                    gameValInfo.innerHTML = "Top player has won!";
                }
            }
        } else {
            gameValInfo.innerHTML = "Game in progress...";
            return;
        }
    }
    

    // Update turn information
    turnElement = document.getElementById("turn-info");
    if (currPosVal == -1){
        turnElement.innerHTML = "";
    } else if (turn == 1){
        turnElement.innerHTML = "Bottom player's turn...";
    } else if (playAI) {
        turnElement.innerHTML = "Computer's turn...";
    } else {
        turnElement.innerHTML = "Top player's turn...";
    }


    // If the game is drawn
    if (currPosVal == 0){
        gameValInfo.innerHTML = `The game is drawn`;
    }
    // Human is playing AI
    else if (playAI) {
        // Human's turn
        if (turn == 1){
            // Human is losing
            if (currPosVal < 0){
                // Human is already lost
                if (currPosVal == -1){
                    gameValInfo.innerHTML = `You have lost`;
                } else {
                    gameValInfo.innerHTML = `You will lose in ${-1*currPosVal-1} moves`;
                }
            } 
            // Human is winning
            else {
                // Grammar change, if human can win in 1
                if (currPosVal == 2){
                    gameValInfo.innerHTML = `You could win in 1 move`;
                } else{
                    gameValInfo.innerHTML = `You could win in ${currPosVal-1} moves`;
                }
            }
        } 
        // Computer's turn
        else{
            // Computer is losing
            if (currPosVal < 0){
                // Computer has lost
                if (currPosVal == -1){
                    gameValInfo.innerHTML = `The computer has lost`;
                } else {
                    gameValInfo.innerHTML = `The computer could lose in ${-1*currPosVal-1} moves`;
                }
            }
            // Computer is winning
            else {
                // Grammar change, if computer can win in 1 
                if (currPosVal == 2){
                    gameValInfo.innerHTML = `The computer will win in 1 move`;
                } else{
                    gameValInfo.innerHTML = `The computer will win in ${currPosVal-1} moves`;
                }
            }
        }
    }
    // If 2 humans are playing
    else {
        // Bottom player's turn
        if (turn == 1){
            // Bottom player is losing
            if (currPosVal < 0) {
                // Bottom player already lost
                if (currPosVal == -1){
                    gameValInfo.innerHTML = `Bottom player has lost. Top player has won!`;
                } else {
                    gameValInfo.innerHTML = `Bottom player could lose in ${-1*currPosVal-1} moves`;
                }
            }
            // Bottom player is winning
            else {
                // Grammar change, if bottom player can win in 1
                if (currPosVal == 2){
                    gameValInfo.innerHTML = `Bottom player could win in 1 move`;
                } else{
                    gameValInfo.innerHTML = `Bottom player could win in ${currPosVal-1} moves`;
                }
            }
        } 
        // Top player's turn
        else {
            // Top player is losing
            if (currPosVal < 0){
                // If top player has already lost
                if (currPosVal == -1){
                    gameValInfo.innerHTML = `Top player has lost. Bottom player has won!`;
                } else {
                    gameValInfo.innerHTML = `Top player could lose in ${-1*currPosVal-1} moves`;
                }
            }
            // Top player is winning
            else {
                // Grammar change, if top player can win in 1 
                if (currPosVal == 2){
                    gameValInfo.innerHTML = `Top player can win in 1 move`;
                } else{
                    gameValInfo.innerHTML = `Top player can win in ${currPosVal-1} moves`;
                }
            }
        }
    }
}