import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useExperience from '../hooks/useExperience';
import Header from '../components/layout/Header';
import EmptyState from '../components/layout/EmptyState';
import SummaryCard from '../components/cards/SummaryCard';
import ExperienceCard from '../components/cards/ExperienceCard';
import ExperienceForm from '../components/forms/ExperienceForm';
import Button from '../components/common/Button';
import DataControls from '../components/common/DataControls';
import { Plus, FileText } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    experiences, 
    showForm, 
    addExperience, 
    removeExperience,
    updateExperience, 
    toggleForm,
    exportData,
    importData,
    clearAllData
  } = useExperience();

  const [editingExperience, setEditingExperience] = useState(null);

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    if (!showForm) {
      toggleForm();
    }
  };

  const handleSubmit = (experienceData) => {
    if (editingExperience) {
      // Update existing experience
      updateExperience(editingExperience.id, experienceData);
      setEditingExperience(null);
    } else {
      // Add new experience
      addExperience(experienceData);
    }
  };

  const handleCancel = () => {
    setEditingExperience(null);
    toggleForm();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Header />
      
      {/* Summary Card with Data Controls */}
      <div className="mb-8">
        <SummaryCard experiences={experiences} />
        
        {/* Data Management Controls */}
        <div className="mt-4 flex flex-wrap justify-end gap-3">
          {experiences.length > 0 && (
            <Button onClick={() => navigate('/resume')} variant="secondary">
              <FileText className="w-4 h-4 mr-2" />
              View Resume
            </Button>
          )}
          <DataControls
            onExport={exportData}
            onImport={importData}
            onClear={clearAllData}
            experienceCount={experiences.length}
          />
        </div>
      </div>

      {showForm && (
        <ExperienceForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          showCancel={experiences.length > 0 || editingExperience !== null}
          initialData={editingExperience}
          isEditing={editingExperience !== null}
        />
      )}

      {experiences.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Work Experience</h2>
            {!showForm && (
              <Button onClick={toggleForm}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Experience
              </Button>
            )}
          </div>

          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onRemove={removeExperience}
              onEdit={handleEdit}
              index={index}
            />
          ))}
        </div>
      )}

      {experiences.length === 0 && !showForm && (
        <EmptyState onAddExperience={toggleForm} />
      )}
    </div>
  );
};

export default Dashboard;