import { Command, Planet, Position } from "./data";

export const parsePlanet: (s: string) => Planet = s => {
  const tokens = s.split("x");
  return {
    width: parseInt(tokens[0]),
    height: parseInt(tokens[1]),
    obstacles: []
  };
};

export const parseObstacles: (x: string) => Position[] = (input: string) =>
  input ? input.split("/").map(parsePosition) : [];

export const parsePosition: (s: string) => Position = s => {
  const tokens = s.split(",");
  return {
    x: parseInt(tokens[0]),
    y: parseInt(tokens[1])
  };
};

export const parseCommands: (s: string) => Command[] = s =>
  s.split("").map(parseCommand);

const parseCommand: (s: string) => Command = s => {
  switch (s) {
    case "l":
      return Command.turnLeft;
    case "r":
      return Command.turnRight;
    case "f":
      return Command.MoveForward;
    case "b":
      return Command.MoveBackward;
    default:
      return Command.Unknown;
  }
};
