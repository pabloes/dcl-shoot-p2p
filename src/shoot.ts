import utils from "../node_modules/decentraland-ecs-utils/index"

const bulletTexture = new Texture("shooter/textures/bullet_hole.png", {hasAlpha: true})
const bulletSound = new AudioClip("shooter/sounds/bullet_shoot.mp3");
const bulletAudioSource = new AudioSource(bulletSound)

const planeShape = new PlaneShape();
const planeMaterial = new Material();

planeMaterial.transparencyMode = TransparencyMode.ALPHA_BLEND;
planeMaterial.albedoTexture = bulletTexture;

const sceneMessageBus = new MessageBus();

// Instance the input object
const input = Input.instance

// button down event
input.subscribe("BUTTON_DOWN", ActionButton.POINTER, true, e => {
  //log("pointer Down", e)
  if(e.hit && e.hit.entityId){
    log("we clicked a wall, need to show bullet hole")
    sceneMessageBus.emit("shot", {data: e.hit.hitPoint})
  }
})

function showBulletHole(position)
{
  let plane = new Entity()


  plane.addComponent(planeShape)
  plane.addComponent(planeMaterial) 
  plane.addComponent(new Transform({
      position:new Vector3(position.x, position.y, position.z-0.001)
  }));
  engine.addEntity(plane);

  let shootSoundEntity = new Entity();
  shootSoundEntity.addComponent(new Transform({position:Camera.instance.position}));
  shootSoundEntity.addComponent(bulletAudioSource);
  engine.addEntity(shootSoundEntity);
  bulletAudioSource.playOnce();
  shootSoundEntity.addComponent(new utils.Delay(1000,()=>{
    engine.removeEntity(shootSoundEntity)
  }))

  sceneMessageBus.on("shot", (data)=>{
    //log("received bullet shot message")
    showBulletHole(data)
  })


}

