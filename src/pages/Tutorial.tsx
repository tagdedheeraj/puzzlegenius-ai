
import { motion } from "framer-motion";
import { Brain, Lightbulb, Award, BarChart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Tutorial = () => {
  const navigate = useNavigate();

  const tutorialSteps = [
    {
      icon: <Brain className="h-5 w-5" />,
      title: "Choose a Puzzle Type",
      description: "Select from four different puzzle categories: Number Patterns, Letter Sequences, Logic Puzzles, and Word Puzzles."
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Solve the Puzzle",
      description: "Read the puzzle carefully and enter your solution in the input field. For multiple inputs, fill all fields."
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Earn Points",
      description: "Get points for each puzzle you solve correctly. Points are based on the difficulty level."
    },
    {
      icon: <BarChart className="h-5 w-5" />,
      title: "Track Progress",
      description: "Build a streak by solving puzzles correctly. Watch your stats grow as you complete more puzzles."
    }
  ];

  const puzzleExamples = [
    {
      type: "Number Patterns",
      example: "What's the next number in this sequence? 2, 4, 6, 8, ...",
      solution: "10",
      explanation: "Each number increases by 2.",
    },
    {
      type: "Letter Sequences",
      example: "What letter comes next in this sequence? A, C, E, G, ...",
      solution: "I",
      explanation: "Each letter skips one position in the alphabet.",
    },
    {
      type: "Logic Puzzles",
      example: "If CAT = 24 and DOG = 26, what does BIRD equal?",
      solution: "27",
      explanation: "Add the position of each letter in the alphabet (B=2, I=9, R=18, D=4, so 2+9+18+4=33).",
    },
    {
      type: "Word Puzzles",
      example: "Rearrange the letters of LISTEN to form another word.",
      solution: "SILENT",
      explanation: "LISTEN and SILENT are anagrams of each other.",
    },
  ];

  const faqs = [
    {
      question: "How do I get hints?",
      answer: "You can use the Hint button on the puzzle screen. Each hint costs 5 points from your score."
    },
    {
      question: "How is difficulty determined?",
      answer: "The difficulty increases as you level up. Higher levels feature more complex puzzles that require deeper thinking."
    },
    {
      question: "Can I change puzzle types?",
      answer: "Yes! You can switch between puzzle types at any time by selecting a different tab in the Play screen."
    },
    {
      question: "How do I earn more points?",
      answer: "You earn points for each puzzle you solve correctly. The points awarded are based on your current level (Level × 10)."
    },
    {
      question: "What is a streak?",
      answer: "A streak counts how many puzzles you've solved correctly in a row without getting one wrong. Try to maintain long streaks!"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">How to Play</h1>
          <p className="text-muted-foreground">
            Learn how PuzzleGenius works and get tips to master the game.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Game Basics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorialSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card p-6 rounded-xl"
              >
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-medium">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Puzzle Examples</h2>
          <div className="space-y-4">
            {puzzleExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl border border-border p-5"
              >
                <div className="mb-3">
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {example.type}
                  </span>
                </div>
                <p className="text-lg mb-3">{example.example}</p>
                <div className="flex flex-col md:flex-row md:items-center gap-3 text-sm">
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">Solution:</span>
                    <span className="font-medium">{example.solution}</span>
                  </div>
                  <div className="hidden md:block h-4 w-px bg-border"></div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">Explanation:</span>
                    <span>{example.explanation}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="bg-white rounded-xl border border-border">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-primary/10 rounded-xl p-6 text-center"
        >
          <Zap className="h-10 w-10 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-3">Ready to Challenge Your Brain?</h2>
          <p className="mb-6 text-muted-foreground max-w-md mx-auto">
            Now that you know how to play, it's time to put your puzzle-solving skills to the test!
          </p>
          <Button onClick={() => navigate('/play')} size="lg">
            Start Playing
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Tutorial;
