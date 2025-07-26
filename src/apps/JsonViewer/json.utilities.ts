export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

// Format JSON with proper indentation
export const formatJson = (json: string): string => {
    try {
        const parsed = JSON.parse(json);
        return JSON.stringify(parsed, null, 2);
    } catch (error) {
        return json; // Return original if parsing fails
    }
};

// Convert JSON to XML
export const jsonToXml = (obj: JsonValue, rootName: string = 'root'): string => {
    const convertValue = (value: JsonValue, key: string): string => {
        if (value === null) {
            return `<${key}>null</${key}>`;
        }

        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                return value.map((item, index) =>
                    convertValue(item, `${key}_${index}`)
                ).join('\n');
            } else {
                const entries = Object.entries(value);
                const content = entries.map(([k, v]) => convertValue(v, k)).join('\n');
                return `<${key}>\n${content}\n</${key}>`;
            }
        }

        // Primitive values
        return `<${key}>${String(value)}</${key}>`;
    };

    if (obj === null) {
        return `<${rootName}>null</${rootName}>`;
    }

    if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
            const items = obj.map((item, index) =>
                convertValue(item, `item_${index}`)
            ).join('\n');
            return `<${rootName}>\n${items}\n</${rootName}>`;
        } else {
            const entries = Object.entries(obj);
            const content = entries.map(([key, value]) => convertValue(value, key)).join('\n');
            return `<${rootName}>\n${content}\n</${rootName}>`;
        }
    }

    return `<${rootName}>${String(obj)}</${rootName}>`;
};

// Download file utility
export const downloadFile = (content: string, filename: string, contentType: string = 'application/json') => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

// Get object/array metadata
export const getMetadata = (value: JsonValue): string => {
    if (value === null || typeof value !== 'object') {
        return '';
    }

    if (Array.isArray(value)) {
        return `[${value.length}]`;
    } else {
        return `{${Object.keys(value).length}}`;
    }
};