import { Scene, Actor, Vector, BoundingBox } from "excalibur"
import { Player } from "../gameobjects/player.js"
import { Bullet } from "../gameobjects/bullet.js"
import { Resources } from '../resources.js'
import { SpawnManager } from "../SpawnManager.js"

export class LevelOne extends Scene {
    onInitialize(engine) {
        const mapWidth = 4110
        const mapHeight = 4110

        const background = new Actor({
            pos: new Vector(0, 0)
        })

        background.graphics.use(Resources.Background.toSprite())
        background.graphics.anchor = new Vector(0, 0)
        background.scale = new Vector(1, 1)
        this.add(background)

        const centerX = mapWidth / 2
        const centerY = mapHeight / 2

        this.player = new Player(centerX, centerY)
        this.add(this.player)

        this.spawnManager = new SpawnManager(this, this.player);
        this.spawnManager.start();

        this.camera.strategy.elasticToActor(this.player, 0.1, 0.1)
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, mapWidth, mapHeight))
        
        engine.input.pointers.primary.on('down', (evt) => {
            const spawnOffset = this.player.facingVector.scale(24)
            let spawnX = this.player.pos.x + spawnOffset.x
            const spawnY = this.player.pos.y + spawnOffset.y

            if (this.player.facingVector.y === -1 && this.player.facingVector.x === 0) {
                spawnX -= 8
            }
            const bullet = new Bullet(spawnX, spawnY, this.player.facingVector)
            engine.currentScene.add(bullet)
        })
    }

    onPreUpdate(engine, delta) {
        this.spawnManager.update(engine, delta);
    }
}