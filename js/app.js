// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // enemy end the trip and start again
    if (this.x > 500) {
        this.x = -100;// - (Math.random() * 500);
    } else {
        // it grows based on the speed of the enemy
        this.x += this.speed*dt;
    }

    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor () {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 400;
    };
    
    update (dt) {
    };

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    handleInput(mov) {
        switch (mov) {
            case 'up':
                if (this.y > 40) {
                    this.y -=90;
                } else {
                    // game was won and the player start at star position
                    this.x = 200;
                    this.y = 400;
                }
                break;
            case 'left':
                if (this.x > 0){
                    this.x -=100;
                }
                break;
            case 'right':
                if (this.x < 400) {
                    this.x +=100;
                }
                break;
            case 'down':
                if(this.y < 400) {
                    this.y +=90;
                }
                break;
        };
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
//create 5 enemies
for (let i = 1; i <= 5; i++) {
    let enemy = new Enemy();
    if (i <= 2) {
        //when start (not all at the same time)
        enemy.x = -100*i;
        //position (witch road)
        enemy.y = 60;
        //speed
        enemy.speed = 400;
    } else if (i <= 3) {
        enemy.x = -100*i;
        enemy.y = 140;
        enemy.speed = 200;
    } else {
        enemy.x = -100*i;
        enemy.y = 225;
        enemy.speed = 100;
    }
    //when start (not all at the same time)
    enemy.x = Math.random() * -400;
    allEnemies.push(enemy);
}
// Place the player object in a variable called player
var player = new Player();


// if they collide then the player starts from the beginning
function checkCollisions() {
    for (const enemy of allEnemies) {
        if (enemy.x > (player.x -70) & (enemy.x < (player.x + 70)) & (enemy.y > (player.y - 70)) & (enemy.y < (player.y + 70))) {
        player.x = 200;
        player.y = 400;
        }
    }
};



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
