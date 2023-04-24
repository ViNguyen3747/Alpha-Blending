import { Canvas, useThree, useFrame } from "@react-three/fiber";
import Spring from "./Spring";
import { useEffect, useRef, useState } from "react";
import { Vector3, Color } from "three";
import { ScrollControls, useScroll } from "@react-three/drei";
import Summer from "./Summer";
import Fall from "./Fall";
import Winter from "./Winter";

const Models = ({ bgColor }) => {
  const scroll = useScroll();
  const { width: w, height: h } = useThree((state) => state.viewport);
  const { camera, mouse } = useThree();
  const vec = new Vector3();
  const modelsRef = useRef();
  // useEffect(() => {
  //   const canvas = document.querySelector("canvas");
  //   if (scroll.offset < 0.2) {
  //     canvas.style.background = bgColor;
  //   } else {
  //     canvas.style.background = "rgb(213, 164, 164)";
  //   }
  // }, []);
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
        <Spring bgColor={bgColor} />
        <Summer />
        <Fall />
        <Winter />
      </group>
    </>
  );
};
function App() {
  const [bgColor, setBgColor] = useState("#ffafcc");
  return (
    <>
      <div className="logo">
        <span>Designed by </span>
        <a href="https://vi-nguyen.vercel.app/" target="_blank">
          Vi Nguyen
        </a>
      </div>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 40 }}
        style={{ background: bgColor }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 2]} intensity={1} />
        <ScrollControls damping={1} pages={4}>
          <Models bgColor={bgColor} />
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;
