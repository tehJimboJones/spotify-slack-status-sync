export interface ICommandContext {
  userId: string;
  triggerId: string;
  text: string;
  respond: (text: string) => Promise<void>;
}

export interface ICommandListener {
  commandName: string;
  handle(context: ICommandContext): Promise<void>;
}
