import { useFrame, extend } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import useSpeed from "./stores/useSpeed";
import { MeshLineGeometry, MeshLineMaterial, raycast } from "meshline";
import textureImage from "../assets/textures/rain_drop.png"; // Replace with the actual path to your texture image
import { interopImage } from "../helpers/interopImage";

extend({ MeshLineGeometry, MeshLineMaterial });

//klasa z deszczem, do poprawienia
export function Rain(props) {
  const { count, shape } = props;

  const texture = new THREE.TextureLoader().load(interopImage(textureImage));

  // This reference gives us direct access to our points
  const points = useRef();
  const meshLine = useRef();
  const lineMaterial = useRef();

  const speed = useRef({});
  const distance = useRef({});
  const particlesPositionOrg = useRef({});

  const lineGeometry = useRef();

  const divider = 20;

  const curve = useRef({});

  useEffect(() => {
    distance.elapsed = 0;
    distance.startPosition = 0; //;points.current.position.z;;
    distance.endPosition = -5;
    distance.endPositionY = -5;

    distance.speed = 0;

    const unsubsribePhase = useSpeed.subscribe(
      (state) => state.speed,
      (value) => {
        distance.speed = value;
      }
    );

    return () => {
      unsubsribePhase();
    };
  }, []);

  function resetPosition() {
    console.log(
      "resetPosition ",
      distance.startPosition,
      points.current.position.z
    );
    points.current.position.z = 0;
    points.current.position.needsUpdate = true;
  }

  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const tempPositions = new Float32Array(count * 3);
    particlesPositionOrg.positions = new Float32Array(count * 3);
    const size = 20;

    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * size;
      let y = Math.random() * size;
      let z = (Math.random() - 0.5) * size * 4;

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count, shape]);

  let counter = 0;

  useFrame((state, delta) => {
    console.log("rain");
    const { clock } = state;

    if (points.current.position.y < distance.endPositionY) {
      resetPosition();
    } else {
      points.current.position.z += delta * 5;
      points.current.position.y -= delta * 5;
    }
  });

  return (
    <group>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          size={0.21} // Adjust the size of the particles
          map={texture}
          alphaTest={0.5} // Use this to control transparency if your texture has transparent areas
          depthWrite={false} // Set to false to avoid rendering particles in a specific order
          blending={THREE.AdditiveBlending} // Use additive blending for better particle effects
        />
      </points>
    </group>
  );
}
