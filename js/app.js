// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //enemy start outside of the screen
    this.x = -100;

    //chosing random enemy's position
    var position = Math.random() * 10;
    if (position <= 3) {
        this.y = 50;
    } else if (position <= 7) {
        this.y = 140;
    } else {
        this.y = 220;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    console.log(this.x);    
        this.x = this.x * dt;
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
                if (this.y > -50) {
                    this.y -=90;
                };
                break;
            case 'left':
                if (this.x > 0){
                    this.x -=100;
                };
                break;
            case 'right':
                if (this.x < 400) {
                    this.x +=100;
                };
                break;
            case 'down':
                if(this.y < 400) {
                    this.y +=90;
                };
                break;
        };
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
for (let i = 0; i < 10; i++) {
    let enemy = new Enemy();
    allEnemies.push(enemy);
}
// Place the player object in a variable called player
var player = new Player();



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
