import React from 'react';
import { Building2, MapPin, Calendar, Award, Trash2 } from 'lucide-react';
import { calculateDuration, formatDate } from '../../utils/dateUtils';

const ExperienceCard = ({ experience, onRemove, index }) => {
  // Ensure logo URL uses HTTPS
  const logoUrl = experience.companyLogo 
    ? experience.companyLogo.replace('http://', 'https://') 
    : null;

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 animate-slide-up relative"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <button
        onClick={() => onRemove(experience.id)}
        className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
        aria-label="Remove experience"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 md:col-span-10">
          <div className="flex items-center space-x-3 mb-2">
            {logoUrl ? (
              <div className="w-10 h-10 flex-shrink-0 bg-white dark:bg-slate-700 rounded-md p-1.5 shadow-sm border border-gray-200 dark:border-gray-600">
                <img
                  src={logoUrl}
                  alt={`${experience.company} logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Hide image and show fallback icon
                    e.target.style.display = 'none';
                    const parent = e.target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<svg class="w-6 h-6 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>';
                    }
                  }}
                />
              </div>
            ) : (
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <Building2 className="w-6 h-6 text-gray-400 dark:text-gray-300" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{experience.position}</h3>
              <p className="text-lg text-linkedin-600 dark:text-linkedin-400 font-semibold">{experience.company}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300 mb-4">
            {experience.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{experience.location}</span>
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                {formatDate(experience.startDate)} - 
                {experience.current ? ' Present' : ` ${formatDate(experience.endDate)}`}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-linkedin-100 dark:bg-linkedin-900 text-linkedin-800 dark:text-linkedin-100 px-3 py-1 rounded-full text-sm font-medium">
                {calculateDuration(experience.startDate, experience.endDate, experience.current)}
              </div>
              {experience.category && (
                <div className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                  {experience.category}
                </div>
              )}
            </div>
          </div>

          {experience.description && (
            <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">{experience.description}</p>
          )}

          {experience.achievements && experience.achievements.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                <Award className="w-4 h-4 mr-2 text-yellow-500" />
                Key Achievements
              </h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-2 h-2 bg-linkedin-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-200">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;