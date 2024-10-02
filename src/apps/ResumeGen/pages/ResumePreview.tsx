import React from 'react';
import { Link } from 'react-router-dom';
import { useResumeContext } from '../ResumeContext';

const ResumePreview: React.FC = () => {
    const { state } = useResumeContext();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Resume Preview</h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold">{state.resume.contactInfo.name}</h2>
                {/* Add more resume sections here */}
            </div>
            <div className="flex space-x-4">
                <Link to="/resume-generator/form" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit Resume
                </Link>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default ResumePreview;