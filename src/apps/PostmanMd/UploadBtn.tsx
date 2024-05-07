import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import React, { useRef } from 'react';

interface Props {
    handleFileName: React.Dispatch<React.SetStateAction<string>>
    handleFileContent: React.Dispatch<React.SetStateAction<string>>
}

const InputFileUpload: React.FC<Props> = ({ handleFileName, handleFileContent }) => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            // Check if the file is a JSON file based on its MIME type or extension
            if (file.type === "application/json" || file.name.endsWith('.json')) {
                console.log("Valid JSON file selected");
                handleFileName(file.name);
                // Read the file content as text
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    if (e.target && typeof e.target.result === 'string') {
                        handleFileContent(e.target.result);
                    }
                };
                reader.readAsText(file);
            } else {
                alert("Please select a valid JSON file.");
                event.target.value = ""; // Reset the file input
            }
        }
    };


    return (
        <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color="neutral"
            startDecorator={
                <SvgIcon>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        />
                    </svg>
                </SvgIcon>
            }
        >
            Upload a file
            <VisuallyHiddenInput
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
            />
        </Button>
    );
}

export default InputFileUpload;

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
