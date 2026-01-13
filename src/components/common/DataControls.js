import React, { useRef } from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';
import Button from './Button';

const DataControls = ({ onExport, onImport, onClear, experienceCount }) => {
  const fileInputRef = useRef(null);

  const handleExportClick = () => {
    const success = onExport();
    if (success) {
      // Optional: Show success message
      console.log('Data exported successfully');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
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

    // Reset file input
    e.target.value = '';
  };

  const handleClearClick = () => {
    onClear();
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Export Button */}
      <Button
        onClick={handleExportClick}
        variant="secondary"
        className="flex items-center gap-2"
        disabled={experienceCount === 0}
        title={experienceCount === 0 ? 'No data to export' : 'Export your data as JSON'}
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Export</span>
      </Button>

      {/* Import Button */}
      <Button
        onClick={handleImportClick}
        variant="secondary"
        className="flex items-center gap-2"
        title="Import data from JSON file"
      >
        <Upload className="w-4 h-4" />
        <span className="hidden sm:inline">Import</span>
      </Button>

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
        <Button
          onClick={handleClearClick}
          variant="secondary"
          className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          title="Delete all experiences"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear All</span>
        </Button>
      )}
    </div>
  );
};

export default DataControls;