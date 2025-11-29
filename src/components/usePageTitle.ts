import { useLocation } from 'react-router';
import { Apps } from '../shared/apps';

export const usePageTitle = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // If on homepage, return just "React Lab"
    if (currentPath === '/') {
        return 'React Lab';
    }

    const currentApp = Apps.find(app => currentPath.includes(app.path));
    if (currentApp) {
        // return `React Lab • ${currentApp.name}`;
        return `${currentApp.name}`;
    }

    return 'React Lab';
};