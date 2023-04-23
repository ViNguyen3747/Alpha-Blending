import { Canvas, useThree, useFrame } from "@react-three/fiber";
import Spring from "./Spring";
import { useRef } from "react";
import { Vector3 } from "three";
import { ScrollControls, useScroll } from "@react-three/drei";
import Summer from "./Summer";
import Fall from "./Fall";
import Winter from "./Winter";

const Models = () => {
  const scroll = useScroll();
  const { width: w, height: h } = useThree((state) => state.viewport);
  const { camera, mouse } = useThree();
  const vec = new Vector3();
  const modelsRef = useRef();
  useFrame(() => {
    modelsRef.current.position.x = -(scroll.offset * w * 4);
    camera.position.lerp(
      vec.set(mouse.x * 0.7, mouse.y * 0.6, camera.position.z),
      0.02
    );
  });
  return (
    <>
      <group ref={modelsRef}>
        <Spring />
        <Summer />
        <Fall />
        <Winter />
      </group>
    </>
  );
};
function App() {
  return (
    <>
      <div className="logo">
        <span>Designed by </span>
        <a href="https://vi-nguyen.vercel.app/" target="_blank">
          Vi Nguyen
        </a>
      </div>
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 2]} intensity={1} />
        <ScrollControls damping={1} pages={4}>
          <Models />
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;
