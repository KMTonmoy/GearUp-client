 

const Blogs = () => {
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-5xl font-bold text-center text-purple-700 mb-10">GearUp - Bicycle Gear Blog</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Blog 1 */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                        src="https://cache.sporttracks.mobi/blog/images/2014/07/gearing-cogsize-diagram-01.png"
                        alt="Gear Blog 1"
                        className="rounded-t-lg w-full h-48 object-cover mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Understanding Bicycle Gears</h2>
                    <p className="text-gray-600 mb-4">
                        A beginner's guide to understanding how bicycle gears work, and why they're important for your cycling experience.
                    </p>
                    <a
                        href="#"
                        className="text-purple-600 hover:text-purple-800 font-medium"
                    >
                        Read More
                    </a>
                </div>

                {/* Blog 2 */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                        src="https://www.rei.com/dam/shifting_examples.jpg"
                        alt="Gear Blog 2"
                        className="rounded-t-lg w-full h-48 object-cover mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">How to Choose the Right Gear</h2>
                    <p className="text-gray-600 mb-4">
                        Learn how to choose the right gear set for your biking style, terrain, and budget.
                    </p>
                    <a
                        href="#"
                        className="text-purple-600 hover:text-purple-800 font-medium"
                    >
                        Read More
                    </a>
                </div>

                {/* Blog 3 */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                        src="https://bikebook-prod.s3.eu-west-2.amazonaws.com/BlogImages/General/df2146b8-7d11-40de-904c-5619948e2556.jpeg"
                        alt="Gear Blog 3"
                        className="rounded-t-lg w-full h-48 object-cover mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Maintenance Tips for Your Gears</h2>
                    <p className="text-gray-600 mb-4">
                        Keep your gears running smoothly with these essential maintenance tips for long-lasting performance.
                    </p>
                    <a
                        href="#"
                        className="text-purple-600 hover:text-purple-800 font-medium"
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
