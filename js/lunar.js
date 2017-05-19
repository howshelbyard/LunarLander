//hellooo


//alert("helloooo");

var gameArea = document.getElementById('myGameArea');
var gameRect = gameArea.getBoundingClientRect();
var gameAreaWidth = gameRect.right - gameRect.left;
var gameAreaHeight = gameRect.bottom - gameRect.top;
//alert("hi my game area width is" + gameAreaWidth + "and this is the height" + gameAreaHeight);


var landerImage = document.getElementById('lander');
landerImage.style.position = "absolute";
landerImage.style.zIndex = "1";


var targetImage = document.getElementById('target');
targetImage.style.position = "absolute";
targetImage.style.zIndex = "0";

var flameImage = document.getElementById('flame');
flameImage.style.position = "absolute";
flameImage.style.zIndex = "0";
flameImage.style.display = "none";

var blowUpImage = document.getElementById('blowUp');
blowUpImage.style.position = "absolute";
blowUpImage.style.zIndex = "0";
blowUpImage.style.display = "none";


//awesome stuff from friday

var landerDY = 6;
var landerDX = 0;
var landerX = 0;
var landerY = 0;
var landerWidth = 110;

var targetX = 0;
var targetY = 0;
var crashed = false;
var moving = false;
var id = setInterval(frame, 40);


var flameX = 0;
var flameY = 0;

function checkForWin(){
	var didIWin = false;

	if(Math.abs(landerX - targetX) < 15){ //look at x
		if (((targetY + 5) - (landerY + 80)) < 10){ //look at y
			if(Math.abs(landerDY) < 5){ //look at speed
				didIWin = true; 
			}
		}
	}

	return didIWin;
}


function setFlamePosition(){
	//Set the Flame
    flameY = landerY + 70;
    flameX = landerX + 40;
    flameImage.style.top = flameY + 'px';
    flameImage.style.left = flameX + 'px';

}

function showFlame(){

	flameImage.style.display = "block";


}

function hideFlame(){

	flameImage.style.display = "none";
}

function setLanderAtTopAndTargetAtBottom(){

	landerImage.style.display = "block";
	blowUpImage.style.display = "none";

	landerY = 0;
	landerX = Math.round( (gameAreaWidth/2)  - (landerWidth/2) );
	landerImage.style.top = landerY + 'px';
	landerImage.style.left = landerX + 'px';
	setFlamePosition();
	
	//landerDX = 0;
  //  landerDY = 6;

    targetY = gameAreaHeight - 40;
    targetX = Math.round(Math.random() * (gameAreaWidth-300)) + 55;
    targetImage.style.top = targetY + 'px';
    targetImage.style.left = targetX + 'px';


}

var id;

function startAnimation(){
moving = true;
landerDY = 6;
}

function resetAnimation(){
 
  landerDY = 0;
  landerDX = 0;
  setLanderAtTopAndTargetAtBottom();
}


function moveLander(){

if (moving === true) {

	if (checkForWin() === false) {


			landerX = landerX + landerDX;
			landerY = landerY + landerDY;

			// added to accelerate
			landerDY += 1;

			if(landerX <= 0 && landerDX < 0){

				landerX = 0;
				landerDX = 0;
			}

			if( landerX > gameAreaWidth - landerWidth){

				landerX = gameAreaWidth - landerWidth;
				landerDX = 0;
			}

			if (landerY >= gameAreaHeight - landerWidth){
				landerY = gameAreaHeight - landerWidth;

				//change to handle a crash

		if (landerDY > 4) {
			crashed = true;
					landerDX = 0;
				landerDY = 0;
			}


			


			}
		//drawing based on crash state
			if (crashed === false) {



				landerImage.style.left = landerX + 'px';
				landerImage.style.top = landerY + 'px';
				setFlamePosition();



			} else {
				moving = false;
				landerImage.style.display = "none";
				hideFlame();
				blowUpImage.style.left = landerX + 'px';
				blowUpImage.style.top = landerY + 'px';
				blowUpImage.style.display = "block";
			}

		} else {

			moving === false;
			hideFlame();
			alert("Nice landing, you won!!!");
 
		}

	}



	console.log("Lander X and Y are " + landerX + ", " + landerY);




}

function frame(){

	//console.log("hi from frame");
	moveLander();
}


setLanderAtTopAndTargetAtBottom(); 
//temporary test
//showFlame();


document.getElementById('resetButton').onclick = resetAnimation;
document.getElementById('startButton').onclick = startAnimation;


//anonymous function

document.onkeydown = function(e) {

	// if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
       // e.preventDefault();
    //}
    
    switch (e.keyCode) {
    	//Spacebar
    	case 32:
    		//alert("spacebar");
    		crashed = false;
    		resetAnimation();
    		startAnimation();

    		break;

    	//Left
        case 37:
         //   alert('left');

         landerDX += -1;
         showFlame();
    
            break;

         //UP   
        case 38:
			showFlame();
			landerDY -= 9;
            break;

         //Right   
        case 39:
            //alert('right');

               landerDX += 1;
         showFlame();
        
            break;

        case 40:
            //alert('down');
            break;

    }

};


//on key up

document.onkeyup = function(e) {

	// if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
       // e.preventDefault();
  //  }


    switch (e.keyCode) {
        case 37:
            //alert('left');
            break;
        case 38:

        	hideFlame();
           
            break;
        case 39:
            //alert('right');
            break;
        case 40:
            //alert('down');
            break;
    }
};

