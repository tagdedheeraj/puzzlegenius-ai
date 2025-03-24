
import { motion } from "framer-motion";
import { useState } from "react";
import { Volume2, VolumeX, RefreshCw, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useGame } from "@/contexts/GameContext";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Settings = () => {
  const { level, setDifficulty, score, soundEnabled, toggleSound } = useGame();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  const resetProgress = () => {
    localStorage.removeItem('puzzle_game_score');
    localStorage.removeItem('puzzle_game_level');
    localStorage.removeItem('puzzle_game_completed');
    localStorage.removeItem('puzzle_game_streak');
    toast.success('Progress reset successfully. Refresh the page to see changes.');
    setShowResetConfirm(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Customize your PuzzleGenius experience.
          </p>
        </div>

        <div className="grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Difficulty Level</CardTitle>
                <CardDescription>
                  Adjust the difficulty of puzzles. Higher levels earn more points but are more challenging.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="difficulty">Level: {level}</Label>
                      <span className="text-sm text-muted-foreground">
                        {level === 1 && "Beginner"}
                        {level === 2 && "Easy"}
                        {level === 3 && "Medium"}
                        {level === 4 && "Hard"}
                        {level === 5 && "Expert"}
                      </span>
                    </div>
                    <Slider
                      id="difficulty"
                      min={1}
                      max={5}
                      step={1}
                      value={[level]}
                      onValueChange={(value) => setDifficulty(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground pt-1">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Current reward per puzzle: {level * 10} points
                </p>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Sound Settings</CardTitle>
                <CardDescription>
                  Configure audio settings for the game.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {soundEnabled ? (
                        <Volume2 className="h-5 w-5 text-primary" />
                      ) : (
                        <VolumeX className="h-5 w-5 text-muted-foreground" />
                      )}
                      <Label htmlFor="sound-toggle">Sound Effects</Label>
                    </div>
                    <Switch
                      id="sound-toggle"
                      checked={soundEnabled}
                      onCheckedChange={toggleSound}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Game Progress</CardTitle>
                <CardDescription>
                  View your current progress and achievements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-primary" />
                      <Label>Current Score</Label>
                    </div>
                    <span className="font-semibold">{score} points</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Reset Progress
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reset Your Progress?</DialogTitle>
                      <DialogDescription>
                        This will reset your score, level, completed puzzles, and streak to zero. This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <Alert variant="destructive">
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        All your progress will be lost. Are you sure you want to continue?
                      </AlertDescription>
                    </Alert>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowResetConfirm(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={resetProgress}>
                        Yes, Reset Everything
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>About PuzzleGenius</CardTitle>
                <CardDescription>
                  Puzzle game information and credits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  PuzzleGenius is an AI-powered puzzle game that generates unique challenges to test
                  your pattern recognition, logical reasoning, and problem-solving skills. 
                  Each puzzle is dynamically created to provide a fresh experience every time.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">Version 1.0.0</p>
                <p className="text-sm text-muted-foreground">© {new Date().getFullYear()}</p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
