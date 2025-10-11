import PropTypes from 'prop-types';
import { RiLoader3Line } from "react-icons/ri";

export default function Loader({ message }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50"
            role="dialog"
            aria-modal="true"
            aria-label="Loading content"
        >
            <div
                className="flex flex-col items-center justify-center gap-6 rounded-xl bg-white/80 p-8 shadow-xl ring-1 ring-gray-900/10 backdrop-blur-md dark:bg-black/70 dark:text-white w-11/12 max-w-sm"
                role="status"
                aria-live="polite"
            >
                <RiLoader3Line className="animate-spin text-5xl text-gray-700 dark:text-gray-300" />
                <span className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    {message}
                </span>
            </div>
        </div>
    );
}

Loader.propTypes = {
    message: PropTypes.string,
};

Loader.defaultProps = {
    message: 'Loading...',
};