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

  const divider = 6;

  return (
    <>
      {buildinsgArr.map(
        (e, i) =>
          (i % divider === 0 && (
            <SpeedItem
              key={i}
              index={i}
              startPosition={getInitialBoxPosition(i)}
              initialPosition={getInitialBoxPosition}
              rotation={0}
              offsetZ={{ min: 40, max: -220 }}
              speedFactor={0.3}
            >
              <Palace key={i} index={i} />
            </SpeedItem>
          )) ||
          (i % divider === 1 && (
            <SpeedItem
              key={i}
              index={i}
              startPosition={getInitialBoxPosition(i)}
              initialPosition={getInitialBoxPosition}
              offsetZ={{ min: 40, max: -220 }}
              rotation={0}
              speedFactor={0.3}
            >
              <Skyscraper1 key={i} index={i} />
            </SpeedItem>
          )) ||
          (i % divider === 2 && (
            <SpeedItem
              key={i}
              index={i}
              startPosition={getInitialBoxPosition(i)}
              initialPosition={getInitialBoxPosition}
              offsetZ={{ min: 40, max: -220 }}
              rotation={0}
              speedFactor={0.3}
            >
              <Skyscraper2 key={i} index={i} />
            </SpeedItem>
          )) ||
          (i % divider === 3 && (
            <SpeedItem
              key={i}
              index={i}
              startPosition={getInitialBoxPosition(i)}
              initialPosition={getInitialBoxPosition}
              rotation={Math.PI / 4}
              offsetZ={{ min: 40, max: -220 }}
              speedFactor={0.3}
            >
              <Restaurant key={i} index={i} />
            </SpeedItem>
          )) ||
          (i % divider === 4 && (
            <SpeedItem
              key={i}
              index={i}
              startPosition={getInitialBoxPosition(i)}
              initialPosition={getInitialBoxPosition}
              offsetZ={{ min: 40, max: -220 }}
              rotation={Math.PI}
              speedFactor={0.3}
            >
              <Flowers key={i} index={i} />
            </SpeedItem>
          )) ||
          (i % divider === 5 && (
            <SpeedItem
              key={i}
              index={i}
              startPosition={getInitialBoxPosition(i)}
              initialPosition={getInitialBoxPosition}
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
          initialPosition={getInitialTreePosition}
          startPosition={getInitialTreePosition(i)}
          offsetZ={{ min: 40, max: -220 }}
          rotation={0}
          speedFactor={0.3}
        >
          <Tree key={i} index={i} />
        </SpeedItem>
      ))}
      <SpeedItem
        startPosition={new Vector3(-30, -5, -250)}
        offsetZ={{ min: 40, max: -300 }}
        rotation={0}
        speedFactor={0.0}
      >
        <Statue />
      </SpeedItem>
    </>
  );
}
