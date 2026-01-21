import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExperienceCard from '../components/cards/ExperienceCard';

describe('ExperienceCard', () => {
  const experience = {
    id: '1',
    company: 'TestCorp',
    companyLogo: '',
    position: 'Developer',
  category: 'Full-time',
    location: 'Remote',
    startDate: '2020-01-01',
    endDate: '2021-01-01',
    current: false,
    description: 'Did stuff',
    achievements: ['Achievement 1', 'Achievement 2'],
  };

  it('renders company and position', () => {
    render(<ExperienceCard experience={experience} onRemove={() => {}} onEdit={() => {}} index={0} />);
    expect(screen.getByText('TestCorp')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('renders achievements', () => {
    render(<ExperienceCard experience={experience} onRemove={() => {}} onEdit={() => {}} index={0} />);
    expect(screen.getByText('Achievement 1')).toBeInTheDocument();
    expect(screen.getByText('Achievement 2')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = jest.fn();
    const onEdit = jest.fn();
    render(<ExperienceCard experience={experience} onRemove={onRemove} onEdit={onEdit} index={0} />);
    
    // Target the remove button specifically by aria-label
    const removeButton = screen.getByRole('button', { name: /remove experience/i });
    fireEvent.click(removeButton);
    
    expect(onRemove).toHaveBeenCalledWith('1');
    expect(onEdit).not.toHaveBeenCalled();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onRemove = jest.fn();
    const onEdit = jest.fn();
    render(<ExperienceCard experience={experience} onRemove={onRemove} onEdit={onEdit} index={0} />);
    
    // Target the edit button specifically by aria-label
    const editButton = screen.getByRole('button', { name: /edit experience/i });
    fireEvent.click(editButton);
    
    expect(onEdit).toHaveBeenCalledWith(experience);
    expect(onRemove).not.toHaveBeenCalled();
  });
}); 