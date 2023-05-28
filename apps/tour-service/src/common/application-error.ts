export class ApplicationError extends Error {
  public readonly context: object;

  public readonly cause: Error | undefined;

  public constructor(message: string, context?: object, cause?: Error) {
    super(message);
    this.name = this.constructor.name;
    this.context = context || {};
    this.cause = cause;
  }
}
