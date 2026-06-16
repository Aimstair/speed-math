import React from 'react';
import { render, act } from '@testing-library/react-native';
import { SplashScreen } from '../SplashScreen';
import { NavigationContainer } from '@react-navigation/native';

jest.useFakeTimers();

describe('SplashScreen', () => {
  const mockNavigation = {
    replace: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <SplashScreen navigation={mockNavigation as any} route={{} as any} />
      </NavigationContainer>
    );
    expect(getByText('SPEED')).toBeTruthy();
    expect(getByText('MATH')).toBeTruthy();
    expect(getByText('SHARPEN YOUR MIND')).toBeTruthy();
  });

  it('navigates to MainMenu after timeout', () => {
    render(
      <NavigationContainer>
        <SplashScreen navigation={mockNavigation as any} route={{} as any} />
      </NavigationContainer>
    );
    
    act(() => {
      jest.advanceTimersByTime(2500);
      jest.advanceTimersByTime(300);
    });

    expect(mockNavigation.replace).toHaveBeenCalledWith('MainMenu');
  });
});
