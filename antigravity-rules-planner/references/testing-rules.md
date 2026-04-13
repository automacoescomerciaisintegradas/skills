# Testing Rules Reference

## Core policy

- Treat testing as mandatory for every functional change.
- Prefer one scenario per test instead of linear tests that validate many behaviors at once.
- Use tests to discover bugs, document behavior, and expose edge cases.

## Unit tests

- Use unit tests to validate focused logic in isolation.
- Mock external dependencies such as databases, HTTP clients, queues, cloud SDKs, storage, filesystem access, and third-party services.
- Declare in-memory helpers, plain objects, and lightweight local structures directly when they are not external dependencies.
- Allow unit and integration tests to coexist for the same artifact when they validate different concerns.

## Integration tests

- Use integration tests to validate interaction with real external boundaries or realistic adapters.
- Name integration specs with the suffix `*.int.spec.ts`.
- Prefer verifying contracts and behavior across layers instead of re-testing trivial pure logic.

## E2E tests

- Use e2e tests to validate the system from the outside in.
- Prepare the database or fixture state before each scenario.
- Execute the necessary HTTP requests.
- Assert status code, response body, error payloads, and important side effects.

## Scenario design

- Keep each test focused on one scenario.
- Add edge cases intentionally instead of only the happy path.
- Include negative cases, validation boundaries, empty states, duplicates, authorization failures, and partial-failure paths when relevant.
- Make the test name describe the exact behavior being validated.

## Practical split

- Use unit tests for small decision logic and failure branches.
- Use integration tests for cross-layer or adapter behavior.
- Use e2e tests for contract-level confidence and full request lifecycle validation.
