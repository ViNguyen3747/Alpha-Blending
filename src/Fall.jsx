import { useGLTF, Center, GradientTexture } from "@react-three/drei";
import { BackSide, Color } from "three";
import React from "react";
import { useThree } from "@react-three/fiber";

export default ({ bgColor }) => {
  const { nodes } = useGLTF("./model.glb");
  const { width: w } = useThree((state) => state.viewport);
  return (
    <Center scale={w / 12} position={[w * 2.2, 0.9, -0.5]}>
      <mesh geometry={nodes.window.geometry}>
        <meshStandardMaterial side={BackSide}>
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={["#e8dcc2", "#d18956", "#d98b43"]}
            size={1024}
          />
        </meshStandardMaterial>
      </mesh>
      <mesh geometry={nodes.window.geometry}>
        <meshBasicMaterial toneMapped={false} color={new Color(bgColor)} />
      </mesh>
      <mesh geometry={nodes.window_frame.geometry}>
        <meshStandardMaterial color={"#a98467"} />
      </mesh>
      <group scale={1.6} position={[0, -1, 0]}>
        <mesh geometry={nodes.tree.geometry}>
          <meshStandardMaterial color={"#ca6702"} />
        </mesh>
        <mesh geometry={nodes.fall_leaf.geometry}>
          <meshToonMaterial color={"#ee9b00"} />
        </mesh>
      </group>
      <group>
        <mesh geometry={nodes.pumpkin_green.geometry}>
          <meshStandardMaterial color={"#585123"} />
        </mesh>
        <mesh geometry={nodes.stem.geometry}>
          <meshStandardMaterial color={"#7c6a0a"} />
        </mesh>
        <mesh geometry={nodes.pumpkin.geometry}>
          <meshStandardMaterial color={"#db7c26"} />
        </mesh>
        <mesh geometry={nodes.cream.geometry}>
          <meshStandardMaterial color={"#f9c784"} />
        </mesh>
        <mesh geometry={nodes.latte.geometry}>
          <meshToonMaterial color={"#7f4f24"} />
        </mesh>
      </group>
    </Center>
  );
};
