import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Linkedin, Globe, FileText } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

const ProfileForm = ({ profile, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState(profile);
  const [locationQuery, setLocationQuery] = useState(profile.location || '');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationSelectedIndex, setLocationSelectedIndex] = useState(-1);

  // Reset selected index when suggestions change
  useEffect(() => {
    setLocationSelectedIndex(-1);
  }, [locationSuggestions]);

  // Fetch location suggestions from GeoDB API
  useEffect(() => {
    if (locationQuery.length < 3) {
      setLocationSuggestions([]);
      return;
    }
    const controller = new AbortController();
    fetch(`https://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&offset=0&namePrefix=${encodeURIComponent(locationQuery)}`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => {
        if (data.data && Array.isArray(data.data)) {
          const cities = data.data.map(city => `${city.city}, ${city.country}`);
          setLocationSuggestions(cities);
        }
      })
      .catch(() => {
        console.log('GeoDB API search failed');
        setLocationSuggestions([]);
      });
    return () => controller.abort();
  }, [locationQuery]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationInput = (e) => {
    const value = e.target.value;
    setLocationQuery(value);
    setFormData(prev => ({ ...prev, location: value }));
    setShowLocationSuggestions(true);
  };

  const handleLocationSelect = (city) => {
    setFormData(prev => ({ ...prev, location: city }));
    setLocationQuery(city);
    setShowLocationSuggestions(false);
    setLocationSelectedIndex(-1);
  };

  const handleLocationKeyDown = (e) => {
    if (!showLocationSuggestions || locationSuggestions.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setLocationSelectedIndex(prev => 
          prev < locationSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setLocationSelectedIndex(prev => 
          prev > 0 ? prev - 1 : locationSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (locationSelectedIndex >= 0) {
          handleLocationSelect(locationSuggestions[locationSelectedIndex]);
        }
        break;
      case 'Escape':
        setShowLocationSuggestions(false);
        setLocationSelectedIndex(-1);
        break;
      default:
        break;
    }
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
          <div className="relative">
            <Input
              label="Location"
              name="location"
              value={locationQuery}
              onChange={handleLocationInput}
              onKeyDown={handleLocationKeyDown}
              placeholder="San Francisco, CA"
              icon={MapPin}
              autoComplete="off"
              onFocus={() => setShowLocationSuggestions(true)}
              onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
            />
            {showLocationSuggestions && locationSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 w-full mt-1 rounded shadow-lg max-h-48 overflow-y-auto top-full left-0">
                {locationSuggestions.map((city, index) => (
                  <li
                    key={index}
                    className={`flex items-center px-4 py-2 cursor-pointer text-gray-800 dark:text-gray-100 ${
                      index === locationSelectedIndex 
                        ? 'bg-linkedin-100 text-linkedin-800 dark:bg-linkedin-800 dark:text-linkedin-100' 
                        : 'hover:bg-linkedin-50 dark:hover:bg-slate-700'
                    }`}
                    onMouseDown={() => handleLocationSelect(city)}
                    onMouseEnter={() => setLocationSelectedIndex(index)}
                  >
                    <span>{city}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
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