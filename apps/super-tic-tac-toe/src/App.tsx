import { useEffect } from 'react'
import { ModalProvider, ThemeProvider } from '@react-lab/ui'
import SuperTicTacToe from './SuperTicTacToe'

const App = () => {
  useEffect(() => {
    document.body.setAttribute('data-theme', 'dark')
  }, [])

  return (
    <ThemeProvider>
      <ModalProvider>
        <SuperTicTacToe />
      </ModalProvider>
    </ThemeProvider>
  )
}

export default App
