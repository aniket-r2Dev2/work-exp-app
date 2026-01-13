import React, { useRef } from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';

const DataControls = ({ onExport, onImport, onClear, experienceCount }) => {
  const fileInputRef = useRef(null);

  const handleExportClick = () => {
    const success = onExport();
    if (success) {
      console.log('Data exported successfully');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      alert('Please select a valid JSON file');
      return;
    }

    try {
      const count = await onImport(file);
      alert(`Successfully imported ${count} experience(s)!`);
    } catch (error) {
      alert(`Failed to import data: ${error.message}`);
    }

    e.target.value = '';
  };

  const handleClearClick = () => {
    onClear();
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Export Button */}
      <button
        onClick={handleExportClick}
        disabled={experienceCount === 0}
        title={experienceCount === 0 ? 'No data to export' : 'Export your data as JSON'}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-linkedin-500 text-white hover:bg-linkedin-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Export</span>
      </button>

      {/* Import Button */}
      <button
        onClick={handleImportClick}
        title="Import data from JSON file"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-linkedin-500 text-white hover:bg-linkedin-600 shadow-md hover:shadow-lg"
      >
        <Upload className="w-4 h-4" />
        <span className="hidden sm:inline">Import</span>
      </button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Import JSON file"
      />

      {/* Clear All Button */}
      {experienceCount > 0 && (
        <button
          onClick={handleClearClick}
          title="Delete all experiences"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear All</span>
        </button>
      )}
    </div>
  );
};

export default DataControls;