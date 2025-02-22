
import React, { useState } from 'react';
import { Box, Button, Textarea, Typography, Modal, ModalDialog, ModalClose } from '@mui/joy';
import { ResumeModel } from '@/apps/ResumeGen/helpers/interfaces';

interface JDComparatorProps {
    resume: ResumeModel;
    isOpen: boolean;
    onClose: () => void;
}

const JDComparator: React.FC<JDComparatorProps> = ({ resume, isOpen, onClose }) => {
    const [jobDescription, setJobDescription] = useState<string>('');
    const [result, setResult] = useState<string | null>(null);

    const extractKeywords = (jd: string): string[] => {
        // Simple keyword extraction (can be enhanced)
        return jd.split(/\W+/).filter(word => word.length > 2); // Remove short words
    };

    const compareWithResume = () => {
        const jdKeywords = extractKeywords(jobDescription);
        let feedback = 'Job Description Keywords Matched with Resume: \n';

        const matchedSkills = jdKeywords.filter((keyword) =>
            resume.technicalSkills.some(skill => skill.skills.includes(keyword))
        );
        feedback += `Matched Skills: ${matchedSkills.join(', ')}\n`;

        // Similarly, match other sections (work experience, education) if needed
        if (matchedSkills.length === 0) {
            feedback += 'No relevant skills found in resume matching the JD.\n';
        }

        setResult(feedback);
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <ModalDialog>
                <ModalClose />
                <Typography level="h4">JD Comparator</Typography>
                <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste Job Description here"
                    minRows={6}
                    sx={{ my: 2 }}
                />
                <Button onClick={compareWithResume}>Run JD Comparison</Button>

                {result && (
                    <Box sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
                        <Typography level="body-lg">{result}</Typography>
                    </Box>
                )}
            </ModalDialog>
        </Modal>
    );
};

export default JDComparator;
