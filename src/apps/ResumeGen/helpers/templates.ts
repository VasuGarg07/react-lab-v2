import BlurPrint from '/resume-templates/BluePrint.png';
import Classic from '/resume-templates/Classic.png';
import Minimalist from '/resume-templates/Minimalist.png';
import Modern from '/resume-templates/Modern.png';
import Professional from '/resume-templates/Professional.png';
import PurpleAccent from '/resume-templates/PurpleAccent.png';
import Sleek from '/resume-templates/Sleek.png';
import TwoColumn from '/resume-templates/TwoColumn.png';
import BluePrintResume from '@/apps/ResumeGen/templates/BluePrint';
import ClassicResume from '@/apps/ResumeGen/templates/Classic';
import MinimalistResume from '@/apps/ResumeGen/templates/Minimalist';
import ModernResume from '@/apps/ResumeGen/templates/Modern';
import ProfessionalResume from '@/apps/ResumeGen/templates/Professional';
import PurpleAccentResume from '@/apps/ResumeGen/templates/PurpleAccent';
import RefinedSleekResume from '@/apps/ResumeGen/templates/Sleek';
import TwoColumnResume from '@/apps/ResumeGen/templates/TwoColumn';
import { TemplateProps } from '@/apps/ResumeGen/helpers/interfaces';

interface TemplateInfo {
    id: string;
    name: string;
    image: string;
    component: React.FC<TemplateProps>
}

export const Templates: TemplateInfo[] = [
    { id: 'BluePrint', name: 'Blue Print', image: BlurPrint, component: BluePrintResume },
    { id: 'Classic', name: 'Classic', image: Classic, component: ClassicResume },
    { id: 'Minimalist', name: 'Minimalist', image: Minimalist, component: MinimalistResume },
    { id: 'Modern', name: 'Modern', image: Modern, component: ModernResume },
    { id: 'Professional', name: 'Professional', image: Professional, component: ProfessionalResume },
    { id: 'PurpleAccent', name: 'Purple Accent', image: PurpleAccent, component: PurpleAccentResume },
    { id: 'Sleek', name: 'Sleek', image: Sleek, component: RefinedSleekResume },
    { id: 'TwoColumn', name: 'Two Column', image: TwoColumn, component: TwoColumnResume },
];