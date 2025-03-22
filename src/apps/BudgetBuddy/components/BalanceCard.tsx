import React from "react";
import clsx from "clsx";

interface StatCardProps {
    title: string;
    amount: number;
    icon: React.ReactNode;
    variant: "income" | "expense" | "balance";
}

const VARIANT_STYLES = {
    income: {
        bg: "bg-gradient-to-br from-green-400 to-green-900",
        iconBg: "bg-white/20",
        shadow: "shadow-green-500/20",
    },
    expense: {
        bg: "bg-gradient-to-br from-red-400 to-red-900",
        iconBg: "bg-white/20",
        shadow: "shadow-red-500/20",
    },
    balance: {
        bg: "bg-gradient-to-br from-indigo-400 to-indigo-900",
        iconBg: "bg-white/20",
        shadow: "shadow-indigo-500/20",
    },
};

const BalanceCard: React.FC<StatCardProps> = ({ title, amount, icon, variant }) => {
    const { bg, iconBg, shadow } = VARIANT_STYLES[variant];

    return (
        <div
            className={clsx(
                "rounded-2xl p-4 transition-transform transform hover:-translate-y-1 flex flex-col gap-3",
                bg,
                shadow,
                "text-white"
            )}
        >
            <div className="flex justify-between items-center">
                <span className="uppercase tracking-wide text-xs font-semibold">
                    {title}
                </span>
                <div
                    className={clsx(
                        "p-2 rounded-md flex items-center justify-center",
                        iconBg
                    )}
                >
                    {icon}
                </div>
            </div>
            <h3 className="text-xl font-bold tracking-tight">
                ₹{amount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </h3>
        </div>
    );
};

export default BalanceCard;