import { JsonProvider } from './JsonContext';
import JsonLive from './JsonLive';

export default function App() {
    return (
        <JsonProvider>
            <JsonLive />
        </JsonProvider>
    );
}
