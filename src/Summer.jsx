import { useGLTF, Center, GradientTexture } from "@react-three/drei";
import { BackSide, Color } from "three";
import React from "react";
import { extend, useThree } from "@react-three/fiber";
import { BlendingShader } from "./Shaders";

// declaratively
extend({ BlendingShader });

export default ({ summerRef }) => {
  const { nodes } = useGLTF("./model.glb");
  const { width: w, height: h } = useThree((state) => state.viewport);

  return (
    <Center scale={w / 12} position={[w * 1.2, 0.9, -0.5]} ref={summerRef}>
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
        <blendingShader colorOutside={new Color("rgb(18, 103, 130)")} />
      </mesh>
      <mesh geometry={nodes.window_frame.geometry}>
        <meshStandardMaterial color={"#bbd686"} />
      </mesh>
      <mesh geometry={nodes.boba_cup.geometry}>
        <meshStandardMaterial
          color={"#ffffff"}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
      <mesh geometry={nodes.milk.geometry}>
        <meshStandardMaterial color={"#90a955"} />
      </mesh>
      <mesh geometry={nodes.boba.geometry}>
        <meshStandardMaterial color={"#252422"} />
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
