export interface ISyncService {
  start(): void;
  stop(): void;
  syncNow(): Promise<void>;
}
