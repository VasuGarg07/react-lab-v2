import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PokeProvider } from './PokeContext';
import PokeMemory from './PokeMemory';

export default function App() {
    return (
        <PokeProvider>
            <PokeMemory />
            <ToastContainer stacked limit={5} position="bottom-right" />
        </PokeProvider>
    );
}
