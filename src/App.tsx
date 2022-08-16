import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalTheme } from './styles/Global';
import { defaultTheme } from './styles/themes/default';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalTheme />
      <h1>Hello World</h1>
    </ThemeProvider>
  )
}
