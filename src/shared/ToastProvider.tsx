// src/components/ToastProvider.tsx
import { useEffect, ReactNode } from 'react';
import { Toast } from '@base-ui-components/react/toast';
import { setToastManager, ToastType } from './toastr';
import { Info, AlertCircle, AlertTriangle, CheckCircle, X } from 'lucide-react';

interface ToastProviderProps {
  children: ReactNode;
}

function ToastList() {
  const { toasts } = Toast.useToastManager();

  const getToastClassName = (type: ToastType) => {
    const baseClasses = "flex items-center px-4 py-3 rounded-md shadow-sm min-w-[320px] max-w-sm";
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-500 text-white`;
      case 'error':
        return `${baseClasses} bg-red-500 text-white`;
      case 'warning':
        return `${baseClasses} bg-yellow-500 text-white`;
      case 'info':
        return `${baseClasses} bg-blue-500 text-white`;
      default:
        return `${baseClasses} bg-gray-500 text-white`;
    }
  };

  const getIcon = (type: ToastType) => {
    const iconProps = { size: 20, className: "flex-shrink-0" };
    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} />;
      case 'error':
        return <AlertCircle {...iconProps} />;
      case 'warning':
        return <AlertTriangle {...iconProps} />;
      case 'info':
        return <Info {...iconProps} />;
      default:
        return <Info {...iconProps} />;
    }
  };

  return toasts.slice(-5).map((toast) => (
    <Toast.Root
      key={toast.id}
      toast={toast}
      className={getToastClassName(toast.type as ToastType)}
    >
      <div className="flex items-center w-full relative z-10">
        {getIcon(toast.type as ToastType)}
        <div className="flex-1 min-w-0 mx-2">
          <Toast.Description className="text-white font-medium text-sm leading-relaxed" />
        </div>
        <Toast.Close
          className="text-white opacity-70 hover:opacity-100 rounded p-1 flex-shrink-0"
          aria-label="Close"
        >
          <X size={16} />
        </Toast.Close>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <div
          className="h-full bg-white bg-opacity-30"
          style={{
            width: '100%',
            animation: 'toast-progress 5s linear forwards'
          }}
        />
      </div>
    </Toast.Root>
  ));
}

function ToastManager() {
  const toastManager = Toast.useToastManager();

  useEffect(() => {
    setToastManager(toastManager);
  }, [toastManager]);

  useEffect(() => {
    // Add CSS animation to document head
    const style = document.createElement('style');
    style.textContent = `
      @keyframes toast-progress {
        from {
          width: 100%;
        }
        to {
          width: 0%;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <Toast.Provider>
      <ToastManager />
      {children}
      <Toast.Portal>
        <Toast.Viewport className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
};