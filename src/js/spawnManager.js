import { Vector } from "excalibur"
import { TreeMS1 } from "./gameobjects/enemies/TreeMS1.js"
import { TreeMS2 } from "./gameobjects/enemies/TreeMS2.js"
import { TreeMS3 } from "./gameobjects/enemies/TreeMS3.js"
import { TreeMB1 } from "./gameobjects/enemies/TreeMB1.js"
import { TreeMB2 } from "./gameobjects/enemies/TreeMB2.js"
import { TreeMB3 } from "./gameobjects/enemies/TreeMB3.js"
import { Boss } from "./gameobjects/enemies/Boss.js"


export class SpawnManager {
    constructor(scene, player) {
        this.scene = scene
        this.player = player

        this.spawnInterval = 1000
        this.timer = 0

        this.active = false
    }

    start() {
        this.active = true
    }

    stop() {
        this.active = false
    }

    update(engine, delta) {
        if (!this.active) return

        this.timer += delta

        if (this.timer >= this.spawnInterval) {
            this.timer = 0
            this.spawnEnemy()
        }
    }

    spawnEnemy() {
        const mapSize = 4110

        const side = Math.floor(Math.random() * 4)

        let x = 0
        let y = 0
        
        if (side === 0) {
            x = Math.random() * mapSize
            y = 0;
        } else if (side === 1) {
            x = mapSize
            y = Math.random() * mapSize
        } else if (side === 2) {
            x = Math.random() * mapSize
            y = mapSize
        } else {
            x = 0
            y = Math.random() * mapSize
        }

        const types = [Boss]
        const EnemyClass = types[Math.floor(Math.random() * types.length)]

        console.log("SPAWNING:", EnemyClass.name)

        const enemy = new EnemyClass(x, y)

        this.scene.add(enemy)
    }
}