import { useAppSelector } from '../../../store/useRedux';
import FormEditor from './editors/FormEditor';
import StepEditor from './editors/StepEditor';
import SectionEditor from './editors/SectionEditor';
import FieldEditor from './editors/FieldEditor';
import Breadcrumb from './Breadcrumb';

export default function Canvas() {
    const { path } = useAppSelector((state) => state.formBuilder);

    // Determine which editor to show based on path depth
    // path = [] → Form
    // path = [stepKey] → Step
    // path = [stepKey, sectionKey] → Section
    // path = [stepKey, sectionKey, fieldKey] → Field

    const renderEditor = () => {
        switch (path.length) {
            case 0:
                return <FormEditor />;
            case 1:
                return <StepEditor stepKey={path[0]} />;
            case 2:
                return <SectionEditor stepKey={path[0]} sectionKey={path[1]} />;
            case 3:
                return <FieldEditor stepKey={path[0]} sectionKey={path[1]} fieldKey={path[2]} />;
            default:
                return <FormEditor />;
        }
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-neutral-50 dark:bg-neutral-900">
            {/* Breadcrumb */}
            <div className="shrink-0 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                <Breadcrumb />
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-2xl mx-auto">
                    {renderEditor()}
                </div>
            </div>
        </div>
    );
}