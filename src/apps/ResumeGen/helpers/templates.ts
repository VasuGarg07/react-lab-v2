import BlurPrint from '/resume-templates/BluePrint.png';
import Classic from '/resume-templates/Classic.png';
import Minimalist from '/resume-templates/Minimalist.png';
import Modern from '/resume-templates/Modern.png';
import Professional from '/resume-templates/Professional.png';
import PurpleAccent from '/resume-templates/PurpleAccent.png';
import Sleek from '/resume-templates/Sleek.png';
import TwoColumn from '/resume-templates/TwoColumn.png';
import BluePrintResume from '../templates/BluePrint';
import ClassicResume from '../templates/Classic';
import MinimalistResume from '../templates/Minimalist';
import ModernResume from '../templates/Modern';
import ProfessionalResume from '../templates/Professional';
import PurpleAccentResume from '../templates/PurpleAccent';
import RefinedSleekResume from '../templates/Sleek';
import TwoColumnResume from '../templates/TwoColumn';
import { TemplateProps } from './interfaces';

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