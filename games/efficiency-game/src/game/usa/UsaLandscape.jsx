import React, { useState } from "react";
import { Vector3 } from "three";
import SpeedItem from "../SpeedItem";

import { Tree } from "./Tree";
import { Palace } from "./Palace";
import { Skyscraper1 } from "./Skyscraper1";
import { Skyscraper2 } from "./Skyscraper2";
import { Restaurant } from "./Restaurant";
import { Rock } from "./Rock";
import { Flowers } from "./Flowers";
import { Statue } from "./LibertyStatue";

export function UsaLandscape() {
  function getInitialTreePosition(index) {
    let v = new Vector3(Math.round(Math.random()) * 44 - 22, 0.4, index * -20);
    return v;
  }

  function getInitialBoxPosition(index) {
    let v = new Vector3(Math.round(Math.random()) * 60 - 30, 0.4, index * -20);
    return v;
  }

  const [treesArr] = useState(() => {
    let a = [];
    for (let i = 0; i < 10; i++) a.push(0);
    return a;
  });
  const [buildinsgArr] = useState(() => {
    let a = [];
    for (let i = 0; i < 10; i++) a.push(0);
    return a;
  });

  return (
    <>
      {buildinsgArr.map(
        (e, i) =>
          (i % 6 === 0 && (
            <SpeedItem
              key={i}
              index={i}
              startPosition={getInitialBoxPosition(i)}
              offsetZ={{ min: 40, max: -220 }}
              speedFactor={0.3}
            >
              <Palace key={i} index={i} />{" "}
            </SpeedItem>
          )) ||
          (i % 6 === 1 && (
            <SpeedItem
              key={i}
              index={i}
              startPosition={getInitialBoxPosition(i)}
              offsetZ={{ min: 40, max: -220 }}
              speedFactor={0.3}
            >
              <Skyscraper1 key={i} index={i} />
            </SpeedItem>
          )) ||
          (i % 6 === 2 && (
            <SpeedItem
              key={i}
              index={i}
              startPosition={getInitialBoxPosition(i)}
              offsetZ={{ min: 40, max: -220 }}
              speedFactor={0.3}
            >
              <Skyscraper2 key={i} index={i} />
            </SpeedItem>
          )) ||
          (i % 6 === 3 && (
            <SpeedItem
              key={i}
              index={i}
              startPosition={getInitialBoxPosition(i)}
              offsetZ={{ min: 40, max: -220 }}
              speedFactor={0.3}
            >
              <Restaurant key={i} index={i} />
            </SpeedItem>
          )) ||
          (i % 6 === 4 && (
            <SpeedItem
              key={i}
              index={i}
              startPosition={getInitialBoxPosition(i)}
              offsetZ={{ min: 40, max: -220 }}
              speedFactor={0.3}
            >
              <Flowers key={i} index={i} />
            </SpeedItem>
          )) ||
          (i % 6 === 5 && (
            <SpeedItem
              key={i}
              index={i}
              startPosition={getInitialBoxPosition(i)}
              offsetZ={{ min: 40, max: -220 }}
              speedFactor={0.3}
            >
              <Rock key={i} index={i} />
            </SpeedItem>
          ))
      )}
      {treesArr.map((e, i) => (
        <SpeedItem
          key={i}
          index={i}
          startPosition={getInitialTreePosition(i)}
          offsetZ={{ min: 40, max: -220 }}
          speedFactor={0.3}
        >
          <Tree key={i} index={i} />
        </SpeedItem>
      ))}
      {/* <SpeedItem
        key={50}
        index={50}
        startPosition={[-30, 0, -220]}
        offsetZ={{ min: 40, max: -220 }}
        speedFactor={0.3}
      > */}
      {/* <Statue /> */}
      {/* </SpeedItem> */}
    </>
  );
}
