import { Layout, ModalProvider, ThemeProvider } from '@react-lab/ui'
import SuperTicTacToe from './SuperTicTacToe'

const App = () => {
  return (
    <ThemeProvider>
      <ModalProvider>
        <Layout>
          <SuperTicTacToe />
        </Layout>
      </ModalProvider>
    </ThemeProvider>
  )
}

export default App