import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@react-lab/shared';
import {Layout, ThemeProvider} from "@react-lab/ui";
import Sudoku from './Sudoku';

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Layout>
                    <Sudoku />
                </Layout>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
