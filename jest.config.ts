export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['**/__tests__/**/*.test.ts'],
    moduleNameMapper: {
        '\\.css$': '<rootDir>/__mocks__/styleMock.ts',
    },
}