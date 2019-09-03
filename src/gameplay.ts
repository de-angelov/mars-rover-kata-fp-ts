import { Command, Direction, Planet, Position, Result, Rover } from "./data";
import { none, Option, Some, some, chain, fold, map } from "fp-ts/lib/Option";
import { head, tail, foldRight, foldLeft } from "fp-ts/lib/Array";
import { monoidProduct, monoidSum } from "fp-ts/lib/Monoid";

export const runCommands: (x: Rover, y: Command[]) => Result = (rover, cs) => {
  const onNoHit = {
    hitObstacle: false,
    rover
  };

  const onHit = {
    ...onNoHit,
    hitObstacle: true
  };

  var foldedTail = fold(() => [], (x: Command[]) => x)(tail(cs));

  var runRecursive = fold(
    () => onHit,
    (nextRower: Rover) => runCommands(nextRower, foldedTail)
  );

  var getResult = fold(
    () => onNoHit,
    (c: Command) => runRecursive(handleCommand(rover, c))
  );

  return getResult(head(cs));
};

export const handleCommand: (x: Rover, y: Command) => Option<Rover> = (
  rover,
  command
) => {
  const foldExample = fold(() => ({ x: 0, y: 0 }), (a: Position) => a);
  const chainExample = chain(moveBackward);
  const mapExaple = map(moveBackward);
  const position2 = foldExample(chainExample(some(rover)));

  switch (command) {
    case Command.TurnLeft:
      return some(rotate(rover, left));
    case Command.TurnRight:
      return some(rotate(rover, right));
    case Command.MoveForward: {
      const position = foldExample(moveForward(rover));
      return some({ ...rover, position });
    }
    case Command.MoveBackward: {
      const position = foldExample(moveBackward(rover));
      return some({ ...rover, position });
    }
    default:
      return some(rover);
  }
};

type OptionF = (x: Position, y: Planet) => Option<Position>;

const moveForward = ({ position, planet, direction }: Rover) => {
  switch (direction) {
    case Direction.S:
      return moveSouth(position, planet);
    case Direction.N:
      return moveNorth(position, planet);
    case Direction.E:
      return moveEast(position, planet);
    case Direction.W:
      return moveWest(position, planet);
  }
};

const moveBackward = ({ position, planet, direction }: Rover) => {
  switch (direction) {
    case Direction.S:
      return moveNorth(position, planet);
    case Direction.N:
      return moveSouth(position, planet);
    case Direction.E:
      return moveWest(position, planet);
    case Direction.W:
      return moveEast(position, planet);
  }
};

const moveEast: OptionF = ({ x, y }: Position, planet: Planet) => {
  const newY = (y + 1) % planet.width;
  return validatePosition(planet, { y: newY, x });
};

const moveWest: OptionF = ({ x, y }: Position, planet: Planet) => {
  const newY = y > 0 ? y - 1 : planet.width - 1;
  return validatePosition(planet, { y: newY, x });
};

const moveSouth: OptionF = ({ x, y }: Position, planet: Planet) => {
  const newX = (x + 1) % planet.height;
  return validatePosition(planet, { x: newX, y });
};

const moveNorth: OptionF = ({ x }: Position, planet: Planet) => {
  const newX = x > 0 ? x - 1 : planet.height - 1;
  return validatePosition(planet, { x: newX, y });
};

const validatePosition: (x: Planet, y: Position) => Option<Position> = (
  planet,
  next
) =>
  planet.obstacles.some(p => p.x === next.x && p.y === next.y)
    ? none
    : some(next);

const left = (d: Direction) => {
  switch (d) {
    case Direction.N:
      return Direction.E;
    case Direction.E:
      return Direction.S;
    case Direction.S:
      return Direction.W;
    case Direction.W:
      return Direction.N;
  }
};

const right = (d: Direction) => {
  switch (d) {
    case Direction.N:
      return Direction.W;
    case Direction.W:
      return Direction.S;
    case Direction.S:
      return Direction.E;
    case Direction.E:
      return Direction.W;
  }
};

const rotate: (r: Rover, fd: (d: Direction) => Direction) => Rover = (
  rover,
  getDirection
) => ({ ...rover, direction: getDirection(rover.direction) });
