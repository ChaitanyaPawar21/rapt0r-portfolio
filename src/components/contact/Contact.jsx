import React, { useState } from 'react';
import { useTheme } from '../Home/ThemeContext';
import { Mail, User, MessageSquare, Send, MapPin, Phone } from 'lucide-react';
import './contact.css';

const Contact = () => {
    const { darkMode, theme } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        alert('Message sent! (This is a demo)');
    };

    return (
        <section id="contact" className={`flex flex-col md:flex-row min-h-screen ${theme.bg}`}>
            {/* Left Panel - Visual/Branding */}
            <div
                className={`w-full md:w-1/2 ${darkMode ? 'bg-gradient-to-br from-orange-900 via-gray-900 to-black' : 'bg-gradient-to-br from-orange-100 via-gray-100 to-white'} flex flex-col justify-center items-center p-12 relative overflow-hidden`}
            >
                {/* Background motorcycle image */}
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="/assets/bikes/ktm1390.png"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center max-w-md">
                    <div className={`mb-6 ${theme.accent} text-sm tracking-widest font-semibold`}>
                        GET IN TOUCH
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        LET'S BUILD
                        <br />
                        <span className={theme.accent}>SOMETHING</span>
                        <br />
                        TOGETHER
                    </h2>

                    <p className={`${theme.textSecondary} text-lg mb-8`}>
                        Ready to rev up your next project? Drop me a message and let's talk about turning your ideas into high-performance reality.
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-4 text-left">
                        <div className="flex items-center gap-3">
                            <Mail className={theme.accent} size={20} />
                            <span className={theme.textSecondary}>chaitanyapawar2109@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className={theme.accent} size={20} />
                            <span className={theme.textSecondary}>+91 XXX-XXX-XXXX</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className={theme.accent} size={20} />
                            <span className={theme.textSecondary}>India</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Contact Form */}
            <div className={`w-full md:w-1/2 ${theme.bgSecondary} flex flex-col justify-center items-center p-8 md:p-12`}>
                <div className="w-full max-w-lg">
                    <div className={`mb-8 ${theme.accent} text-sm tracking-widest font-semibold`}>
                        SEND A MESSAGE
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className={`block text-sm font-semibold mb-2 ${theme.textSecondary}`}>
                                <User className="inline mr-2" size={16} />
                                YOUR NAME
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-3 ${theme.input} ${theme.text} border-2 ${theme.borderSecondary} focus:${theme.accentBorder} focus:outline-none transition-colors`}
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${theme.textSecondary}`}>
                                <Mail className="inline mr-2" size={16} />
                                YOUR EMAIL
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-3 ${theme.input} ${theme.text} border-2 ${theme.borderSecondary} focus:${theme.accentBorder} focus:outline-none transition-colors`}
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Message Input */}
                        <div>
                            <label htmlFor="message" className={`block text-sm font-semibold mb-2 ${theme.textSecondary}`}>
                                <MessageSquare className="inline mr-2" size={16} />
                                YOUR MESSAGE
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                className={`w-full px-4 py-3 ${theme.input} ${theme.text} border-2 ${theme.borderSecondary} focus:${theme.accentBorder} focus:outline-none transition-colors resize-none`}
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`w-full ${theme.accentBg} text-white font-bold py-4 px-8 ${theme.accentHover} transition-all transform hover:scale-105 flex items-center justify-center gap-2`}
                        >
                            SEND MESSAGE
                            <Send size={20} />
                        </button>
                    </form>

                    {/* Additional Info */}
                    <div className={`mt-8 pt-8 border-t ${theme.borderSecondary}`}>
                        <p className={`text-sm ${theme.textTertiary} text-center`}>
                            I typically respond within 24 hours. Looking forward to hearing from you!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;