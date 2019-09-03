import { Task } from "fp-ts/lib/Task";

// reads from standart input
export const reads: Task<string> = () =>
  new Promise(resolve =>
    process.stdin.once("data", data => resolve(data.toString().trim()))
  );

// writes from standart input
export const puts = (msg: string): Task<void> => () =>
  new Promise(resolve => {
    process.stdout.write(msg + "\n");
    resolve();
  }) as Promise<void>;

export const ask: (msg: string) => Task<string> = msg => () =>
  puts(msg)().then(reads);
