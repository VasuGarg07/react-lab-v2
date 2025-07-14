import { useAuth } from '@/auth/AuthProvider';
import { toastService } from '@/shared/toastr';
import AlertDialog from '@/ui/AlertDialog';
import Dialog from '@/ui/Dialog';
import {
    Archive,
    ArrowRight,
    CheckCircle,
    Copy,
    Layers,
    Plus,
    Share2,
    Sparkles,
    Zap
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import FormCard from '../components/form-render/FormCard';
import { Form } from '../helpers/fb.types';
import {
    getUserForms,
    deleteForm,
    duplicateForm,
    toggleFormStatus,
} from '../helpers/fb.service';
import { useFormActions } from '../helpers/useFormEngine';
import { FileUtils } from '../helpers/fb.utils';

const welcomeFeatures = [
    {
        icon: <Layers className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
        title: 'Multi-step forms',
        description: 'Create up to 6 steps with organized sections'
    },
    {
        icon: <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />,
        title: '6 field types',
        description: 'Text, Number, Select, Boolean, Range & more'
    },
    {
        icon: <Zap className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
        title: 'Smart validation',
        description: 'Built-in validation rules and custom patterns'
    },
    {
        icon: <Share2 className="w-5 h-5 text-orange-500 dark:text-orange-400" />,
        title: 'Share & collect',
        description: 'Get shareable links and collect responses'
    }
];


const FormDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { createForm } = useFormActions();

    // State management
    const [forms, setForms] = useState<Form[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [shareUrl, setShareUrl] = useState('');

    // Fetch user forms
    const fetchForms = async () => {
        try {
            setLoading(true);
            setError(null);
            const userForms = await getUserForms();
            setForms(userForms);
        } catch (err) {
            console.error('Error fetching forms:', err);
            setError('Failed to load forms. Please try again.');
            toastService.error('Failed to load forms');
        } finally {
            setLoading(false);
        }
    };

    // Form actions
    const handleCreateNewForm = async () => {
        try {
            setIsCreating(true);
            createForm('Untitled Form', '');
            navigate('/builder');
        } catch (err) {
            console.error('Error creating form:', err);
            toastService.error('Failed to create form');
        } finally {
            setIsCreating(false);
        }
    };

    const handleEditForm = (formId: string) => {
        navigate(`/formlyst/builder/${formId}`);
    };

    const handleViewResponses = (formId: string) => {
        navigate(`/formlyst/${formId}/responses`);
    };

    const handleShareForm = (shareUrl: string) => {
        const url = FileUtils.generateShareUrl(shareUrl);
        setShareUrl(url);
        setShareDialogOpen(true);
    };

    const handleCopyShareUrl = () => {
        navigator.clipboard.writeText(shareUrl);
        toastService.success('Share URL copied to clipboard!');
        setShareDialogOpen(false);
    };

    const handleDeleteForm = async (formId: string) => {
        try {
            await deleteForm(formId);
            setForms(forms.filter(form => form.id !== formId));
            toastService.success('Form deleted successfully');
        } catch (err) {
            console.error('Error deleting form:', err);
            toastService.error('Failed to delete form');
        }
    };

    const handleToggleStatus = async (formId: string) => {
        try {
            const updatedForm = await toggleFormStatus(formId);
            setForms(forms.map(form =>
                form.id === formId ? updatedForm : form
            ));
            toastService.success(`Form ${updatedForm.isActive ? 'activated' : 'archived'} successfully`);
        } catch (err) {
            console.error('Error toggling form status:', err);
            toastService.error('Failed to update form status');
        }
    };

    const handleDuplicate = async (formId: string) => {
        try {
            const duplicatedForm = await duplicateForm(formId);
            setForms([duplicatedForm, ...forms]);
            toastService.success('Form duplicated successfully');
        } catch (err) {
            console.error('Error duplicating form:', err);
            toastService.error('Failed to duplicate form');
        }
    };

    const handleExport = (formId: string) => {
        const form = forms.find(f => f.id === formId);
        if (form) {
            const { id, shareUrl, isActive, createdBy, createdAt, updatedAt, responseCount, ...config } = form;
            FileUtils.saveJson(`${form.title.replace(/\s+/g, '_')}_config`, config);
            toastService.success('Form configuration exported');
        }
    };

    // Load forms on component mount
    useEffect(() => {
        fetchForms();
    }, []);

    const hasNoForms = forms.length === 0 && !loading;
    const hasNoFilteredForms = forms.length === 0 && !loading;

    if (loading) {
        return (
            <div className="relative min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your forms...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                    <button
                        onClick={fetchForms}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative px-4 py-6 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Section */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {hasNoForms ? 'Welcome to Formlyst! 👋' : `Welcome back, ${user?.username}! 🎉`}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {hasNoForms ? 'Create beautiful, multi-step forms in minutes' : 'Manage your forms and track responses'}
                    </p>
                </div>

                {/* Create Form CTA */}
                <div className="mb-8 flex justify-center">
                    <button
                        onClick={handleCreateNewForm}
                        disabled={isCreating}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isCreating ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                Creating...
                            </>
                        ) : hasNoForms ? (
                            <>
                                <Sparkles className="w-5 h-5 mr-2" />
                                Create Your First Form
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                        ) : (
                            <>
                                <Plus className="w-5 h-5 mr-2" />
                                Create New Form
                            </>
                        )}
                    </button>
                </div>

                {/* Welcome Features */}
                {hasNoForms && (
                    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-6">
                            What you can build:
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {welcomeFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                                    <div className="flex-shrink-0 mt-1">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Forms Management Section */}
                {!hasNoForms && (
                    <>


                        {/* Forms Grid */}
                        {hasNoFilteredForms ? (
                            <div className="text-center py-12">
                                <Archive className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                    No forms found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    No forms available yet
                                </p>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center flex-wrap gap-6">
                                {forms.map((form) => (
                                    <FormCard
                                        key={form.id}
                                        form={form}
                                        onEdit={handleEditForm}
                                        onViewResponses={handleViewResponses}
                                        onShare={() => handleShareForm(form.shareUrl)}
                                        onDelete={(formId) => (
                                            <AlertDialog
                                                trigger={<span>Delete</span>}
                                                title="Delete Form"
                                                message="Are you sure you want to delete this form? This action cannot be undone and will permanently remove all form data and responses."
                                                onConfirm={() => handleDeleteForm(formId)}
                                                confirmLabel="Delete"
                                                cancelLabel="Cancel"
                                            />
                                        )}
                                        onToggleStatus={handleToggleStatus}
                                        onDuplicate={handleDuplicate}
                                        onExport={handleExport}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Share Dialog */}
                <Dialog
                    open={shareDialogOpen}
                    onClose={setShareDialogOpen}
                    title="Share Form"
                    size="md"
                >
                    <div className="p-6">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Share this URL with others to collect responses:
                        </p>
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                            <input
                                type="text"
                                value={shareUrl}
                                readOnly
                                className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 text-sm focus:outline-none"
                            />
                            <button
                                onClick={handleCopyShareUrl}
                                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <Copy className="w-4 h-4 mr-1" />
                                Copy
                            </button>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default FormDashboard;