import { motion } from 'framer-motion';

interface VisualiserBoardProps {
    array: number[];
    comparison: number[];
}

export const VisualiserBoard = ({ array, comparison }: VisualiserBoardProps) => {
    return (
        <div className="flex items-end justify-center gap-1 h-[60vh] w-full max-w-5xl p-4 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
            {array.map((value, index) => {
                const isComparing = comparison.includes(index);
                return (
                    <motion.div
                        layout
                        key={index} // Using index as key for now, will improve for specific algos if needed
                        initial={false}
                        animate={{
                            height: `${(value / 500) * 100}%`,
                            backgroundColor: isComparing ? '#EF4444' : '#3B82F6', // Red if comparing, Blue otherwise
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="w-full rounded-t-md opacity-90 hover:opacity-100"
                    />
                );
            })}
        </div>
    );
};
