
import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Brain, Settings, BookOpen, Menu, X, Trophy, User, Sparkles, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

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

  const bottomNavItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/play", icon: Brain, label: "Play" },
    { path: "/tutorial", icon: BookOpen, label: "Learn" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background hexagon-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Logo className="h-9 mr-1" />
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
                    ? "text-primary bg-secondary" 
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
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
                        ? "text-primary bg-secondary" 
                        : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
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
                    <p className="text-xl font-semibold text-primary glow-text">{score}</p>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Level</p>
                    <p className="text-xl font-semibold text-primary glow-text">{level}</p>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Solved</p>
                    <p className="text-xl font-semibold text-primary glow-text">{completedPuzzles}</p>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Streak</p>
                    <p className="text-xl font-semibold text-primary glow-text">{streakCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats bar - desktop only */}
      <div className="hidden md:block border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container py-2">
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-muted-foreground mr-1">Score:</span>
              <span className="text-sm font-semibold text-primary">{score}</span>
            </div>
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-muted-foreground mr-1">Level:</span>
              <span className="text-sm font-semibold text-primary">{level}</span>
            </div>
            <div className="flex items-center">
              <Brain className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm font-medium text-muted-foreground mr-1">Solved:</span>
              <span className="text-sm font-semibold text-primary">{completedPuzzles}</span>
            </div>
            <div className="flex items-center">
              <BarChart className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-sm font-medium text-muted-foreground mr-1">Streak:</span>
              <span className="text-sm font-semibold text-primary">{streakCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 container py-6 md:py-8 pb-20 md:pb-8">
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

      {/* Bottom Navigation Bar (Mobile) */}
      <div className="bottom-bar flex justify-around items-center md:hidden">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center py-1",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-full", 
              { "bg-secondary": location.pathname === item.path }
            )}>
              <item.icon className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border bg-card/50 backdrop-blur-sm hidden md:block">
        <div className="container">
          <p>© {new Date().getFullYear()} AIzzle</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
