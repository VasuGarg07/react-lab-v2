import React, { useState } from 'react';
import { Box, Button, LinearProgress, Stack, Typography } from '@mui/joy';
import InputFileUpload from './UploadBtn';
import { ErrorMessage } from '../../components/ErrorMessage';
import axios from 'axios';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight'
import { ArrowRightToLine } from 'lucide-react';

const generateMarkdown = async (json: string): Promise<string> => {
    const url = 'https://postman-documentation.onrender.com/api/json_to_markdown';
    const body = JSON.parse(json);
    const response = await axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data.markdown;
}


const PostmanMd: React.FC = () => {

    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState('');

    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmitFile = async () => {
        if (!fileContent) {
            setError('Collection Not Found. Please upload JSON');
            return;
        }

        try {
            setLoading(true);
            setError('');
            const data = await generateMarkdown(fileContent);
            console.log(data);
            setResult(data);
        } catch (error) {
            console.error(error)
            setError(`Something Went Wrong`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            sx={{
                p: { md: 4, xs: 2 },
                minHeight: 'calc(100vh - 53px)',
            }}>

            <Typography
                fontFamily={'Kanit'}
                letterSpacing={1.5}
                level="h1"
                children="POSTMAN to MARKDOWN"
                textAlign='center'
                sx={{ mb: 2 }}
            />
            <Stack direction='row' spacing={2}
                alignItems='center'
                justifyContent='space-between'
                sx={{ width: 1, maxWidth: 800, mx: 'auto', mb: 2 }}>
                {
                    fileContent && fileName
                        ? <>
                            <Typography level='h4'>{fileName}</Typography>
                            <Button
                                color="primary"
                                onClick={handleSubmitFile}
                                disabled={loading}
                                endDecorator={<ArrowRightToLine />}>
                                Convert to Markdown
                            </Button>
                        </>
                        : <>
                            <Typography level='h4'>No File Selected</Typography>
                            <InputFileUpload handleFileName={setFileName} handleFileContent={setFileContent} />
                        </>
                }
            </Stack>

            {loading && <LinearProgress />}
            {error && <ErrorMessage message={error} />}
            {result && <Markdown rehypePlugins={[rehypeHighlight]}>{result}</Markdown>}
        </Box>
    )
}

export default PostmanMd