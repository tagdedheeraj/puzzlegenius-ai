
import React, { createContext, useContext, useState, useEffect } from 'react';
import { generatePuzzle, PuzzleData, PuzzleType } from '@/lib/puzzleGenerator';
import { toast } from 'sonner';

interface GameContextType {
  puzzle: PuzzleData | null;
  score: number;
  level: number;
  gameMode: PuzzleType;
  isLoading: boolean;
  completedPuzzles: number;
  streakCount: number;
  playerAnswers: string[];
  generateNewPuzzle: (type?: PuzzleType) => void;
  submitAnswer: (answer: string) => boolean;
  setPlayerAnswer: (index: number, value: string) => void;
  resetPuzzle: () => void;
  requestHint: () => void;
  setGameMode: (mode: PuzzleType) => void;
  setDifficulty: (level: number) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(null);
  const [score, setScore] = useState<number>(() => {
    const savedScore = localStorage.getItem('puzzle_game_score');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });
  const [level, setLevel] = useState<number>(() => {
    const savedLevel = localStorage.getItem('puzzle_game_level');
    return savedLevel ? parseInt(savedLevel, 10) : 1;
  });
  const [gameMode, setGameMode] = useState<PuzzleType>(() => {
    const savedMode = localStorage.getItem('puzzle_game_mode');
    return savedMode ? (savedMode as PuzzleType) : 'pattern';
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completedPuzzles, setCompletedPuzzles] = useState<number>(() => {
    const saved = localStorage.getItem('puzzle_game_completed');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [streakCount, setStreakCount] = useState<number>(() => {
    const saved = localStorage.getItem('puzzle_game_streak');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [playerAnswers, setPlayerAnswers] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('puzzle_game_sound');
    return saved !== null ? saved === 'true' : true;
  });

  // Initialize local storage
  useEffect(() => {
    if (!localStorage.getItem('puzzle_game_score')) {
      localStorage.setItem('puzzle_game_score', '0');
    }
    if (!localStorage.getItem('puzzle_game_level')) {
      localStorage.setItem('puzzle_game_level', '1');
    }
    if (!localStorage.getItem('puzzle_game_completed')) {
      localStorage.setItem('puzzle_game_completed', '0');
    }
    if (!localStorage.getItem('puzzle_game_streak')) {
      localStorage.setItem('puzzle_game_streak', '0');
    }
    if (localStorage.getItem('puzzle_game_sound') === null) {
      localStorage.setItem('puzzle_game_sound', 'true');
    }
  }, []);

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('puzzle_game_score', score.toString());
    localStorage.setItem('puzzle_game_level', level.toString());
    localStorage.setItem('puzzle_game_mode', gameMode);
    localStorage.setItem('puzzle_game_completed', completedPuzzles.toString());
    localStorage.setItem('puzzle_game_streak', streakCount.toString());
    localStorage.setItem('puzzle_game_sound', soundEnabled.toString());
  }, [score, level, gameMode, completedPuzzles, streakCount, soundEnabled]);

  const generateNewPuzzle = (type?: PuzzleType) => {
    setIsLoading(true);
    setTimeout(() => {
      const selectedType = type || gameMode;
      const newPuzzle = generatePuzzle(selectedType, level);
      setPuzzle(newPuzzle);
      
      // Initialize player answers with empty strings
      setPlayerAnswers(Array(newPuzzle.inputs.length).fill(''));
      
      setIsLoading(false);
    }, 600); // Adding a slight delay for visual feedback
  };

  const setPlayerAnswer = (index: number, value: string) => {
    setPlayerAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[index] = value;
      return newAnswers;
    });
  };

  const submitAnswer = (answer: string): boolean => {
    if (!puzzle) return false;
    
    const isCorrect = playerAnswers.join('').toLowerCase() === puzzle.solution.toLowerCase();
    
    if (isCorrect) {
      // Success logic
      const pointsEarned = level * 10;
      setScore(prev => prev + pointsEarned);
      setCompletedPuzzles(prev => prev + 1);
      setStreakCount(prev => prev + 1);
      
      toast.success(`Correct! +${pointsEarned} points`, {
        position: 'top-center',
      });
      
      // Auto-generate a new puzzle after a short delay
      setTimeout(() => {
        generateNewPuzzle();
      }, 1500);
      
      return true;
    } else {
      // Failure logic
      setStreakCount(0);
      toast.error('Not quite right. Try again!', {
        position: 'top-center',
      });
      return false;
    }
  };

  const resetPuzzle = () => {
    if (!puzzle) return;
    setPlayerAnswers(Array(puzzle.inputs.length).fill(''));
  };

  const requestHint = () => {
    if (!puzzle || score < 5) return;
    
    // Hint costs 5 points
    setScore(prev => prev - 5);
    
    // Find an empty or incorrect position to give a hint for
    const firstEmptyIndex = playerAnswers.findIndex((ans, idx) => 
      ans === '' || ans.toLowerCase() !== puzzle.solution[idx]?.toLowerCase()
    );
    
    if (firstEmptyIndex !== -1) {
      // Set the correct value for this position
      setPlayerAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[firstEmptyIndex] = puzzle.solution[firstEmptyIndex];
        return newAnswers;
      });
      
      toast.info('Hint applied! (-5 points)', {
        position: 'top-center',
      });
    } else {
      // No empty or incorrect positions
      toast.info('No hints needed!', {
        position: 'top-center',
      });
    }
  };

  const setDifficulty = (newLevel: number) => {
    setLevel(newLevel);
    toast.info(`Difficulty set to ${newLevel}`, {
      position: 'top-center',
    });
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  return (
    <GameContext.Provider value={{
      puzzle,
      score,
      level,
      gameMode,
      isLoading,
      completedPuzzles,
      streakCount,
      playerAnswers,
      generateNewPuzzle,
      submitAnswer,
      setPlayerAnswer,
      resetPuzzle,
      requestHint,
      setGameMode,
      setDifficulty,
      soundEnabled,
      toggleSound,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
