/**
 * Type definitions for the synchronization service.
 * @remarks
 * Contains interfaces and types supporting the status synchronization loop and sync state management.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
/**
 * Interface for the status synchronization orchestrator.
 *
 * @remarks
 * Defines the contract for starting and stopping the background process that synchronizes Spotify playback state with Slack profiles.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * ISyncService([ISyncService])
 * SyncService[SyncService] -->|Implements| ISyncService
 * App[App Bootstrap] -->|Uses| ISyncService
 * ```
 *
 * @example
 * ```typescript
 * syncService.startSync();
 * ```
 *
 * @public
 */
export interface ISyncService {
  start(): void;
  stop(): void;
  syncNow(): Promise<void>;
}
