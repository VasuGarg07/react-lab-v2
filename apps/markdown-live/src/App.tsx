import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, Layout } from '@react-lab/ui';
import MarkdownLive from './MarkdownLive';

export default function App() {
    return (
        <ThemeProvider>
            <Layout>
                <MarkdownLive />
            </Layout>
            <ToastContainer stacked limit={5} position="bottom-right" />
        </ThemeProvider>
    );
}
