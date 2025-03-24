
import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Brain, Settings, BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { cn } from "@/lib/utils";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { score, level, completedPuzzles, streakCount } = useGame();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/play", icon: Brain, label: "Play" },
    { path: "/tutorial", icon: BookOpen, label: "How to Play" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Brain className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-semibold">PuzzleGenius</span>
            </motion.div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-foreground/70 hover:text-foreground hover:bg-accent"
                )}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col h-full pt-20 pb-6 px-6">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => cn(
                      "flex items-center py-3 px-4 text-base font-medium rounded-lg transition-colors",
                      isActive 
                        ? "text-primary bg-primary/10" 
                        : "text-foreground/70 hover:text-foreground hover:bg-accent"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-card p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Score</p>
                    <p className="text-xl font-semibold">{score}</p>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Level</p>
                    <p className="text-xl font-semibold">{level}</p>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Solved</p>
                    <p className="text-xl font-semibold">{completedPuzzles}</p>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Streak</p>
                    <p className="text-xl font-semibold">{streakCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats bar - desktop only */}
      <div className="hidden md:block border-b border-border bg-background/50 backdrop-blur-sm">
        <div className="container py-2">
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <span className="text-sm font-medium text-muted-foreground mr-2">Score:</span>
              <span className="text-sm font-semibold">{score}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-muted-foreground mr-2">Level:</span>
              <span className="text-sm font-semibold">{level}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-muted-foreground mr-2">Puzzles Solved:</span>
              <span className="text-sm font-semibold">{completedPuzzles}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-muted-foreground mr-2">Streak:</span>
              <span className="text-sm font-semibold">{streakCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 container py-6 md:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="container">
          <p>© {new Date().getFullYear()} PuzzleGenius AI</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
