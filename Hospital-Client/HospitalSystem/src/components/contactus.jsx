import { useState } from 'react';
import axios from 'axios';



const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      const response = await axios.post('http://localhost:3000/api/contact/submit', formData);
      console.log('Form submitted successfully:', response.data);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#C0EEE4]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#FF9E9E]">Contact Us</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#FFCAC8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9E9E]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#FFCAC8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9E9E]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#FFCAC8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9E9E]"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-[#FFCAC8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9E9E]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#FF9E9E] text-white py-2 px-4 rounded-md hover:bg-[#FFCAC8] transition duration-300"
            disabled={submitStatus === 'submitting'}
          >
            {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        {submitStatus === 'success' && (
          <p className="mt-4 text-green-600">Message sent successfully!</p>
        )}
        {submitStatus === 'error' && (
          <p className="mt-4 text-red-600">Error sending message. Please try again.</p>
        )}
      </div>
    </div>
  );
};


export default ContactForm;