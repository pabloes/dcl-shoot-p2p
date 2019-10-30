const bulletTexture = new Texture("shooter/textures/bullet_hole.png", {hasAlpha: true})
const bulletSound = new AudioClip("shooter/sounds/bullet_shoot.mp3");
const bulletAudioSource = new AudioSource(bulletSound)

const planeShape = new PlaneShape()
const planeMaterial = new Material()
const shootSoundEntity = new Entity()
shootSoundEntity.addComponent(bulletAudioSource)
engine.addEntity(shootSoundEntity);

planeMaterial.transparencyMode = TransparencyMode.ALPHA_BLEND
planeMaterial.albedoTexture = bulletTexture;

const sceneMessageBus = new MessageBus();

/// --- Define a custom type to pass in messages ---
type BulletHolePosition = {
  position: ReadOnlyVector3;
};

// Instance the input object
const input = Input.instance

// button down event
input.subscribe("BUTTON_DOWN", ActionButton.POINTER, true, e => {
  //log("pointer Down", e)
  if(e.hit && e.hit.entityId){
    //log("we clicked a wall, need to show bullet hole")
    //showBulletHole(e.hit.hitPoint)
    sceneMessageBus.emit("shot", {position: e.hit.hitPoint})
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

  shootSoundEntity.addComponentOrReplace(new Transform({position:Camera.instance.position}));
  bulletAudioSource.playOnce()
}

sceneMessageBus.on("shot", (data)=>{
  //log("received bullet shot message")
  showBulletHole(data.position)
})
