import { Bookmark, Briefcase, Building2, FileText, PlusCircle, Search } from 'lucide-react';
import { Outlet } from 'react-router';
import { useScrollToTop } from '@react-lab/shared';
import JobNav, { type NavItem } from '../components/JobNav';
import JobFooter from '../components/JobFooter';
import AccountMenu from '../components/AccountMenu';
import { useJobscape } from '../hooks/useJobscape';
import { ROUTES } from '../helpers/job.constants';

const APPLICANT_NAV: NavItem[] = [
    { to: ROUTES.jobs, icon: <Search size={16} />, label: 'Jobs' },
    { to: ROUTES.companies, icon: <Building2 size={16} />, label: 'Companies' },
    { to: ROUTES.applications, icon: <FileText size={16} />, label: 'Applications' },
    { to: ROUTES.saved, icon: <Bookmark size={16} />, label: 'Saved' },
];

const EMPLOYER_NAV: NavItem[] = [
    { to: ROUTES.manage, icon: <Briefcase size={16} />, label: 'My Jobs', end: true },
    { to: ROUTES.postJob, icon: <PlusCircle size={16} />, label: 'Post a Job' },
];

export default function JobLayout() {
    useScrollToTop();
    const { role } = useJobscape();

    const navItems = role === 'employer' ? EMPLOYER_NAV : role === 'applicant' ? APPLICANT_NAV : [];

    return (
        <div className="flex min-h-screen flex-col bg-canvas">
            <JobNav navItems={navItems} rightSlot={<AccountMenu />} />
            <main className="flex-1">
                <Outlet />
            </main>
            <JobFooter />
        </div>
    );
}
