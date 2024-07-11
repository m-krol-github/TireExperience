import { PerspectiveCamera } from "@react-three/drei";
import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as YUKA from "yuka";
import * as THREE from "three";
import Wheel from "./Wheel";
import useTime from "./stores/useTime";
import useGame from "./stores/useGame";
import { Vehicle } from "yuka";
import { useControls } from "leva";
import useControll from "./stores/useControll";

export default function TirePath() {
  const cameraGroup = useRef();
  // const moveData = useRef({ speed: 0, distance: 0 })
  const cam = useRef();
  const calculateOffset = ({ position, rotation }, x, y, z) => {
    // console.log(rotation);
    const offSet = new THREE.Vector3(x, y, z);
    offSet.applyQuaternion(rotation);
    offSet.add(position);
    return offSet;
  };
  let currentPosition = new THREE.Vector3();
  let currentLookAt = new THREE.Vector3();

  console.log("TirePath");

  const tireWheel = useRef();

  //const turn = useControll((state) => state.turn);
  const lineRef = useRef();
  const scalePath = 3.1;
  const scalePath1 = 3.1;

  const time = useMemo(() => new YUKA.Time(), []);
  const vehicle = useMemo(() => new Vehicle(), []);
  const onPathBehavior = useMemo(() => new YUKA.OnPathBehavior(), []);
  const entityManager = useMemo(() => new YUKA.EntityManager(), []);



  //const path = useMemo(() => new YUKA.Path(),[]);
  const path = useMemo(() => {
    console.log("Path");
    const p = new YUKA.Path();
    // p.add(new YUKA.Vector3(0.25 * scalePath, 0.5 * scalePath, 1.17
    p.add(new YUKA.Vector3(0.25 * scalePath, 0.5 * scalePath, 1.17 * scalePath));
    p.add(new YUKA.Vector3(-1.85 * scalePath, 0.5 * scalePath, 1.48 * scalePath));
    p.add(new YUKA.Vector3(-2.25 * scalePath, 0.5 * scalePath, 1.39 * scalePath));
    p.add(new YUKA.Vector3(-2.5 * scalePath, 0.5 * scalePath, 1.03 * scalePath));
    p.add(new YUKA.Vector3(-2.8 * scalePath, 0.5 * scalePath, 0.49 * scalePath));
    p.add(new YUKA.Vector3(-2.65 * scalePath, 0.5 * scalePath, -0.12 * scalePath));
    p.add(new YUKA.Vector3(-2 * scalePath, 0.5 * scalePath, -0.36 * scalePath));
    p.add(new YUKA.Vector3(-1.55 * scalePath, 0.5 * scalePath, -0.6 * scalePath));
    p.add(new YUKA.Vector3(-1.3 * scalePath, 0.5 * scalePath, -0.85 * scalePath));
    p.add(new YUKA.Vector3(-1 * scalePath, 0.5 * scalePath, -1.45 * scalePath));
    p.add(new YUKA.Vector3(-0.75 * scalePath, 0.5 * scalePath, -2 * scalePath));
    p.add(new YUKA.Vector3(-0.4 * scalePath, 0.5 * scalePath, -2.3 * scalePath));
    p.add(new YUKA.Vector3(0.0 * scalePath, 0.5 * scalePath, -2.15 * scalePath));
    p.add(new YUKA.Vector3(0.2 * scalePath, 0.5 * scalePath, -1.95 * scalePath));
    p.add(new YUKA.Vector3(0.4 * scalePath, 0.5 * scalePath, -1.75 * scalePath));
    p.add(new YUKA.Vector3(0.65 * scalePath, 0.5 * scalePath, -1.65 * scalePath));
    p.add(new YUKA.Vector3(0.95 * scalePath, 0.5 * scalePath, -1.8 * scalePath));
    p.add(new YUKA.Vector3(1.15 * scalePath, 0.5 * scalePath, -1.95 * scalePath));
    p.add(new YUKA.Vector3(1.4 * scalePath, 0.5 * scalePath, -2.15 * scalePath));
    p.add(new YUKA.Vector3(1.75 * scalePath, 0.5 * scalePath, -2.2 * scalePath));
    p.add(new YUKA.Vector3(2.65 * scalePath, 0.5 * scalePath, -1.85 * scalePath));
    p.add(new YUKA.Vector3(3.55 * scalePath, 0.5 * scalePath, -1.45 * scalePath));
    p.add(new YUKA.Vector3(3.85 * scalePath, 0.5 * scalePath, -1.15 * scalePath));
    p.add(new YUKA.Vector3(4.05 * scalePath, 0.5 * scalePath, -0.1 * scalePath));
    p.add(new YUKA.Vector3(4.2 * scalePath, 0.5 * scalePath, 0.8 * scalePath));
    p.add(new YUKA.Vector3(4.1 * scalePath, 0.5 * scalePath, 1.2 * scalePath));
    p.add(new YUKA.Vector3(3.65 * scalePath, 0.5 * scalePath, 1.8 * scalePath));
    p.add(new YUKA.Vector3(3.25 * scalePath, 0.5 * scalePath, 2.25 * scalePath));
    p.add(new YUKA.Vector3(2.95 * scalePath, 0.5 * scalePath, 2.35 * scalePath));
    p.add(new YUKA.Vector3(2.7 * scalePath, 0.5 * scalePath, 2.2 * scalePath));
    p.add(new YUKA.Vector3(2.4 * scalePath, 0.5 * scalePath, 1.65 * scalePath));
    p.add(new YUKA.Vector3(2.15 * scalePath, 0.5 * scalePath, 1.1 * scalePath));
    p.add(new YUKA.Vector3(1.7 * scalePath, 0.5 * scalePath, 0.94 * scalePath));
    p.add(new YUKA.Vector3(0.25 * scalePath, 0.5 * scalePath, 1.17 * scalePath));
    p.loop = true;

    return p;
  }, []);

  const { timeSpeed } = useControls(
    "Vehicle",
    {
      timeSpeed: { value: 1, min: 0.1, max: 2 },
    },
    { collapsed: false }
  );






  useFrame((state) => {
    const delta = time.update().getDelta();
    //vehicle.maxSpeed = moveData.current.speed * 0.1;

    let cameraPositionOffset = calculateOffset(vehicle, 0, 2, -10);

    let cameraFocusOffset = calculateOffset(vehicle, 0, 0, 1);
    const t = 1.0 - Math.pow(0.0025, delta);
    currentPosition.lerp(cameraPositionOffset, t);

    state.camera.lookAt(currentLookAt);
    state.camera.updateProjectionMatrix();

    currentLookAt.copy(cameraFocusOffset, t);

    cam.current.position.copy(vehicle.position);

    //turnLogic()
    //console.log(delta)
    entityManager.update(delta * timeSpeed);
    //console.log(entityManager)
    //console.log(entityManager.entities[0].position)
    if (tireWheel.current) {
      tireWheel.current.position.copy(entityManager.entities[0].position);
      tireWheel.current.quaternion.copy(entityManager.entities[0].rotation);
    }
  }, []);

  const Path = () => {
    /*useEffect(() => {
        console.log('Path')
        path.add(new YUKA.Vector3(0.25 * scalePath, 0.5 * scalePath, 1.17 * scalePath));
        path.add(new YUKA.Vector3(-1.85 * scalePath, 0.5 * scalePath, 1.48 * scalePath));
        path.add(new YUKA.Vector3(-2.25 * scalePath, 0.5 * scalePath, 1.39 * scalePath));
        path.add(new YUKA.Vector3(-2.5 * scalePath, 0.5 * scalePath, 1.03 * scalePath));
        path.add(new YUKA.Vector3(-2.8 * scalePath, 0.5 * scalePath, 0.49 * scalePath));
        path.add(new YUKA.Vector3(-2.65 * scalePath, 0.5 * scalePath, -0.12 * scalePath));
        path.add(new YUKA.Vector3(-2 * scalePath, 0.5 * scalePath, -0.36 * scalePath));
        path.add(new YUKA.Vector3(-1.55 * scalePath, 0.5 * scalePath, -0.6 * scalePath));
        path.add(new YUKA.Vector3(-1.3 * scalePath, 0.5 * scalePath, -0.85 * scalePath));
        path.add(new YUKA.Vector3(-1 * scalePath, 0.5 * scalePath, -1.45 * scalePath));
        path.add(new YUKA.Vector3(-0.75 * scalePath, 0.5 * scalePath, -2 * scalePath));
        path.add(new YUKA.Vector3(-0.4 * scalePath, 0.5 * scalePath, -2.3 * scalePath));
        path.add(new YUKA.Vector3(0.0 * scalePath, 0.5 * scalePath, -2.15 * scalePath));
        path.add(new YUKA.Vector3(0.2 * scalePath, 0.5 * scalePath, -1.95 * scalePath));
        path.add(new YUKA.Vector3(0.4 * scalePath, 0.5 * scalePath, -1.75 * scalePath));
        path.add(new YUKA.Vector3(0.65 * scalePath, 0.5 * scalePath, -1.65 * scalePath));
        path.add(new YUKA.Vector3(0.95 * scalePath, 0.5 * scalePath, -1.8 * scalePath));
        path.add(new YUKA.Vector3(1.15 * scalePath, 0.5 * scalePath, -1.95 * scalePath));
        path.add(new YUKA.Vector3(1.4 * scalePath, 0.5 * scalePath, -2.15 * scalePath));
        path.add(new YUKA.Vector3(1.75 * scalePath, 0.5 * scalePath, -2.2 * scalePath));
        path.add(new YUKA.Vector3(2.65 * scalePath, 0.5 * scalePath, -1.85 * scalePath));
        path.add(new YUKA.Vector3(3.55 * scalePath, 0.5 * scalePath, -1.45 * scalePath));
        path.add(new YUKA.Vector3(3.85 * scalePath, 0.5 * scalePath, -1.15 * scalePath));
        path.add(new YUKA.Vector3(4.05 * scalePath, 0.5 * scalePath, -0.1 * scalePath));
        path.add(new YUKA.Vector3(4.2 * scalePath, 0.5 * scalePath, 0.8 * scalePath));
        path.add(new YUKA.Vector3(4.1 * scalePath, 0.5 * scalePath, 1.2 * scalePath));
        path.add(new YUKA.Vector3(3.65 * scalePath, 0.5 * scalePath, 1.8 * scalePath));
        path.add(new YUKA.Vector3(3.25 * scalePath, 0.5 * scalePath, 2.25 * scalePath));
        path.add(new YUKA.Vector3(2.95 * scalePath, 0.5 * scalePath, 2.35 * scalePath));
        path.add(new YUKA.Vector3(2.7 * scalePath, 0.5 * scalePath, 2.2 * scalePath));
        path.add(new YUKA.Vector3(2.4 * scalePath, 0.5 * scalePath, 1.65 * scalePath));
        path.add(new YUKA.Vector3(2.15 * scalePath, 0.5 * scalePath, 1.1 * scalePath));
        path.add(new YUKA.Vector3(1.7 * scalePath, 0.5 * scalePath, 0.94 * scalePath));
        path.add(new YUKA.Vector3(0.25 * scalePath, 0.5 * scalePath, 1.17 * scalePath));
        path.loop = true;
      }, []);*/

    useEffect(() => {
      vehicle.position.copy(path.current());

      const followPathBehavior = new YUKA.FollowPathBehavior(path, 0.51);
      vehicle.steering.add(followPathBehavior);
      onPathBehavior.path = path;
      onPathBehavior.active = true;
      onPathBehavior.radius = 0.5;
      onPathBehavior.mass = 1;
      vehicle.maxSpeed = 1;
      vehicle.steering.add(onPathBehavior);

      entityManager.add(vehicle);

      vehicle.rotation.y = Math.PI;
    }, [path]);

    const path1 = useMemo(() => {
      const p = new YUKA.Path();
      p.add(new YUKA.Vector3(0 * scalePath1, 0.5 * scalePath, 1.2 * scalePath1));
      p.add(new YUKA.Vector3(-1.85 * scalePath1, 0.5 * scalePath, 1.35 * scalePath1));
      p.add(new YUKA.Vector3(-2.1 * scalePath1, 0.5 * scalePath, 1.3 * scalePath1));
      p.add(new YUKA.Vector3(-2.3 * scalePath1, 0.5 * scalePath, 1 * scalePath1));
      p.add(new YUKA.Vector3(-2.58 * scalePath1, 0.5 * scalePath, 0.4 * scalePath1));
      p.add(new YUKA.Vector3(-2.53 * scalePath1, 0.5 * scalePath, 0.25 * scalePath1));
      p.add(new YUKA.Vector3(-1.7 * scalePath1, 0.5 * scalePath, -0.7 * scalePath1));
      p.add(new YUKA.Vector3(-1.3 * scalePath1, 0.5 * scalePath, -1.1 * scalePath1));
      p.add(new YUKA.Vector3(-0.75 * scalePath1, 0.5 * scalePath, -1.8 * scalePath1));
      p.add(new YUKA.Vector3(-0.4 * scalePath1, 0.5 * scalePath, -2.1 * scalePath1));
      p.add(new YUKA.Vector3(0.0 * scalePath1, 0.5 * scalePath, -2.15 * scalePath1));
      p.add(new YUKA.Vector3(0.5 * scalePath1, 0.5 * scalePath, -1.92 * scalePath1));
      p.add(new YUKA.Vector3(0.65 * scalePath1, 0.5 * scalePath, -1.87 * scalePath1));
      p.add(new YUKA.Vector3(1.6 * scalePath1, 0.5 * scalePath, -2.0 * scalePath1));
      p.add(new YUKA.Vector3(3.5 * scalePath, 0.5 * scalePath, -1.25 * scalePath1));
      p.add(new YUKA.Vector3(3.7 * scalePath, 0.5 * scalePath, -1.05 * scalePath1));
      p.add(new YUKA.Vector3(4.02 * scalePath1, 0.5 * scalePath, 0.8 * scalePath1));
      p.add(new YUKA.Vector3(3.9 * scalePath1, 0.5 * scalePath, 1.2 * scalePath1));
      p.add(new YUKA.Vector3(3.2 * scalePath1, 0.5 * scalePath, 2.05 * scalePath1));
      p.add(new YUKA.Vector3(3 * scalePath1, 0.5 * scalePath, 2.15 * scalePath1));
      p.add(new YUKA.Vector3(2.8 * scalePath1, 0.5 * scalePath, 2.1 * scalePath1));
      p.add(new YUKA.Vector3(1.95 * scalePath1, 0.5 * scalePath, 1.15 * scalePath1));
      p.add(new YUKA.Vector3(1.5 * scalePath1, 0.5 * scalePath, 1.05 * scalePath1));
      p.add(new YUKA.Vector3(0 * scalePath1, 0.5 * scalePath, 1.2 * scalePath1));

      p.loop = true;

      return p;
    }, []);

    const path2 = useMemo(() => {
      const points = path1._waypoints.map(
        (waypoint) => new YUKA.Vector3(waypoint.x, waypoint.y, waypoint.z)
      );

      const p = new YUKA.Path();
      points.forEach((point) => p.add(point));
      p.loop = true;

      return p;
    }, [path1]);

    return (
      <>
        <group position={[0, 0.1, 0]}>
          <PathLine path={path} color="white" />
        </group>

        <group position={[0, 0.1, 0]}>
          <PathLine path={path2} color="red" />
        </group>

        <mesh ref={tireWheel} position={[0, 0, 0]}>
          <Wheel />
        </mesh>
      </>
    );
  };

  return (
    <>
      <group ref={cameraGroup}>
        <PerspectiveCamera
          ref={cam}
          fov={35}
          position={[0, 0, 0]}
          makeDefault
        />
      </group>
      <Path />
    </>
  );
}
