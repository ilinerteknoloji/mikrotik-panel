import winston from "winston";

import {
  type ILogger,
  logColors,
  type LogLevels,
  logLevels,
  type Message,
} from "./log-levels";

const getDailyLogFilename = (level: LogLevels) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `logs/${level}/${year}-${month}-${day}.log`;
};

const requestAndResponseLogger = new winston.transports.File({
  filename: getDailyLogFilename("request"),
  level: "response",
  format: winston.format.combine(
    winston.format.uncolorize(),
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.printf((info) => {
      const {level, message, timestamp} = info;
      try {
        const parsedMessage = JSON.parse(message as string);
        return JSON.stringify({level, ...parsedMessage, timestamp});
      } catch {
        return JSON.stringify({level, message, timestamp});
      }
    }),
  ),
});

const errorLogger = new winston.transports.File({
  filename: getDailyLogFilename("error"),
  level: "error",
  format: winston.format.combine(
    winston.format.uncolorize(),
    winston.format.timestamp(),
    winston.format.json(),
  ),
});
const warningLogger = new winston.transports.File({
  filename: getDailyLogFilename("warning"),
  level: "warning",
  format: winston.format.combine(
    winston.format.uncolorize(),
    winston.format.timestamp(),
    winston.format.json(),
  ),
});
const debugLogger = new winston.transports.Console({
  level: "debug",
  format: winston.format.combine(
    winston.format.colorize({all: true, colors: logColors}),
    winston.format.timestamp(),
    winston.format.printf(({timestamp, level, message}) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
});

const wLog = winston.createLogger({
  levels: logLevels,
  level: "info",
  transports: [
    requestAndResponseLogger,
    errorLogger,
    warningLogger,
    debugLogger,
  ],
});

class Logger implements ILogger {
  private _log(level: LogLevels, message: Message, ...rest: any[]) {
    if (typeof message === "object" && message instanceof Error) {
      // wLog.log(level, message.message, { stack: message.stack, cause: message.cause, name: message.name }, rest);
      wLog.log(level, message?.stack ?? message.message, {
        name: message.name,
        message: message.message,
        stack: message.stack,
      });

      return;
    } else if (typeof message === "object") {
      wLog.log(level, JSON.stringify(message), rest);

      return;
    }
    wLog.log(level, message, rest);
  }

  public emerg(message: Message, ...rest: any[]) {
    this._log("emerg", message, rest);
  }

  public alert(message: Message, ...rest: any[]) {
    this._log("alert", message, rest);
  }

  public crit(message: Message, ...rest: any[]) {
    this._log("crit", message, rest);
  }

  public error(message: Message, ...rest: any[]) {
    this._log("error", message, rest);
  }

  public warning(message: Message, ...rest: any[]) {
    this._log("warning", message, rest);
  }

  public notice(message: Message, ...rest: any[]) {
    this._log("notice", message, rest);
  }

  public info(message: Message, ...rest: any[]) {
    this._log("info", message, rest);
  }

  public debug(message: Message, ...rest: any[]) {
    this._log("debug", message, rest);
  }

  public request(message: Message, ...rest: any[]) {
    this._log("request", message, rest);
  }

  public response(message: Message, ...rest: any[]) {
    this._log("response", message, rest);
  }
}

export const logger = new Logger();
