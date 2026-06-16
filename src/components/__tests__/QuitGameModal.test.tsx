import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QuitGameModal } from '../QuitGameModal';

describe('QuitGameModal', () => {
  const mockOnCancel = jest.fn();
  const mockOnQuit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const { getByText } = render(
      <QuitGameModal visible={true} onCancel={mockOnCancel} onQuit={mockOnQuit} />
    );
    expect(getByText('QUIT GAME?')).toBeTruthy();
    expect(getByText('QUIT GAME')).toBeTruthy();
    expect(getByText('CANCEL')).toBeTruthy();
  });

  it('calls onQuit when QUIT GAME button is pressed', () => {
    const { getByText } = render(
      <QuitGameModal visible={true} onCancel={mockOnCancel} onQuit={mockOnQuit} />
    );
    fireEvent.press(getByText('QUIT GAME'));
    expect(mockOnQuit).toHaveBeenCalled();
  });

  it('calls onCancel when CANCEL button is pressed', () => {
    const { getByText } = render(
      <QuitGameModal visible={true} onCancel={mockOnCancel} onQuit={mockOnQuit} />
    );
    fireEvent.press(getByText('CANCEL'));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
