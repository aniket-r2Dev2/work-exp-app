import React from 'react';
import { Building2, MapPin, Calendar, Award, Trash2 } from 'lucide-react';
import { calculateDuration, formatDate } from '../../utils/dateUtils';

// Common company domain mappings for better logo fetching
const COMPANY_DOMAINS = {
  'google': 'google.com',
  'microsoft': 'microsoft.com',
  'apple': 'apple.com',
  'amazon': 'amazon.com',
  'meta': 'meta.com',
  'facebook': 'meta.com',
  'netflix': 'netflix.com',
  'tesla': 'tesla.com',
  'twitter': 'x.com',
  'x': 'x.com',
  'linkedin': 'linkedin.com',
  'uber': 'uber.com',
  'airbnb': 'airbnb.com',
  'spotify': 'spotify.com',
  'adobe': 'adobe.com',
  'salesforce': 'salesforce.com',
  'oracle': 'oracle.com',
  'ibm': 'ibm.com',
  'intel': 'intel.com',
  'nvidia': 'nvidia.com',
  'amd': 'amd.com',
  'cisco': 'cisco.com',
  'hp': 'hp.com',
  'dell': 'dell.com',
  'sap': 'sap.com',
  'vmware': 'vmware.com',
  'slack': 'slack.com',
  'zoom': 'zoom.us',
  'dropbox': 'dropbox.com',
  'github': 'github.com',
  'gitlab': 'gitlab.com',
  'atlassian': 'atlassian.com',
  'stripe': 'stripe.com',
  'paypal': 'paypal.com',
  'square': 'squareup.com',
  'shopify': 'shopify.com',
  'twilio': 'twilio.com',
  'mongodb': 'mongodb.com',
  'redis': 'redis.com',
  'elastic': 'elastic.co',
  'docker': 'docker.com',
  'aws': 'aws.amazon.com',
  'gcp': 'cloud.google.com',
  'azure': 'azure.microsoft.com',
  'accenture': 'accenture.com',
  'deloitte': 'deloitte.com',
  'pwc': 'pwc.com',
  'ey': 'ey.com',
  'kpmg': 'kpmg.com',
  'mckinsey': 'mckinsey.com',
  'bain': 'bain.com',
  'bcg': 'bcg.com',
  'jpmorgan': 'jpmorganchase.com',
  'goldman sachs': 'goldmansachs.com',
  'morgan stanley': 'morganstanley.com',
  'citigroup': 'citigroup.com',
  'bank of america': 'bankofamerica.com',
  'wells fargo': 'wellsfargo.com',
  'visa': 'visa.com',
  'mastercard': 'mastercard.com',
  'american express': 'americanexpress.com',
  'okta': 'okta.com',
  'auth0': 'auth0.com',
  'databricks': 'databricks.com',
  'snowflake': 'snowflake.com',
  'confluent': 'confluent.io',
  'hashicorp': 'hashicorp.com',
  'datadog': 'datadoghq.com',
  'pagerduty': 'pagerduty.com',
  'splunk': 'splunk.com',
  'cloudflare': 'cloudflare.com',
  'fastly': 'fastly.com',
  'akamai': 'akamai.com'
};

// Function to guess company domain from name
const guessDomain = (companyName) => {
  if (!companyName) return null;
  
  // Normalize company name: lowercase, remove special chars, trim
  const normalized = companyName.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
  
  // Check if we have a known mapping
  if (COMPANY_DOMAINS[normalized]) {
    return COMPANY_DOMAINS[normalized];
  }
  
  // Try without spaces (e.g., "Goldman Sachs" -> "goldmansachs")
  const noSpaces = normalized.replace(/\s+/g, '');
  if (COMPANY_DOMAINS[noSpaces]) {
    return COMPANY_DOMAINS[noSpaces];
  }
  
  // Fallback: use first word + .com (e.g., "Acme Corporation" -> "acme.com")
  const firstWord = normalized.split(/\s+/)[0];
  if (firstWord && firstWord.length > 2) {
    return `${firstWord}.com`;
  }
  
  return null;
};

const ExperienceCard = ({ experience, onRemove, index }) => {
  // Ensure logo URL uses HTTPS and handle Clearbit logo
  const getLogoUrl = () => {
    // 1. Try provided logo URL first
    if (experience.companyLogo) {
      return experience.companyLogo.replace('http://', 'https://');
    }
    
    // 2. Try provided domain
    if (experience.companyDomain) {
      return `https://logo.clearbit.com/${experience.companyDomain}`;
    }
    
    // 3. Try to guess domain from company name
    const guessedDomain = guessDomain(experience.company);
    if (guessedDomain) {
      return `https://logo.clearbit.com/${guessedDomain}`;
    }
    
    return null;
  };

  const logoUrl = getLogoUrl();

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
                    if (parent && !parent.querySelector('svg')) {
                      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                      svg.setAttribute('class', 'w-6 h-6 text-gray-400 dark:text-gray-300');
                      svg.setAttribute('fill', 'none');
                      svg.setAttribute('stroke', 'currentColor');
                      svg.setAttribute('viewBox', '0 0 24 24');
                      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                      path.setAttribute('stroke-linecap', 'round');
                      path.setAttribute('stroke-linejoin', 'round');
                      path.setAttribute('stroke-width', '2');
                      path.setAttribute('d', 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4');
                      svg.appendChild(path);
                      parent.appendChild(svg);
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
                {formatDate(experience.startDate)}
                {' - '}
                {experience.current ? 'Present' : formatDate(experience.endDate)}
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