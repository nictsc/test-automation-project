# test-automation-project

## Introduction
Production-style end-to-end test automation framework designed to validate critical user workflows with a strong focus on reliability, maintainability and execution speed.

## Project Objective
This project explores the following.
- Explore Playwright + TypeScript for reliable E2E testing
- Demonstrate how to design maintainable, readable and scalable automated tests
- Apply QA best practices such as separation of concerns, reusable fixtures and clear test intent

## What this project demostrates
This is how I approach automation as a quality owner.
- Design a clean and modular Playwright framework
- Apply TypeScript for long-term maintainability
- Translate business workflows into test scenarios
- Balance test coverage vs execution time
- Make deliberate design trade-offs, not accidental ones
- Write automation that is CI-ready and team-friendly

## Tech Stack & Engineering Rationale
| Tool           | Reason                                                           | 
| -------------  |:-------------:                                                   | 
| Playwright     | Reliable E2E testing with auto-waiting and cross-browser support | 
| TypeScript     | Type safety, refactor safety, and readable intent                |  
| Node.js        | Industry standard runtime for automation                         |   

## Test Coverage Strategy
Tests are written around user intent and business value.

Coverage includes

- Critical user journeys (happy paths)
- Input validation and boundary cases
- UI state transitions
- Cross-browser execution

Each test is

- Independent
- Deterministic
- Designed to fail clearly

## Framework Architecture
```
tests/                # Business-focused test scenarios
	tests.spec.ts       # End-to-end flows for login and product sorting
pages/                # Page Object Models (single responsibility)
	loginPage.ts        # Login form interactions and assertions
	productPage.ts      # Product listing interactions and sorting checks
fixtures/             # Test setup, teardown, and shared context
	fixtures.ts
utils/                # Reusable helpers (waits, assertions, data)
.env                  # Environment variables storage
playwright.config.ts  # Playwright runner configuration
README.md             # Project overview and how-tos
```
