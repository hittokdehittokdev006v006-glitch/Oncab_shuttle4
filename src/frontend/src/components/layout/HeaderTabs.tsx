import React from 'react';
import { View } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderTabsProps {
  currentView: View;
  onSelectView: (view: View) => void;
}

const TABS: { id: View; label: string }[] = [
  { id: 'scheduled-trips', label: 'Scheduled Trips' },
  { id: 'trips', label: 'Trips' },
  { id: 'drivers', label: 'Drivers' },
  { id: 'vehicles', label: 'Vehicles' },
  { id: 'route-creation', label: 'Route Creation' },
  { id: 'passes-management', label: 'Passes Management' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'cancelled-tickets-refund', label: 'Cancelled Tickets Refund' },
  { id: 'failed-paid-refund', label: 'Failed & Paid Refund' },
];

export const HeaderTabs: React.FC<HeaderTabsProps> = ({ currentView, onSelectView }) => {
  const { user } = useAuth();
  const visibleTabs = TABS.filter((tab) => tab.id !== 'cancelled-tickets-refund' || user?.role?.name !== 'owner');

  return (
    <nav className="header-tabs" aria-label="Operator dashboard sections">
      {visibleTabs.map((tab) => (
        <button
          key={tab.id}
          className={currentView === tab.id ? 'active' : ''}
          onClick={() => onSelectView(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};
