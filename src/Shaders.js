import { shaderMaterial } from "@react-three/drei";
import { Color } from "three";

export const BlendingShader = new shaderMaterial(
  {
    colorInside: new Color("#b5838d"),
    colorOutside: new Color("#b5838d"),
  },
  `
    varying vec3 vNormal;

    void main() {
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform vec3 colorInside;
    uniform vec3 colorOutside;
    varying vec3 vNormal;

    void main() {
      float t = dot(vNormal, vec3(0.0, 0.0, 1.0));

      if (t > 0.0) {
        gl_FragColor = vec4(colorOutside, 0.5);
      } else {
        gl_FragColor = vec4(colorInside, 1.0);
      }
    }
  `
);
