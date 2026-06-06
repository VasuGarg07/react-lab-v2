import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarkdownLive from './MarkdownLive';

export default function App() {
    return (
        <>
            <MarkdownLive />
            <ToastContainer stacked limit={5} position="bottom-right" />
        </>
    );
}
