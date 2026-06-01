import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@react-lab/shared';
import Sudoku from './Sudoku';

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Sudoku />
        </QueryClientProvider>
    );
}
