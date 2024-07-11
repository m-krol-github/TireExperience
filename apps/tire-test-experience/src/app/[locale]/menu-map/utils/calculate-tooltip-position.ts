// Scale the coordinates to match the actual dimensions of the image
export const scaleCoordinates = (
  coords: number[],
  originalImageDimensions: { width: number; height: number },
  imageDimensions: { width: number; height: number }
) => {
  return coords.map((coord, index) => {
    const isXCoordinate = index % 2 === 0;
    const originalDimension = isXCoordinate
      ? originalImageDimensions.width
      : originalImageDimensions.height;
    const actualDimension = isXCoordinate
      ? imageDimensions.width
      : imageDimensions.height;

    if (originalDimension === 0 || actualDimension === 0) {
      return coord;
    }

    return (coord / originalDimension) * actualDimension;
  });
};

export const calculateTooltipPosition = (
  coords: number[],
  scaleCoordinates: (coords: number[]) => number[]
) => {
  const scaledCoords = scaleCoordinates(coords);
  const x =
    scaledCoords.reduce(
      (acc, val, index) => acc + (index % 2 === 0 ? val : 0),
      0
    ) /
    (scaledCoords.length / 2);
  const y =
    scaledCoords.reduce(
      (acc, val, index) => acc + (index % 2 === 0 ? 0 : val),
      0
    ) /
    (scaledCoords.length / 2);

  return { x, y };
};
