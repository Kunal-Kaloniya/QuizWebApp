export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 dark:bg-[#0A192F] border-t border-gray-300 dark:border-0">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Brand Info */}
                <section className="md:col-span-2">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-[#CCD6F6]">
                        TestYourBrain
                    </h4>
                    <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
                        TestYourBrain is an app where you can select from multiple subjects and
                        difficulty levels to challenge your intelligence.
                    </p>
                </section>

                {/* Quick Links */}
                <section>
                    <h5 className="text-lg font-semibold text-gray-900 dark:text-[#CCD6F6] mb-3">
                        Quick Links
                    </h5>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li><a href="#" className="hover:text-gray-900 dark:hover:text-[#64FFDA]">Pricing</a></li>
                        <li><a href="#" className="hover:text-gray-900 dark:hover:text-[#64FFDA]">Resources</a></li>
                        <li><a href="#" className="hover:text-gray-900 dark:hover:text-[#64FFDA]">About Us</a></li>
                        <li><a href="#" className="hover:text-gray-900 dark:hover:text-[#64FFDA]">FAQ</a></li>
                        <li><a href="#" className="hover:text-gray-900 dark:hover:text-[#64FFDA]">Contact Us</a></li>
                    </ul>
                </section>

                {/* Connect + Legal */}
                <section className="grid grid-cols-2 gap-8">
                    <div>
                        <h5 className="text-lg font-semibold text-gray-900 dark:text-[#CCD6F6] mb-3">
                            Connect
                        </h5>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            <li><a href="#" className="hover:text-gray-900 dark:hover:text-[#64FFDA]">Facebook</a></li>
                            <li><a href="#" className="hover:text-gray-900 dark:hover:text-[#64FFDA]">Instagram</a></li>
                            <li><a href="#" className="hover:text-gray-900 dark:hover:text-[#64FFDA]">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-gray-900 dark:hover:text-[#64FFDA]">Twitter</a></li>
                            <li><a href="#" className="hover:text-gray-900 dark:hover:text-[#64FFDA]">YouTube</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-lg font-semibold text-gray-900 dark:text-[#CCD6F6] mb-3">
                            Legal
                        </h5>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            <li><a href="#" className="hover:text-gray-900 dark:hover:text-[#64FFDA]">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-gray-900 dark:hover:text-[#64FFDA]">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-gray-900 dark:hover:text-[#64FFDA]">Cookie Policy</a></li>
                        </ul>
                    </div>
                </section>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-300 dark:border-[#172A45] mt-8 py-4 text-center text-sm text-gray-600 dark:text-gray-500">
                © {new Date().getFullYear()} TestYourBrain. All rights reserved.
            </div>
        </footer>
    );
}