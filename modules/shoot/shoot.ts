@Component ("ShootSource")
class ShootSource {
    constructor(){}
}

export default class ShootSystem {
    soundSources;

    constructor () {
//TODO remember to ofuscate, in DCL build code is not minified/ofuscated
      //  this.soundSources = [];
        const shootSoundEntity = new Entity();
        shootSoundEntity.addComponent(new Transform({position:Camera.instance.position}));
        shootSoundEntity.addComponent(new ShootSource());
        const audioClip = new AudioClip("modules/shoot/sound/shoot1_i92ue9u239eu9823e.mp3");
        const audioSource = new AudioSource(audioClip);
      //  this.soundSources.push(shootSoundEntity);
        shootSoundEntity.addComponent(audioSource);
        engine.addEntity(shootSoundEntity);
        audioSource.playOnce();
        const planeShape = new PlaneShape();
        const planeMaterial = new Material();
        planeMaterial.transparencyMode = TransparencyMode.ALPHA_BLEND;
        const myTexture = new Texture("modules/shoot/texture/bullet_hole_fjewoij90f32.png", {hasAlpha: true})
        planeMaterial.albedoTexture = myTexture;

       const billboard = new Billboard();
    const blackbox = new BoxShape();
    const blackMat = new Material();
    blackMat.albedoColor = Color3.Black();
        Input.instance.subscribe("BUTTON_DOWN", ActionButton.POINTER, true, (e) => {
            log(e);
            audioSource.playOnce();

            if(e.hit && e.hit.entityId || e.hit.meshName){
                const plane = new Entity();
               // plane.addComponent(new BoxShape());
                plane.addComponent(blackbox);
                plane.addComponent(blackMat);
               /* plane.addComponent(billboard);
                plane.addComponent(planeMaterial);*/
                plane.addComponent(new Transform({
                    position:new Vector3(e.hit.hitPoint.x, e.hit.hitPoint.y, e.hit.hitPoint.z),
                    scale:new Vector3(0.1, 0.1, 0.1)
                }));
                engine.addEntity(plane);

            }
        });




    }

    update () {

    }
}