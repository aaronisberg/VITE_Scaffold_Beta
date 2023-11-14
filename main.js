import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import {Inspector} from '@babylonjs/inspector';

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

camera.setPosition(new BABYLON.Vector3(0,1,-14));
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
  new BABYLON.Vector3(-1,5,-9),//xaxis,scale,yaxis
  new BABYLON.Vector3(.5,-1,5),//angle,height,rotation
  Math.PI / 3,
  5,
  scene
);
light.range = 20;
light.intensity = 1;

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
  size: 5,
  width: 2,
  height: .5,
  depth: 0.5,
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
   boxSixSides.diffuseTexture = new BABYLON.Texture('/Assets/Images/view.jpg')

   //Box position on screen:
   box.position.x = 1;
   box.position = new BABYLON.Vector3(0, .5, 0); 

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
//sphereMaterial.diffuseTexture = new BABYLON.Texture('/Assets/Images/Plates.jpg');
//emissive texture:
//sphereMaterial.emissiveTexture = new BABYLON.Texture('/Assets/Images/Plates.jpg');


//#endregion

//#region Ground Object_______________________

const ground = new BABYLON.MeshBuilder.CreateGround('', {
  height: 40,
  width: 40,
  subdivisions: 1,
  subdivisionsX: 0
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
  groundSixSides.emissiveTexture = new BABYLON.Texture('/Assets/Images/Plywood.jpg')
  groundSixSides.emissiveTexture.vScale = -1;
  groundSixSides.emissiveTexture.uOffset = 10;
  groundSixSides.emissiveTexture.vOffset = 1.4;
  groundSixSides.emissiveTexture.uScale = 5;   */

  const groundSixSides = new BABYLON.StandardMaterial();
  ground.material = groundSixSides;
  groundSixSides.diffuseTexture = new BABYLON.Texture('/Assets/Images/Plywood.jpg')
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


const fontData = await(await fetch('/Assets/Font/Fast Hand_Regular.json')).json();
const text = BABYLON.MeshBuilder.CreateText('', 'Perimeter', fontData, {
  size: 1,
  depth: 0.02,
  resolution: 2
})

  text.position.y = 1;

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

//shadowGenerator.addShadowCaster(box);
shadowGenerator.getShadowMap().renderList.push(box);
ground.receiveShadows = true;
shadowGenerator.setDarkness(.01);
//#endregion

 //#region Fog_______________________

//LINEAR Fog
/* scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
scene.fogStart = 20;
scene.fogEnd = 60; */

//EXPONENTIAL Fog
/* scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
scene.Density = .1;
scene.fogColor = new BABYLON.Color3(.1,.1,.3); */

//#endregion

//#region Models_______________________
//Models can be imported by calling the loader Namespace
/* BABYLON.SceneLoader.ImportMesh(
  '',
  '/',
  '../Assets/GlTF/Wolf.gltf',
  scene,
  function(meshes, particleSystems, skeletons, animationGroups) {
    const model = meshes[0];
    model.scaling = new BABYLON.Vector3(0.5,0.5,0.5);

    animationGroups[5].play(true);
  }
); */

/* BABYLON.SceneLoader.ImportMeshAsync(
  '',
  '/',
  '../Assets/GlTF/Wolf.gltf',
  scene)
     .then((result) => {
  const importedAnimGroups = result.animationGroups;
  importedAnimGroups[0].play(true);
})
 */
//#endregion

//#region Sound_______________________
const bgMusic = new BABYLON.Sound('mySong', '../Assets/Music/PowerDown.wav', scene, null, {
  //loop:true,
  autoplay: true
})
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
});

//Inspector.Show(scene, {});
//#endregion
