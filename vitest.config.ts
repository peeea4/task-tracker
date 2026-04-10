import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './setupTests.ts',
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/cypress/**',
            '**/.{idea,git,cache,output,temp}/**',
            '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
            '**/tests',
        ],
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: [
                '**/index.{ts,tsx,js,jsx}', // index файлы
                '**/*.config.{ts,js,cjs,mjs}', // конфиги
            ],
        },
    },
})
