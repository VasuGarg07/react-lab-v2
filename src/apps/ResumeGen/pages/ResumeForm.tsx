import React from 'react';
import ClassicProfessionalResume from '../templates/Classic';
import { sampleResume } from '../helpers/sample';

const ResumeForm: React.FC = () => {
    return <ClassicProfessionalResume resumeData={sampleResume} />
};

export default ResumeForm;