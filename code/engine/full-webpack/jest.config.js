module.exports = {
    moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js'],
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        // '^.+\\.vue$': 'vue-jest', // vue 文件用 vue-jest 转换
        '^.+\\.tsx?$': 'ts-jest' // ts 文件用 ts-jest 转换
    },
    // 匹配 __tests__ 目录下的 .js/.ts 文件 或其他目录下的 xx.test.js/ts xx.spec.js/ts
    testMatch: [
        "**/tests/**/*.spec.ts",
        "**/tests/**/*.spec.tsx",
        "**/__tests__/**/*.spec.ts",
        "**/__tests__/**/*.spec.tsx",
    ],
}