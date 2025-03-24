
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/services/FirebaseService";
import LeaderboardTable from "@/components/LeaderboardTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import { toast } from "sonner";

// Define leaderboard entry type
export type LeaderboardEntry = {
  rank: number;
  name: string;
  score: number;
  puzzlesSolved: number;
  bestStreak: number;
};

const Leaderboard = () => {
  const { score, completedPuzzles, streakCount } = useGame();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Fetch leaderboard data from Firestore
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const leaderboardRef = collection(db, "leaderboard");
        const leaderboardQuery = query(
          leaderboardRef, 
          orderBy("score", "desc"), 
          limit(pageSize * page)
        );
        
        const snapshot = await getDocs(leaderboardQuery);
        
        if (snapshot.empty) {
          // If no data in Firebase yet, use sample data
          setLeaderboardData([]);
          setIsLoading(false);
          return;
        }
        
        const leaderboardEntries: LeaderboardEntry[] = snapshot.docs.map((doc, index) => {
          const data = doc.data();
          return {
            rank: index + 1,
            name: data.name || "Unknown Player",
            score: data.score || 0,
            puzzlesSolved: data.puzzlesSolved || 0,
            bestStreak: data.bestStreak || 0,
          };
        });
        
        setLeaderboardData(leaderboardEntries);
        
        // Check if current user is in leaderboard
        const userScore = score;
        if (userScore > 0) {
          const userRankIndex = leaderboardEntries.findIndex(entry => 
            entry.score < userScore
          );
          
          if (userRankIndex !== -1) {
            setUserRank(userRankIndex + 1);
          } else {
            setUserRank(leaderboardEntries.length + 1);
          }
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        toast.error("Failed to load leaderboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [page, score]);

  const handleNextPage = () => {
    setPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    setPage(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">See how you rank against other players</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">Your Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card/60 p-4 rounded-lg border">
                <div className="text-sm text-muted-foreground">Total Score</div>
                <div className="text-2xl font-bold text-primary">{score}</div>
              </div>
              <div className="bg-card/60 p-4 rounded-lg border">
                <div className="text-sm text-muted-foreground">Global Rank</div>
                <div className="text-2xl font-bold text-primary">{userRank || 'N/A'}</div>
              </div>
              <div className="bg-card/60 p-4 rounded-lg border">
                <div className="text-sm text-muted-foreground">Puzzles Solved</div>
                <div className="text-2xl font-bold text-primary">{completedPuzzles}</div>
              </div>
              <div className="bg-card/60 p-4 rounded-lg border">
                <div className="text-sm text-muted-foreground">Best Streak</div>
                <div className="text-2xl font-bold text-primary">{streakCount}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <LeaderboardTable 
          data={leaderboardData} 
          userRank={userRank}
        />
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        <Button 
          variant="outline" 
          onClick={handlePrevPage} 
          disabled={page === 1 || isLoading}
          size="sm"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        <Button 
          variant="outline" 
          onClick={handleNextPage} 
          disabled={leaderboardData.length < pageSize * page || isLoading}
          size="sm"
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Leaderboard;
