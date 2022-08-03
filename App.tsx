import {
  Camera,
  Color3,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import {EngineView, useEngine} from '@babylonjs/react-native';
import React, {FC, useEffect, useState} from 'react';
export const App: FC = () => {
  const engine = useEngine();
  const [camera, setCamera] = useState<Camera>();
  useEffect(() => {
    if (engine) {
      const scene = new Scene(engine);
      scene.createDefaultCamera(true, true, true);
      setCamera(scene.activeCamera!);

      const light = new HemisphericLight('light', Vector3.Up(), scene);
      light.intensity = 1.2;
      const box = MeshBuilder.CreateBox('box', {size: 0.5});
      const mat = new StandardMaterial('mat', scene);
      mat.diffuseColor = Color3.Red();
      box.material = mat;

      let a = 1;
      box.registerBeforeRender(() => {
        const scale = Math.sin((a += 0.02)) + 0.2;
        box.scaling = new Vector3(scale, scale, scale);
        box.rotation = new Vector3(scale, scale, scale);
      });
    }
  }, [engine]);

  return (
    <>
      <EngineView camera={camera} style={{flex: 1}} />
    </>
  );
};
