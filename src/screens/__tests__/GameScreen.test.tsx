import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GameScreen } from '../GameScreen';
import { useStore } from '../../store/useStore';

jest.useFakeTimers();

jest.mock('../../components/Numpad', () => ({
  Numpad: ({ onPress, onSubmit, onClear }: any) => {
    const React = require('react');
    const { View, Text, TouchableOpacity } = require('react-native');
    return (
      <View>
        <TouchableOpacity onPress={() => onPress('5')}><Text>Press 5</Text></TouchableOpacity>
        <TouchableOpacity onPress={onSubmit}><Text>Submit</Text></TouchableOpacity>
        <TouchableOpacity onPress={onClear}><Text>Clear</Text></TouchableOpacity>
      </View>
    );
  }
}));

jest.mock('../../components/SecondChanceModal', () => ({ SecondChanceModal: () => 'SecondChanceModal' }));
jest.mock('../../components/QuitGameModal', () => ({ QuitGameModal: () => 'QuitGameModal' }));
jest.mock('../../components/AdNotReadyModal', () => ({ AdNotReadyModal: () => 'AdNotReadyModal' }));

describe('GameScreen', () => {
  const mockNavigation = {
    goBack: jest.fn(),
    replace: jest.fn(),
  };

  const mockRoute = {
    params: {
      mode: 'train',
      difficulty: 'Beginner',
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders countdown initially', () => {
    const { getByText } = render(
      <NavigationContainer>
        <GameScreen navigation={mockNavigation as any} route={mockRoute as any} />
      </NavigationContainer>
    );
    expect(getByText('STARTING IN...')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('progresses to flashing phase after countdown', () => {
    const { getByText, queryByText } = render(
      <NavigationContainer>
        <GameScreen navigation={mockNavigation as any} route={mockRoute as any} />
      </NavigationContainer>
    );
    
    act(() => {
      jest.advanceTimersByTime(2500); // 3 * 800ms = 2400ms for countdown
    });
    
    expect(queryByText('STARTING IN...')).toBeNull();
  });
});
