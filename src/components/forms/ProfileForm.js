import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Linkedin, Globe, FileText } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

const ProfileForm = ({ profile, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700 animate-slide-up">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <User className="w-6 h-6 mr-2 text-linkedin-600" />
        Profile Information
      </h2>
      
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            icon={User}
            required
          />
          <Input
            label="Professional Headline"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            placeholder="Senior Software Engineer"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            icon={Mail}
            required
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            icon={Phone}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="San Francisco, CA"
            icon={MapPin}
          />
          <Input
            label="LinkedIn URL"
            name="linkedin"
            type="url"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
            icon={Linkedin}
          />
        </div>

        <Input
          label="Website / Portfolio"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://johndoe.com"
          icon={Globe}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Professional Summary
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-linkedin-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            placeholder="A brief summary of your professional background, skills, and career objectives..."
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <Button onClick={handleSubmit} className="flex-1">
            Save Profile
          </Button>
          {onCancel && (
            <Button onClick={onCancel} variant="secondary">
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;