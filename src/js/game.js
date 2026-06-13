import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './gameobjects/player.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        const background = new Actor({
            pos: new Vector(640, 360)
        })
        background.graphics.use(
            Resources.Background.toSprite()
        )
        background.scale = new Vector(1, 1)
        this.add(background)
        
        const player = new Player(600,  400);
        this.add(player)
    }
}

new Game()
