# Implementation Plan: Acronym Guesser Feature

## 1. Overview & Objectives

The goal is to extend the Slack bot with an **Acronym Guesser** feature that listens for configured abbreviations/acronyms in a configurable set of Slack channels and replies with a randomly generated "guess" of what the acronym stands for.

Each guess is composed of random words selected letter-by-letter from a word map configured per acronym. The bot responds under a custom bot name specific to the acronym (e.g., "BTU Bot") where supported by Slack.

### Example Interaction
> **User**: "something something, yada, yada, BTU yada something"  
> **BTU Bot**: "Bumbling Tiger Uniforms?"

### Core Requirements
1. **Acronym Catalog (JSON in Repository)**:
   - Stored as a JSON file tracked in the repository (`config/acronyms.json`).
   - Top-level object keyed by acronym (e.g., `"BTU"`, `"ASAP"`).
   - Each acronym object contains:
     - `botName`: Configurable bot display name for Slack responses (e.g., `"BTU Bot"`).
     - `candidateWords`: A map associating each letter in the acronym to a list of candidate words (e.g., `{"B": ["Bumbling", ...], "T": ["Tiger", ...], "U": ["Uniforms", ...]}`).
2. **Dynamic Bot Name in Slack**:
   - Utilize Slack's `chat.postMessage` API parameters (`username` and `as_user: false`).
   - Document Slack permissions (`chat:write.customize` OAuth scope) and graceful fallback behavior if workspace settings restrict custom usernames.
3. **Random Guess Generation**:
   - For a detected acronym, iterate across its letters in sequence.
   - For each letter, randomly select a candidate word from the letter's list.
   - Format the response as `"[Word1] [Word2] ... [WordN]?"`.
4. **Channel & Behavior Configuration**:
   - **Start Command**: Enable/activate acronym guessing.
   - **Stop Command**: Disable/deactivate acronym guessing.
   - **Configuration Command**:
     - Configure the list of channel IDs to monitor.
     - Configure which acronyms are actively listened for (subset of catalog).
   - **Persistence**: Persist settings in the database (`AcronymConfigModel` via Sequelize) so configuration survives bot restarts.
5. **Message Ingestion**:
   - Listen to channel messages using Slack Events API (`message` event).
   - Ignore bot messages / bot subtypes to prevent infinite self-triggering loops.
   - Verify that the message occurred in a configured channel and guessing is active.
   - Extract matching acronyms and post the generated guesses.

---

## 2. Architecture & Design

### 2.1 Slack Custom Bot Name Support
Slack's Web API method `chat.postMessage` allows overriding the bot's username per message if:
- The bot has the `chat:write.customize` bot scope.
- `username` is provided in the `chat.postMessage` payload.
- `as_user` is set to `false`.

If `chat:write.customize` is omitted or disabled by Slack workspace admin policies, the Slack API accepts the message but sends it using the default bot identity, ensuring zero runtime failures.

### 2.2 Component Hierarchy & Relationships
```mermaid
graph TD
    AppBootstrap[App Bootstrap (src/app.ts)] -->|Initializes| AcronymService[AcronymService]
    AppBootstrap -->|Registers| AcronymMessageListener[AcronymMessageListenerService]
    AppBootstrap -->|Registers| AcronymCommandListener[AcronymCommandListenerService]
    
    AcronymService -->|Reads| CatalogJSON[config/acronyms.json]
    AcronymService -->|Persists Config| IAcronymConfigRepository[IAcronymConfigRepository]
    IAcronymConfigRepository -->|Implemented by| SequelizeAcronymConfigRepo[SequelizeAcronymConfigRepository]
    IAcronymConfigRepository -->|Implemented by| MockAcronymConfigRepo[MockAcronymConfigRepository]
    
    AcronymMessageListener -->|Uses| AcronymService
    AcronymMessageListener -->|Sends Guesses via| ISlackService[ISlackService]
    
    AcronymCommandListener -->|Manages Settings via| AcronymService
    AcronymCommandListener -->|Responds via| ISlackService
```

### 2.3 Acronym Catalog Schema (`config/acronyms.json`)
```json
{
  "BTU": {
    "botName": "BTU Bot",
    "candidateWords": {
      "B": ["Bumbling", "Brilliant", "Bouncing", "Brave", "Bizarre"],
      "T": ["Tiger", "Turbo", "Tasty", "Terrific", "Timid"],
      "U": ["Uniforms", "Umbrellas", "Unicorns", "Universes", "Utensils"]
    }
  },
  "ASAP": {
    "botName": "ASAP Bot",
    "candidateWords": {
      "A": ["Always", "Awkward", "Agile", "Ambitious"],
      "S": ["Silent", "Spicy", "Silly", "Sleepy"],
      "P": ["Penguins", "Pancakes", "Pickles", "Pirates"]
    }
  }
}
```

### 2.4 Command Interface (`/acronym`)
A dedicated slash command `/acronym` will be registered with the following subcommands:
- `/acronym start`: Activates the guessing behavior globally across configured channels.
- `/acronym stop`: Deactivates the guessing behavior.
- `/acronym status`: Displays current status (Active/Stopped), configured channels, and enabled acronyms.
- `/acronym config channels <add|remove|set|list> [channel_ids...]`:
  - `list`: Shows currently monitored channels.
  - `add <C123...>`: Adds one or more channels to the monitor list.
  - `remove <C123...>`: Removes channels from the monitor list.
  - `set <C123,C456...>`: Replaces the entire monitored channel list.
- `/acronym config acronyms <add|remove|set|list> [ACRONYMS...]`:
  - `list`: Shows enabled acronyms and all available acronyms from `acronyms.json`.
  - `add <ACRONYM...>`: Enables acronyms for listening.
  - `remove <ACRONYM...>`: Disables acronyms from listening.
  - `set <ACRONYM1,ACRONYM2...>`: Replaces the enabled acronym list.
- `/acronym help`: Displays command usage instructions.

---

## 3. Proposed Changes

Per repository guidelines (`docs/implementation-plan-rules.md`), Test-Driven Development (TDD) is strictly enforced. Unit tests must be written first before application code is created or modified.

---

### 1. Test-Driven Development (Write Tests First)

#### 1.1 New & Modified Test Files
- **`tests/acronymService.test.ts`** *(New)*:
  - Unit tests for catalog loading, validation, letter map resolution, and random guess generation.
- **`tests/acronymConfigRepository.test.ts`** *(New)*:
  - Unit tests for database persistence of acronym configuration (enabled state, channel IDs, enabled acronyms).
- **`tests/acronymMessageListener.test.ts`** *(New)*:
  - Unit tests for Slack `message` event handling, bot filtering, channel matching, acronym detection regex, and dispatching guesses with custom usernames.
- **`tests/acronymCommandListener.test.ts`** *(New)*:
  - Unit tests for `/acronym` slash command routing (`start`, `stop`, `status`, `config channels`, `config acronyms`, error handling).
- **`tests/slack.test.ts`** *(Modified)*:
  - Tests verifying `ISlackService.sendMessage` accepts optional `options` (`username`, `iconEmoji`, `threadTs`) and passes `username` with `as_user: false` to Bolt's `chat.postMessage`.

#### 1.2 Test Cases Outline

##### A. `tests/acronymService.test.ts`
- **Catalog Loading & Validation**:
  - Should load and parse valid acronym definitions from JSON file.
  - Should throw error if catalog file is missing or invalid JSON.
  - Should normalize acronym keys to uppercase.
  - Should validate that all letters in an acronym have non-empty candidate word arrays.
- **Random Guess Generation**:
  - Should generate a guess with words corresponding to each letter of the acronym in order.
  - Should append `?` to the generated guess (e.g., `"Bumbling Tiger Uniforms?"`).
  - Should select words randomly from candidate lists.
  - Should throw or handle gracefully if an acronym is not present in the catalog.
  - Should handle acronyms with repeated letters (e.g., picking words for each letter instance).
- **Configuration & State Delegation**:
  - Should retrieve current config (`isEnabled`, `channels`, `enabledAcronyms`).
  - Should toggle guessing state (`start` / `stop`).
  - Should add, remove, and set monitored channels.
  - Should add, remove, and set enabled acronyms (rejecting acronyms not in the catalog).
  - `isChannelMonitored(channelId)` should return true only for configured channels.
  - `isGuessingActive()` should reflect current enabled status.
  - `getMonitoredAcronyms()` should return only enabled acronyms that exist in the catalog.

##### B. `tests/acronymConfigRepository.test.ts`
- Should fetch default configuration if no record exists in database.
- Should update and persist `isEnabled` flag.
- Should update and persist channels list (serialized JSON / array).
- Should update and persist enabled acronyms list.
- Should work across SQLite (in tests) and MySQL (in production).

##### C. `tests/acronymMessageListener.test.ts`
- **Event Filtering**:
  - Should ignore messages when guessing behavior is stopped/inactive.
  - Should ignore messages sent in unmonitored channels.
  - Should ignore messages sent by bots (checking `event.bot_id` and `event.subtype === 'bot_message'`).
  - Should ignore messages without text.
- **Acronym Detection**:
  - Should detect single acronym surrounded by words/punctuation (e.g., `"hello BTU world"`).
  - Should match acronyms case-insensitively or with word boundary (e.g., `\bBTU\b`).
  - Should detect multiple distinct acronyms in a single message (e.g., `"BTU and ASAP"`).
  - Should not trigger on partial word matches (e.g., `"OBTUSE"` should not trigger `"BTU"`).
- **Response Dispatch**:
  - Should call `slackService.sendMessage` with generated guess text.
  - Should pass configured `username` (e.g., `"BTU Bot"`) in message options.
  - Should post to the correct channel (and thread if `thread_ts` present).

##### D. `tests/acronymCommandListener.test.ts`
- **Command Dispatch**:
  - Should respond to `/acronym start` by enabling guessing and sending confirmation.
  - Should respond to `/acronym stop` by disabling guessing and sending confirmation.
  - Should respond to `/acronym status` with current status, channels, and active acronyms.
  - Should handle `/acronym config channels add C123 C456`.
  - Should handle `/acronym config channels remove C123`.
  - Should handle `/acronym config channels list`.
  - Should handle `/acronym config acronyms add BTU`.
  - Should reject unknown acronyms not in `acronyms.json` when adding.
  - Should handle `/acronym config acronyms remove BTU`.
  - Should return helpful usage text when unrecognized subcommands are passed.

##### E. `tests/slack.test.ts`
- Should pass `username` and `as_user: false` to `app.client.chat.postMessage` when provided in `options`.
- Should preserve existing behavior when `options` is omitted.

---

### 2. Acronym Catalog File (`config/acronyms.json`)
- Create `config/acronyms.json` containing default acronyms including `"BTU"` and `"ASAP"` with rich candidate word lists and specific `botName` values.

---

### 3. Acronym Domain Types & Errors (`src/services/acronym/`)
- **`src/services/acronym/types.ts`**:
  - `AcronymDefinition`: `{ botName?: string; candidateWords: Record<string, string[]>; }`
  - `AcronymCatalog`: `Record<string, AcronymDefinition>`
  - `AcronymConfig`: `{ id?: number; isEnabled: boolean; channels: string[]; enabledAcronyms: string[]; }`
  - `IAcronymService`: Contract for guess generation, catalog queries, and configuration management.
  - `IAcronymConfigRepository`: Contract for persisting configuration.
- **`src/services/acronym/errors.ts`**:
  - `AcronymError` (extends `AppError`)
  - `AcronymNotFoundError`
  - `InvalidAcronymCatalogError`

---

### 4. Persistence Layer (`src/db/` & `src/services/acronym/`)
- **Model**: `src/db/models/AcronymConfig.ts`
  - Sequelize model `AcronymConfigModel` with columns `id`, `isEnabled` (boolean, default true), `channels` (JSON/TEXT), `enabledAcronyms` (JSON/TEXT), `createdAt`, `updatedAt`.
- **Migration**: `src/db/migrations/03_create_acronym_configs.sql`
  - DDL for `acronym_configs` table.
- **DB Connection**: Register `AcronymConfigModel` in `src/db/connection.ts`.
- **Repositories**:
  - `src/db/repositories/AcronymConfigRepository.ts` (Sequelize implementation).
  - `src/services/acronym/mock-acronym-config.repository.ts` (In-memory mock for unit tests).

---

### 5. Acronym Service (`src/services/acronym/acronym.service.ts`)
- Implement `AcronymService`:
  - Load and validate `config/acronyms.json` on initialization.
  - Expose `generateGuess(acronym: string): { guess: string; botName?: string }`.
  - Coordinate configuration via `IAcronymConfigRepository`:
    - `start()`, `stop()`, `getConfig()`.
    - `addChannels()`, `removeChannels()`, `setChannels()`.
    - `addAcronyms()`, `removeAcronyms()`, `setAcronyms()`.
    - `isChannelMonitored(channelId: string): Promise<boolean>`.
    - `isGuessingActive(): Promise<boolean>`.
    - `getAvailableCatalog(): AcronymCatalog`.

---

### 6. Slack Service Enhancements (`src/services/slack/`)
- Update `ISlackService` in `src/services/slack/types.ts`:
  - Define `SlackSendMessageOptions`:
    ```typescript
    export interface SlackSendMessageOptions {
      username?: string;
      iconEmoji?: string;
      threadTs?: string;
    }
    ```
  - Update `sendMessage`:
    ```typescript
    sendMessage(
      channelOrUserId: string,
      text: string,
      options?: SlackSendMessageOptions,
    ): Promise<{ channel: string; messageTimestamp: string } | null>;
    ```
- Update `src/services/slack/slack.service.ts`:
  - In `sendMessage`, if `options?.username` is supplied, pass `username: options.username` and `as_user: false` to `this.app.client.chat.postMessage`.

---

### 7. Slack Listeners (`src/services/slack/`)
- **Event Listener (`src/services/slack/event/acronym-message-listener.service.ts`)**:
  - Implements `IEventListener` (`eventName = 'message'`).
  - Filters out messages where `bot_id` is set or `subtype === 'bot_message'`.
  - Checks `isGuessingActive()` and `isChannelMonitored(channel)`.
  - Searches message text for any enabled acronym using word-boundary regular expressions (`\b${acronym}\b`).
  - Calls `acronymService.generateGuess(acronym)` and sends response via `slackService.sendMessage(channel, guess, { username: botName })`.
- **Command Listener (`src/services/slack/command/acronym-command-listener.service.ts`)**:
  - Implements `ICommandListener` (`commandName = '/acronym'`).
  - Parses args: `start`, `stop`, `status`, `config channels ...`, `config acronyms ...`, `help`.
  - Calls `AcronymService` methods and responds with user-friendly confirmation messages.

---

### 8. Application Bootstrap Integration (`src/app.ts`)
- In `src/app.ts`:
  - Instantiate `AcronymConfigRepository`.
  - Instantiate `AcronymService(configRepo, catalogPath)`.
  - Instantiate `AcronymMessageListenerService(acronymService)`.
  - Instantiate `AcronymCommandListenerService(acronymService)`.
  - Register listeners:
    - `slack.registerEventListener(acronymMessageListener);`
    - `slack.registerCommandListener(acronymCommandListener);`

---

## 4. Verification & Validation Plan

1. **Test-Driven Development Execution**:
   - Run `npm test` after writing each test suite to confirm failures (red phase), then implement components to achieve 100% pass (green phase).
2. **Regression Testing**:
   - Ensure all existing Spotify status sync tests pass (`tests/sync.test.ts`, `tests/userRepository.test.ts`, `tests/command.test.ts`, etc.).
3. **Linting and Type Checking**:
   - Run `npm run lint` and verify zero errors/warnings.
   - Run `npm run build` (`tsc`) and ensure full TypeScript compilation without errors.
4. **Documentation**:
   - Update Typedoc documentation via `npm run docs` to ensure all new public symbols and types are documented.

---

## 5. Summary of Files to Add/Modify

| File | Status | Description |
|------|--------|-------------|
| `docs/implementation_plan.md` | Created | This implementation plan |
| `config/acronyms.json` | To Create | Acronym catalog with word maps and bot names |
| `src/services/acronym/types.ts` | To Create | Types & interfaces for acronym feature |
| `src/services/acronym/errors.ts` | To Create | Domain errors for acronym service |
| `src/services/acronym/acronym.service.ts` | To Create | Core business logic for guessing and configuration |
| `src/services/acronym/mock-acronym-config.repository.ts` | To Create | In-memory repository for unit testing |
| `src/db/models/AcronymConfig.ts` | To Create | Sequelize model for persisting acronym config |
| `src/db/repositories/AcronymConfigRepository.ts` | To Create | Sequelize repository for acronym config |
| `src/db/migrations/03_create_acronym_configs.sql` | To Create | SQL migration script |
| `src/services/slack/event/acronym-message-listener.service.ts` | To Create | Slack event listener for channel messages |
| `src/services/slack/command/acronym-command-listener.service.ts` | To Create | Slash command listener for `/acronym` |
| `src/services/slack/types.ts` | To Modify | Add `SlackSendMessageOptions` to `sendMessage` |
| `src/services/slack/slack.service.ts` | To Modify | Support `username` / `as_user: false` in `sendMessage` |
| `src/db/connection.ts` | To Modify | Register `AcronymConfigModel` in Sequelize instance |
| `src/app.ts` | To Modify | Bootstrap and wire up acronym services and listeners |
| `tests/acronymService.test.ts` | To Create | Unit tests for `AcronymService` |
| `tests/acronymConfigRepository.test.ts` | To Create | Unit tests for configuration persistence |
| `tests/acronymMessageListener.test.ts` | To Create | Unit tests for message listening & guessing |
| `tests/acronymCommandListener.test.ts` | To Create | Unit tests for `/acronym` commands |
| `tests/slack.test.ts` | To Modify | Unit tests for `sendMessage` options |
