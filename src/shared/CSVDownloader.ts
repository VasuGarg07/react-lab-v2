export class CSVDownloader<T extends object> {
    private data: T[];
    private csvContent: string = '';

    constructor(data: T[]) {
        this.data = data;
    }

    private getHeaders(): string[] {
        if (this.data.length === 0) return [];
        return Object.keys(this.data[0] as object);
    }

    private formatValue(value: any): string {
        if (value === null || value === undefined) return '';

        // Handle special cases
        if (value instanceof Date) {
            return value.toISOString().split('T')[0];
        }

        // Convert to string and escape quotes
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
        }

        return stringValue;
    }

    parseData(): void {
        const headers = this.getHeaders();
        if (headers.length === 0) {
            throw new Error('No data to parse');
        }

        // Add headers
        this.csvContent = headers.join(',') + '\n';

        // Add data rows
        this.data.forEach((item) => {
            const row = headers
                .map((header) => this.formatValue(item[header as keyof T]))
                .join(',');
            this.csvContent += row + '\n';
        });
    }

    download(filename: string): void {
        if (!this.csvContent) {
            throw new Error('No data parsed. Call parseData() first');
        }

        // Create a Blob with the CSV content
        const blob = new Blob([this.csvContent], { type: 'text/csv;charset=utf-8;' });

        // Create download link
        const link = document.createElement('a');
        if (link.download !== undefined) {
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `${filename}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }
}
