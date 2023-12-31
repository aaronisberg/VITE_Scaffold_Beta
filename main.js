import * as BABYLON from '@babylonjs/core';

const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas);
const createScene = async function() {
  const scene = new BABYLON.Scene(engine);


//#region Cameras_______________________

//Default Camera/Light Type:
//scene.createDefaultCameraOrLight(true, false, true);

//default Camera only:
//scene.createDefaultCamera();

//Universal Camera Type:
/* scene.createDefaultLight();
const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0,5,-10, scene));
camera.attachControl(true);
camera.inputs.addMouseWheel();
camera.setTarget(BABYLON.Vector3.Zero()); */

//Arc Rotate Camera Type:
//scene.createDefaultLight();
const camera = new BABYLON.ArcRotateCamera('camera', 0,0,20, new BABYLON.Vector3(0,0,0), scene);//20 represents the radius from the target or center of scene
camera.attachControl(true);

camera.setPosition(new BABYLON.Vector3(0,3,-4));
/* camera.lowerBetaLimit = Math.PI / 4;
camera.upperBetaLimit = Math.PI / 2
camera.lowerRadiusLimit = 20;
camera.upperRadiusLimit = 50; */

  //Utility layer for constructor which is passed to gizmos:
   const utilLayer = new BABYLON.UtilityLayerRenderer(scene); 

//#endregion

//#region Lights_______________________

//POINT LIGHT:
//takes three arguments:

/* const light = new BABYLON.PointLight (
  'pointLight',
  new BABYLON.Vector3(0,1,0),
  scene
);*/

//SPOTLIGHT
//takes 6 arguments: name, location, direction, angle of cone, decay w distance, scene:
//Standard no rotation
/* const light = new BABYLON.SpotLight (
  'spotLight',
  new BABYLON.Vector3(0,5,0),
  new BABYLON.Vector3(0,-1,0),
  Math.PI / 3,
  2,
  scene
);
light.range = 8; */

const light = new BABYLON.SpotLight (
  'spotLight',
  new BABYLON.Vector3(-3,5,0),
  new BABYLON.Vector3(.5,-1,0),
  Math.PI / 3,
  2,
  scene
);
light.range = 8;

//DIRECTIONAL
//Directional lights do not produce shadows!

/* const light = new BABYLON.DirectionalLight (
  'directionalLight',
  new BABYLON.Vector3(-2,-3,0),
  scene
);
light.intensity = 1; */


//Hemispheric Light
/* var light = new BABYLON.HemisphericLight(
  "hemisphericLight",
  new BABYLON.Vector3(0,10,0), 
  scene);
  light.groundColor = new BABYLON.Color3(0,1,0);
  //diffuse gives basic color to scene objects
  light.diffuse = new BABYLON.Color3(0,0,1);
  //specular affects highlights spot color
  light.specular = new BABYLON.Color3(0,1,0)

light.intensity = 1; */


//Light Gizmo must be after instance:
const lightGizmo = new BABYLON.LightGizmo(utilLayer);
lightGizmo.light = light; 

//#endregion

//#region Box_______________________

const box = new BABYLON.MeshBuilder.CreateBox('myBox', {
    size: 0.7,
 /* width: 2,
  height: 0.05,
  depth: 0.5,*/
/*   faceColors:[
    new BABYLON.Color4(1,0,0,1),
    BABYLON.Color3.Green() ]  */
    //Adding image wrap coordinates to box faces:
    faceUV: [
    new BABYLON.Vector4(0,0,1/7,1),
    new BABYLON.Vector4(1/7,0,2/7,1),
    new BABYLON.Vector4(2/7,0,3/7,1),
    new BABYLON.Vector4(3/7,0,4/7,1),
    new BABYLON.Vector4(4/7,0,5/7,1),
    new BABYLON.Vector4(5/7,0,6/7,1),
    new BABYLON.Vector4(6/7,0,1,1),

    ], 
    wrap: true
   });
 //note: wrap:true sets the texture orientiation to be corrected

   const boxSixSides = new BABYLON.StandardMaterial();
   box.material = boxSixSides;
   boxSixSides.diffuseTexture = new BABYLON.Texture('/Assets/sixSides.png')

   //Box position on screen:
   box.position.x = 1;
   box.position = new BABYLON.Vector3(0, .75, 0); 

   //Box Rotation on screen:
  /*box.rotation.x = Math.PI / 4;
    box.rotation = new BABYLON.Vector3(0, 0, Math.PI / 6); */

   //Box Scaling on screen:
/*    box.scaling.y = 2;
   box.scaling = new BABYLON.Vector3(2,0.5,1); */

  //GIZMOS:
   
   //Attach a position gizmo:
/*    const positionGizmo = new BABYLON.PositionGizmo(utilLayer);
   positionGizmo.attachedMesh = box; */

  //Attach a rotation gizmo:
/*    const rotationGizmo = new BABYLON.RotationGizmo(utilLayer);
   rotationGizmo.attachedMesh = box; */

  //Attach a scaling gizmo:
/*    const scaleGizmo = new BABYLON.ScaleGizmo(utilLayer);
   scaleGizmo.attachedMesh = box; */

    //Attach a plane rotation gizmo:
/*     const planeGizmo = new BABYLON.PlaneRotationGizmo(new BABYLON.Vector3(0,1,0), BABYLON.Color3.Red(), utilLayer);
   planeGizmo.attachedMesh = box;  */

//#endregion

//#region Sphere_______________________

/*  const sphere = new BABYLON.MeshBuilder.CreateSphere('mySphere',{
  segments:50,
  diameter: 0.3,
  diameterY: 0,
  }, scene);

const sphereMaterial = new BABYLON.StandardMaterial();
sphere.material = sphereMaterial; */

//Object colorization:
//sphereMaterial.diffuseColor = new BABYLON.Color3(0,1,0);
//sphereMaterial.specularColor = new BABYLON.Color3(1,0,0);

//Diffuse colorization:
//sphereMaterial.ambientColor = new BABYLON.Color3(0,1,1);
//scene.ambientColor = new BABYLON.Color3(0,1,.5);

//Emission colorization:
//sphereMaterial.emissiveColor = new BABYLON.Color3(0,1,0);

//Opaciy (Alpha):
//sphereMaterial.alpha = 0.2;

//WireFrame Mode:
//sphereMaterial.wireframe = true;

//Sphere Textures:
//diffuse texture (requires light source):
//sphereMaterial.diffuseTexture = new BABYLON.Texture('/Assets/Plates.jpg');
//emissive texture:
//sphereMaterial.emissiveTexture = new BABYLON.Texture('/Assets/Plates.jpg');


//#endregion

//#region Ground Object_______________________

const ground = new BABYLON.MeshBuilder.CreateGround('', {
  height: 10,
  width: 10,
  //subdivisions: 0,
  //subdivisionsX: 0
});

//Add basic color to ground:
/* let groundMaterial = new BABYLON.StandardMaterial("GroundMaterial", scene);
groundMaterial.diffuseColor = BABYLON.Color3.Green();
ground.material = groundMaterial; */

//modify position of ground object:
ground.position = new BABYLON.Vector3(0,0,0);

//Add texture to ground:
//NOTE: Modified to 'diffuseTexture', not 'emissiveTexture' as nothing was appearing:
/*ground.material = new BABYLON.StandardMaterial();
  const groundSixSides = new BABYLON.StandardMaterial();
  ground.material = groundSixSides;
  groundSixSides.emissiveTexture = new BABYLON.Texture('/Assets/Plywood.jpg')
  groundSixSides.emissiveTexture.vScale = -1;
  groundSixSides.emissiveTexture.uOffset = 10;
  groundSixSides.emissiveTexture.vOffset = 1.4;
  groundSixSides.emissiveTexture.uScale = 5;   */

  const groundSixSides = new BABYLON.StandardMaterial();
  ground.material = groundSixSides;
  groundSixSides.diffuseTexture = new BABYLON.Texture('/Assets/Plywood.jpg')
  groundSixSides.diffuseTexture.vScale = 1;
  groundSixSides.diffuseTexture.uOffset = 0;
  groundSixSides.diffuseTexture.vOffset = 0;
  groundSixSides.diffuseTexture.uScale = 0; 

//Create HeightMesh for ground:
 /* const groundFromHM = new BABYLON.MeshBuilder.CreateGroundFromHeightMap('', '/Assets/TerrainHM_2.png', {
  height: 20,
  width: 10,
  subdivisions: 50,
  maxHeight: 2,

});
groundFromHM.material = new BABYLON.StandardMaterial();
groundFromHM.material.wireframe = true;   */
//#endregion

//#region Text Mesh _______________________

//Add Mesh Text Object (As the await is called (const fontData = await(await), Remember to add 'async' to call: 
//const createScene = async function() and add 'await' to
//const scene = await createScene()

/* const fontData = await(await fetch('/Assets/Font/Fast Hand_Regular.json')).json();
const text = BABYLON.MeshBuilder.CreateText('', 'My Text', fontData, {
  size: 2,
  depth: 0.02,
  resolution: 2
}) */
//#endregion

//#region Animations_______________________

//Automatic animation:
//Animate objects by calling and registering frame rates 60 times per second:
/* scene.registerBeforeRender(function() {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  box.rotation.z += 0.01;
}) */

//Create and start animations:
//name of animation, the mesh to animate,property to update over time, fps, total #frames, initial value, final value.
//Additional arguments are to loop animation only once (CONSTANT) and ease in function

/* BABYLON.Animation.CreateAndStartAnimation(
'xScaleAnimation',
box,
'scaling.x',
30,
120,
0,
2,
BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
new BABYLON.CircleEase
); */


//Controlled Animation:
const animation = new BABYLON.Animation(
  'yRotAnimation', 
  'rotation.y', 
  30, 
  BABYLON.Animation.ANIMATIONTYPE_FLOAT,
  BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
);

const animationKeys = [];

animationKeys.push({
  frame: 0,
  value: 0
});

animationKeys.push({
  frame: 250,
  value: 2 * Math.PI
});

animation.setKeys(animationKeys);

box.animations = [];
box.animations.push(animation);
scene.beginAnimation(box, 0, 250, true);
//#endregion

//#region Shadows_______________________

const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

shadowGenerator.addShadowCaster(box);
shadowGenerator.getShadowMap().renderList.push(box);
ground.receiveShadows = true;
shadowGenerator.setDarkness(.5);
shadowGenerator.useBlurExponentialShadowMap = true;
shadowGenerator.useKernelBlur = true;
shadowGenerator.blurKernel = 64;
//#endregion
 
//#region Fog_______________________

//LINEAR Fog
/* scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
scene.fogStart = 30;
scene.fogEnd = 60; */

//EXPONENTIAL Fog
scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
scene.Density = .02;
scene.fogColor = new BABYLON.Color3(.3,.2,.4);

//#endregion

//#region SELECTING OBJECTS_______________________
scene.onPointerDown = function castRay() {
  const hit = scene.pick(scene.pointerX, scene.pointerY);

  if(hit.pickedMesh && hit.pickedMesh.name === 'myBox')
  hit.pickedMesh.material = new BABYLON.StandardMaterial();
  hit.pickedMesh.material.diffuseColor = BABYLON.Color3.Red();
}
//#endregion

//#region RETURN SCENE_______________________

  return scene;
  //#endregion
}

//#region SCENE RENDER
const scene = await createScene();

//render frame at screen frame rate (60fps)
engine.runRenderLoop(function() {
  scene.render();
});

//resize window while keeping objects scaled
window.addEventListener('resize', function() {
  engine.resize();
})
//#endregion
