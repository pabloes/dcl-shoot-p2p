import utils from "../node_modules/decentraland-ecs-utils/index"

const bulletTexture = new Texture("textures/bullet_hole.png", {hasAlpha: true})
const bulletSound = new AudioClip("sounds/bullet_shoot.mp3");
const bulletAudioSource = new AudioSource(bulletSound)


const scene = new Entity()
scene.addComponent(new Transform({ position: new Vector3(0, 0, 0), rotation: Quaternion.Euler(0, 0, 0), scale: new Vector3(1, 1, 1) }))
engine.addEntity(scene)

const wall = new Entity();
wall.addComponent(new Transform({
  position:new Vector3(8,4,8),
  scale:new Vector3(8,8,1)
}));
wall.addComponent(new BoxShape());
wall.setParent(scene)
engine.addEntity(wall)

// Instance the input object
const input = Input.instance

// button down event
input.subscribe("BUTTON_DOWN", ActionButton.POINTER, true, e => {
  log("pointer Down", e)
  if(e.hit && e.hit.entityId){
    log("we clicked a wall, need to show bullet hole")
    showBulletHole(e)
  }
})

function showBulletHole(e)
{
  let plane = new Entity()
  let planeShape = new PlaneShape();
  let planeMaterial = new Material();

  planeMaterial.transparencyMode = TransparencyMode.ALPHA_BLEND;
  planeMaterial.albedoTexture = bulletTexture;

  plane.addComponent(planeShape)
  plane.addComponent(planeMaterial) 
  plane.addComponent(new Transform({
      position:new Vector3(e.hit.hitPoint.x, e.hit.hitPoint.y, e.hit.hitPoint.z-0.001)
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


}

