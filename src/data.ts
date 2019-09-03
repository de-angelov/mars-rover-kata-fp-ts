export interface Planet {
  width: number;
  height: number;
  obstacles: Position[];
}

export interface Position {
  x: number;
  y: number;
}

export interface Rover {
  planet: Planet;
  position: Position;
  direction: Direction;
}

export enum Direction {
  N,
  S,
  E,
  W
}

export enum Command {
  TurnLeft,
  TurnRight,
  MoveForward,
  MoveBackward,
  Unknown
}

export interface Result {
  hitObstacle: boolean;
  rover: Rover;
}

export const makeRover: (
  position: Position,
  planet: Planet,
  direction?: Direction
) => Rover = (position, planet, direction = Direction.N) => ({
  planet,
  position,
  direction
});
