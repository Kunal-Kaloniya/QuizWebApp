import PropTypes from 'prop-types';
import { RiLoader3Line } from "react-icons/ri";

export default function Loader({ message }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Loading content"
        >
            <div
                className="flex flex-col items-center justify-center gap-5 rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-2xl ring-1 ring-gray-300 dark:ring-gray-700 transition-all w-10/12 sm:w-96"
                role="status"
                aria-live="polite"
            >
                <RiLoader3Line className="animate-spin text-6xl text-blue-600 dark:text-blue-400 drop-shadow-md" />

                <span className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
                    {message}
                </span>

                <div className="h-1 w-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-blue-500 animate-pulse"></div>
                </div>
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
