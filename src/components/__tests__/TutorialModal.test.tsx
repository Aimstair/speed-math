import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TutorialModal } from '../TutorialModal';
import { useStore } from '../../store/useStore';

describe('TutorialModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useStore.setState({ hasSeenTutorial: false });
  });

  it('renders first step correctly', () => {
    const { getByText } = render(<TutorialModal visible={true} />);
    expect(getByText('WELCOME')).toBeTruthy();
    expect(getByText('Welcome to Speed Math!', { exact: false })).toBeTruthy();
    expect(getByText('NEXT')).toBeTruthy();
  });

  it('progresses through steps and completes tutorial', () => {
    const { getByText, rerender } = render(<TutorialModal visible={true} />);
    
    // Step 1
    fireEvent.press(getByText('NEXT'));
    
    // Step 2
    expect(getByText('THE MECHANICS')).toBeTruthy();
    fireEvent.press(getByText('NEXT'));

    // Step 3
    expect(getByText('THE INPUT')).toBeTruthy();
    fireEvent.press(getByText('NEXT'));

    // Step 4
    expect(getByText('THE MODES')).toBeTruthy();
    expect(getByText("LET'S GO")).toBeTruthy();
    fireEvent.press(getByText("LET'S GO"));

    expect(useStore.getState().hasSeenTutorial).toBe(true);
  });
});
