import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'

// Mock next/router for all tests
jest.mock('next/navigation', () => require('next-router-mock'));