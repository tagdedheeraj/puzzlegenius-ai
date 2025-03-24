
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, BookOpen, ChevronRight, Sparkles } from "lucide-react";
import { useGame } from "@/contexts/GameContext";

const features = [
  {
    title: "Adaptive Puzzles",
    description: "Each puzzle is uniquely generated with increasing difficulty as you progress",
    icon: <Sparkles className="h-5 w-5 text-primary" />
  },
  {
    title: "Multiple Puzzle Types",
    description: "Explore pattern sequences, word puzzles, logic problems, and more",
    icon: <Brain className="h-5 w-5 text-primary" />
  },
  {
    title: "Track Your Progress",
    description: "See your scores, streaks, and improvement over time",
    icon: <ChevronRight className="h-5 w-5 text-primary" />
  }
];

const Home = () => {
  const navigate = useNavigate();
  const { generateNewPuzzle, completedPuzzles } = useGame();

  const startGame = () => {
    generateNewPuzzle();
    navigate('/play');
  };

  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="bg-primary/10 text-primary rounded-full py-1 px-3 text-sm font-medium inline-block mb-3">
          Artificial Intelligence Puzzle Game
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Challenge Your Mind with
          <span className="text-primary block md:inline"> PuzzleGenius AI</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          PuzzleGenius creates unique, AI-generated puzzles that adapt to your skill level.
          Solve patterns, sequences, logic problems, and word puzzles to train your brain.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 mb-12"
      >
        <Button onClick={startGame} size="lg" className="gap-2">
          <Brain className="h-5 w-5" />
          {completedPuzzles > 0 ? "Continue Playing" : "Start Playing"}
        </Button>
        <Button variant="outline" size="lg" onClick={() => navigate('/tutorial')} className="gap-2">
          <BookOpen className="h-5 w-5" />
          How to Play
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            className="glass-card p-6 rounded-xl text-left"
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-12 p-6 bg-primary/5 border border-primary/10 rounded-xl w-full"
      >
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mb-3">
              <span className="font-bold text-lg">1</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Choose a Puzzle Type</h3>
            <p className="text-muted-foreground text-center">Select from different categories of mind-bending challenges</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mb-3">
              <span className="font-bold text-lg">2</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Solve the Puzzle</h3>
            <p className="text-muted-foreground text-center">Use logic and creativity to find the correct solution</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mb-3">
              <span className="font-bold text-lg">3</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Level Up</h3>
            <p className="text-muted-foreground text-center">Earn points, increase your streak, and face harder challenges</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
