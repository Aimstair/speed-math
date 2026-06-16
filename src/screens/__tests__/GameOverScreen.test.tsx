import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GameOverScreen } from '../GameOverScreen';
import { NavigationContainer } from '@react-navigation/native';
import { useStore } from '../../store/useStore';

jest.mock('../../components/AdNotReadyModal', () => ({ AdNotReadyModal: () => 'AdNotReadyModal' }));

describe('GameOverScreen', () => {
  const mockNavigation = {
    replace: jest.fn(),
  };

  const mockRouteTrain = {
    params: {
      consecutiveCorrect: 5,
      mode: 'train',
      difficulty: 'Beginner',
      roundTotalTime: 10,
      roundBestTime: 1.5,
    }
  };

  const mockRouteCompete = {
    params: {
      consecutiveCorrect: 1,
      mode: 'compete',
      difficulty: 'Beginner',
      roundTotalTime: 5,
      roundBestTime: 5,
      isWin: true,
      eloDelta: 25,
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly for train mode', () => {
    const { getByText } = render(
      <NavigationContainer>
        <GameOverScreen navigation={mockNavigation as any} route={mockRouteTrain as any} />
      </NavigationContainer>
    );
    expect(getByText('GAME')).toBeTruthy();
    expect(getByText('OVER.')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('ROUNDS COMPLETED')).toBeTruthy();
    expect(getByText('AVG TIME')).toBeTruthy();
    expect(getByText('BEST TIME')).toBeTruthy();
  });

  it('renders correctly for compete mode win', () => {
    const { getByText } = render(
      <NavigationContainer>
        <GameOverScreen navigation={mockNavigation as any} route={mockRouteCompete as any} />
      </NavigationContainer>
    );
    expect(getByText('YOU')).toBeTruthy();
    expect(getByText('WON!')).toBeTruthy();
    expect(getByText('TIME TAKEN')).toBeTruthy();
    expect(getByText('5.00s')).toBeTruthy();
    expect(getByText('ELO CHANGE')).toBeTruthy();
    expect(getByText('+25')).toBeTruthy();
  });

  it('navigates to MainMenu when MAIN MENU is pressed', () => {
    const { getByText } = render(
      <NavigationContainer>
        <GameOverScreen navigation={mockNavigation as any} route={mockRouteTrain as any} />
      </NavigationContainer>
    );
    fireEvent.press(getByText('MAIN MENU'));
    expect(mockNavigation.replace).toHaveBeenCalledWith('MainMenu');
  });

  it('navigates to Game when PLAY AGAIN is pressed', () => {
    const { getByText } = render(
      <NavigationContainer>
        <GameOverScreen navigation={mockNavigation as any} route={mockRouteTrain as any} />
      </NavigationContainer>
    );
    fireEvent.press(getByText('PLAY AGAIN'));
    expect(mockNavigation.replace).toHaveBeenCalledWith('Game', { mode: 'train', difficulty: 'Beginner' });
  });
});
