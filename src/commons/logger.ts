export enum ELogSeverity {
  Info,
  Warning,
  Error,
  Debug,
}

export enum ELogType {
  System,
  Interaction,
}

export interface ILog {
  type: ELogType;
  severity: ELogSeverity;
  message: string;
}

export class Logger {
  private static async log(log: ILog) {
    // get the current timestamp as unix time in milliseconds
    const timestamp: string = new Date().toISOString();

    // convert the severity to a string
    let severity: string;
    switch (log.severity) {
      case ELogSeverity.Info:
        severity = "INFO";
        break;
      case ELogSeverity.Warning:
        severity = "WARNING";
        break;
      case ELogSeverity.Error:
        severity = "ERROR";
        break;
      case ELogSeverity.Debug:
        severity = "DEBUG";
        break;
      default:
        severity = "UNKNOWN";
    }

    // convert the type to a string
    let type: string;
    switch (log.type) {
      case ELogType.System:
        type = "SYSTEM";
        break;
      case ELogType.Interaction:
        type = "INTERACTION";
        break;
      default:
        type = "UNKNOWN";
    }

    // log the message
    const message = `[${timestamp}] [${severity}] [${type}] ${log.message}`;

    console.log(message);

    // TODO: add db shit
  }

  public static async info(message: string, type: ELogType = ELogType.System) {
    await this.log({
      type,
      severity: ELogSeverity.Info,
      message,
    });
  }

  public static async warn(message: string, type: ELogType = ELogType.System) {
    await this.log({
      type,
      severity: ELogSeverity.Warning,
      message,
    });
  }

  public static async error(message: string, type: ELogType = ELogType.System) {
    await this.log({
      type,
      severity: ELogSeverity.Error,
      message,
    });
  }

  public static async debug(message: string, type: ELogType = ELogType.System) {
    await this.log({
      type,
      severity: ELogSeverity.Debug,
      message,
    });
  }
}
