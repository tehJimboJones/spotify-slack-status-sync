/**
 * Global application error definitions.
 * @remarks
 * Defines base error classes and common application-level exceptions used across the entire bot architecture.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
/**
 * Base exception class for application errors.
 *
 * @remarks
 * Provides a foundation for all custom errors in the domain, standardizing error properties and inheritance chains.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * AppError([AppError]) -->|Extends| Error[Error]
 * DomainErrors[Specific Domain Errors] -->|Extends| AppError
 * ```
 *
 * @example
 * ```typescript
 * throw new AppError('Something went wrong', 500);
 * ```
 *
 * @public
 */
export class AppError extends Error {
  public readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}
