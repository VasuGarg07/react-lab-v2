import { ThemeProvider, Layout } from '@react-lab/ui';
import LoanWizard from './LoanWizard';

export default function App() {
    return (
        <ThemeProvider>
            <Layout>
                <LoanWizard />
            </Layout>
        </ThemeProvider>
    );
}
