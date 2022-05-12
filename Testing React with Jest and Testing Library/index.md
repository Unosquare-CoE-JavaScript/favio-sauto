## React Testing Library

It's not just a library, it is also a philosophy ("opinionated") and as such encourages certain sets of practices

- Test our software the way users actually use it
  - Not internal implementation
- Find elements by accessibility markers, not test IDs

### React Testing Library vs Jest

#### React Testing Library

- Provides a virtual DOM for tests

#### Jest

- Test runner that:
  - Finds tests
  - Runs tests
  - Determines wether tests pass or fail

## Types of Tests

- Unit tests
  - Tests one unit of code in isolation
- Integration tests
  - How multiple units work together
- Functional Tests
  - Tests a particular function of software
- Acceptance / End-to-end (E2E) Tests
  - Use actual browser and server (Cypress, Selenium)

### Functional Testing

Different mindset from unit testing.

Unit testing:

- Isolated: mock dependencies, test internals
