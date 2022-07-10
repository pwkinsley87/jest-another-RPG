const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('Babadook', 'an intimate knowledge of all your deepest terrors'));
    this.enemies.push(new Enemy('Beezlebub', 'a terrifying faculty for subtly lead astray even the most steadfast believer'));
    this.enemies.push(new Enemy('Loop Garoo', 'an uncanny ability to instantaneously exsanguinate his victims for 101 days'));
    this.currentEnemy = this.enemies[0];

    inquirer.prompt({
         type: "text",
         name: "name",
         message: "Enter your name."
        })
        //destructure name from the prompt object
        .then(({ name }) => {
         this.player = new Player(name);
        //test the object creation
        this.startNewBattle();
    });
};

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
    console.log('Your statistics:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());
};


Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
     inquirer
     .prompt({
         type: 'list',
         message: 'Now what?',
         name: 'action',
         choices: ['Attack', 'Use a potion']
        })
        .then(({ action }) => {
          if (action === 'Use potion') {
            if (!this.player.getInventory()) {
                 console.log("Fucke! All your potions are spent!");
                 return;
            }

           inquirer 
             .prompt({
                 type: "list",
                 message: "Which potion would you like to use?",
                 name: "action",
                 choices: this.player.getInventory().map((item, index) => `${item.name}`)
                });
        } else {
            const damage = this.player.getAttackValue();
            this.currentEnemy.reduceHealth(damage);

            console.log(`You rained vegenance swiftly down upon the ${this.currentEnemy.name}`);
            console.log(this.currentEnemy.getHealth());
        }
     });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were viciously mauled by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    };
};

module.exports = Game;