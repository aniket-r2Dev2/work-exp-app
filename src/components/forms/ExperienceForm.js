import React, { useState, useEffect } from 'react';
import { Plus, Building2, MapPin, Calendar, Award, Trash2, Code2, X, Pencil } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import jobTitlesConfig from '../../config/jobTitles.json';

// Extract all job titles from the config
const allJobTitles = jobTitlesConfig.jobTitles.flatMap(category => category.titles);

// Function to filter job titles based on search query
const filterJobTitles = (query) => {
  if (!query || query.length < 2) return [];
  const lowercaseQuery = query.toLowerCase();
  return allJobTitles
    .filter(title => title.toLowerCase().includes(lowercaseQuery))
    .slice(0, 10);
};

// Common skills/technologies for suggestions
const commonSkills = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Swift', 'Kotlin',
  'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot',
  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'SASS', 'Material-UI',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'AWS', 'Azure', 'GCP',
  'Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitHub', 'GitLab', 'CI/CD',
  'REST API', 'GraphQL', 'Microservices', 'Agile', 'Scrum', 'Jira',
  'TensorFlow', 'PyTorch', 'Machine Learning', 'Data Analysis', 'SQL'
];

const ExperienceForm = ({ onSubmit, onCancel, showCancel, initialData = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    company: '',
    companyDomain: '',
    companyLogo: '',
    position: '',
    location: '',
    category: 'Full-time',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: [''],
    skills: []
  });

  // Initialize form with data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        achievements: initialData.achievements && initialData.achievements.length > 0 
          ? initialData.achievements 
          : [''],
        skills: initialData.skills || []
      });
      setCompanyQuery(initialData.company || '');
      setPositionQuery(initialData.position || '');
      setLocationQuery(initialData.location || '');
    }
  }, [initialData]);

  const [companyQuery, setCompanyQuery] = useState('');
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [companySelectedIndex, setCompanySelectedIndex] = useState(-1);
  
  const [positionQuery, setPositionQuery] = useState('');
  const [positionSuggestions, setPositionSuggestions] = useState([]);
  const [showPositionSuggestions, setShowPositionSuggestions] = useState(false);
  const [positionSelectedIndex, setPositionSelectedIndex] = useState(-1);
  
  const [locationQuery, setLocationQuery] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationSelectedIndex, setLocationSelectedIndex] = useState(-1);

  // Skills input state
  const [skillInput, setSkillInput] = useState('');
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [skillSelectedIndex, setSkillSelectedIndex] = useState(-1);

  // Reset selected indices when suggestions change
  useEffect(() => {
    setCompanySelectedIndex(-1);
  }, [companySuggestions]);

  useEffect(() => {
    setPositionSelectedIndex(-1);
  }, [positionSuggestions]);

  useEffect(() => {
    setLocationSelectedIndex(-1);
  }, [locationSuggestions]);

  useEffect(() => {
    setSkillSelectedIndex(-1);
  }, [skillSuggestions]);

  // Skills suggestions
  useEffect(() => {
    if (skillInput.length < 1) {
      setSkillSuggestions([]);
      return;
    }
    const lowercaseQuery = skillInput.toLowerCase();
    const filtered = commonSkills
      .filter(skill => 
        skill.toLowerCase().includes(lowercaseQuery) && 
        !formData.skills.includes(skill)
      )
      .slice(0, 8);
    setSkillSuggestions(filtered);
  }, [skillInput, formData.skills]);

  useEffect(() => {
    if (companyQuery.length < 2) {
      setCompanySuggestions([]);
      return;
    }
    const controller = new AbortController();
    fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(companyQuery)}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => setCompanySuggestions(data))
      .catch(() => setCompanySuggestions([]));
    return () => controller.abort();
  }, [companyQuery]);

  useEffect(() => {
    if (positionQuery.length < 2) {
      setPositionSuggestions([]);
      return;
    }
    
    // First, use fast local search for instant results
    const localSuggestions = filterJobTitles(positionQuery);
    setPositionSuggestions(localSuggestions);
    
    // Then, optionally fetch from API for more comprehensive results
    // Only if we have less than 5 local suggestions and query is longer
    if (localSuggestions.length < 5 && positionQuery.length >= 3) {
      const controller = new AbortController();
      fetch(`https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(positionQuery)}&num_pages=1`, {
        headers: {
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.REACT_APP_JSEARCH_API_KEY
        },
        signal: controller.signal
      })
        .then(res => res.json())
        .then(data => {
          if (data.data && Array.isArray(data.data)) {
            // Extract unique job titles from API results
            const apiTitles = [...new Set(data.data.map(job => job.job_title).filter(Boolean))];
            // Combine local and API results, removing duplicates
            const allTitles = [...new Set([...localSuggestions, ...apiTitles])];
            setPositionSuggestions(allTitles.slice(0, 15)); // Show more results when API is used
          }
        })
        .catch(() => {
          // If API fails, keep local suggestions
          console.log('API search failed, using local suggestions only');
        });
      return () => controller.abort();
    }
  }, [positionQuery]);

  useEffect(() => {
    if (locationQuery.length < 3) {
      setLocationSuggestions([]);
      return;
    }
    // Use GeoDB Cities API for location suggestions
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

  // Keyboard navigation handlers
  const handleCompanyKeyDown = (e) => {
    if (!showSuggestions || companySuggestions.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setCompanySelectedIndex(prev => 
          prev < companySuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setCompanySelectedIndex(prev => 
          prev > 0 ? prev - 1 : companySuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (companySelectedIndex >= 0) {
          handleCompanySelect(companySuggestions[companySelectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setCompanySelectedIndex(-1);
        break;
      default:
        // Handle other keys normally
        break;
    }
  };

  const handlePositionKeyDown = (e) => {
    if (!showPositionSuggestions || positionSuggestions.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setPositionSelectedIndex(prev => 
          prev < positionSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setPositionSelectedIndex(prev => 
          prev > 0 ? prev - 1 : positionSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (positionSelectedIndex >= 0) {
          handlePositionSelect(positionSuggestions[positionSelectedIndex]);
        }
        break;
      case 'Escape':
        setShowPositionSuggestions(false);
        setPositionSelectedIndex(-1);
        break;
      default:
        // Handle other keys normally
        break;
    }
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
        // Handle other keys normally
        break;
    }
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (skillSelectedIndex >= 0 && skillSuggestions.length > 0) {
        addSkill(skillSuggestions[skillSelectedIndex]);
      } else if (skillInput.trim()) {
        addSkill(skillInput.trim());
      }
      return;
    }

    if (!showSkillSuggestions || skillSuggestions.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSkillSelectedIndex(prev => 
          prev < skillSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSkillSelectedIndex(prev => 
          prev > 0 ? prev - 1 : skillSuggestions.length - 1
        );
        break;
      case 'Escape':
        setShowSkillSuggestions(false);
        setSkillSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleCompanyInput = (e) => {
    const value = e.target.value;
    setCompanyQuery(value);
    setFormData(prev => ({ ...prev, company: value, companyDomain: '', companyLogo: '' }));
    setShowSuggestions(true);
  };

  const handleCompanySelect = (company) => {
    setFormData(prev => ({
      ...prev,
      company: company.name,
      companyDomain: company.domain,
      companyLogo: company.logo
    }));
    setCompanyQuery(company.name);
    setShowSuggestions(false);
    setCompanySelectedIndex(-1);
  };

  const handlePositionInput = (e) => {
    const value = e.target.value;
    setPositionQuery(value);
    setFormData(prev => ({ ...prev, position: value }));
    setShowPositionSuggestions(true);
  };

  const handlePositionSelect = (title) => {
    setFormData(prev => ({ ...prev, position: title }));
    setPositionQuery(title);
    setShowPositionSuggestions(false);
    setPositionSelectedIndex(-1);
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData(prev => ({ ...prev, achievements: newAchievements }));
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const removeAchievement = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  // Skills handlers
  const addSkill = (skill) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill]
      }));
      setSkillInput('');
      setShowSkillSuggestions(false);
      setSkillSelectedIndex(-1);
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = () => {
    if (!formData.company || !formData.position || !formData.startDate) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit(formData);

    // Reset form only if not editing
    if (!isEditing) {
      setFormData({
        company: '',
        companyDomain: '',
        companyLogo: '',
        position: '',
        category: 'Full-time',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [''],
        skills: []
      });
      setCompanyQuery('');
      setPositionQuery('');
      setLocationQuery('');
      setSkillInput('');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700 animate-slide-up">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        {isEditing ? (
          <>
            <Pencil className="w-6 h-6 mr-2 text-blue-600" />
            Edit Work Experience
          </>
        ) : (
          <>
            <Plus className="w-6 h-6 mr-2 text-linkedin-600" />
            Add Work Experience
          </>
        )}
      </h2>
      
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <Input
              label="Company Name"
              name="company"
              value={companyQuery}
              onChange={handleCompanyInput}
              onKeyDown={handleCompanyKeyDown}
              placeholder="e.g., Google, Microsoft"
              icon={Building2}
              iconImg={formData.companyLogo || null}
              autoComplete="off"
              required
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && companySuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 w-full mt-1 rounded shadow-lg max-h-48 overflow-y-auto top-full left-0">
                {companySuggestions.map((c, index) => (
                  <li
                    key={c.domain}
                    className={`flex items-center px-4 py-2 cursor-pointer text-gray-800 dark:text-gray-100 ${
                        index === companySelectedIndex 
                          ? 'bg-linkedin-100 text-linkedin-800 dark:bg-linkedin-800 dark:text-linkedin-100' 
                          : 'hover:bg-linkedin-50 dark:hover:bg-slate-700'
                      }`}
                    onMouseDown={() => handleCompanySelect(c)}
                    onMouseEnter={() => setCompanySelectedIndex(index)}
                  >
                      {(() => {
                        const fallbackLogo = c.domain ? `https://logo.clearbit.com/${c.domain}` : null;
                        const src = c.logo || fallbackLogo;
                        if (src) {
                          return (
                            <div className="w-6 h-6 mr-2 rounded flex items-center justify-center bg-white dark:bg-slate-700 p-1">
                              <img
                                src={src}
                                alt={c.name}
                                className="max-w-full max-h-full block"
                                data-domain={c.domain || ''}
                                onError={(e) => {
                                  try {
                                    const target = e.target;
                                    const tried = target.dataset.triedFallback;
                                    const domain = target.dataset.domain;
                                    if (!tried && domain) {
                                      target.dataset.triedFallback = '1';
                                      target.src = `https://logo.clearbit.com/${domain}`;
                                      return;
                                    }
                                  } catch (err) {
                                    // ignore
                                  }
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          );
                        }

                        return (
                          <span className="w-6 h-6 mr-2 flex items-center justify-center rounded bg-gray-100 dark:bg-slate-700">
                            <Building2 className="w-4 h-4 text-gray-400 dark:text-gray-200" />
                          </span>
                        );
                      })()}
                      <span className="truncate">{c.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative">
            <Input
              label="Position"
              name="position"
              value={positionQuery}
              onChange={handlePositionInput}
              onKeyDown={handlePositionKeyDown}
              placeholder="e.g., Software Engineer"
              required
              autoComplete="off"
              onFocus={() => setShowPositionSuggestions(true)}
              onBlur={() => setTimeout(() => setShowPositionSuggestions(false), 200)}
            />
            {showPositionSuggestions && positionSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 w-full mt-1 rounded shadow-lg max-h-48 overflow-y-auto top-full left-0">
                {positionSuggestions.map((title, index) => (
                  <li
                    key={index}
                    className={`flex items-center px-4 py-2 cursor-pointer text-gray-800 dark:text-gray-100 ${
                        index === positionSelectedIndex 
                          ? 'bg-linkedin-100 text-linkedin-800 dark:bg-linkedin-800 dark:text-linkedin-100' 
                          : 'hover:bg-linkedin-50 dark:hover:bg-slate-700'
                      }`}
                    onMouseDown={() => handlePositionSelect(title)}
                    onMouseEnter={() => setPositionSelectedIndex(index)}
                  >
                    <span>{title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="relative">
          <Input
            label="Location"
            name="location"
            value={locationQuery}
            onChange={handleLocationInput}
            onKeyDown={handleLocationKeyDown}
            placeholder="e.g., San Francisco, CA"
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

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experience Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-linkedin-500 focus:border-transparent transition-all duration-200 appearance-none pr-12"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M6 8l4 4 4-4' stroke='%230A66C2' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1rem'
              }}
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Freelance</option>
              <option>Volunteer</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
              icon={Calendar}
              required
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                name="current"
                checked={formData.current}
                onChange={handleInputChange}
                className="w-4 h-4 text-linkedin-600 rounded focus:ring-linkedin-500"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Currently working here</span>
            </label>
          </div>
          <Input
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleInputChange}
            icon={Calendar}
            disabled={formData.current}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Description</label>
          <textarea
            id="job-description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-linkedin-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            placeholder="Brief description of your role and responsibilities..."
          />
        </div>

        {/* Skills Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <Code2 className="w-4 h-4 mr-2" />
            Skills & Technologies
          </label>
          <div className="relative">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => {
                setSkillInput(e.target.value);
                setShowSkillSuggestions(true);
              }}
              onKeyDown={handleSkillKeyDown}
              onFocus={() => setShowSkillSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSkillSuggestions(false), 200)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-linkedin-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
              placeholder="Type and press Enter to add skills (e.g., React, Python, AWS)"
            />
            {showSkillSuggestions && skillSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 w-full mt-1 rounded shadow-lg max-h-48 overflow-y-auto">
                {skillSuggestions.map((skill, index) => (
                  <li
                    key={index}
                    className={`px-4 py-2 cursor-pointer text-gray-800 dark:text-gray-100 ${
                      index === skillSelectedIndex 
                        ? 'bg-linkedin-100 text-linkedin-800 dark:bg-linkedin-800 dark:text-linkedin-100' 
                        : 'hover:bg-linkedin-50 dark:hover:bg-slate-700'
                    }`}
                    onMouseDown={() => addSkill(skill)}
                    onMouseEnter={() => setSkillSelectedIndex(index)}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-linkedin-100 text-linkedin-800 dark:bg-linkedin-900 dark:text-linkedin-200"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-linkedin-200 dark:hover:bg-linkedin-800 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Key Achievements
          </label>
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                value={achievement}
                onChange={(e) => handleAchievementChange(index, e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-linkedin-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100"
                placeholder="e.g., Increased team productivity by 25%"
              />
              {formData.achievements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAchievement(index)}
                  className="px-3 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addAchievement}
            className="flex items-center text-linkedin-600 hover:text-linkedin-700 font-medium transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Achievement
          </button>
        </div>

        <div className="flex space-x-4 pt-4">
          <Button onClick={handleSubmit} className="flex-1">
            {isEditing ? 'Update Experience' : 'Add Experience'}
          </Button>
          {showCancel && (
            <Button onClick={onCancel} variant="secondary">
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;