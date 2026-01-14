import { useState, useEffect } from 'react';

const STORAGE_KEY = 'user_profile_data';

const useProfile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: ''
  });

  // Load profile from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setProfile(data);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  }, [profile]);

  const updateProfile = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const clearProfile = () => {
    setProfile({
      fullName: '',
      headline: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: ''
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    profile,
    updateProfile,
    clearProfile
  };
};

export default useProfile;