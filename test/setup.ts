import '@testing-library/jest-dom'

// Configure React Testing Library for React 18
global.IS_REACT_ACT_ENVIRONMENT = true

// Suppress specific console warnings during tests
const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  console.error = (...args: any[]) => {
    const message = args[0]
    if (
      typeof message === 'string' &&
      (
        message.includes('Support for defaultProps will be removed') ||
        message.includes('findDOMNode is deprecated') ||
        message.includes('An update to') && message.includes('inside a test was not wrapped in act')
      )
    ) {
      return
    }
    originalError.call(console, ...args)
  }
  
  console.warn = (...args: any[]) => {
    const message = args[0]
    if (
      typeof message === 'string' &&
      message.includes('componentWillReceiveProps has been renamed')
    ) {
      return
    }
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})
