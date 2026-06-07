import { Apps } from './apps';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './Homepage';

export default function App() {
    const count = Apps.filter((a) => a.visible).length;

    return (
        <div className="min-h-screen flex flex-col bg-paper">
            <Header count={count} />
            <main className="flex-1">
                <Homepage />
            </main>
            <Footer />
        </div>
    );
}
