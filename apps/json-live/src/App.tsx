import { Provider } from 'react-redux';
import { ModalProvider, ThemeProvider, Layout } from '@react-lab/ui';
import { store } from './store/store';
import JsonLive from './JsonLive';

export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <ModalProvider>
                    <Layout>
                        <JsonLive />
                    </Layout>
                </ModalProvider>
            </ThemeProvider>
        </Provider>
    );
}
