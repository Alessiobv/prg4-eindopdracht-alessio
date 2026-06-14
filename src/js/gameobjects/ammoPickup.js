import { Actor, Vector, CollisionType, Color } from "excalibur"
import { Resources } from "../resources"

export class AmmoPickup extends Actor {
    constructor(x, y, amount){
        super({
            pos: new Vector(x, y),
            width: 16,
            height: 16,
            collisionType: CollisionType.Passive
        })
        
        this.amount = amount
    }
    
    onInitialize(engine) {
        this.graphics.use(Resources.AmmoImage.toSprite())
        this.scale = new Vector(0.5, 0.5)
        
        this.on("collisionstart", (evt) => {
            const player = evt.other.owner
            
            if(player?.constructor?.name === "Player"){
                player.addAmmo(this.amount)
                this.kill()
            }
        })
    }
}