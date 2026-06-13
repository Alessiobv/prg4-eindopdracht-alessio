import { Actor, Vector, CollisionType } from "excalibur";

export class Enemy extends Actor {
    constructor(x, y, config) {
        super({
            pos: new Vector(x, y),
            width: config.width || 32,
            height: config.height || 32,
            collisionType: config.collisionType || CollisionType.Active
        });

        this.hp = config.hp || 10;
        this.speed = config.speed || 50;
        this.playerInContact = false;
        this.attackCooldown = 750;
        this.attackTimer = 0;
    }

    onInitialize(engine) {
        this.on("collisionstart", (evt) => {
            const otherActor = evt.other.owner;

            if (otherActor?.constructor?.name === "Player") {
                this.playerInContact = true;
                this.contactTarget = otherActor;
            }

            if (otherActor?.tags?.has("bullet")) {
                this.takeDamage(otherActor.damage || 10);
                otherActor.kill();
            }
        })
        
        this.on("collisionend", (evt) => {
            const otherActor = evt.other.owner;

            if (otherActor?.constructor?.name === "Player") {
                this.playerInContact = false;
                this.contactTarget = null;
                this.attackTimer = 0;
            }
        })
    }

    onPreUpdate(engine, delta) {
        const player = engine.currentScene.actors.find(
            actor => actor.constructor.name === "Player"
        );

        if (player) {
            const diff = player.pos.sub(this.pos);

            if (diff.magnitude > 0) {
                const direction = diff.normalize();
                this.vel = direction.scale(this.speed);
            } else {
                this.vel = Vector.Zero;
            }
        }

        if (this.playerInContact && this.contactTarget) {
            this.attackTimer += delta;

            if (this.attackTimer >= this.attackCooldown) {
                this.attackTimer = 0;

                console.log("Enemy attacks player");

                if (typeof this.contactTarget.takeDamage === "function") {
                    this.contactTarget.takeDamage(10);
                }
            }
        }

        if (this.vel.x < 0) {
            this.graphics.flipHorizontal = true;
        } else if (this.vel.x > 0) {
            this.graphics.flipHorizontal = false;
        }
    }

    takeDamage(amount) {
        this.hp -= amount;

        console.log(`${this.constructor.name} HP: ${this.hp}`);

        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        console.log(`${this.constructor.name} died`);
        this.kill();
    }
}