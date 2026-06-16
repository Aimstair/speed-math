import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SecondChanceModal } from '../SecondChanceModal';

describe('SecondChanceModal', () => {
  const mockOnCancel = jest.fn();
  const mockOnAdWatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible and ad is ready', () => {
    const { getByText } = render(
      <SecondChanceModal visible={true} onDecline={mockOnCancel} onWatchAd={mockOnAdWatch} />
    );
    expect(getByText('SECOND CHANCE')).toBeTruthy();
    expect(getByText('WATCH AD TO CONTINUE')).toBeTruthy();
  });

  it('renders correctly when visible and ad is not ready', () => {
    const { getByText } = render(
      <SecondChanceModal visible={true} onDecline={mockOnCancel} onWatchAd={mockOnAdWatch} />
    );
    expect(getByText('WATCH AD TO CONTINUE')).toBeTruthy();
  });

  it('calls onAdWatch when WATCH AD TO CONTINUE button is pressed', () => {
    const { getByText } = render(
      <SecondChanceModal visible={true} onDecline={mockOnCancel} onWatchAd={mockOnAdWatch} />
    );
    fireEvent.press(getByText('WATCH AD TO CONTINUE'));
    expect(mockOnAdWatch).toHaveBeenCalled();
  });

  it('calls onCancel when END GAME button is pressed', () => {
    const { getByText } = render(
      <SecondChanceModal visible={true} onDecline={mockOnCancel} onWatchAd={mockOnAdWatch} />
    );
    fireEvent.press(getByText('END GAME'));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
