
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import LeaderboardTable from "@/components/LeaderboardTable";
import { useGame } from "@/contexts/GameContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Leaderboard = () => {
  const { score, completedPuzzles, streakCount } = useGame();
  const [currentTab, setCurrentTab] = useState("global");
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  // This is where you would fetch real leaderboard data in a production app
  // For now we're using the sample data in the LeaderboardTable component

  // Calculate user's position (not implemented, just mocked for UI)
  const userRank = 42; // This would be calculated based on real data

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container max-w-4xl mx-auto px-2 sm:px-4"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">Leaderboard</h1>
      
      <Card className="mb-4 md:mb-8">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Your Stats</CardTitle>
          <CardDescription>See how you compare to other players</CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="glass-card p-2 md:p-4 rounded-lg text-center">
              <p className="text-xs md:text-sm text-muted-foreground">Your Score</p>
              <p className="text-lg md:text-2xl font-semibold text-primary glow-text">{score}</p>
            </div>
            <div className="glass-card p-2 md:p-4 rounded-lg text-center">
              <p className="text-xs md:text-sm text-muted-foreground">Puzzles Solved</p>
              <p className="text-lg md:text-2xl font-semibold text-primary glow-text">{completedPuzzles}</p>
            </div>
            <div className="glass-card p-2 md:p-4 rounded-lg text-center">
              <p className="text-xs md:text-sm text-muted-foreground">Best Streak</p>
              <p className="text-lg md:text-2xl font-semibold text-primary glow-text">{streakCount}</p>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm md:text-base text-muted-foreground">
              Your Global Rank: <span className="font-bold text-primary">{userRank}</span>
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="global" className="mb-4 md:mb-6" onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
        </TabsList>
        <TabsContent value="global">
          <LeaderboardTable userRank={userRank} />
        </TabsContent>
        <TabsContent value="friends">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg md:text-xl">Friends Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-8 md:py-12">
              <p className="text-sm md:text-base text-muted-foreground">Connect with friends to see their scores</p>
              {/* This would be implemented with actual friends functionality */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Pagination className="mb-4 md:mb-8">
        <PaginationContent>
          {!isMobile && (
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          )}
          {[1, 2, 3].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink 
                isActive={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {!isMobile && (
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                className={currentPage === 3 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </motion.div>
  );
};

export default Leaderboard;
