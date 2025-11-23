import { Swords, ArrowLeftRight, Flag } from "lucide-react";

interface ActionPanelProps {
    onFight: () => void;
    onSwitch: () => void;
    onForfeit: () => void;
}

export default function ActionPanel({ onFight, onSwitch, onForfeit }: ActionPanelProps) {
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-700 dark:border-neutral-600 p-4 shadow-lg">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-3 uppercase">
                What will you do?
            </h3>
            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={onFight}
                    className="flex flex-col items-center gap-2 p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 font-bold uppercase"
                >
                    <Swords className="w-6 h-6" />
                    <span className="text-sm">Fight</span>
                </button>
                <button
                    onClick={onSwitch}
                    className="flex flex-col items-center gap-2 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 font-bold uppercase"
                >
                    <ArrowLeftRight className="w-6 h-6" />
                    <span className="text-sm">Switch</span>
                </button>
                <button
                    onClick={onForfeit}
                    className="col-span-2 flex items-center justify-center gap-2 p-3 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg transition-all duration-200 font-bold uppercase text-sm"
                >
                    <Flag className="w-5 h-5" />
                    <span>Forfeit</span>
                </button>
            </div>
        </div>
    );
}