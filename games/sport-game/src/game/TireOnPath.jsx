import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useEffect, useRef } from "react";
import * as YUKA from "yuka";
import * as THREE from "three";
import Wheel from "./Wheel";
import useControll from "./stores/useControll";



const SceneTwo = () => {
  const scalePath = 3.1;
  const scalePath1 = 3.1;
  const vehicleRef = useRef(null);
  const lineRef = useRef();
  const cameraRef = useRef(null);
  const turn = useRef(0);

  const turnState = useControll((state) => state.turn);

  const entityManager = useMemo( () =>
    {
      return new YUKA.EntityManager();
  }, []);

  const path = useMemo( () =>
    {
      return new YUKA.Path();
    }, []);

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

  const sync = (entity, renderComponent) => {
    renderComponent.current.matrix.copy(entity.worldMatrix);
  };

  useEffect(() => {
    vehicleRef.current.matrixAutoUpdate = false;
    const vehicle = new YUKA.Vehicle();
    vehicle.position.copy(path.current());
    // vehicle.addS
    vehicle.setRenderComponent(vehicleRef, sync);
    vehicle.maxSpeed = 1;
    vehicle.mass = 1;
    const pathFollow = new YUKA.FollowPathBehavior(path, 1);
    vehicle.steering.add(pathFollow);
    entityManager.add(vehicle);

    console.log(vehicle);
  }, []);

  useEffect(() => {
      //turn
  }, []);

  const time = new YUKA.Time();

  let currentPosition = new THREE.Vector3();
  let currentLookAt = new THREE.Vector3();

  const calculateOffset = ({ position, rotation }, x, y, z) => {
    //console.log(rotation);
    const offSet = new THREE.Vector3(x, y, z);
    offSet.applyQuaternion(rotation);
    offSet.add(position);
    return offSet;
  };

  useFrame((state, delta) => {
    console.log("Entity menager;", entityManager.entities[0])
    let cameraPositionOffset = calculateOffset(
      entityManager.entities[0],
      0,
      1,
      -3
    );
    let cameraFocusOffset = calculateOffset(entityManager.entities[0], 0, 1, 2);
    const t = 1.0 - Math.pow(0.01, delta);
    currentPosition.lerp(cameraPositionOffset, t);

    currentLookAt.copy(cameraFocusOffset, t);

    cameraRef.current.position.copy(currentPosition);

    state.camera.lookAt(currentLookAt);
    state.camera.updateProjectionMatrix();

    const d = time.update().getDelta();
    entityManager.update(d);
  });

  const PathLine = ({ path, color, turn }) => {
    console.log("TURN LOG ", turn)
    const curve = useMemo(() => {
      console.log("PathLine");
      const points = path._waypoints.map(
        (waypoint) => new THREE.Vector3(waypoint.x, waypoint.y, waypoint.z)
      );
      return new THREE.CatmullRomCurve3(points);
    }, [path]);

    const geometry = useMemo(() => {
      console.log('geo')
      const points = curve.getPoints(34);
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      return geom;
    }, [curve] );

    return (
      <line ref={lineRef}>
        <bufferGeometry attach="geometry" {...geometry} />
        <lineBasicMaterial attach="material" color={color} />
      </line>
    );
  };


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

  const turnUpdate = (value) => {
    console.log("!!!!!  turnUpdate", value);
    turn.current = value;
    let range = 15

    //Zakret 1
    path._waypoints[1] = new YUKA.Vector3((- 1.85+(value/range)*0.05)*scalePath, 0.5*scalePath, (1.55-(value/range)*0.1)*scalePath)
    path._waypoints[2] = new YUKA.Vector3((- 2.25+(value/range)*0.15)*scalePath, 0.5*scalePath, (1.4-(value/range)*0.1)*scalePath)

    //Zakret 2
    path._waypoints[4] = new YUKA.Vector3((- 2.8+(value/range)*0.08)*scalePath, 0.5*scalePath, (0.45-(value/range)*0.05)*scalePath)
    path._waypoints[5] = new YUKA.Vector3((- 2.65+(value/range)*0.25)*scalePath, 0.5*scalePath, (-0.05-(value)*0.05)*scalePath)

    //Zakret 3
    path._waypoints[7] = new YUKA.Vector3((- 1.55+(value/range)*0.08)*scalePath, 0.5*scalePath, (-0.6-(value/range)*(-0.1))*scalePath)
    path._waypoints[8] = new YUKA.Vector3((- 1.3+(value/range)*0.25)*scalePath, 0.5*scalePath, (-0.85-(value/range)*0.05)*scalePath)

    //Zakret 4
    path._waypoints[11] = new YUKA.Vector3((- 0.4+(value/range)*0.00)*scalePath, 0.5*scalePath, (-2.3-(value/range)*(-0.21))*scalePath)
    path._waypoints[12] = new YUKA.Vector3((- 0+(value/range)*0.00)*scalePath, 0.5*scalePath, (-2.15-(value/range)*(-0.18))*scalePath)

    //Zakret 5
    path._waypoints[14] = new YUKA.Vector3(( 0.4+(value/range)*0.00)*scalePath, 0.5*scalePath, (-1.75-(value/range)*(-0.21))*scalePath)
    path._waypoints[15] = new YUKA.Vector3(( 0.65+(value/range)*0.00)*scalePath, 0.5*scalePath, (-1.65-(value/range)*(-0.18))*scalePath)
    path._waypoints[16] = new YUKA.Vector3(( 0.95+(value/range)*0.00)*scalePath, 0.5*scalePath, (-1.8-(value/range)*(-0.18))*scalePath)

    //Zakret 6
    path._waypoints[18] = new YUKA.Vector3(( 1.4+(value/range)*0.00)*scalePath, 0.5*scalePath, (-2.15-(value/range)*(-0.16))*scalePath)
    path._waypoints[19] = new YUKA.Vector3(( 1.75+(value/range)*0.00)*scalePath, 0.5*scalePath, (-2.2-(value/range)*(-0.16))*scalePath)

    //Zakret 7
    path._waypoints[21] = new YUKA.Vector3(( 3.55+(value/range)*0.00)*scalePath, 0.5*scalePath, (-1.45-(value/range)*(-0.2))*scalePath)
    path._waypoints[22] = new YUKA.Vector3(( 3.85+(value/range)*-0.1)*scalePath, 0.5*scalePath, (-1.15-(value/range)*(-0.2))*scalePath)

    //Zakret 8
    path._waypoints[24] = new YUKA.Vector3(( 4.2+(value/range)*-0.15)*scalePath, 0.5*scalePath, (0.8-(value/range)*(0))*scalePath)
    path._waypoints[25] = new YUKA.Vector3(( 4.1+(value/range)*-0.22)*scalePath, 0.5*scalePath, (1.2-(value/range)*(-0.1))*scalePath)

    //Zakret 9
    path._waypoints[27] = new YUKA.Vector3(( 3.25+(value/range)*0.05)*scalePath, 0.5*scalePath, (2.25-(value/range)*(0.2))*scalePath)
    path._waypoints[28] = new YUKA.Vector3(( 2.95+(value/range)*0)*scalePath, 0.5*scalePath, (2.35-(value/range)*(0.18))*scalePath)
    path._waypoints[29] = new YUKA.Vector3(( 2.7+(value/range)*0)*scalePath, 0.5*scalePath, (2.2-(value/range)*(0.18))*scalePath)

    //Zakret 10
    path._waypoints[31] = new YUKA.Vector3(( 2.15+(value/range)*0)*scalePath, 0.5*scalePath, (1.1-(value/range)*(0.16))*scalePath)
    path._waypoints[32] = new YUKA.Vector3(( 1.7+(value/range)*0)*scalePath, 0.5*scalePath, (0.9-(value/range)*(0.16))*scalePath)

  };

  useEffect(() => {
    const unsubsribeTurn = useControll.subscribe(
      (state) => state.turn,
      (value) => {
        turnUpdate(value);
      }
    );
    return () => {
      unsubsribeTurn();
      //console.log("unsubsribePhase speed in speed");
    };
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
    <PathLine path={path} color="white" turn = {turnState} />
  </group>

  <group position={[0, 0.1, 0]}>
    <PathLine path={path2} color="red" />
  </group>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[10, 0, 10]} />
      <group ref={vehicleRef}>
        <mesh scale={0.5} position={[0, .5, 0]}>
          <Wheel />
        </mesh>
      </group>
    </>
  );
};
export default SceneTwo;
