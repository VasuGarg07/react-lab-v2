import BlurPrint from '../../../assets/resume-templates/BluePrint.png';
import Classic from '../../../assets/resume-templates/Classic.png';
import Minimalist from '../../../assets/resume-templates/Minimalist.png';
import Modern from '../../../assets/resume-templates/Modern.png';
import Professional from '../../../assets/resume-templates/Professional.png';
import PurpleAccent from '../../../assets/resume-templates/PurpleAccent.png';
import Sleek from '../../../assets/resume-templates/Sleek.png';
import TwoColumn from '../../../assets/resume-templates/TwoColumn.png';

interface TemplateInfo {
    id: string;
    name: string;
    image: string;
}

export const Templates: TemplateInfo[] = [
    { id: 'BluePrint', name: 'Blue Print', image: BlurPrint },
    { id: 'Classic', name: 'Classic', image: Classic },
    { id: 'Minimalist', name: 'Minimalist', image: Minimalist },
    { id: 'Modern', name: 'Modern', image: Modern },
    { id: 'Professional', name: 'Professional', image: Professional },
    { id: 'PurpleAccent', name: 'Purple Accent', image: PurpleAccent },
    { id: 'Sleek', name: 'Sleek', image: Sleek },
    { id: 'TwoColumn', name: 'Two Column', image: TwoColumn },
];