import { ThemeProvider } from '@react-lab/ui'
import SortingVisualizer from './Visualizer'

export default function App() {
  return (
    <ThemeProvider>
      <SortingVisualizer />
    </ThemeProvider>
  )
}
