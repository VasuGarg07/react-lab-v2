import { Layout, ThemeProvider } from '@react-lab/ui'
import SortingVisualizer from './Visualizer'

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <SortingVisualizer />
      </Layout>
    </ThemeProvider>
  )
}

export default App