import { User } from '../user/types';
import { ICommandListener } from './command/types';
import { IViewListener } from './view/types';

export interface ISlackService {
  setStatus(user: User, text: string, emoji: string): Promise<void>;
  clearStatus(user: User): Promise<void>;
  start(): Promise<void>;
  registerCommandListener(listener: ICommandListener): void;
  registerViewListener(listener: IViewListener): void;
  openSettingsModal(
    triggerId: string,
    userId: string,
    currentSettings: Partial<User>,
  ): Promise<void>;
}
