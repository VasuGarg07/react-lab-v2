import { useAppSelector } from '../store/useRedux';
import FormEditor from './editors/FormEditor';
import StepEditor from './editors/StepEditor';
import SectionEditor from './editors/SectionEditor';
import FieldEditor from './editors/FieldEditor';
import Breadcrumb from './Breadcrumb';

export default function Canvas() {
    const { path } = useAppSelector((state) => state.formBuilder);

    const renderEditor = () => {
        switch (path.length) {
            case 0: return <FormEditor />;
            case 1: return <StepEditor stepKey={path[0]} />;
            case 2: return <SectionEditor stepKey={path[0]} sectionKey={path[1]} />;
            case 3: return <FieldEditor stepKey={path[0]} sectionKey={path[1]} fieldKey={path[2]} />;
            default: return <FormEditor />;
        }
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-canvas">
            <div className="shrink-0 px-5 h-12 flex items-center border-b border-neutral-200 bg-canvas/80 backdrop-blur-sm">
                <Breadcrumb />
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-8">
                <div key={path.join('/') || 'form'} className="max-w-2xl mx-auto fade-up">
                    {renderEditor()}
                </div>
            </div>
        </div>
    );
}
