# LocalStorage Persistence Feature

## Overview

This feature adds automatic data persistence to the Work Experience Tracker using browser localStorage. Your work experience data is now automatically saved and will persist across browser sessions, page refreshes, and even browser restarts.

## Features

### 1. **Automatic Saving**
- All changes are automatically saved to localStorage
- No manual save button needed
- Data persists across browser sessions
- Works offline (no internet connection required)

### 2. **Data Export**
- Export all your work experiences to a JSON file
- File is named with current date: `work-experiences-YYYY-MM-DD.json`
- Perfect for backing up your data
- Can be used to transfer data between devices

### 3. **Data Import**
- Import work experiences from a JSON file
- Two import modes:
  - **Replace**: Replace all current data with imported data
  - **Merge**: Add imported experiences to existing ones
- Validates data before importing
- Shows confirmation dialog before replacing data

### 4. **Clear All Data**
- Delete all work experiences at once
- Shows confirmation dialog to prevent accidental deletion
- Suggests exporting data before clearing

### 5. **Data Validation**
- Validates data structure on load
- Filters out corrupted or invalid experiences
- Handles localStorage quota exceeded errors
- Graceful error handling

## How to Use

### Viewing Your Data Controls

The data management controls are located below the Summary Card:
- **Export Button**: Download your data as JSON
- **Import Button**: Upload a JSON file to import data
- **Clear All Button**: Delete all experiences (only visible when you have data)

### Exporting Your Data

1. Click the **Export** button (Download icon)
2. Your browser will download a JSON file with all your experiences
3. The file is named: `work-experiences-2026-01-13.json` (with current date)
4. Store this file safely for backup

### Importing Data

1. Click the **Import** button (Upload icon)
2. Select a JSON file from your computer
3. The app will validate the file format
4. Choose to either:
   - **OK**: Replace your current data
   - **Cancel**: Merge with existing data
5. You'll see a confirmation message with the number of imported experiences

### Clearing All Data

1. Click the **Clear All** button (Trash icon)
2. Confirm the deletion in the dialog box
3. All experiences will be removed
4. The app will show the empty state

⚠️ **Warning**: This action cannot be undone. Always export your data first!

## Technical Details

### Storage Key
- Key: `work_experience_data`
- Version: `1.0`

### Data Structure

```json
{
  "experiences": [
    {
      "id": 1234567890,
      "company": "Google",
      "companyDomain": "google.com",
      "companyLogo": "https://logo.clearbit.com/google.com",
      "position": "Software Engineer",
      "location": "San Francisco, CA",
      "category": "Full-time",
      "startDate": "2020-01-15",
      "endDate": "2023-06-30",
      "current": false,
      "description": "Led development of...",
      "achievements": [
        "Increased performance by 40%",
        "Mentored 5 junior developers"
      ]
    }
  ],
  "version": "1.0",
  "lastUpdated": "2026-01-13T07:00:00.000Z"
}
```

### Storage Limits

- LocalStorage typically has a 5-10MB limit per domain
- The app handles quota exceeded errors gracefully
- If storage is full, you'll be prompted to export and clear data

### Data Validation

The app validates:
- ✅ Data structure (must have `experiences` array)
- ✅ Each experience must have `id`, `company`, and `position`
- ✅ Invalid experiences are filtered out
- ✅ JSON parsing errors are caught and handled

### Browser Compatibility

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Opera (all versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Privacy & Security

- **Local Only**: All data is stored in your browser only
- **No Server**: Nothing is sent to external servers
- **Private**: Data stays on your device
- **Secure**: Standard browser localStorage security applies

## Troubleshooting

### Data Not Persisting?

1. Check if cookies/localStorage are enabled in your browser
2. Check if you're in Private/Incognito mode (data clears on close)
3. Try a different browser
4. Export your data as backup

### Import Failed?

1. Ensure the file is a valid JSON file
2. Check that the file was exported from this app
3. Try opening the file in a text editor to verify it's not corrupted
4. Look at the browser console for specific error messages

### Storage Quota Exceeded?

1. Export your data
2. Clear old experiences you don't need
3. Import only the experiences you want to keep

### Lost Data?

1. Check if you have an exported JSON backup file
2. Use the Import feature to restore from backup
3. Check browser settings - localStorage might be disabled

## Future Enhancements

- [ ] Cloud backup integration (optional)
- [ ] Automatic backup reminders
- [ ] Multiple profile support
- [ ] Data encryption option
- [ ] Sync across devices
- [ ] Version history / undo feature

## Developer Notes

### Testing LocalStorage

```javascript
// Check if data is saved
localStorage.getItem('work_experience_data');

// Clear localStorage for testing
localStorage.removeItem('work_experience_data');

// View all localStorage
console.log(localStorage);
```

### Adding to Tests

When writing tests, mock localStorage:

```javascript
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
```

## Changelog

### Version 1.0.0 (2026-01-13)
- ✅ Initial implementation
- ✅ Auto-save functionality
- ✅ Export to JSON
- ✅ Import from JSON
- ✅ Clear all data
- ✅ Data validation
- ✅ Error handling

---

**Questions or Issues?**  
Open an issue on GitHub: [work-exp-app/issues](https://github.com/aniket-r2Dev2/work-exp-app/issues)