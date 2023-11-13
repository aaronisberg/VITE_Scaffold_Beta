import * as BABYLON from '@babylonjs/core';

const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas);

const createScene = async function() {
  const scene = new BABYLON.Scene(engine);

//Default Camera/Light Type:
scene.createDefaultCameraOrLight(true, false, true);
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

camera.setPosition(new BABYLON.Vector3(0,0,-2));
//camera.lowerBetaLimit = Math.PI / 4;
//camera.upperBetaLimit = Math.PI / 2
//camera.lowerRadiusLimit = 20;
//camera.upperRadiusLimit = 50;

//Create a Box in a scene:
/* const box = new BABYLON.MeshBuilder.CreateBox('myBox', {
    size: 0.1,
  width: 2,
  height: 0.05,
  depth: 0.5,
  faceColors:[
    new BABYLON.Color4(1,0,0,1),
    BABYLON.Color3.Green()
  ]  }); */

//Create a sphere in a scene:
 const sphere = new BABYLON.MeshBuilder.CreateSphere('mySphere',{
  segments:50,
  diameter: 0.3,
  diameterY: 0
  }, scene);

const sphereMaterial = new BABYLON.StandardMaterial();
sphere.material = sphereMaterial;



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

//Textures:
sphereMaterial.diffuseTexture = new BABYLON.Texture('/Assets/Plates.jpg');
sphereMaterial.emissiveTexture = new BABYLON.Texture('/Assets/Plates.jpg');


//Create Ground object
/* const ground = new BABYLON.MeshBuilder.CreateGround('', {
  height: 10,
  width: 10,
  subdivisions: 5,
  subdivisionX: 10
});
ground.material = new BABYLON.StandardMaterial();
ground.material.wireframe = true; */

//Create HeightMesh for ground
 /* const groundFromHM = new BABYLON.MeshBuilder.CreateGroundFromHeightMap('', '/Assets/TerrainHM_2.png', {
  height: 20,
  width: 10,
  subdivisions: 50,
  maxHeight: 2,

});
groundFromHM.material = new BABYLON.StandardMaterial();
groundFromHM.material.wireframe = true;   */


//Add Mesh Text Object (As the await is called (const fontData = await(await), Remember to add 'async' to call: 
//const createScene = async function() and add 'await' to
//const scene = await createScene()

/* const fontData = await(await fetch('/Assets/Font/Fast Hand_Regular.json')).json();
const text = BABYLON.MeshBuilder.CreateText('', 'My Text', fontData, {
  size: 2,
  depth: 0.02,
  resolution: 2
}) */

  return scene;
}

const scene = await createScene();

engine.runRenderLoop(function() {
  scene.render();
});
