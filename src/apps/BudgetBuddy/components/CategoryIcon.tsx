import {
    Briefcase, Code, Building2, TrendingUp, Home, Heart, GraduationCap, DollarSign,
    ShoppingCart, Bus, ShoppingBag, Tv, Receipt, Stethoscope, BookOpen,
    Zap, Shield, CreditCard, Plane, MoreHorizontal, Utensils,
} from 'lucide-react';
import { CATEGORY_COLORS } from '../helpers/expense.constants';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
    'Salary': Briefcase,
    'Freelance': Code,
    'Business': Building2,
    'Investments': TrendingUp,
    'Rental': Home,
    'Pension': Heart,
    'Grants': GraduationCap,
    'Other Income': DollarSign,
    'Food': Utensils,
    'Transport': Bus,
    'Shopping': ShoppingBag,
    'Entertainment': Tv,
    'Bills': Receipt,
    'Healthcare': Stethoscope,
    'Education': BookOpen,
    'Rent': Home,
    'Utilities': Zap,
    'Insurance': Shield,
    'Debt': CreditCard,
    'Travel': Plane,
    'Others': MoreHorizontal,
    'Other Expense': ShoppingCart,
};

interface CategoryIconProps {
    category: string;
    size?: 'sm' | 'md';
}

export default function CategoryIcon({ category, size = 'md' }: CategoryIconProps) {
    const Icon = CATEGORY_ICONS[category] || MoreHorizontal;
    const color = CATEGORY_COLORS[category] || '#6b7280';
    const dim = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9';
    const iconDim = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

    return (
        <div
            className={`${dim} rounded-full flex items-center justify-center shrink-0`}
            style={{ backgroundColor: `${color}1a` }}
        >
            <Icon className={iconDim} style={{ color }} strokeWidth={1.75} />
        </div>
    );
}