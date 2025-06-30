import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  Star, 
  Shield, 
  Zap, 
  TrendingUp, 
  PieChart, 
  Target, 
  CheckCircle, 
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  Globe,
  Smartphone,
  BarChart3,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';

// Hero Slider Component with infinite loop and provided images
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const slides = [
    {
      title: "AI-Powered Financial Intelligence",
      subtitle: "Transform your financial future with intelligent insights and personalized recommendations",
      image: "/1.jpg",
      bgColor: "bg-purple-600"
    },
    {
      title: "Smart Budget Management",
      subtitle: "Take control of your spending with AI-driven budget optimization and real-time tracking",
      image: "/2 (1).jpg",
      bgColor: "bg-emerald-600"
    },
    {
      title: "Achieve Your Financial Goals",
      subtitle: "Set, track, and achieve your financial milestones with personalized coaching and insights",
      image: "/3 (1).jpg",
      bgColor: "bg-blue-600"
    }
  ];

  // Infinite loop auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Infinite loop navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleGetStarted = () => {
    // Smooth scroll to top before navigation
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      navigate('/login');
    }, 300);
  };

  const handleWatchDemo = () => {
    // Open YouTube video in a new tab
    window.open('https://www.youtube.com/watch?v=TQoJ5EpI8gk', '_blank');
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides container with infinite loop effect */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          // Calculate position for infinite loop effect
          let position = index - currentSlide;
          if (position < -1) position = slides.length - 1;
          if (position > 1) position = -slides.length + 1;

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
                position === 0 ? 'translate-x-0 z-20' : 
                position === 1 ? 'translate-x-full z-10' : 
                position === -1 ? '-translate-x-full z-10' : 
                'translate-x-full z-0'
              }`}
              style={{
                transform: `translateX(${position * 100}%)`
              }}
            >
              {/* Image with overlay to reduce brightness */}
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay to reduce brightness */}
                <div className="absolute inset-0 bg-black opacity-60"></div>
              </div>
              
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-6 lg:px-8">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-white space-y-8">
                      <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={handleGetStarted}
                          className="bg-white text-gray-900 px-8 py-4 font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                        >
                          Start Your Journey
                          <ArrowRight className="inline ml-2 w-5 h-5" />
                        </button>
                        <button 
                          onClick={handleWatchDemo}
                          className="border-2 border-white text-white px-8 py-4 font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center"
                        >
                          <Play className="w-5 h-5 mr-2" />
                          Watch Demo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-30"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-30"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Features Section with sharp edges for cards only
const FeaturesSection = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "AI-Powered Insights",
      description: "Get personalized financial advice powered by advanced AI algorithms that learn from your spending patterns.",
      color: "bg-purple-500",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your financial data is protected with enterprise-grade encryption and security protocols.",
      color: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Visualize your financial health with interactive charts and predictive analytics.",
      color: "bg-emerald-500",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set and achieve your financial goals with intelligent milestone tracking and recommendations.",
      color: "bg-orange-500",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Get instant notifications and updates on your financial activities and budget status.",
      color: "bg-yellow-500",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: PieChart,
      title: "Budget Optimization",
      description: "Automatically optimize your budget allocation based on your spending habits and goals.",
      color: "bg-indigo-500",
      image: "https://images.unsplash.com/photo-1554224154-26032fced8bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="text-purple-600"> Smart Finance</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our AI-powered platform transforms the way you manage money with cutting-edge features designed for modern financial needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative mb-6">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center absolute -bottom-2 left-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Solutions Section
const SolutionsSection = () => {
  const solutions = [
    {
      icon: Users,
      title: "Personal Finance Management",
      description: "Take complete control of your personal finances with AI-driven insights and automated tracking.",
      features: ["Expense Tracking", "Budget Planning", "Goal Setting", "Investment Advice"],
      color: "bg-purple-600"
    },
    {
      icon: BarChart3,
      title: "Business Financial Analytics",
      description: "Comprehensive financial analytics for small businesses and entrepreneurs.",
      features: ["Cash Flow Analysis", "Profit Tracking", "Tax Optimization", "Growth Forecasting"],
      color: "bg-blue-600"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Experience",
      description: "Manage your finances on-the-go with our intuitive mobile application.",
      features: ["Real-time Sync", "Offline Access", "Push Notifications", "Biometric Security"],
      color: "bg-emerald-600"
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Solutions for
            <span className="text-emerald-600"> Every Need</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're managing personal finances or running a business, our platform adapts to your unique requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 border border-gray-200 hover:border-purple-300 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 ${solution.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <solution.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{solution.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
              <ul className="space-y-3">
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { number: "100K+", label: "Active Users", icon: Users },
    { number: "$50M+", label: "Money Managed", icon: DollarSign },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "4.9/5", label: "User Rating", icon: Star }
  ];

  return (
    <section className="py-24 bg-purple-600">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-white/80 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      navigate('/login');
    }, 300);
  };

  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Transform Your
          <span className="text-purple-400"> Financial Future?</span>
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Join thousands of users who have already taken control of their finances with our AI-powered platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleGetStarted}
            className="bg-purple-600 text-white px-8 py-4 font-semibold text-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Start Free Trial
            <ArrowRight className="inline ml-2 w-5 h-5" />
          </button>
          <button className="border-2 border-white text-white px-8 py-4 font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
};

// Newsletter Section
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setEmail('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-24 bg-blue-600">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stay Updated with Financial Tips
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter for the latest financial insights, tips, and product updates.
          </p>
          
          {submitStatus === 'success' ? (
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Thank You for Subscribing!</h3>
              <p className="text-blue-100">
                You've been added to our newsletter. Watch your inbox for financial tips and updates.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-blue-600 px-8 py-4 font-semibold text-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                    Subscribing...
                  </>
                ) : (
                  <>Subscribe</>
                )}
              </button>
            </form>
          )}
          
          <p className="text-blue-200 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

// Contact Form Component with different background
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          created_at: new Date().toISOString()
        }]);

      if (error) {
        console.error('Error submitting contact form:', error);
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-blue-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="text-blue-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Have questions about our platform? Need help getting started? Our team is here to help you succeed on your financial journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  We're here to help you with any questions or concerns you may have about our platform.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Us</h4>
                    <p className="text-gray-600">hello@financeaicoach.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Call Us</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Live Chat</h4>
                    <p className="text-gray-600">Available 24/7 for support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-green-800 font-medium">Message sent successfully!</p>
                  </div>
                  <p className="text-green-700 text-sm mt-1">We'll get back to you within 24 hours.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <X className="w-5 h-5 text-red-600 mr-2" />
                    <p className="text-red-800 font-medium">Failed to send message.</p>
                  </div>
                  <p className="text-red-700 text-sm mt-1">Please try again or email us directly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your issue or question..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-8 py-4 font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavigation = (path) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <button 
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-3 mb-6 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <img 
                  src="/WhatsApp Image 2025-06-29 at 13.46.00_d292e4a6.jpg" 
                  alt="Finance AI Coach" 
                  className="h-6 w-6 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="text-white font-bold text-sm hidden">F</span>
              </div>
              <span className="text-xl font-bold">Finance AI Coach</span>
            </button>
            <p className="text-gray-400 leading-relaxed">
              Your intelligent financial companion for smart money management and wealth building.
            </p>
            <div className="flex space-x-4 mt-6">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">hello@financeaicoach.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button></li>
              <li><button onClick={() => scrollToSection('solutions')} className="hover:text-white transition-colors">Solutions</button></li>
              <li><button onClick={() => handleNavigation('/pricing')} className="hover:text-white transition-colors">Pricing</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleNavigation('/about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => handleNavigation('/team')} className="hover:text-white transition-colors">Team</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleNavigation('/privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Finance AI Coach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component with scroll handling
const LandingPage = () => {
  const location = useLocation();

  // Handle scroll to section when navigating from other pages
  useEffect(() => {
    if (location.state?.scrollTo) {
      // Small delay to ensure the page has loaded
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSlider />
      <FeaturesSection />
      <SolutionsSection />
      <StatsSection />
      <NewsletterSection />
      <CTASection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default LandingPage;