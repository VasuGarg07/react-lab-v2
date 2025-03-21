import AppBackground from '@/components/AppBackground';
import { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {

  return (
    <div className="relative min-h-[calc(100vh-54px)] w-full overflow-hidden">
      <AppBackground />

      <div className="relative w-full max-w-4xl mx-auto z-10 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;