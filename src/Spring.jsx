import { useGLTF, Center, GradientTexture } from "@react-three/drei";
import { BackSide, Color } from "three";
import React from "react";
import { useThree } from "@react-three/fiber";

export default ({ bgColor }) => {
  const { nodes } = useGLTF("./model.glb");
  const { width: w } = useThree((state) => state.viewport);
  return (
    <Center scale={w / 12} position={[0, 0.9, 0]}>
      <mesh geometry={nodes.window.geometry}>
        <meshStandardMaterial side={BackSide}>
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={["#caf0f8", "#ade8f4", "#48cae4"]}
            size={1024}
          />
        </meshStandardMaterial>
      </mesh>
      <mesh
        geometry={nodes.window.geometry}
        receiveShadow={false}
        castShadow={false}
      >
        <meshBasicMaterial toneMapped={false} color={new Color(bgColor)} />
      </mesh>
      <mesh geometry={nodes.window_frame.geometry}>
        <meshStandardMaterial color={"#d78a76"} />
      </mesh>
      <mesh geometry={nodes.glass.geometry}>
        <meshStandardMaterial
          color={"#ffffff"}
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={nodes.liquid.geometry}>
        <meshStandardMaterial
          color={"#ffafcc"}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={nodes.ice.geometry}>
        <meshStandardMaterial color={"white"} />
      </mesh>
      <group scale={1.7} position={[0, -1, 0]}>
        <mesh geometry={nodes.tree.geometry}>
          <meshStandardMaterial color={"#ffb5a7"} />
        </mesh>
        <mesh geometry={nodes.leaf.geometry}>
          <meshToonMaterial color={"#ffafcc"} />
        </mesh>
      </group>
      <primitive object={nodes.flowers} />
    </Center>
  );
};
