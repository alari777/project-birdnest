import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { TextDecoder, TextEncoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

require('jest-fetch-mock').enableMocks();

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {}
}))
