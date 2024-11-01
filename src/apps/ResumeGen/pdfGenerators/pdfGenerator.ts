import jsPDF from 'jspdf';
import { ResumeModel } from '../helpers/interfaces';
import { templateConfigs } from './templateConfigs';
import { TemplateName, TextAlignment } from './types';

export class PDFGenerator {
    private doc: jsPDF;
    private config: typeof templateConfigs[TemplateName];
    private resume: ResumeModel;
    private pageWidth: number;
    private pageHeight: number;
    private currentY: number;

    constructor(resume: ResumeModel, templateName: TemplateName) {
        this.doc = new jsPDF({
            orientation: 'portrait',
            unit: 'pt' // Use points for more precise control
        });
        this.config = templateConfigs[templateName];
        this.resume = resume;
        this.pageWidth = this.doc.internal.pageSize.getWidth();
        this.pageHeight = this.doc.internal.pageSize.getHeight();
        this.currentY = this.config.spacing.margin;

        // Ensure proper font embedding
        this.doc.setFont('helvetica');
    }

    private addText(
        text: string,
        {
            x = this.config.spacing.margin,
            fontSize = this.config.fonts.sizes.normal,
            color = this.config.colors.text,
            align = 'left' as TextAlignment,
            bold = false,
            marginBottom = 0
        }: {
            x?: number;
            fontSize?: number;
            color?: string;
            align?: TextAlignment;
            bold?: boolean;
            marginBottom?: number;
        }
    ): void {
        // Set text properties
        this.doc.setFontSize(fontSize);
        this.doc.setTextColor(color);
        this.doc.setFont('helvetica', bold ? 'bold' : 'normal');

        const maxWidth = this.pageWidth - (2 * this.config.spacing.margin);

        // Handle multi-line text properly
        const lines = this.doc.splitTextToSize(text, maxWidth);

        // Calculate positions
        let xPos = x;
        if (align === 'center') {
            xPos = this.pageWidth / 2;
        } else if (align === 'right') {
            xPos = this.pageWidth - this.config.spacing.margin;
        }

        // Calculate line height
        const lineHeight = fontSize * 1.15; // 1.15 is a standard line-height multiplier

        // Check for page break
        const totalHeight = lines.length * lineHeight;
        if (this.currentY + totalHeight > this.pageHeight - this.config.spacing.margin) {
            this.doc.addPage();
            this.currentY = this.config.spacing.margin;
        }

        // Add text line by line to ensure proper rendering
        lines.forEach((line: string) => {
            this.doc.text(line, xPos, this.currentY, {
                align: align,
                maxWidth: maxWidth
            });
            this.currentY += lineHeight;
        });

        this.currentY += marginBottom;
    }

    private addSection(title: string, content: () => void): void {
        // Add section title
        this.addText(title.toUpperCase(), {
            fontSize: this.config.fonts.sizes.sectionTitle,
            color: this.config.colors.primary,
            bold: true,
            marginBottom: 10
        });

        // Add content
        content();

        // Add section spacing
        this.currentY += this.config.spacing.sectionGap;
    }

    private generateHeader(): void {
        // Name
        this.addText(this.resume.contactInfo.name, {
            fontSize: this.config.fonts.sizes.name,
            color: this.config.colors.primary,
            align: 'center',
            bold: true,
            marginBottom: 5
        });

        // Title
        this.addText(this.resume.contactInfo.title, {
            fontSize: this.config.fonts.sizes.title,
            color: this.config.colors.secondary,
            align: 'center',
            marginBottom: 10
        });

        // Contact Information
        const contactInfo = [
            this.resume.contactInfo.email,
            this.resume.contactInfo.phone,
            this.resume.contactInfo.location
        ].join(' • ');

        this.addText(contactInfo, {
            fontSize: this.config.fonts.sizes.small,
            align: 'center',
            marginBottom: 5
        });

        // Links
        const links = [
            this.resume.contactInfo.linkedIn,
            this.resume.contactInfo.github
        ].filter(Boolean).join(' • ');

        if (links) {
            this.addText(links, {
                fontSize: this.config.fonts.sizes.small,
                align: 'center',
                marginBottom: 20
            });
        }
    }

    public generate(): void {
        // Generate Header
        this.generateHeader();

        // Professional Summary
        if (this.resume.profile) {
            this.addSection('Professional Summary', () => {
                this.addText(this.resume.profile, {
                    fontSize: this.config.fonts.sizes.small,
                    align: 'justify',
                    marginBottom: 8
                });
            });
        }

        // Experience
        this.addSection('Professional Experience', () => {
            this.resume.workExperience.forEach((job) => {
                this.addText(`${job.title} | ${job.company}`, {
                    bold: true,
                    marginBottom: 5
                });
                this.addText(`${job.location} | ${job.startDate} - ${job.endDate}`, {
                    fontSize: this.config.fonts.sizes.small,
                    marginBottom: 5
                });
                job.highlights.forEach((highlight) => {
                    this.addText(`• ${highlight}`, {
                        marginBottom: 3,
                        x: this.config.spacing.margin + 15 // Indent bullet points
                    });
                });
                this.currentY += 10; // Add space between jobs
            });
        });

        // Education
        this.addSection('Education', () => {
            this.resume.education.forEach((edu) => {
                this.addText(`${edu.degree} in ${edu.fieldOfStudy}`, {
                    bold: true,
                    marginBottom: 5
                });
                this.addText(`${edu.institution} | ${edu.graduationYear}`, {
                    fontSize: this.config.fonts.sizes.small,
                    marginBottom: 10
                });
            });
        });

        // Technical Skills
        this.addSection('Technical Skills', () => {
            this.resume.technicalSkills.forEach((skillCategory) => {
                this.addText(`${skillCategory.category}: ${skillCategory.skills.join(', ')}`, {
                    marginBottom: 5
                });
            });
        });

        // Save the PDF
        const filename = `${this.resume.contactInfo.name.replace(/\s+/g, '_')}_resume.pdf`;
        this.doc.save(filename);
    }
}

export const generateResumePDF = (resume: ResumeModel, templateName: TemplateName): void => {
    const generator = new PDFGenerator(resume, templateName);
    generator.generate();
};

export default generateResumePDF;