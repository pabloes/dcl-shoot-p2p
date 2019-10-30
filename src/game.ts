
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


const train = new Entity();
const trainShape = new GLTFShape("models/train.glb");
train.addComponent(trainShape);
train.addComponent(new Transform({
  position:new Vector3(30, 0.2, 20)
}))

engine.addEntity(train);