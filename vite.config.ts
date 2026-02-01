import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
      ],

      imports: [
        'react',
        {
          '@dibimo/core-lib': [
            'fold',
            'right',
            'left'
          ],
          '@/tools/either': ['eitherToBoolean', 'operationResultToNotification'],
          '@/tools/date': ['formatDate'],
          '@/tools/currency': ['formatCurrency']

        },
      ]
    })
  ],
  resolve: {
    alias: {
      '@':  path.resolve(__dirname, './src')
    }
  }
})
