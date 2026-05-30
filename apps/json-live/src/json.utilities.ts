export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

export const formatJson = (json: string): string => {
    try {
        return JSON.stringify(JSON.parse(json), null, 2);
    } catch {
        return json;
    }
};

export const jsonToXml = (obj: JsonValue, rootName: string = 'root'): string => {
    const convertValue = (value: JsonValue, key: string): string => {
        if (value === null) return `<${key}>null</${key}>`;

        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                return value.map((item, i) => convertValue(item, `${key}_${i}`)).join('\n');
            }
            const content = Object.entries(value).map(([k, v]) => convertValue(v, k)).join('\n');
            return `<${key}>\n${content}\n</${key}>`;
        }

        return `<${key}>${String(value)}</${key}>`;
    };

    if (obj === null) return `<${rootName}>null</${rootName}>`;

    if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
            const items = obj.map((item, i) => convertValue(item, `item_${i}`)).join('\n');
            return `<${rootName}>\n${items}\n</${rootName}>`;
        }
        const content = Object.entries(obj).map(([k, v]) => convertValue(v, k)).join('\n');
        return `<${rootName}>\n${content}\n</${rootName}>`;
    }

    return `<${rootName}>${String(obj)}</${rootName}>`;
};

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

export const getMetadata = (value: JsonValue): string => {
    if (value === null || typeof value !== 'object') return '';
    return Array.isArray(value) ? `[${value.length}]` : `{${Object.keys(value).length}}`;
};
