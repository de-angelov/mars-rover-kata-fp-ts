import { ask, puts } from "./ioOps";
import { Task } from "fp-ts/lib/Task";

export const welcome: () => Task<void> = () =>
  puts("Welcome to Mars Rover Kata");

// export const readPlanet: () => Task<Planet> =
//   () =>
