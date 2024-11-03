import PDFDocument from 'pdfkit';
import { InvoiceData } from './helpers';

// A4 dimensions in points (72 points = 1 inch)
const PAGE = {
    WIDTH: 595.28,
    HEIGHT: 841.89,
    MARGIN: 50,
    get CONTENT_WIDTH() {
        return this.WIDTH - (this.MARGIN * 2);
    }
};

// Design system
const STYLE = {
    COLORS: {
        PRIMARY: '#1a1a1a',
        ACCENT: '#4338ca',
        GRAY: {
            LIGHTER: '#f9fafb',
            LIGHT: '#f3f4f6',
            MEDIUM: '#e5e7eb',
            DARK: '#4b5563'
        },
        TEXT: {
            PRIMARY: '#1a1a1a',
            SECONDARY: '#6b7280'
        }
    },
    FONTS: {
        REGULAR: 'Helvetica',
        BOLD: 'Helvetica-Bold'
    },
    FONT_SIZES: {
        XLARGE: 24,
        LARGE: 16,
        MEDIUM: 12,
        SMALL: 10
    },
    SPACING: {
        XSMALL: 5,
        SMALL: 10,
        MEDIUM: 20,
        LARGE: 30,
        XLARGE: 40
    }
};

// Table configuration
const TABLE = {
    COLUMNS: {
        ITEM: { flex: 2, label: 'Item' },
        DESCRIPTION: { flex: 3, label: 'Description' },
        QUANTITY: { flex: 1.2, label: 'Qty', align: 'center' },
        PRICE: { flex: 1.5, label: 'Price', align: 'right' },
        TOTAL: { flex: 1.5, label: 'Total', align: 'right' }
    },
    ROW_HEIGHT: 32,
    HEADER_HEIGHT: 36,
    CELL_PADDING: 8
};

class Grid {
    private currentY: number;
    private doc: PDFKit.PDFDocument;

    constructor(doc: PDFKit.PDFDocument, startY: number = PAGE.MARGIN) {
        this.doc = doc;
        this.currentY = startY;
    }

    addVerticalSpace(amount: number): void {
        this.currentY += amount;
    }

    getCurrentY(): number {
        return this.currentY;
    }

    setCurrentY(y: number): void {
        this.currentY = y;
    }

    // Enhanced table cell drawing
    drawTableCell(
        text: string,
        x: number,
        width: number,
        options: {
            align?: 'left' | 'right' | 'center',
            fontSize?: number,
            font?: string,
            color?: string,
            padding?: number
        } = {}
    ): void {
        const {
            align = 'left',
            fontSize = STYLE.FONT_SIZES.MEDIUM,
            font = STYLE.FONTS.REGULAR,
            color = STYLE.COLORS.TEXT.PRIMARY,
            padding = TABLE.CELL_PADDING
        } = options;

        this.doc
            .font(font)
            .fontSize(fontSize)
            .fillColor(color)
            .text(
                text,
                x + padding,
                this.currentY + (TABLE.ROW_HEIGHT - fontSize) / 2,
                {
                    width: width - (padding * 2),
                    align
                }
            );
    }

    // Draw a full table row with proper cells
    drawTableRow(
        contents: Array<{
            text: string,
            flex: number,
            align?: 'left' | 'right' | 'center'
        }>,
        options: {
            isHeader?: boolean,
            highlight?: boolean,
            font?: string
        } = {}
    ): void {
        const {
            isHeader = false,
            highlight = false,
            font = STYLE.FONTS.REGULAR
        } = options;

        const rowHeight = isHeader ? TABLE.HEADER_HEIGHT : TABLE.ROW_HEIGHT;
        const totalFlex = contents.reduce((sum, col) => sum + col.flex, 0);
        let currentX = PAGE.MARGIN;

        // Draw row background if highlighted
        if (highlight) {
            this.doc
                .fillColor(STYLE.COLORS.GRAY.LIGHTER)
                .rect(PAGE.MARGIN, this.currentY, PAGE.CONTENT_WIDTH, rowHeight)
                .fill();
        }

        // Draw cells
        contents.forEach(col => {
            const width = (PAGE.CONTENT_WIDTH * col.flex) / totalFlex;
            this.drawTableCell(col.text, currentX, width, {
                align: col.align,
                font: isHeader ? STYLE.FONTS.BOLD : font,
                fontSize: STYLE.FONT_SIZES.SMALL
            });
            currentX += width;
        });

        // Draw bottom border
        this.doc
            .strokeColor(STYLE.COLORS.GRAY.MEDIUM)
            .lineWidth(1)
            .moveTo(PAGE.MARGIN, this.currentY + rowHeight)
            .lineTo(PAGE.MARGIN + PAGE.CONTENT_WIDTH, this.currentY + rowHeight)
            .stroke();

        this.currentY += rowHeight;
    }

    drawSummaryRow(
        label: string,
        amount: string,
        options: {
            isBold?: boolean,
            isTotal?: boolean
        } = {}
    ): void {
        const { isBold = false, isTotal = false } = options;
        const font = isBold ? STYLE.FONTS.BOLD : STYLE.FONTS.REGULAR;
        const rowHeight = STYLE.SPACING.MEDIUM;

        if (isTotal) {
            this.addVerticalSpace(STYLE.SPACING.SMALL);
            // Draw line above total
            this.doc
                .strokeColor(STYLE.COLORS.GRAY.MEDIUM)
                .lineWidth(1)
                .moveTo(PAGE.WIDTH - PAGE.MARGIN - 250, this.currentY)
                .lineTo(PAGE.WIDTH - PAGE.MARGIN, this.currentY)
                .stroke();
            this.addVerticalSpace(STYLE.SPACING.SMALL);
        }

        this.doc
            .font(font)
            .fontSize(STYLE.FONT_SIZES.SMALL)
            .fillColor(STYLE.COLORS.TEXT.PRIMARY);

        // Label
        this.doc.text(
            label,
            PAGE.WIDTH - PAGE.MARGIN - 250,
            this.currentY,
            { width: 150, align: 'right' }
        );

        // Amount
        this.doc.text(
            amount,
            PAGE.WIDTH - PAGE.MARGIN - 100,
            this.currentY,
            { width: 100, align: 'right' }
        );

        this.currentY += rowHeight;
    }
}

class ModernInvoice {
    private doc: PDFKit.PDFDocument;
    private grid: Grid;
    private data: InvoiceData;

    constructor(doc: PDFKit.PDFDocument, data: InvoiceData) {
        this.doc = doc;
        this.data = data;
        this.grid = new Grid(doc);
    }

    private drawHeader(): void {
        // Invoice title
        this.doc
            .font(STYLE.FONTS.BOLD)
            .fontSize(STYLE.FONT_SIZES.XLARGE)
            .fillColor(STYLE.COLORS.PRIMARY)
            .text('INVOICE', PAGE.MARGIN, this.grid.getCurrentY());

        // Invoice details
        this.doc
            .font(STYLE.FONTS.REGULAR)
            .fontSize(STYLE.FONT_SIZES.SMALL)
            .fillColor(STYLE.COLORS.TEXT.SECONDARY)
            .text(
                `#${this.data.invoiceNumber}\nDate: ${this.data.currentDate}\nDue: ${this.data.dueDate}`,
                PAGE.WIDTH - PAGE.MARGIN - 150,
                this.grid.getCurrentY(),
                { align: 'right' }
            );

        this.grid.addVerticalSpace(STYLE.SPACING.XLARGE);
    }

    private drawAddressSection(): void {
        const addressY = this.grid.getCurrentY();

        // Bill From
        this.doc
            .font(STYLE.FONTS.BOLD)
            .fontSize(STYLE.FONT_SIZES.MEDIUM)
            .fillColor(STYLE.COLORS.PRIMARY)
            .text('Bill From', PAGE.MARGIN, addressY);

        this.doc
            .font(STYLE.FONTS.REGULAR)
            .fontSize(STYLE.FONT_SIZES.SMALL)
            .fillColor(STYLE.COLORS.TEXT.SECONDARY)
            .text(
                `${this.data.billFrom.name}\n${this.data.billFrom.email}`,
                PAGE.MARGIN,
                addressY + STYLE.SPACING.SMALL + 5
            );

        // Bill To
        this.doc
            .font(STYLE.FONTS.BOLD)
            .fontSize(STYLE.FONT_SIZES.MEDIUM)
            .fillColor(STYLE.COLORS.PRIMARY)
            .text('Bill To', PAGE.WIDTH / 2, addressY);

        this.doc
            .font(STYLE.FONTS.REGULAR)
            .fontSize(STYLE.FONT_SIZES.SMALL)
            .fillColor(STYLE.COLORS.TEXT.SECONDARY)
            .text(
                `${this.data.billTo.name}\n${this.data.billTo.email}`,
                PAGE.WIDTH / 2,
                addressY + STYLE.SPACING.SMALL + 5
            );

        this.grid.setCurrentY(addressY + STYLE.SPACING.XLARGE + 20);
    }

    private drawItemsTable(): number {
        // Draw table header
        this.grid.drawTableRow(
            Object.values(TABLE.COLUMNS).map(col => ({
                text: col.label,
                flex: col.flex,
                align: 'center'
            })),
            { isHeader: true }
        );

        // Draw table rows
        let subtotal = 0;
        this.data.items.forEach((item, index) => {
            const total = item.quantity * item.price;
            subtotal += total;

            this.grid.drawTableRow([
                { text: item.name, flex: TABLE.COLUMNS.ITEM.flex },
                { text: item.description || '', flex: TABLE.COLUMNS.DESCRIPTION.flex },
                {
                    text: item.quantity.toString(),
                    flex: TABLE.COLUMNS.QUANTITY.flex,
                    align: 'center'
                },
                {
                    text: `${this.data.currencySymbol}${item.price.toFixed(2)}`,
                    flex: TABLE.COLUMNS.PRICE.flex,
                    align: 'right'
                },
                {
                    text: `${this.data.currencySymbol}${total.toFixed(2)}`,
                    flex: TABLE.COLUMNS.TOTAL.flex,
                    align: 'right'
                }
            ], {
                highlight: index % 2 === 0
            });
        });

        return subtotal;
    }

    private drawSummary(subtotal: number): void {
        const taxAmount = subtotal * (this.data.taxRate / 100);
        const discountAmount = subtotal * (this.data.discountRate / 100);
        const total = subtotal + taxAmount - discountAmount;

        this.grid.addVerticalSpace(STYLE.SPACING.MEDIUM);

        // Summary items
        this.grid.drawSummaryRow('Subtotal:', `${this.data.currencySymbol}${subtotal.toFixed(2)}`);
        this.grid.drawSummaryRow(`Tax (${this.data.taxRate}%):`, `${this.data.currencySymbol}${taxAmount.toFixed(2)}`);
        this.grid.drawSummaryRow(`Discount (${this.data.discountRate}%):`, `${this.data.currencySymbol}${discountAmount.toFixed(2)}`);
        this.grid.drawSummaryRow('Total:', `${this.data.currencySymbol}${total.toFixed(2)}`, { isBold: true, isTotal: true });
    }

    private drawNotes(): void {
        if (this.data.notes) {
            this.grid.addVerticalSpace(STYLE.SPACING.LARGE);

            this.doc
                .font(STYLE.FONTS.BOLD)
                .fontSize(STYLE.FONT_SIZES.MEDIUM)
                .fillColor(STYLE.COLORS.PRIMARY)
                .text('Notes:', PAGE.MARGIN, this.grid.getCurrentY());

            this.grid.addVerticalSpace(STYLE.SPACING.SMALL);

            this.doc
                .font(STYLE.FONTS.REGULAR)
                .fontSize(STYLE.FONT_SIZES.SMALL)
                .fillColor(STYLE.COLORS.TEXT.SECONDARY)
                .text(this.data.notes, PAGE.MARGIN, this.grid.getCurrentY(), {
                    width: PAGE.CONTENT_WIDTH
                });
        }
    }

    generatePDF(): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            try {
                const chunks: Buffer[] = [];
                this.doc.on('data', chunk => chunks.push(chunk));
                this.doc.on('end', () => resolve(Buffer.concat(chunks)));

                this.drawHeader();
                this.drawAddressSection();
                const subtotal = this.drawItemsTable();
                this.drawSummary(subtotal);
                this.drawNotes();

                this.doc.end();
            } catch (error) {
                reject(error);
            }
        });
    }
}

export const generateInvoicePDF = async (data: InvoiceData): Promise<Buffer> => {
    const doc = new PDFDocument({
        size: 'A4',
        margin: PAGE.MARGIN,
        bufferPages: true
    });

    const invoice = new ModernInvoice(doc, data);
    return invoice.generatePDF();
};