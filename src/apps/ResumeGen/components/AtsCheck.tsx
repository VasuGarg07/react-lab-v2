import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemDecorator, Chip, CircularProgress, Card, CardContent, Modal, ModalDialog, ModalClose } from '@mui/joy';
import { Check, X, AlertTriangle } from 'lucide-react';
import { ResumeModel } from '@/apps/ResumeGen/helpers/interfaces';

interface ATSCheckProps {
  resume: ResumeModel;
  isOpen: boolean;
  onClose: () => void;
}

interface CheckResult {
  message: string;
  status: 'pass' | 'warning' | 'fail';
}

const ATSCheck: React.FC<ATSCheckProps> = ({ resume, isOpen, onClose }) => {
  const [results, setResults] = useState<CheckResult[]>([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate processing time
    // setTimeout(() => {
    const checkResults = performATSCheck(resume);
    setResults(checkResults);
    setScore(calculateScore(checkResults));
    setIsLoading(false);
    // }, 1500);
  }, [resume]);

  const performATSCheck = (resume: ResumeModel): CheckResult[] => {
    const checks: CheckResult[] = [];

    checkContactInfo(resume.contactInfo, checks);
    checkProfile(resume.profile, checks)
    checkTechnicalSkills(resume.technicalSkills, checks);
    checkWorkExperience(resume.workExperience, checks);
    checkEducation(resume.education, checks);
    checkProjects(resume.projects, checks);
    checkAchievements(resume.achievements, checks);

    return checks;
  };

  const checkContactInfo = (contactInfo: ResumeModel['contactInfo'], checks: CheckResult[]) => {
    const requiredFields: (keyof ResumeModel['contactInfo'])[] = ['name', 'title', 'phone', 'email', 'location'];
    const missingFields = requiredFields.filter(field => !contactInfo[field]);

    if (missingFields.length === 0) {
      checks.push({ message: "All required contact information is present", status: 'pass' });
    } else {
      missingFields.forEach(field => {
        checks.push({ message: `Missing ${field} in contact information`, status: 'fail' });
      });
    }

    if (contactInfo.linkedIn) {
      checks.push({ message: "LinkedIn profile URL is provided", status: 'pass' });
    } else {
      checks.push({ message: "Consider adding a LinkedIn profile URL", status: 'warning' });
    }

    if (contactInfo.github) {
      checks.push({ message: "GitHub profile URL is provided", status: 'pass' });
    } else {
      checks.push({ message: "Consider adding a GitHub profile URL for tech roles", status: 'warning' });
    }
  };

  const checkProfile = (profile: string, checks: CheckResult[]) => {
    if (profile && profile.split(' ').length >= 50) {
      checks.push({ message: "Profile summary is of good length", status: 'pass' });
    } else if (!profile || profile.split(' ').length < 50) {
      checks.push({ message: "Profile summary is too short (aim for 50-200 words)", status: 'warning' });
    }
  };

  const checkTechnicalSkills = (skills: ResumeModel['technicalSkills'], checks: CheckResult[]) => {
    if (skills.length === 0) {
      checks.push({ message: "No technical skills listed", status: 'fail' });
    } else {
      checks.push({ message: "Technical skills are listed", status: 'pass' });
      skills.forEach((skillCategory) => {
        if (skillCategory.skills.length >= 3) {
          checks.push({ message: `Good number of skills in the "${skillCategory.category}" category`, status: 'pass' });
        } else {
          checks.push({ message: `Consider adding more skills to the "${skillCategory.category}" category`, status: 'warning' });
        }
      });
    }
  };

  const checkWorkExperience = (experience: ResumeModel['workExperience'], checks: CheckResult[]) => {
    if (experience.length === 0) {
      checks.push({ message: "No work experience listed", status: 'fail' });
    } else {
      checks.push({ message: "Work experience is listed", status: 'pass' });
      experience.forEach((job, index) => {
        if (job.title && job.company && job.location && job.startDate && job.endDate) {
          checks.push({ message: `Work experience #${index + 1} has all required details`, status: 'pass' });
        } else {
          checks.push({ message: `Missing important details in work experience #${index + 1}`, status: 'fail' });
        }
        if (job.highlights && job.highlights.length >= 3) {
          checks.push({ message: `Good number of highlights for ${job.title} at ${job.company}`, status: 'pass' });
        } else {
          checks.push({ message: `Add more highlights (aim for 3-5) for ${job.title} at ${job.company}`, status: 'warning' });
        }
      });
    }
  };

  const checkEducation = (education: ResumeModel['education'], checks: CheckResult[]) => {
    if (education.length === 0) {
      checks.push({ message: "No education history listed", status: 'fail' });
    } else {
      checks.push({ message: "Education history is listed", status: 'pass' });
      education.forEach((edu, index) => {
        if (edu.institution && edu.degree && edu.fieldOfStudy && edu.graduationYear) {
          checks.push({ message: `Education #${index + 1} has all required details`, status: 'pass' });
        } else {
          checks.push({ message: `Missing important details in education #${index + 1}`, status: 'fail' });
        }
      });
    }
  };

  const checkProjects = (projects: ResumeModel['projects'], checks: CheckResult[]) => {
    if (!projects?.length) {
      checks.push({ message: "Consider adding projects to showcase your skills", status: 'warning' });
    } else {
      checks.push({ message: "Projects are listed to showcase skills", status: 'pass' });
      projects.forEach((project, index) => {
        if (project.name && project.description && project.technologies.length > 0) {
          checks.push({ message: `Project #${index + 1} has all important details`, status: 'pass' });
        } else {
          checks.push({ message: `Missing important details in project #${index + 1}`, status: 'warning' });
        }
      });
    }
  };

  const checkAchievements = (achievements: ResumeModel['achievements'], checks: CheckResult[]) => {
    if (!achievements?.length) {
      checks.push({ message: "Consider adding achievements to stand out", status: 'warning' });
    } else {
      checks.push({ message: "Achievements are listed to help you stand out", status: 'pass' });
      achievements.forEach((achievement, index) => {
        if (achievement.title && achievement.description && achievement.date) {
          checks.push({ message: `Achievement #${index + 1} has all important details`, status: 'pass' });
        } else {
          checks.push({ message: `Missing important details in achievement #${index + 1}`, status: 'warning' });
        }
      });
    }
  };

  const calculateScore = (results: CheckResult[]): number => {
    const totalChecks = results.length;
    const passedChecks = results.filter(r => r.status === 'pass').length;
    const warningChecks = results.filter(r => r.status === 'warning').length;
    return Math.round(((passedChecks + (warningChecks * 0.5)) / totalChecks) * 100);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <Card>
          <CardContent>
            <Typography level="h4" gutterBottom>
              ATS Compatibility Score: {score}%
            </Typography>
            <List>
              {results.map((result, index) => (
                <ListItem key={index}>
                  <ListItemDecorator>
                    {result.status === 'pass' && <Check color="green" />}
                    {result.status === 'warning' && <AlertTriangle color="orange" />}
                    {result.status === 'fail' && <X color="red" />}
                  </ListItemDecorator>
                  <Typography>
                    {result.message}
                  </Typography>
                  <Chip
                    size="sm"
                    variant="soft"
                    color={result.status === 'pass' ? 'success' : result.status === 'warning' ? 'warning' : 'danger'}
                  >
                    {result.status}
                  </Chip>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </ModalDialog>
    </Modal>
  );
};

export default ATSCheck;