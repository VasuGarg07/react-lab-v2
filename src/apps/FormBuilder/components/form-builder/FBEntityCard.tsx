import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { cn } from '@/shared/cn';
import { AlertDialog } from '@/ui/AlertDialog';
import Tooltip from '@/ui/Tooltip';
import { ViewType } from '../../helpers/fb.types';

interface FBEntityCardProps {
    type: ViewType;
    title: string;
    subtitle?: string;
    badge?: string;
    onClick: () => void;
    onRemove?: () => void;
    removeTitle?: string;
    removeMessage?: string;
    className?: string;
    disabled?: boolean;
}

const FBEntityCard: React.FC<FBEntityCardProps> = ({
    type,
    title,
    subtitle,
    badge,
    onClick,
    onRemove,
    removeTitle = 'Confirm Deletion',
    removeMessage = 'Are you sure you want to delete this item?',
    className,
    disabled = false
}) => {
    const getCardStyles = () => {
        const cardStyles = {
            form: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
            step: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800',
            section: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800',
            field: 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800'
        };

        return cardStyles[type] || 'bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800';
    };

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the card click
    };

    return (
        <div
            onClick={onClick}
            className={cn(
                "relative p-4 rounded-lg border cursor-pointer",
                getCardStyles(),
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            {/* Main Content */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Badge as Title Chip */}
                {badge && (
                    <span className="text-xs font-medium px-2 py-1 rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex-shrink-0">
                        {badge}
                    </span>
                )}

                {/* Title and Subtitle */}
                <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {title}
                </h4>
                {subtitle && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {subtitle}
                    </p>
                )}

                <span className='grow-1'></span>

                {/* Edit Button */}
                <Tooltip content="Edit">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                        }}
                        className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    >
                        <Edit2 size={16} />
                    </button>
                </Tooltip>

                {/* Remove Button */}
                {onRemove && (
                    <div onClick={handleRemoveClick}>
                        <AlertDialog
                            trigger={
                                <Tooltip content="Delete">
                                    <button className="p-1 rounded-md text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400">
                                        <Trash2 size={16} />
                                    </button>
                                </Tooltip>
                            }
                            title={removeTitle}
                            message={removeMessage}
                            onConfirm={onRemove}
                            confirmLabel="Delete"
                            cancelLabel="Cancel"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FBEntityCard;