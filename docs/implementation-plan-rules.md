# Implementation Plan Guidelines

When generating an `implementation_plan.md` artifact, always enforce a **Test-Driven Development (TDD)** approach by default. 

Every implementation plan must include the following as the explicit **first step** in the "Proposed Changes" section:

### 1. Test-Driven Development (Write Tests First)
- Explicitly call out updating or writing new unit tests *before* making any other modifications to the application logic.
- Specify which test files (`.test.ts`) will be created or modified.
- Outline the test cases that need to be implemented to establish the new expected behavior or cover the new edge cases.

Only after this step should the plan outline the actual application code modifications.
