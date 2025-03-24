
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

const Leaderboard = () => {
  const { score, completedPuzzles, streakCount } = useGame();
  const [currentTab, setCurrentTab] = useState("global");
  const [currentPage, setCurrentPage] = useState(1);

  // This is where you would fetch real leaderboard data in a production app
  // For now we're using the sample data in the LeaderboardTable component

  // Calculate user's position (not implemented, just mocked for UI)
  const userRank = 42; // This would be calculated based on real data

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Stats</CardTitle>
          <CardDescription>See how you compare to other players</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Your Score</p>
              <p className="text-2xl font-semibold text-primary glow-text">{score}</p>
            </div>
            <div className="glass-card p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Puzzles Solved</p>
              <p className="text-2xl font-semibold text-primary glow-text">{completedPuzzles}</p>
            </div>
            <div className="glass-card p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Best Streak</p>
              <p className="text-2xl font-semibold text-primary glow-text">{streakCount}</p>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-muted-foreground">
              Your Global Rank: <span className="font-bold text-primary">{userRank}</span>
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="global" className="mb-6" onValueChange={setCurrentTab}>
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
              <CardTitle className="text-center text-xl md:text-2xl">Friends Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">Connect with friends to see their scores</p>
              {/* This would be implemented with actual friends functionality */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Pagination className="mb-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
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
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
              className={currentPage === 3 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </motion.div>
  );
};

export default Leaderboard;
