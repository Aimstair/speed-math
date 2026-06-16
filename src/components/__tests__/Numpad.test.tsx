import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Numpad } from '../Numpad';

describe('Numpad Component', () => {
  const mockOnPress = jest.fn();
  const mockOnClear = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <Numpad onPress={mockOnPress} onClear={mockOnClear} onSubmit={mockOnSubmit} />
    );

    // Check numbers 0-9
    for (let i = 0; i <= 9; i++) {
      expect(getByText(i.toString())).toBeTruthy();
    }
    
    // Check actions
    expect(getByText('CLR')).toBeTruthy();
    expect(getByText('ENT')).toBeTruthy();
  });

  it('calls onPress with correct number when a number is pressed', () => {
    const { getByText } = render(
      <Numpad onPress={mockOnPress} onClear={mockOnClear} onSubmit={mockOnSubmit} />
    );

    fireEvent.press(getByText('5'));
    expect(mockOnPress).toHaveBeenCalledWith('5');

    fireEvent.press(getByText('0'));
    expect(mockOnPress).toHaveBeenCalledWith('0');
  });

  it('calls onClear when CLR is pressed', () => {
    const { getByText } = render(
      <Numpad onPress={mockOnPress} onClear={mockOnClear} onSubmit={mockOnSubmit} />
    );

    fireEvent.press(getByText('CLR'));
    expect(mockOnClear).toHaveBeenCalled();
  });

  it('calls onSubmit when ENT is pressed', () => {
    const { getByText } = render(
      <Numpad onPress={mockOnPress} onClear={mockOnClear} onSubmit={mockOnSubmit} />
    );

    fireEvent.press(getByText('ENT'));
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
