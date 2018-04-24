//Scores
let score = document.querySelector('.score');
score.innerText = 0;
let saved = document.querySelector('.saved');
saved.innerText = 0;
let scoreModal = document.querySelector('.score-modal');
scoreModal.innerText = 0;
let tryAgainButton = document.querySelector('.close-button');
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.backwards = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // enemy end the trip and start again
    if (this.sprite == 'images/enemy-bug.png') {
        if (this.x > 500) {
            this.x = -100;
        } else {
            // left to right bug`s direction for the first and third rows
            // it grows based on the speed of the enemy
            this.x += this.speed*dt;
        }
    // right to left bug`s direction for the seconds row
    } else if (this.x < -100) {
        this.x = 500;
    } else {
        this.x -= this.speed*dt;
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
    	//index for character
        this.spriteIndex = 0;
        // the are 5 characther to play before ending
        this.allSprite =  [
            'images/char-boy.png',
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png'
        ]
        // first character
        this.sprite = this.allSprite[this.spriteIndex];
        //initial position
        this.x = 200;
        this.y = 400;
    };

    // change character
    changeSprite() {
        if (this.spriteIndex < this.allSprite.length-1) {
            this.spriteIndex++;
        } else {
            this.spriteIndex = 0;
            if ((score.innerText != 0) && (saved.innerText != 0)) {
                scoreModal.innerText = score.innerText*saved.innerText;
            }
            // if the last character as died or reached the sea, the game is finish
            endGame();
        }
        this.sprite = this.allSprite[this.spriteIndex];
    }

    update (dt) {
    };

    // render the character
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    //movement function
    handleInput(mov) {
        let collide = false;
        switch (mov) {
            case 'up':
                if (this.y > 40) {
                    //player can`t move if: Rocks collision
                    collide = collideWith(allRocks, this.x, this.y, 0, 0, 100, 0);
                    if (collide == false) {
                        this.y -=90;
                    }
                } else {
                    // game was won and the new player start at starting position
                    allShip.push(new Ship(this.x, this.y));
                    saved.innerText++;
                    player.changeSprite();
                    this.x = 200;
                    this.y = 400;
                }
                break;
            case 'left':
                if (this.x > 0){
                    collide = collideWith(allRocks, this.x, this.y, 100, 0, 0, 0);
                    if (collide == false) {
                    this.x -=100;
                    }
                }
                break;
            case 'right':
                if (this.x < 400) {
                    collide = collideWith(allRocks, this.x, this.y, 0, 100, 0, 0);
                    if (collide == false) {
                        this.x +=100;
                    }
                }
                break;
            case 'down':
                if (this.y < 400) {
                    collide = collideWith(allRocks, this.x, this.y, 0, 0, 0, 100);
                    if (collide == false) {
                        this.y +=90;
                    }
                }
                break;
        };
    };
};

// return true if the want to move in the rock's direction
function collideWith (arrayToProv, x, y, left, right, up, down) {
    let ouch = false;
    for (const one of arrayToProv) {
        if (one.x > (x -70 - left) & (one.x < (x + 70 + right) & (one.y > (y - 70 - up)) & (one.y < (y + 70 + down)))) {
            ouch = true;
        }
    }
    return ouch;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
// Space between two enemies
let spaceBetween = false;

//create 5 enemies
for (let i = 0; i <= 6; i++) {
    let enemy = new Enemy();
    if (i <= 2) {
        //position (witch road: 60 first road, 140 for the second and 225 for the third)
        enemy.y = 60;
        //speed
        enemy.speed = 300;

    // the enemies of the seconds row walk backwards
    } else if (i <= 4) {
        enemy.backwards = true;
        enemy.y = 140;
        enemy.speed = 200;
        enemy.sprite = 'images/enemy-bug-rev.png';
    } else {
        enemy.y = 225;
        enemy.speed = 100;
    }

    //when the enemies start (not all at the same time)
    if (spaceBetween == false) {
        if (enemy.backwards == false) {
            enemy.x = -100;
        } else {
            enemy.x = 500;
        }
        spaceBetween = true;
    } else {
        if (enemy.backwards == false) {
            enemy.x = -400;
        } else {
            enemy.x = 800;
        }
        spaceBetween = false;
    }

    allEnemies.push(enemy);
}
// Place the player object in a variable called player
var player = new Player();

// if they collide then the player starts from the beginning
function checkCollisions() {
    // collision with enemies
    for (const enemy of allEnemies) {
        if (enemy.x > (player.x -70) & (enemy.x < (player.x + 40)) & (enemy.y > (player.y - 70)) & (enemy.y < (player.y + 70))) {
            let rip = new Rip(player.x, player.y);
            allRip.push(rip);
            player.changeSprite();
            player.x = 200;
            player.y = 400;
        }
    }

    //collision whit gem
    if (gem != null) {
        if (gem.x > (player.x -70) & (gem.x < (player.x + 40)) & (gem.y > (player.y - 70)) & (gem.y < (player.y + 70))) {
            score.innerText++;
            // The gem appear again randomly on the map
            gem.x = Math.floor(Math.random() * 4) * 100;
            var road = Math.random()*10;
            if (road < 3) {// 60 , 140 , 225
                gem.y = 60;
            } else if (road <= 7) {
                gem.y = 140;
            } else {
                gem.y = 225;
            }
        }
    }
};

//Gem class
class Gem {
    constructor(x = 100, y = 50) {
        this.sprite = 'images/Gem-Blue.png';
        this.x = x;
        this.y = y;
    };

    update(dt) {};

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Just a Rock on the screen
class Rock {
    constructor(x, y) {
        this.sprite = 'images/Rock.png';
        this.x = x;
        this.y = y;
    };

    update (dt) {};

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

class Rip {
    constructor(x, y) {
        this.sprite = 'images/rip.png';
        this.x = x+20;
        this.y = y+85;
    }

    update (dt) {};

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

// ship class (it appear when the player reach the water)
class Ship {
    constructor (x, y) {
        this.sprite = 'images/ship.png';
        this.x = x+20;
        this.y = y+10;
    }
    //movement
    update (dt) {
        this.x += 100*dt;
    };

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

}

//array with tombs
let allRip = [];

//two Rocks
var rock = new Rock(100, 300);
var rock2 = new Rock(300, 300);

// Array whit rocks
let allRocks = [rock, rock2];
// Array whit ship
let allShip = [];
// creating a new gem
let gem = new Gem();

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

//function for "the end"
function endGame() {
    const modal = document.querySelector('.modal');
    //show the score
    modal.style.display = 'block';
    tryAgainButton.addEventListener('click', function () {
        //reset the game
        player = new Player();
        score.innerText = 0;
        saved.innerText = 0;
        scoreModal.innerText = 0;
        allShip, allRip = [];
        modal.style.display = 'none';
    });
}