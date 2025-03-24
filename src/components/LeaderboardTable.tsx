
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Award, Medal } from "lucide-react";

type LeaderboardEntry = {
  rank: number;
  name: string;
  score: number;
  puzzlesSolved: number;
  bestStreak: number;
};

// Sample data - in a real app, this would come from a database
const sampleLeaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "GeniusSolver", score: 1250, puzzlesSolved: 43, bestStreak: 12 },
  { rank: 2, name: "PuzzleMaster", score: 980, puzzlesSolved: 35, bestStreak: 9 },
  { rank: 3, name: "BrainTeaser", score: 850, puzzlesSolved: 32, bestStreak: 8 },
  { rank: 4, name: "LogicWizard", score: 720, puzzlesSolved: 28, bestStreak: 7 },
  { rank: 5, name: "MindBender", score: 690, puzzlesSolved: 25, bestStreak: 6 },
  { rank: 6, name: "PuzzleKing", score: 640, puzzlesSolved: 22, bestStreak: 6 },
  { rank: 7, name: "RiddleMaster", score: 580, puzzlesSolved: 20, bestStreak: 5 },
  { rank: 8, name: "ThoughtLeader", score: 510, puzzlesSolved: 18, bestStreak: 5 },
  { rank: 9, name: "PatternPro", score: 490, puzzlesSolved: 16, bestStreak: 4 },
  { rank: 10, name: "MathMagician", score: 450, puzzlesSolved: 15, bestStreak: 4 },
];

interface LeaderboardTableProps {
  data?: LeaderboardEntry[];
  userRank?: number | null;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  data = sampleLeaderboardData,
  userRank,
}) => {
  // Function to render rank badge
  const renderRankBadge = (rank: number) => {
    if (rank === 1) {
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    } else if (rank === 2) {
      return <Award className="h-5 w-5 text-gray-400" />;
    } else if (rank === 3) {
      return <Medal className="h-5 w-5 text-amber-600" />;
    }
    return rank;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-xl md:text-2xl">Top Players</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Puzzles</TableHead>
                <TableHead className="text-right">Best Streak</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry, index) => (
                <TableRow 
                  key={index}
                  className={userRank === entry.rank ? "bg-primary/20" : ""}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center justify-center">
                      {renderRankBadge(entry.rank)}
                    </div>
                  </TableCell>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell className="text-right font-semibold">{entry.score}</TableCell>
                  <TableCell className="text-right">{entry.puzzlesSolved}</TableCell>
                  <TableCell className="text-right">{entry.bestStreak}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardTable;
