/*
 * File: main.tsx
 * Project: timm-bingo
 * File Created: 27.08.2024, 23:08:56
 * 
 * Last Modified: 29.08.2024, 10:08:99
 * Modified By: MAX809
 */
import '@mantine/core/styles.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals';

import './index.css'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme='dark' forceColorScheme='dark' theme={{
      fontFamily: 'Roboto Mono',
    }}>
      <ModalsProvider>
        <App />
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>,
)
