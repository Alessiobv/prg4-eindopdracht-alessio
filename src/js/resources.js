import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/BackgroundZelda.png'),
    LinkAttack: new ImageSource('images/LinkAttackSprite.png'),
    LinkDownWalk: new ImageSource('images/LinkDownWalk.png'),
    LinkUpWalk: new ImageSource('images/LinkUpWalking.png'),
    LinkLeftWalk: new ImageSource('images/LinkLeftWalking.png'),
    LinkIdle: new ImageSource('images/LinkStandingStill.png')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }