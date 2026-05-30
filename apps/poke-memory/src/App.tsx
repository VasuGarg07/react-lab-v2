import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, Layout } from '@react-lab/ui';
import { store } from './store/store';
import PokeMemory from './PokeMemory';

export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Layout>
                    <PokeMemory />
                </Layout>
                <ToastContainer stacked limit={5} position="bottom-right" />
            </ThemeProvider>
        </Provider>
    );
}
