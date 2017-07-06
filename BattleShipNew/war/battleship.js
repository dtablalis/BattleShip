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
	ships: [ {locations: [0,0,0], hits: ["","",""]},
	         {locations: [0,0,0], hits: ["","",""]},
	         {locations: [0,0,0], hits: ["","",""]}],
    fire: function(guess){
    	for(var i=0;i<this.numShips;i++){
    		var ship=this.ships[i];
    		var index = ship.locations.indexOf(guess);
    		if(index >= 0){
    			ship.hits[index] = "hit";
    			view.displayHit(guess);
    			view.displayMessage("HIT!");
    			return true;
    		}
    	}
    	view.displayMiss(guess);
		view.displayMessage("MISS!");
		return false;
    	
    },
	
//isSunk:function(ship){
//		
//	}
//	
	generateShipLocations:function(){
		var location;
		for(var i = 0; i < this.numShips;i++){
			do{
				location = this.generateShip();
			}while(this.collision(location));
			this.ships[i].locations = location;
		}
		
	},

	generateShip:function(){
		var horizontal;
		var row;
		var col;
		var shipLocations = [];
		horizontal = Math.floor(Math.random() * 2);
		if(horizontal == 1){
			row = Math.floor(Math.random() * this.boardSize );
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength) );
		}else{	
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength) );
			col = Math.floor(Math.random() * this.boardSize );
		}
		
		for(var i = 0; i < this.shipLength;i++){
			if(horizontal == 1){
				shipLocations.push(row + "" + (col + i));
			}else{
				shipLocations.push((row + i) + "" + col);
			}
		}
		return shipLocations;
	},
	collision:function(location){
		for(var i = 0; i < this.numShips; i++){
			var ship = model.ships[i];
			for(var j = 0; j < this.shipLength; j++){
			if(ship.locations.indexOf(location[j]) >= 0){
				return true;
			}}
			return false;
		}
	}
    
};


/*view.displayMessage("gggg");
model.fire("01");*/

var controller = {
		
};

function init(){
	var firebutton = document.getElementById("firebutton");
	firebutton.onclick = handleFirebutton; //handle function
	model.generateShipLocations();
}

function handleFirebutton(){
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	var parsed = parseguess(guess);
	//console.log(parsed);
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
