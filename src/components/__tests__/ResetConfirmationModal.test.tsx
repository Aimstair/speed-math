import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ResetConfirmationModal } from '../ResetConfirmationModal';

describe('ResetConfirmationModal', () => {
  const mockOnCancel = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const { getByText } = render(
      <ResetConfirmationModal visible={true} onCancel={mockOnCancel} onConfirm={mockOnConfirm} />
    );
    expect(getByText('RESET ALL?')).toBeTruthy();
    expect(getByText('DANGER ZONE')).toBeTruthy();
  });

  it('calls onConfirm when RESET EVERYTHING button is pressed', () => {
    const { getByText } = render(
      <ResetConfirmationModal visible={true} onCancel={mockOnCancel} onConfirm={mockOnConfirm} />
    );
    fireEvent.press(getByText('RESET EVERYTHING'));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('calls onCancel when CANCEL button is pressed', () => {
    const { getByText } = render(
      <ResetConfirmationModal visible={true} onCancel={mockOnCancel} onConfirm={mockOnConfirm} />
    );
    fireEvent.press(getByText('CANCEL'));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
