import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Input from "@mui/joy/Input";
import { X } from "lucide-react";

interface TagInputProps {
    value: string[];
    onChange: (values: string[]) => void;
    onInputChange: (value: string) => void;
    inputValue: string;
    maxTags?: number;
    placeholder?: string;
}

const TagsListInput: React.FC<TagInputProps> = ({
    value,
    onChange,
    onInputChange,
    inputValue,
    maxTags = 20,
    placeholder
}) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            if (inputValue.trim() && value.length < maxTags) {
                if (!value.includes(inputValue.trim())) {
                    onChange([...value, inputValue.trim()]);
                    onInputChange('');
                }
            }
        }
    };

    const handleDelete = (tagToDelete: string) => {
        onChange(value.filter((tag) => tag !== tagToDelete));
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1.5 }}>
                {value.map((tag) => (
                    <Chip
                        key={tag}
                        variant="soft"
                        color="primary"
                        onClick={() => handleDelete(tag)}
                        endDecorator={<X size={16} />}
                        sx={{ '--Chip-decoratorChildHeight': '24px' }}
                    >
                        {tag}
                    </Chip>
                ))}
            </Box>
            <Input
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={value.length < maxTags ? placeholder : `Maximum ${maxTags} tags reached`}
                disabled={value.length >= maxTags}
            />
        </Box>
    );
};

export default TagsListInput;