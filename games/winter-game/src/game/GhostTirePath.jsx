import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import WheelGhost from "./WhellGhost";
import useTime from "./stores/useTime";
import useGame from "./stores/useGame";

const NB_LINE_POINTS = 1000;
const xPosPoints = -0.5;
const yPosUpPoints = 34.5;
const yPosStartPoints = 1;
const yEndPoints = 4;

const cameraStartPositon = new THREE.Vector3(15, 8, 30);
const cameraEndPositon = new THREE.Vector3(15, 8, -30);

export default function GhostTirePath() {
  const wheel = useRef();

  const phase = useGame((state) => state.phase);

  const moveData = useRef({ speed: 0, distance: 0, acc: 0 });

  useEffect(() => {
    const unsubsribeSpeed = useTime.subscribe(
      (state) => state.speed,
      (value) => {
        moveData.current.speed = value;
      }
    );

    const unsubsribeAcc = useTime.subscribe(
      (state) => state.ghostAcceleration,
      (value) => {
        //console.log("acc 3", value);
        moveData.current.acc = value;
      }
    );

    const unsubsribeDistance = useTime.subscribe(
      (state) => state.distance,
      (value) => {
        moveData.current.distance = value;
      }
    );

    return () => {
      unsubsribeSpeed();
      unsubsribeDistance();
      unsubsribeAcc();
    };
  }, []);

  //TODO: ew moveData.current.speed * costam
  useFrame(() => {
    const t = moveData.current.distance + moveData.current.acc * 0.01; // todo jesli t < 0

    if (t >= 0) {
      const pos = curve.getPointAt(t);
      wheel.current.position.copy(pos);

      const tangent = curve.getTangentAt(t).normalize();
      wheel.current.lookAt(pos.clone().add(tangent));
    }
  });

  const curve = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(xPosPoints, yPosStartPoints, -8),
        new THREE.Vector3(xPosPoints, yPosStartPoints, -10),
        new THREE.Vector3(xPosPoints, yPosStartPoints, -50),
        new THREE.Vector3(xPosPoints, yPosStartPoints, -60),
        new THREE.Vector3(xPosPoints, yPosStartPoints, -70),
        new THREE.Vector3(xPosPoints, yPosStartPoints, -80),
        new THREE.Vector3(xPosPoints, yPosStartPoints, -100),
        new THREE.Vector3(xPosPoints, yPosStartPoints, -105),
        new THREE.Vector3(xPosPoints, 3, -110),
        new THREE.Vector3(xPosPoints, 5, -115),
        new THREE.Vector3(xPosPoints, 27, -160),
        new THREE.Vector3(xPosPoints, 34, -175),
        new THREE.Vector3(xPosPoints, yPosUpPoints, -180),
        new THREE.Vector3(-1.5, yPosUpPoints, -195),
        new THREE.Vector3(-3, yPosUpPoints, -205),
        new THREE.Vector3(-5, yPosUpPoints, -215),
        new THREE.Vector3(-9, yPosUpPoints, -225),
        new THREE.Vector3(-11, yPosUpPoints, -230),
        new THREE.Vector3(-17, yPosUpPoints, -240),
        new THREE.Vector3(-21, yPosUpPoints, -250),
        new THREE.Vector3(-22, yPosUpPoints, -265),
        new THREE.Vector3(-5, yPosUpPoints, -290),
        new THREE.Vector3(15, yPosUpPoints, -310),
        new THREE.Vector3(25, yPosUpPoints, -330),
        new THREE.Vector3(25, yPosUpPoints, -350),
        new THREE.Vector3(21, yPosUpPoints, -360),
        new THREE.Vector3(13, yPosUpPoints, -370),
        new THREE.Vector3(0, yPosUpPoints, -385),
        new THREE.Vector3(-5, yPosUpPoints, -395),
        new THREE.Vector3(-5, yPosUpPoints, -405),
        new THREE.Vector3(-1, yPosUpPoints, -415),
        new THREE.Vector3(7, yPosUpPoints, -425),
        new THREE.Vector3(16, yPosUpPoints, -435),
        new THREE.Vector3(23, yPosUpPoints, -445),
        new THREE.Vector3(26, yPosUpPoints, -455),
        new THREE.Vector3(26, yPosUpPoints, -465),
        new THREE.Vector3(22, yPosUpPoints, -475),
        new THREE.Vector3(6, yPosUpPoints, -495),
        new THREE.Vector3(0, yPosUpPoints, -505),
        new THREE.Vector3(-3.5, yPosUpPoints, -515),
        new THREE.Vector3(-5, yPosUpPoints, -525),
        new THREE.Vector3(-5, 33, -535),
        new THREE.Vector3(-5, 30, -550),
        new THREE.Vector3(-4.5, 25.5, -565),
        new THREE.Vector3(-3.75, 20.5, -580),
        new THREE.Vector3(-2.8, 14.5, -600),
        new THREE.Vector3(-1.7, 8.5, -620),
        new THREE.Vector3(-1.2, 4.5, -635),
        new THREE.Vector3(-1.1, yEndPoints, -640),
        new THREE.Vector3(-1, yEndPoints, -645),
        new THREE.Vector3(-1, yEndPoints, -660),
        new THREE.Vector3(-1, yEndPoints, -680),
        new THREE.Vector3(-1, yEndPoints, -700),
        new THREE.Vector3(-1, yEndPoints, -750),
        new THREE.Vector3(-1, yEndPoints, -755),
      ],

      false,
      "centripetal",
      2
    );

    curve.arcLengthDivisions = 5000;

    curve.updateArcLengths();

    return curve;
  }, []);

  return (
    <group ref={wheel}>
      {/* OBJECTS */}
      <WheelGhost position-y={0.1} />
    </group>
  );
}
