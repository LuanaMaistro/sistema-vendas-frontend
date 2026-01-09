import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'

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
          './src/tools/either': ['eitherToBoolean']

        },
      ]
    })
  ],
})
