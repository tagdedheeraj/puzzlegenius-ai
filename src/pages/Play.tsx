
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RefreshCw, Lightbulb, Clock, Trophy, Sparkles, Brain, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGame } from "@/contexts/GameContext";
import { PuzzleType } from "@/lib/puzzleGenerator";
import { Separator } from "@/components/ui/separator";

const puzzleTypes: { value: PuzzleType; label: string; icon: any }[] = [
  { value: "pattern", label: "Number Patterns", icon: Trophy },
  { value: "sequence", label: "Letter Sequences", icon: Sparkles },
  { value: "logic", label: "Logic Puzzles", icon: Brain },
  { value: "word", label: "Word Puzzles", icon: BarChart },
];

const Play = () => {
  const {
    puzzle,
    gameMode,
    isLoading,
    generateNewPuzzle,
    submitAnswer,
    playerAnswers,
    setPlayerAnswer,
    resetPuzzle,
    requestHint,
    setGameMode,
    score,
  } = useGame();
  
  const [selectedTab, setSelectedTab] = useState<PuzzleType>(gameMode);
  const [timer, setTimer] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Generate puzzle on mount if none exists
  useEffect(() => {
    if (!puzzle) {
      generateNewPuzzle(selectedTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Focus first input when puzzle loads
  useEffect(() => {
    if (puzzle && !isLoading && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [puzzle, isLoading]);
  
  // Timer functionality
  useEffect(() => {
    let interval: number | undefined;
    
    if (puzzle && !isLoading && timerActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000) as unknown as number;
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [puzzle, isLoading, timerActive]);
  
  // Start timer when puzzle is loaded
  useEffect(() => {
    if (puzzle && !isLoading) {
      setTimer(0);
      setTimerActive(true);
      setShowExplanation(false);
    }
  }, [puzzle, isLoading]);
  
  const handleTabChange = (value: string) => {
    setSelectedTab(value as PuzzleType);
    setGameMode(value as PuzzleType);
    generateNewPuzzle(value as PuzzleType);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!puzzle || isSubmitting) return;
    
    setIsSubmitting(true);
    setTimerActive(false);
    
    const success = submitAnswer(playerAnswers.join(''));
    
    if (success) {
      setShowExplanation(true);
    }
    
    setTimeout(() => {
      setIsSubmitting(false);
      if (!success) {
        setTimerActive(true);
      }
    }, 1000);
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleInputChange = (index: number, value: string) => {
    setPlayerAnswer(index, value);
    
    // Auto-advance to next input if this one is filled
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleNewPuzzle = () => {
    generateNewPuzzle(selectedTab);
  };
  
  const handleReset = () => {
    resetPuzzle();
    setTimer(0);
    setTimerActive(true);
    setShowExplanation(false);
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  };

  // Get icon for current puzzle type
  const getPuzzleIcon = () => {
    const puzzleType = puzzleTypes.find(type => type.value === (puzzle?.type || selectedTab));
    const Icon = puzzleType?.icon || Brain;
    return <Icon className="h-5 w-5 text-primary" />;
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2 text-primary glow-text">Puzzle Challenge</h1>
        <p className="text-muted-foreground">
          Solve the puzzle by finding the correct answer. Choose a puzzle type below.
        </p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 w-full bg-card/50 p-1 rounded-xl">
          {puzzleTypes.map((type) => (
            <TabsTrigger 
              key={type.value} 
              value={type.value} 
              disabled={isLoading}
              className="data-[state=active]:bg-secondary data-[state=active]:text-primary"
            >
              <div className="flex items-center">
                <type.icon className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">{type.label}</span>
                <span className="md:hidden">{type.label.split(' ')[0]}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {puzzleTypes.map((type) => (
          <TabsContent key={type.value} value={type.value} className="mt-0">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-h-[400px] flex items-center justify-center"
                >
                  <div className="text-center">
                    <RefreshCw className="h-12 w-12 mx-auto mb-4 text-primary animate-spin" />
                    <p className="text-lg">Generating a new puzzle...</p>
                  </div>
                </motion.div>
              ) : puzzle ? (
                <motion.div
                  key={`puzzle-${puzzle.question}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="overflow-hidden glass-card">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <Badge variant="outline" className="text-xs font-normal capitalize flex items-center gap-1 py-1 px-3 bg-secondary/50 border-border">
                          {getPuzzleIcon()}
                          <span>{puzzle.type}</span>
                        </Badge>
                        <div className="flex items-center text-muted-foreground text-sm bg-secondary/50 rounded-full px-3 py-1">
                          <Clock className="h-4 w-4 mr-1 text-primary" />
                          <span>{formatTime(timer)}</span>
                        </div>
                      </div>
                      
                      <div className="game-border mb-6">
                        <h2 className="text-xl font-semibold mb-6 text-center">{puzzle.question}</h2>
                      </div>
                      
                      <form onSubmit={handleSubmit} className="mb-4">
                        <div className="flex flex-wrap gap-3 justify-center mb-6">
                          {puzzle.inputs.map((input, index) => (
                            <motion.div
                              key={`input-${index}`}
                              className="min-w-[60px]"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                            >
                              <Input
                                ref={(el) => (inputRefs.current[index] = el)}
                                type={input.type}
                                placeholder={input.placeholder}
                                maxLength={input.maxLength}
                                value={playerAnswers[index] || ''}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                className="text-center text-lg h-14 font-semibold bg-card border-border focus:border-primary/70 focus:ring-primary/20"
                                disabled={isSubmitting}
                              />
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            type="submit"
                            className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                            disabled={isSubmitting || playerAnswers.some(a => !a)}
                          >
                            Submit Answer
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                            className="flex-1 gap-2 border-border hover:bg-secondary"
                            disabled={isSubmitting}
                          >
                            <RefreshCw className="h-4 w-4" />
                            Reset
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={requestHint}
                            className="flex-1 gap-2 bg-secondary hover:bg-secondary/80"
                            disabled={isSubmitting || score < 5}
                            title={score < 5 ? "You need at least 5 points for a hint" : "Get a hint (costs 5 points)"}
                          >
                            <Lightbulb className="h-4 w-4 text-yellow-500" />
                            Hint (5 pts)
                          </Button>
                        </div>
                      </form>
                      
                      <AnimatePresence>
                        {showExplanation && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Separator className="my-4 bg-border/50" />
                            <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-primary/20">
                              <h3 className="font-semibold mb-2 text-primary">Explanation</h3>
                              <p>{puzzle.explanation}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className="bg-card/70 p-4 border-t border-border">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                          {showExplanation ? (
                            <span className="text-green-400">Well done! Ready for the next challenge?</span>
                          ) : (
                            <span>Need help? Use a hint or skip to a new puzzle</span>
                          )}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleNewPuzzle}
                          disabled={isLoading}
                          className="hover:text-primary hover:bg-secondary/50"
                        >
                          New Puzzle
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Play;
