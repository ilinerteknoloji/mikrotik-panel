export type LogLevels =
  | "emerg"
  | "alert"
  | "crit"
  | "error"
  | "warning"
  | "notice"
  | "info"
  | "debug"
  | "request"
  | "response";

export type Message = string | Error | any;

export interface ILogger {
  emerg: (message: Message, ...rest: any[]) => void;
  alert: (message: Message, ...rest: any[]) => void;
  crit: (message: Message, ...rest: any[]) => void;
  error: (message: Message, ...rest: any[]) => void;
  warning: (message: Message, ...rest: any[]) => void;
  notice: (message: Message, ...rest: any[]) => void;
  info: (message: Message, ...rest: any[]) => void;
  debug: (message: Message, ...rest: any[]) => void;
  request: (message: Message, ...rest: any[]) => void;
  response: (message: Message, ...rest: any[]) => void;
}

export const logLevels: Record<LogLevels, number> = {
  request: 0,
  response: 1,
  emerg: 2,
  alert: 3,
  crit: 4,
  error: 5,
  warning: 6,
  notice: 7,
  info: 8,
  debug: 9,
} as const;
export const logColors: Record<LogLevels, string> = {
  emerg: "magenta",
  alert: "red",
  crit: "blue",
  error: "red",
  warning: "yellow",
  notice: "green",
  info: "cyan",
  debug: "grey",
  request: "grey",
  response: "grey",
} as const;
