import React from 'react'
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Navigation from './navigations/Navigation'
import './styles/Globalcss.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  )
}

export default App