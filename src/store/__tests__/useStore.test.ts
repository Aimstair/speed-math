import { useStore } from '../useStore';

describe('useStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useStore.setState({
      elo: 1000,
      accuracy: 0,
      roundsPlayed: 0,
      correctAnswers: 0,
      highestDifficultyCleared: null,
      recentRounds: [],
      settings: {
        sfx: true,
        screenShake: true,
        backgroundHex: '#000000', // Assuming a default
      },
      statsByDifficulty: {},
      competeTries: 5,
      lastCompeteDate: new Date().toISOString().split('T')[0], // Mocking today
      hasSeenTutorial: false,
    });
  });

  it('should initialize with default values', () => {
    const state = useStore.getState();
    expect(state.elo).toBe(1000);
    expect(state.roundsPlayed).toBe(0);
    expect(state.competeTries).toBe(5);
  });

  it('updateElo should correctly increase and decrease elo, with a minimum of 0', () => {
    useStore.getState().updateElo(50);
    expect(useStore.getState().elo).toBe(1050);

    useStore.getState().updateElo(-100);
    expect(useStore.getState().elo).toBe(950);

    useStore.getState().updateElo(-1000);
    expect(useStore.getState().elo).toBe(0);
  });

  it('recordRound should not update stats if mode is not compete', () => {
    const initialElo = useStore.getState().elo;
    const delta = useStore.getState().recordRound(true, 10, 'Beginner', 'train');
    
    expect(delta).toBe(0);
    expect(useStore.getState().elo).toBe(initialElo);
    expect(useStore.getState().roundsPlayed).toBe(0);
  });

  it('recordRound should update stats correctly on correct answer in compete mode', () => {
    const delta = useStore.getState().recordRound(true, 15, 'Beginner', 'compete');
    
    const state = useStore.getState();
    expect(delta).toBe(1); // Beginner correct yields +1 elo
    expect(state.elo).toBe(1001);
    expect(state.roundsPlayed).toBe(1);
    expect(state.correctAnswers).toBe(1);
    expect(state.accuracy).toBe(100);
    expect(state.recentRounds).toEqual([true]);
    expect(state.highestDifficultyCleared).toBe('Beginner');
    expect(state.statsByDifficulty['Beginner']).toEqual({
      bestTime: 15,
      totalTime: 15,
      correctCount: 1,
    });
  });

  it('recordRound should update stats correctly on wrong answer in compete mode', () => {
    const delta = useStore.getState().recordRound(false, null, 'Expert', 'compete');
    
    const state = useStore.getState();
    expect(delta).toBe(-2); // Expert incorrect yields -2 elo
    expect(state.elo).toBe(998);
    expect(state.roundsPlayed).toBe(1);
    expect(state.correctAnswers).toBe(0);
    expect(state.accuracy).toBe(0);
    expect(state.recentRounds).toEqual([false]);
    expect(state.highestDifficultyCleared).toBeNull();
  });

  it('consumeCompeteTry should decrease tries and return true if available', () => {
    const success = useStore.getState().consumeCompeteTry();
    expect(success).toBe(true);
    expect(useStore.getState().competeTries).toBe(4);
  });

  it('consumeCompeteTry should return false if no tries available', () => {
    useStore.setState({ competeTries: 0 });
    const success = useStore.getState().consumeCompeteTry();
    expect(success).toBe(false);
    expect(useStore.getState().competeTries).toBe(0);
  });

  it('addCompeteTry should increase tries by 1', () => {
    useStore.setState({ competeTries: 0 });
    useStore.getState().addCompeteTry();
    expect(useStore.getState().competeTries).toBe(1);
  });

  it('completeTutorial should set hasSeenTutorial to true', () => {
    expect(useStore.getState().hasSeenTutorial).toBe(false);
    useStore.getState().completeTutorial();
    expect(useStore.getState().hasSeenTutorial).toBe(true);
  });
});
