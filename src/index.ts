import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/DemoScene';
import GameManager from './scripts/managers/game-manager';

GameManager.initializeGameManager(
  new Phaser.Game(
    Object.assign(config, {
      scene: [GameScene]
    })
  )
);
