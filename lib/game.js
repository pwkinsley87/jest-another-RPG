const inquirer = import('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('Babadook', 'an intimate knowledge of all your deepest fears'));
    this.enemies.push(new Enemy('Beezlebub', 'a terrifying ability to change form and appropriate your cognitive abilites'));
    this.enemies.push(new Enemy('Belsnickel', 'an uncanny skill for an instantaneous inventorying of all your moral failings'));
    this.currentEnemy = this.enemies[0];

    inquirer.prompt({
         type: "text",
         name: "name",
         message: "Enter your name."
        })
        //destructure name from the prompt object
        .then(({ name }) => {
         this.player = new Player(name);
         this.startNewBattle();
    });
};

//IGNORE

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayersTurn = false;
    }
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
};

//TESTtestTESTtestTESTtestTESTtestTESTtestTESTTEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST  TEST test test test test test test test test test 

module.exports = Game;