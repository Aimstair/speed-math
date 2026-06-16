import { playSoundEffect, playClick, beepPlayer, correctPlayer, wrongPlayer, tickPlayer, clickPlayer } from '../audio';

describe('audio utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should play beep sound when enabled', () => {
    playSoundEffect('beep', true);
    expect(beepPlayer.play).toHaveBeenCalled();
  });

  it('should not play beep sound when disabled', () => {
    playSoundEffect('beep', false);
    expect(beepPlayer.play).not.toHaveBeenCalled();
  });

  it('should play correct sound when enabled', () => {
    playSoundEffect('correct', true);
    expect(correctPlayer.play).toHaveBeenCalled();
  });

  it('should play wrong sound when enabled', () => {
    playSoundEffect('wrong', true);
    expect(wrongPlayer.play).toHaveBeenCalled();
  });

  it('should play tick sound when enabled', () => {
    playSoundEffect('tick', true);
    expect(tickPlayer.play).toHaveBeenCalled();
  });

  it('should play click sound when enabled', () => {
    playClick(true);
    expect(clickPlayer.play).toHaveBeenCalled();
  });

  it('should not play click sound when disabled', () => {
    playClick(false);
    expect(clickPlayer.play).not.toHaveBeenCalled();
  });
});
