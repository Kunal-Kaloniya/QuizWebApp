import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from "../components/Footer";
import { FaChartLine, FaClock, FaListOl } from 'react-icons/fa';

function FeatureCard({ icon, title, children }) {
    return (
        <div className="flex flex-col items-center p-6 text-center bg-gray-50 border border-gray-200 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl text-indigo-500 mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{children}</p>
        </div>
    );
}

FeatureCard.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default function Home() {
    return (
        <div className="min-h-[90vh] flex flex-col justify-between bg-white dark:bg-gray-800 dark:text-white transition-colors duration-300">
            <main className="flex-1">
                {/* Hero Section */}
                <section className="text-center py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Unlock Your Potential, <span className="text-indigo-600 dark:text-indigo-400">One Quiz at a Time.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                        Dive into a world of knowledge with quizzes designed to sharpen your mind in Mathematics, Science, and Computer Science. Whether you're a student, a professional, or a curious learner, our platform offers a dynamic way to test and expand your expertise.
                    </p>
                    <div className="mt-8">
                        <Link
                            to="/quiz-select"
                            className="inline-block px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
                        >
                            Start a Quiz Now
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Our Platform is a Game-Changer</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                            Everything you need to succeed, all in one place.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <FeatureCard icon={<FaListOl />} title="Diverse Categories">
                            From complex calculus problems to the fundamentals of quantum physics and advanced algorithms, pick the subject that fascinates you the most.
                        </FeatureCard>
                        <FeatureCard icon={<FaClock />} title="Realistic Timed Challenges">
                            Put your knowledge to the test under pressure. Our timed quizzes simulate real-world exam conditions to help you improve your speed and accuracy.
                        </FeatureCard>
                        <FeatureCard icon={<FaChartLine />} title="In-Depth Performance Analytics">
                            Review your quiz history, identify your strengths and weaknesses, and watch your skills grow over time with our detailed performance dashboard.
                        </FeatureCard>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get Started in Three Simple Steps</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
                        <div className="p-4">
                            <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-indigo-100 text-indigo-600 rounded-full text-2xl font-bold">1</div>
                            <h3 className="text-xl font-bold mb-2">Select Your Quiz</h3>
                            <p className="text-gray-600 dark:text-gray-300">Browse our extensive library and choose a topic and difficulty level that's right for you.</p>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-indigo-100 text-indigo-600 rounded-full text-2xl font-bold">2</div>
                            <h3 className="text-xl font-bold mb-2">Take the Challenge</h3>
                            <p className="text-gray-600 dark:text-gray-300">Engage with thought-provoking questions and submit your answers before the timer runs out.</p>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-indigo-100 text-indigo-600 rounded-full text-2xl font-bold">3</div>
                            <h3 className="text-xl font-bold mb-2">Achieve Mastery</h3>
                            <p className="text-gray-600 dark:text-gray-300">Receive instant feedback, review your results, and aim for the top of the leaderboard.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}