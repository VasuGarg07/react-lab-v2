import { ModalProvider } from '@react-lab/ui'
import SuperTicTacToe from './SuperTicTacToe'

const App = () => {
  return (
    <ModalProvider>
      <SuperTicTacToe />
    </ModalProvider>
  )
}

export default App
