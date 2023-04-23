import { useGLTF, Center, GradientTexture } from "@react-three/drei";
import { BackSide, Color } from "three";
import React from "react";
import { extend, useThree } from "@react-three/fiber";
import { BlendingShader } from "./Shaders";

// declaratively
extend({ BlendingShader });

export default () => {
  const { nodes } = useGLTF("./model.glb");
  const { width: w, height: h } = useThree((state) => state.viewport);

  const backgroundColor = useThree(({ viewport }) => viewport.background);
  return (
    <Center scale={w / 12} position={[w * 3.7, 0.9, -0.5]}>
      <mesh geometry={nodes.window.geometry}>
        <meshStandardMaterial side={BackSide}>
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={["#adb5bd", "#9a8c98", "#4a4e69"]}
            size={1024}
          />
        </meshStandardMaterial>
      </mesh>
      <mesh geometry={nodes.window.geometry}>
        <blendingShader colorOutside={new Color("#ffffff")} />
      </mesh>
      <mesh geometry={nodes.window_frame.geometry}>
        <meshStandardMaterial color={"#9a8c98"} />
      </mesh>
      <group scale={1.6} position={[0, -1, 0]}>
        <mesh geometry={nodes.tree.geometry}>
          <meshStandardMaterial color={"#582f0e"} />
        </mesh>
        <mesh geometry={nodes.snow.geometry}>
          <meshStandardMaterial color={"#ffffff"} />
        </mesh>
      </group>
      <primitive object={nodes.cacao} />
      <mesh geometry={nodes.smoke.geometry}>
        <meshStandardMaterial
          color={"#ffffff"}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </Center>
  );
};
