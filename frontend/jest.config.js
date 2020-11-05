/* For jest tests */

module.exports = {
  preset: "ts-jest",
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\.(ts|tsx)?$': 'ts-jest',
    "\\.(jpg|jpeg|png|gif|eot|otf)$": "<rootDir>/assetsTransformer.js",
    "\\.(webp|svg|ttf|woff|woff2|mp4|webm)$": "<rootDir>/assetsTransformer.js",
    "\\.(wav|mp3|m4a|aac|oga)$": "<rootDir>/assetsTransformer.js"
  },
  testRegex: '(/tests/.*|(\.|/)(test|spec))\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf)$": "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(webp|svg|ttf|woff|woff2|mp4)$": "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy"
  },
  globals: {
    "ts-jest": {
      tsConfig: {
        // allow js in typescript
        allowJs: true,
      },
    },
  },
}
