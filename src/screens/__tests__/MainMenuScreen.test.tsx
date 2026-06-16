import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MainMenuScreen } from '../MainMenuScreen';
import { NavigationContainer } from '@react-navigation/native';
import { useStore } from '../../store/useStore';

jest.mock('../../components/SettingsModal', () => ({
  SettingsModal: () => 'SettingsModal',
}));
jest.mock('../../components/AdNotReadyModal', () => ({
  AdNotReadyModal: () => 'AdNotReadyModal',
}));
jest.mock('../../components/TutorialModal', () => ({
  TutorialModal: () => 'TutorialModal',
}));

describe('MainMenuScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useStore.setState({
      elo: 1500,
      accuracy: 80,
      roundsPlayed: 10,
      competeTries: 3,
      hasSeenTutorial: true,
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <MainMenuScreen navigation={mockNavigation as any} route={{} as any} />
      </NavigationContainer>
    );
    expect(getByText('SPEED')).toBeTruthy();
    expect(getByText('MATH.')).toBeTruthy();
    expect(getByText('1500')).toBeTruthy();
    expect(getByText('80%')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();
    expect(getByText('TRAIN')).toBeTruthy();
    expect(getByText('COMPETE')).toBeTruthy();
  });

  it('navigates to Difficulty screen with train mode', () => {
    const { getByText } = render(
      <NavigationContainer>
        <MainMenuScreen navigation={mockNavigation as any} route={{} as any} />
      </NavigationContainer>
    );
    fireEvent.press(getByText('TRAIN'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Difficulty', { mode: 'train' });
  });

  it('navigates to Difficulty screen with compete mode if tries left', () => {
    const { getByText } = render(
      <NavigationContainer>
        <MainMenuScreen navigation={mockNavigation as any} route={{} as any} />
      </NavigationContainer>
    );
    fireEvent.press(getByText('COMPETE'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Difficulty', { mode: 'compete' });
  });

  it('navigates to Analytics screen', () => {
    const { getByText } = render(
      <NavigationContainer>
        <MainMenuScreen navigation={mockNavigation as any} route={{} as any} />
      </NavigationContainer>
    );
    fireEvent.press(getByText('ANALYTICS'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Analytics');
  });

  it('handles settings button press', () => {
    const { getByText } = render(
      <NavigationContainer>
        <MainMenuScreen navigation={mockNavigation as any} route={{} as any} />
      </NavigationContainer>
    );
    fireEvent.press(getByText('SETTINGS'));
  });
});
