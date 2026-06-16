import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DifficultyScreen } from '../DifficultyScreen';
import { NavigationContainer } from '@react-navigation/native';
import { useStore } from '../../store/useStore';

describe('DifficultyScreen', () => {
  const mockNavigation = {
    goBack: jest.fn(),
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly for train mode', () => {
    const { getByText } = render(
      <NavigationContainer>
        <DifficultyScreen navigation={mockNavigation as any} route={{ params: { mode: 'train' } } as any} />
      </NavigationContainer>
    );
    expect(getByText('SELECT')).toBeTruthy();
    expect(getByText('LEVEL.')).toBeTruthy();
    expect(getByText('TRAIN')).toBeTruthy();
    expect(getByText('BEGINNER')).toBeTruthy();
    expect(getByText('INTERMEDIATE')).toBeTruthy();
    expect(getByText('EXPERT')).toBeTruthy();
    expect(getByText('OLYMPIAD')).toBeTruthy();
  });

  it('renders correctly for compete mode', () => {
    const { getByText } = render(
      <NavigationContainer>
        <DifficultyScreen navigation={mockNavigation as any} route={{ params: { mode: 'compete' } } as any} />
      </NavigationContainer>
    );
    expect(getByText('COMPETE')).toBeTruthy();
  });

  it('navigates to Game screen when difficulty is selected in train mode', () => {
    const { getByText } = render(
      <NavigationContainer>
        <DifficultyScreen navigation={mockNavigation as any} route={{ params: { mode: 'train' } } as any} />
      </NavigationContainer>
    );
    fireEvent.press(getByText('BEGINNER'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Game', { mode: 'train', difficulty: 'Beginner' });
  });

  it('navigates to Game screen when difficulty is selected in compete mode if tries exist', () => {
    useStore.setState({ competeTries: 1 });
    const { getByText } = render(
      <NavigationContainer>
        <DifficultyScreen navigation={mockNavigation as any} route={{ params: { mode: 'compete' } } as any} />
      </NavigationContainer>
    );
    fireEvent.press(getByText('BEGINNER'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Game', { mode: 'compete', difficulty: 'Beginner' });
    expect(useStore.getState().competeTries).toBe(0);
  });
});
