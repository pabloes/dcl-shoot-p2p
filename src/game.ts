import ShootSystem from '../modules/shoot/shoot';

const wall = new Entity();
wall.addComponent(new Transform({
  position:new Vector3(8,4,8),
  scale:new Vector3(8,8,1)
}));
wall.addComponent(new BoxShape());

engine.addEntity(wall);
engine.addSystem(new ShootSystem());

