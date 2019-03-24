export const FIVE_FIVE_GRID = [
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4]
]

export const DIRECTION_MAP = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
}

export const getDirectionName = directionValue => Object.keys(DIRECTION_MAP)
  .find(directionName => DIRECTION_MAP[directionName] === directionValue)
