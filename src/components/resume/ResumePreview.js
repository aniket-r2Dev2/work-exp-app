import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, Building2 } from 'lucide-react';
import { formatDate, calculateDuration } from '../../utils/dateUtils';

const ResumePreview = ({ profile, experiences }) => {
  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB - dateA;
  });

  return (
    <div id="resume-preview" className="bg-white shadow-2xl rounded-lg p-12 max-w-4xl mx-auto" style={{ minHeight: '842px', fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {profile.fullName || 'Your Name'}
        </h1>
        {profile.headline && (
          <h2 className="text-xl text-gray-700 mb-4">
            {profile.headline}
          </h2>
        )}
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {profile.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              {profile.email}
            </div>
          )}
          {profile.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              {profile.phone}
            </div>
          )}
          {profile.location && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {profile.location}
            </div>
          )}
          {profile.linkedin && (
            <div className="flex items-center">
              <Linkedin className="w-4 h-4 mr-1" />
              <a href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            </div>
          )}
          {profile.website && (
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {profile.summary && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-2">
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {profile.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {sortedExperiences.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
            Work Experience
          </h3>
          <div className="space-y-6">
            {sortedExperiences.map((exp, index) => (
              <div key={exp.id || index} className="relative pl-8 border-l-2 border-gray-300">
                <div className="absolute left-0 top-0 w-3 h-3 bg-gray-800 rounded-full" style={{ marginLeft: '-7px' }}></div>
                
                <div className="mb-2">
                  <h4 className="text-lg font-bold text-gray-900">{exp.position}</h4>
                  <div className="flex items-center text-gray-700 font-semibold">
                    <Building2 className="w-4 h-4 mr-1" />
                    {exp.company}
                    {exp.location && (
                      <span className="mx-2 text-gray-400">•</span>
                    )}
                    {exp.location && (
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    <span className="mx-2">•</span>
                    {calculateDuration(exp.startDate, exp.endDate, exp.current)}
                  </div>
                </div>

                {exp.description && (
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {exp.achievements && exp.achievements.length > 0 && exp.achievements[0] !== '' && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {exp.achievements.map((achievement, i) => (
                      achievement && <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Note */}
      {sortedExperiences.length === 0 && !profile.summary && (
        <div className="text-center text-gray-400 py-12">
          <p>Add your profile information and work experiences to generate your resume.</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;