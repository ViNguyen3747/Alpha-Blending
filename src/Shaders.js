import { shaderMaterial } from "@react-three/drei";
import { Color, Vector3 } from "three";

export const BlendingShader = new shaderMaterial(
  {
    cameraP: new Vector3(),
    cameraD: new Vector3(),
    backgroundColor: new Color("#ffafcc"),
  },
  `
  uniform vec3 cameraP;
  uniform vec3 cameraD;
  varying vec3 vNormal;
  
  void main() {
    // Calculate the surface normal
    vNormal = normal;

    // Calculate the view direction from the vertex to the camera
    vec3 viewDirection = normalize(cameraP - position);

    // Calculate the dot product between the surface normal and the view direction
    float dotProduct = dot(normalize(vNormal), normalize(viewDirection));

    // Pass the vertex position and normal to the fragment shader
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,
  `
    uniform vec3 backgroundColor;
  varying vec3 vNormal;

  void main() {
    // Calculate the dot product between the surface normal and the view direction
    float dotProduct = dot(normalize(vNormal), normalize(vec3(0.0, 0.0, 1.0)));

    // Blend the vertex color with the background color based on the dot product
    vec3 blendedColor = mix(backgroundColor, gl_FragColor.rgb, pow(dotProduct, 5.0));

    // Assign the blended color to the output
    gl_FragColor = vec4(blendedColor, 0.0);
  }
  `
);

export const draft = new shaderMaterial(
  {
    colorInside: null,
    colorOutside: new Color("#ffafcc"),
  },
  `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform sampler2D colorInside;
    uniform vec3 colorOutside;
    varying vec2 vUv;

    void main() {
      vec4 base = texture2D(colorInside, vUv);
      vec3 blendedColor = mix(base.rgb, colorOutside, 0.5);
      gl_FragColor = vec4(colorOutside, 0.0);
      
    }
  `
);
