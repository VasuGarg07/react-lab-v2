import { useLocation } from 'react-router';
import { Apps } from '../shared/apps';

const APP_NAME = 'Code Garage';

export const usePageTitle = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // If on homepage, return just "Code Garage"
    if (currentPath === '/') {
        return APP_NAME;
    }

    const currentApp = Apps.find(app => currentPath.includes(app.path));
    if (currentApp) {
        document.title = `${APP_NAME} • ${currentApp.name}`;
        return `${currentApp.name}`;
    }

    document.title = APP_NAME;
    return APP_NAME;
};