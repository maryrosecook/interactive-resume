Character = Class.extend({

    frameY: {'down': 11, 'left': 59, 'up': 107, 'right': 155}, //+48
    
    frameX: {1:8, 2:56, 3:104, 4:152}, //+48
    
    currentFrame: 1,
    
    movementTime: 0,
    
    direction: null,
    
    coordX: 0,
    
    coordY: 0,
    
    positionTimeOne: 0,
    
    positionTimeTwo: 0,
    
    characterCoords: {},
    
    directionFlag: {'up': true, 'down': true, 'right': true, 'left': true},
    
    init: function(x, y, name, direction, destination) {
        this.coordX = x;
        this.coordY = y;
        this.direction = direction;
        this.imgName = name;
        this.destination = destination;
        this.startingPoint = [x, y];
        for (var i = 0; i < gGameEngine.images.length; i++) {
            if (gGameEngine.images[i].alt == name) {
                gGameEngine.characterImgs.push(gGameEngine.images[i]);
              
            }
        }
        
        //keeping track of all object names in a list
        gGameEngine.allCharacters.push(name);
    
    },
    
    drawCharacter: function() {  
    	//var randomNumber = Math.random() * 200 + 100;
    	
    	this.characterCoords.top = this.coordY;
    	this.characterCoords.bottom = this.coordY + gGameEngine.tileSize;
    	this.characterCoords.left = this.coordX;
    	this.characterCoords.right = this.coordX + gGameEngine.tileSize;
    	
    	//storing coordinates in a collision dict
    	gGameEngine.characterCollisions[this.imgName] = this.characterCoords;
    	
    	//checking to see if character is stuck in between 2 tiles
    	if (gGameEngine.intersectRect([mainPlayer.characterCoords], this) && gGameEngine.intersectRect(gGameEngine.collision, this)) {
    		console.log('stuck');
    		this.directionFlag.up = false;
    		this.directionFlag.down = false;
    		this.directionFlag.left = false;
    		this.directionFlag.right = false;    
    	}
    	//if the character is not stuck, we can do normal collision detection...
    	else {
    		//collision with mainPlayer
    		if (!gGameEngine.collisionHandler([mainPlayer.characterCoords], this)) {
				this.directionFlag.up = true;
				this.directionFlag.down = true;
				this.directionFlag.left = true;
				this.directionFlag.right = true; 
				this.movingFlag = true;
    		}
    		
    		//collision with collision tiles
			if (!gGameEngine.collisionHandler(gGameEngine.collision, this)) {
				this.directionFlag.up = true;
				this.directionFlag.down = true;
				this.directionFlag.left = true;
				this.directionFlag.right = true;
				this.movingFlag = true;			
			}
    		
    	}
    	
    	// path finding algo
    	this.findPath();
    	
    	//direction handling

		if (this.direction == 'down' && this.directionFlag.down == true) {
            this.coordY++;
        }
            
        if (this.direction == 'up' && this.directionFlag.up == true) {
        	this.coordY--;
        }   
        
        if (this.direction == 'right' && this.directionFlag.right == true) {
        	this.coordX++;
        }
        
        if (this.direction == 'left' && this.directionFlag.left == true) {
        	this.coordX--;
        }        
                
        //animation when moving
        if (this.movingFlag == true) {
            this.movementTime++;
        
            if (this.movementTime >= 6) {
                this.currentFrame = (this.currentFrame%4) + 1;
                this.movementTime = 0;
            }        
        }       
       

        for (var i = 0; i < gGameEngine.characterImgs.length; i++) {
            if (gGameEngine.characterImgs[i].alt == this.imgName) {
                var image = gGameEngine.characterImgs[i];
            }
        }
        
        gGameEngine.ctx.drawImage(image, this.frameX[this.currentFrame], 
        	this.frameY[this.direction], 32, 32, this.coordX, this.coordY, 32, 32);
       
    },
    
    
    aStarPathFinder: function() {
    	
    
    
    
		var closedList = [];
		var openList = [];
		var cameFrom = [];
		var currentNode = {};
		
		openList.push(this.startingPoint);
		
		while (openList.length > 0) {
			var currentNode.coords = openList.pop();
			closedList.push(node);
			
			if (currentNode.coords === this.destination) {
				return 
			}
			
			var Gscore = Math.abs(currentNode.coords[0] - this.startingPoint[0]) + 
				Math.abs(currentNode.coords[1] - this.startingPoint[1]);
				
			var Hscore = Math.abs(this.destination[0] - this.currentNode.coords[0]) + 
				Math.abs(this.destination[1] - this.currentNode.coords[1]);
				
			var Fscore = Gscore + Hscore;
		
		
		}
    	
    
    
    }


});
