import HeroImage from '/illustrations/homepage.svg';

const Hero = () => {
    return (
        <div className="relative rounded-xl overflow-hidden bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md mb-6">
            {/* Decorative gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-blue-600 to-violet-500" />

            <div className="flex flex-col md:flex-row">
                {/* Left side - Image */}
                <div className="w-full md:w-5/12 p-6 md:p-8 flex items-center justify-center">
                    <div className="w-full max-w-sm">
                        <img
                            src={HeroImage}
                            alt="Hero Illustration"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

                {/* Right side - Text */}
                <div className="w-full md:w-7/12 p-6 md:p-8 md:pl-4 flex items-center">
                    <div className="space-y-3">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent mb-2">
                                CODE GARAGE
                            </h1>
                            <div className="h-1 w-16 bg-linear-to-r from-blue-600 to-violet-500 rounded-full" />
                        </div>

                        <p className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed">
                            Welcome to Code Garage! 🚀 This is where my experiments hang out.
                            Dive into a mix of quirky, cool, and maybe even a bit wild projects that I've thrown together.
                        </p>

                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                            Whether you're here for inspiration or just to see what happens when you combine code
                            with a dash of creativity, you're in the right place. Let's dive in and see what kind of magic we can brew up! 🎉✨
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;