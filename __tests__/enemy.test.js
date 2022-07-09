const Enemy = require('../lib/Enemy.js');
const Potion = require('../lib/Potion.js');

test("creates an enemy object", () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.name).toBe('goblin');
    expect(enemy.weapon).toBe('sword');
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));
});

//Ignore

test("gets enemy's health value", () => {
    const enemy = new Enemy('Babadook', "an intimate knowledge of all your deepest fears");

    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});

test("gets enemy's attack value", () => {
    const enemy = new Enemy('Babadook', "an intimate knowledge of all your deepest fears");
    enemy.strength = 10;

    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});

test("checks if enemy is alive or not", () => {
    const enemy = new Enemy("Babadook", "an intimate knowledge of all your deepest fears");

    expect(enemy.isAlive()).toBeTruthy();

    enemy.health = 0;

    expect(enemy.isAlive()).toBeFalsy();
});

test("subtracts from enemy's health", () => {
    const enemy = new Enemy("Babadook", "an intimate knowledge of all your deepest fears");
    const oldHealth = enemy.health;

    enemy.reduceHealth(5);

    expect(enemy.health).toBe(oldHealth - 5);

    enemy.reduceHealth(99999);

    expect(enemy.health).toBe(0);
});

test("gets a description of the enemy", () => {
    const enemy = new Enemy("Babadook", "an intimate knowledge of all your deepest fears");

    expect(enemy.getDescription()).toEqual(expect.stringContaining("Babadook"));
    expect(enemy.getDescription()).toEqual(expect.stringContaining("an intimate knowledge of all your deepest fears"));
});