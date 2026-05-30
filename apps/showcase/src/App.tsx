import { ThemeProvider, Layout } from '@react-lab/ui';
import Homepage from './Homepage';

export default function App() {
    return (
        <ThemeProvider>
            <Layout>
                <Homepage />
            </Layout>
        </ThemeProvider>
    );
}
