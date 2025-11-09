var width = 500,
	height = 500,
	c = document.getElementById('c'),
	ctx = document.getElementsByTagName('canvas')[0].getContext('2d'),
    sound = new Audio("sound/cartoon sound effect.wav"),
	high = 0,
	points = 0,
	state = 2,
	select = 0,
	win = false,
	background = '#edecc2',
	restart;
	
c.width = width;
c.height = height;

// Create variable buildCanvas
var buildCanvas = function(){
	ctx.fillStyle = background;
	ctx.rect(0,0, width, height);
	ctx.fill();
};

// Create variable player
var player = new (function(){
	var that = this;

	that.image = new Image();
	that.width = 65;
	that.height = 95;

	// Initialize variables with that. prevents changes to old variables
	that.X = 0;
	that.Y = 0;
	that.frames = 1;
	that.actualFrame = 0;
	that.interval = 0;
	that.isJumping = 0;
	that.isFalling = 0;
	that.jumpSpeed = 0;
	that.fallSpeed = 0;
	that.isMoving = true;
	that.setPosition = function(x, y){
		that.X = x;
		that.Y = y;
	};

	// Initialize the jump movement with speed 25 and sound
	that.jump = function() {
		if(!that.isJumping && !that.isFalling) {
			that.fallSpeed = 0;
			that.isJumping = true;
			that.jumpSpeed = 25;
            sound.play();
		}
	};

	// check jumps
	that.checkJump = function() {
		if(that.Y > height * 0.25) {
			that.setPosition(that.X, that.Y - that.jumpSpeed);
		} else {
			if(that.jumpSpeed > 10) points += 100;
			
			platforms.forEach(function(platform, ind) {
					platform.Y += that.jumpSpeed;

				// Random two platform types when touch the platform
				if(platform.Y > height) {
					var type = ~~(Math.random() * 5);
					if(type == 0) type = 1;
					else type = 0;
					platforms[ind] = new Platform(Math.random() * (width - platformWidth), platform.Y - height, type);
				}
			});
		}

		// Decrease the speed after reaching the top
		that.jumpSpeed--;
		if(that.jumpSpeed == 0) {
			that.isJumping = false;
			that.isFalling = true;
			that.fallSpeed = 5;
		}
	};

	// Game over if the player did not reach the platform
	that.checkFall = function() {
		if(that.Y < height - that.height) {
			that.setPosition(that.X, that.Y + that.fallSpeed);
			that.fallSpeed++;
		} else {
			if(points == 0) that.fallStop();
			else GameOver();
		}
	};

	// When fallspeed = 0, jump
	that.fallStop = function() {
		that.isFalling = false;
		that.fallSpeed = 0;
		that.jump();
	};
		
	
	that.moveLeft = function(theX) {
		if((that.X > 0) && that.isMoving) {
			that.setPosition(theX - that.width/2, that.Y);
		}
	};
	
	that.moveRight = function(theX) {
		if((that.X + that.width < width) && that.isMoving) {
			that.setPosition(theX - that.width/2, that.Y);
		}
	};
	// update jump or fall Status
	that.update = function() {
		if(that.isJumping) that.checkJump();
		if(that.isFalling) that.checkFall();
		that.draw();
	};
		
	// Animation jumping effect
	that.draw = function(){
		try {
			ctx.drawImage(that.image, 0, that.height * that.actualFrame, that.width, that.height,
						  that.X, that.Y, that.width, that.height);
		} catch(e) {
		}

		if(that.interval == 4) {
			if(that.actualFrame == that.frames) {
				that.actualFrame = 0;
			} else {
				that.actualFrame++;
			}
			that.interval = 0;
		}

		that.interval++;
	}
})();

// Create variable Platform
var Platform = function(x, y, type) {
	var that = this;

	// Initialize the normal platform as black
	that.firstColor = '#000000';
	// Collide when player reach platform
	that.onCollide = function() {
		player.fallStop();
	};
	
	that.isMoving = ~~(Math.random() * 2);
	that.staticP = ~~(Math.random() * 2) ? -1 : 1;

	// Draw the platform
	that.draw = function() {
		
		var gradient = ctx.createRadialGradient(that.X + (platformWidth / 2), that.Y + (platformHeight / 2), 5, that.X + (platformWidth / 2), that.Y + (platformHeight / 2), 45);
		gradient.addColorStop(0, that.firstColor);
		ctx.fillStyle = gradient;
		ctx.fillRect(that.X, that.Y, platformWidth, platformHeight);
	};

	// If the type of platform is 1, then set the speed to 60
	if(type == 1) {
		that.firstColor = '#ffffff';
		
		that.onCollide = function() {
			player.fallStop();
			player.jumpSpeed = 60;
		};
	}
	that.X = ~~x;
	that.Y = y;
	that.type = type;
	return that;
};

// Set up the maximum platforms number, width, and height
var nrOfPlatforms = 6,
	platforms = [],
	platformWidth = 70;
	platformHeight = 20;

// Create variable generatePlatforms
var generatePlatforms = function() {
	var position = 0, type;
	for(var i = 0; i < nrOfPlatforms; i++) {

		type = ~~(Math.random()*5);
		if(type == 0) type = 1;
		else type = 0;
		
		platforms[i] = new Platform(Math.random()*(width-platformWidth), position,type);
		
		if(position < height - platformHeight) position += ~~(height / nrOfPlatforms);
	}
}();

// Create variable checkCollision
var checkCollision = function() {
	platforms.forEach(function(e, ind) {
		if((player.isFalling) &&
		   (player.X < e.X + platformWidth) &&
		   (player.X + player.width > e.X) &&
		   (player.Y + player.height > e.Y) &&
		   (player.Y + player.height < e.Y + platformHeight)
		  ) {
			e.onCollide();
		}
	})
};

// Create variable Gameover
var GameOver = function() {
	state = false;
	clearTimeout(restart);
	if(points == high) {
		$.get("http://www.figitaki.com/game/high.php?high=" + points);
		win = true;
	}
	setTimeout(function() {
		buildCanvas();
		ctx.fillStyle = "Black";
		ctx.font = "10pt Arial";
		if(win) ctx.fillText("NEW HIGH SCORE!", width /2 - 75, height / 2);
		ctx.fillText("GAME OVER", width / 2 - 60, height / 2 - 60);
		ctx.fillText("YOUR RESULT:" + points, width / 2 - 80, height / 2 - 30);
	}, 100);
};

// Tracking the mouse movement
document.onmousemove = function(e) {
	if(state == 1) {
		if(player.X + c.offsetLeft > e.pageX - 15) {
			player.moveLeft(e.pageX - c.offsetLeft);
		} else if(player.X + c.offsetLeft < e.pageX - 15) {
			player.moveRight(e.pageX - c.offsetLeft);
		}
	}
	else {
		if(e.pageX - c.offsetLeft < width / 2)
			select = 0;
		else
			select = 1;
	}
};
// Tracking the mouse click
document.onmousedown = function(e) {
	if(state == false) {
		points = 0;
		$.get(function(data) { high = data; });
		state = 2;
		win = false;
		StartMenu();
	}
	else if(state == 2) {
		if(select == 0)
			player.image.src = "img/peppa.png";
		else
			player.image.src = "img/pig1.png";
		state = true;
	}
};
player.setPosition(~~((width - player.width) / 2), ~~((height - player.height) / 2));
player.jump();

// The basic game loop(buildCanvas function speed up the game and  interaction between platform and player
var GameLoop = function() {

	buildCanvas();

	ctx.fillStyle = "Black";
	ctx.fillText("POINTS:" + points, 10, height - 10);

	platforms.forEach(function(platform, index){
		if(platform.isMoving) {
			if(platform.X < 0) {
				platform.staticP = 1;
			} else if(platform.X > width - platformWidth) {
				platform.staticP = -1;
			}
			platform.X += platform.staticP * (index / 2) * ~~((points / 10000) % 8);
		}
		platform.draw();
	});
	
	checkCollision();

	if(points > 20000)
		background = '#cddf5f';

	if(points > 40000)
		background = '#e8e6f7';

	if (points > 80000)
		background = '#f7e6f0';

	if (points > 160000)
		background = '#f7a3a3';

	if (points > 320000)
		background = '#f7e1a3';

	player.update();
	if(state)
		gLoop = setTimeout(GameLoop, 20);
	else if(state == 2)
		StartMenu();
};

// Create variable startmenu
var StartMenu = function() {
	buildCanvas();
	
	ctx.fillStyle = "#E2E0DF";
	if(select == 0)
		ctx.fillRect(0, 0, width / 2, height);
	else
		ctx.fillRect(width / 2, 0, width, height);

	ctx.font = "20pt Times New Roman";
	ctx.fillStyle = "Black";
	ctx.fillText("SELECT A CHARACTER", width / 2 - 150, height / 2 - 50);
	ctx.font = "12pt Arial";
	ctx.fillText("Pippa", width / 3 - 10, height / 2);
	ctx.fillText("Peppa", width / 3 * 2 - 15, height / 2);
	
	if(state == 2)
		gLoop = setTimeout(StartMenu, 1000 / 50);
	else {
		clearTimeout();
		GameLoop();
	}
};

StartMenu();