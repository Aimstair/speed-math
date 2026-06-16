import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AdNotReadyModal } from '../AdNotReadyModal';

describe('AdNotReadyModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const { getByText } = render(<AdNotReadyModal visible={true} onClose={mockOnClose} />);
    expect(getByText('AD NOT READY')).toBeTruthy();
    expect(getByText('Please wait a moment for the ad to load and try again.')).toBeTruthy();
    expect(getByText('OKAY')).toBeTruthy();
  });

  it('calls onClose when OKAY is pressed', () => {
    const { getByText } = render(<AdNotReadyModal visible={true} onClose={mockOnClose} />);
    fireEvent.press(getByText('OKAY'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
