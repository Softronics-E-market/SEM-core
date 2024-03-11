import * as winston from "winston";
import moment from "moment";

interface LogContext {
  [key: string]: string | number | undefined | null;
}

export class Logger {
  private logFormat: winston.Logform.Format;
  private logger: winston.Logger;

  constructor() {
    this.logFormat = winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    });

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => moment().format("YYYY-MM-DD HH:mm:ss"),
        }),
        this.logFormat
      ),
      transports: [new winston.transports.Console()],
    });
  }

  async log({
    action,
    message,
    error,
    context,
  }: {
    action: string;
    message: string;
    error?: string;
    context?: LogContext;
  }) {
    const chalk = (await import("chalk")).default;

    const logObject = {
      action,
      message,
      error,
      context,
    };

    const level = error ? "error" : "info";
    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");

    let colorizeFunction;
    let emoji;

    if (!error && !context) {
      colorizeFunction = chalk.blue;
      emoji = this.getServerEmoji();
    } else {
      colorizeFunction = level === "error" ? chalk.red : chalk.green;
      emoji = level === "error" ? this.getSadEmoji() : this.getHappyEmoji();
    }

    let formattedMessage = `${colorizeFunction(
      `[${timestamp}] [${level.toUpperCase()}]`
    )}: ${emoji}\n`;
    formattedMessage += JSON.stringify(logObject, null, 4);

    console.log(formattedMessage);
  }

  private getSadEmoji(): string {
    return "😢";
  }

  private getHappyEmoji(): string {
    return "😊";
  }

  private getServerEmoji(): string {
    return "🚀";
  }
}
