import { useGLTF, Center, GradientTexture } from "@react-three/drei";
import { BackSide, Color } from "three";
import React from "react";
import { useThree } from "@react-three/fiber";

export default ({ bgColor }) => {
  const { nodes } = useGLTF("./model.glb");
  const { width: w } = useThree((state) => state.viewport);
  return (
    <Center scale={w / 12} position={[w * 1.1, 0.9, 0]}>
      <mesh geometry={nodes.window.geometry}>
        <meshStandardMaterial side={BackSide}>
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={["#90e0ef", "#48cae4", "#0096c7"]}
            size={1024}
          />
        </meshStandardMaterial>
      </mesh>
      <mesh geometry={nodes.window.geometry}>
        <meshBasicMaterial toneMapped={false} color={new Color(bgColor)} />
      </mesh>
      <mesh geometry={nodes.window_frame.geometry}>
        <meshStandardMaterial color={"#bbd686"} />
      </mesh>
      <mesh geometry={nodes.boba_cup.geometry}>
        <meshStandardMaterial
          color={"#ffffff"}
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={nodes.milk.geometry}>
        <meshStandardMaterial
          color={"#ccd5ae"}
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={nodes.boba.geometry}>
        <meshStandardMaterial color={"#000000"} />
      </mesh>
      <mesh geometry={nodes.straw.geometry}>
        <meshStandardMaterial color={"#ffccd5"} />
      </mesh>
      <group scale={1.6} position={[0, -1, 0]}>
        <mesh geometry={nodes.tree.geometry}>
          <meshStandardMaterial color={"#dda15e"} />
        </mesh>
        <mesh geometry={nodes.leaf.geometry}>
          <meshToonMaterial color={"#90a955"} />
        </mesh>
      </group>
      <mesh geometry={nodes.sunlight.geometry}>
        <meshStandardMaterial
          color={"#fafac6"}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
      <primitive object={nodes.watermelon} />
    </Center>
  );
};
