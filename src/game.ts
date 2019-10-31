
const scene = new Entity()
scene.addComponent(new Transform({ position: new Vector3(0, 0, 0), rotation: Quaternion.Euler(0, 0, 0), scale: new Vector3(1, 1, 1) }))
engine.addEntity(scene)

const wall = new Entity();
wall.addComponent(new Transform({
  position:new Vector3(8,4,8),
  scale:new Vector3(8,3,1),
  rotation:Quaternion.Euler(30,30,-30)
}));
const wallMat = new Material();
wallMat.albedoColor = new Color3(0.5,0.5,0.5)
wall.addComponent(new BoxShape());
wall.addComponent(wallMat);
wall.setParent(scene)
engine.addEntity(wall);


const wall2 = new Entity();
wall2.addComponent(new BoxShape());
//wall2.addComponent(wallMat);
wall2.addComponent(new Transform({
  position:new Vector3(8,0,3),
  scale:new Vector3(3,2,1),
  rotation:Quaternion.Euler(-20,20,60)
}));
engine.addEntity(wall2);

const model = new Entity();
const doorShape = new GLTFShape( "models/Door_01.glb");
model.addComponent(doorShape);
model.addComponent(new Transform({
  position:new Vector3(3, 0, 9),
  scale:new Vector3(2,2,2)
}));
engine.addEntity(model);
/*const train = new Entity();
const trainShape = new GLTFShape("models/train.glb");
train.addComponent(trainShape);
train.addComponent(new Transform({
  position:new Vector3(10, 0.2, 7)
}))

engine.addEntity(train);*/
