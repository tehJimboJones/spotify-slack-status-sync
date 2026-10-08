/**
 * Acronym service specific errors.
 * @remarks
 * Defines custom exception classes for failures encountered in the acronym service, catalog parsing, and word generation.
 *
 * @author jmaciejewski
 * @date   2026-10-08
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { AppError } from '../../errors';

/**
 * Base exception class for acronym service errors.
 *
 * @public
 */
export class AcronymError extends AppError {
  constructor(message: string, code: string = 'ACRONYM_ERROR') {
    super(message, code);
  }
}

/**
 * Exception thrown when an acronym is not found in the catalog.
 *
 * @public
 */
export class AcronymNotFoundError extends AcronymError {
  constructor(message: string = 'Acronym not found in catalog.') {
    super(message, 'ACRONYM_NOT_FOUND');
  }
}

/**
 * Exception thrown when the acronym catalog file or object is invalid.
 *
 * @public
 */
export class InvalidAcronymCatalogError extends AcronymError {
  constructor(message: string = 'Invalid acronym catalog structure.') {
    super(message, 'INVALID_ACRONYM_CATALOG');
  }
}

/**
 * Exception thrown when candidate words for an acronym letter are missing or empty.
 *
 * @public
 */
export class LetterCandidateMissingError extends AcronymError {
  constructor(message: string = 'Candidate words for acronym letter are missing.') {
    super(message, 'LETTER_CANDIDATE_MISSING');
  }
}
