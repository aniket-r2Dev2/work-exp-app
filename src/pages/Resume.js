import React, { useState, useRef } from 'react';
import { FileText, Download, Edit, Eye, Printer } from 'lucide-react';
import useProfile from '../hooks/useProfile';
import useExperience from '../hooks/useExperience';
import ProfileForm from '../components/forms/ProfileForm';
import ResumePreview from '../components/resume/ResumePreview';
import Button from '../components/common/Button';

const Resume = () => {
  const { profile, updateProfile } = useProfile();
  const { experiences } = useExperience();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const resumeRef = useRef(null);

  const handleProfileUpdate = (updatedProfile) => {
    updateProfile(updatedProfile);
    setShowProfileForm(false);
  };

  const handleDownloadPDF = async () => {
    // For now, use browser print dialog
    // In a real implementation, you'd use a library like jsPDF or html2pdf
    window.print();
  };

  const handlePrint = () => {
    window.print();
  };

  const hasProfile = profile.fullName || profile.email;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linkedin-600 rounded-full mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Resume Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create a professional resume from your work experiences
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={() => setShowProfileForm(!showProfileForm)}
            variant={showProfileForm ? 'secondary' : 'primary'}
          >
            <Edit className="w-4 h-4 mr-2" />
            {hasProfile ? 'Edit Profile' : 'Add Profile Info'}
          </Button>
          
          {hasProfile && (
            <>
              <Button onClick={handleDownloadPDF} variant="primary">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={handlePrint} variant="secondary">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </>
          )}
        </div>

        {/* Profile Form */}
        {showProfileForm && (
          <ProfileForm
            profile={profile}
            onUpdate={handleProfileUpdate}
            onCancel={() => setShowProfileForm(false)}
          />
        )}

        {/* Resume Preview */}
        <div ref={resumeRef} className="print:shadow-none">
          <ResumePreview profile={profile} experiences={experiences} />
        </div>

        {/* Empty State */}
        {!hasProfile && !showProfileForm && (
          <div className="text-center mt-12 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
            <Eye className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Get Started
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Add your profile information to see your resume preview
            </p>
            <Button onClick={() => setShowProfileForm(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Add Profile Info
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;