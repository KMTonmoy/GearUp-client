import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'John Doe',
            title: 'Web Developer',
            testimonial: 'This is the best product I’ve ever used. It has greatly improved my workflow and productivity!',
            image: 'https://images.squarespace-cdn.com/content/v1/55db3b44e4b01e5be14cad77/1657894114773-DN766ZER3WBMNKPSAHTD/Screenshot+2022-07-15+at+16.03.18.png?format=1500w',
        },
        {
            name: 'Jane Smith',
            title: 'Graphic Designer',
            testimonial: 'I love how easy and intuitive the user interface is. Highly recommended to all professionals!',
            image: 'https://media.vanityfair.com/photos/5cae5ea3f038af13baee9656/1:1/w_1332,h_1332,c_limit/jane-the-virgin-season-5-michael-memories-twist-raphael.jpg',
        },
        {
            name: 'Sam Johnson',
            title: 'Project Manager',
            testimonial: 'An absolute game changer for my team. Our collaboration has never been smoother!',
            image: 'https://aclassactny.com/wp-content/uploads/2021/07/Sam-McKelton-2.jpg',
        },
    ];

    return (
        <div className="  py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">What Our Clients Say</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-24 h-24 rounded-full mb-4 object-cover"
                            />
                            <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                            <p className="text-sm text-gray-500">{testimonial.title}</p>
                            <p className="text-gray-700 mt-4">{testimonial.testimonial}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
