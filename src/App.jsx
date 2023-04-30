import { Canvas, useThree, useFrame } from "@react-three/fiber";
import Spring from "./Spring";
import { useRef, useState } from "react";
import { Vector3 } from "three";
import { ScrollControls, useScroll } from "@react-three/drei";
import Summer from "./Summer";
import Fall from "./Fall";
import Winter from "./Winter";

const Models = () => {
  const [bgColor, setBgColor] = useState("#ffe5d9");
  const scroll = useScroll();
  const { width: w } = useThree((state) => state.viewport);
  const { camera, mouse } = useThree();
  const vec = new Vector3();
  const modelsRef = useRef();
  useFrame(() => {
    const canvas = document.querySelector("canvas");
    if (scroll.offset < 0.2) {
      canvas.style.background = "#ffe5d9";
      setBgColor("#ffe5d9");
    } else if (scroll.offset < 0.5) {
      canvas.style.background = "#97a97c";
      setBgColor("#97a97c");
    } else if (scroll.offset < 0.8) {
      canvas.style.background = "#b2967d";
      setBgColor("#b2967d");
    } else {
      canvas.style.background = "#847577";
      setBgColor("#847577");
    }
    modelsRef.current.position.x = -(scroll.offset * w * 3.5);
    camera.position.lerp(
      vec.set(mouse.x * 0.7, mouse.y * 0.6, camera.position.z),
      0.02
    );
  });
  return (
    <>
      <group ref={modelsRef}>
        <Spring bgColor={bgColor} />
        <Summer bgColor={bgColor} />
        <Fall bgColor={bgColor} />
        <Winter bgColor={bgColor} />
      </group>
    </>
  );
};
function App() {
  return (
    <>
      <a className="logo" href="https://vi-nguyen.vercel.app/" target="_blank">
        <span>Designed by </span>
        <span id="name">Vi Nguyen</span>
      </a>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 40 }}>
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
