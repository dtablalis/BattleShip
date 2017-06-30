/**
 * Battleship Java Script code
 */

var view = {

	displayMessage: function(msg){
		var messagearea = document.getElementById("messageArea");
		messagearea.innerHTML = msg;
	},

	displayHit: function(location){
		var cell = document.getElementById(location);
		cell.setAttribute("class","hit");
	},
	
	displayMiss: function(location){
		var cell = document.getElementById(location);
		cell.setAttribute("class","miss");
	}
	
};

var model = {
	boardSize: 7,
	numShips : 3,
	shipsSunk: 0,
	shipLength: 3,
	ships: [ {locations: ["01","02","03"], hits: ["","",""]},
	         {locations: ["11","12","13"], hits: ["","",""]},
	         {locations: ["21","22","23"], hits: ["","",""]}],
    fire: function(guess){
    	for(var i=0;i<this.numShips;i++){
    		var ship=this.ships[i];
    		var index=ship.locations.indexOf(guess);
    		if(index >= 0){
    			ship.hits[guess] = "hit";
    			view.displayHit(guess);
    			view.displayMessage("HIT!");
    			return true;
    		}else{
    			view.displayMiss(guess);
    			view.displayMessage("MISS!");
    			return false;
    		}	
    		
    	}
    }
	
//isSunk:function(ship){
//		
//	}
//	
};


/*view.displayMessage("gggg");
model.fire("01");*/

var controller = {
		
};

function init(){
	var firebutton = document.getElementById("firebutton");
	firebutton.onclick = handleFirebutton; //handle function
}

function handleFirebutton(){
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	var parsed = parseguess(guess);
	console.log(parsed);
	model.fire(parsed);
	guessInput.value = "";
}
function parseguess(guess){
	var alpha = ["A","B","C","D","E","F","G"];
	var firstchar = guess.charAt(0);
	console.log(firstchar);
	var row = alpha.indexOf(firstchar);
	var column = guess.charAt(1);
	if( isNaN(row) || isNaN(column)){
		return "00";
	}else{
		console.log(row + column);
		return row + column;
	}
	
}

window.onload = init;
