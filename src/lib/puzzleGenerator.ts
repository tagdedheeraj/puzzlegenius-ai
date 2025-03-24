
export type PuzzleType = 'pattern' | 'sequence' | 'logic' | 'word';

export interface PuzzleData {
  type: PuzzleType;
  question: string;
  inputs: {
    placeholder: string;
    type: 'text' | 'number';
    maxLength?: number;
  }[];
  solution: string;
  hint: string;
  explanation: string;
}

// Function to generate a random integer within a range
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to get a random item from an array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate a pattern-based puzzle
const generatePatternPuzzle = (level: number): PuzzleData => {
  const patterns = [
    { 
      sequence: [2, 4, 6, 8], 
      next: 10,
      rule: 'add 2'
    },
    { 
      sequence: [1, 3, 5, 7], 
      next: 9,
      rule: 'add 2'
    },
    { 
      sequence: [3, 6, 9, 12], 
      next: 15,
      rule: 'add 3'
    },
    { 
      sequence: [1, 4, 9, 16], 
      next: 25,
      rule: 'square the position number'
    },
    { 
      sequence: [2, 4, 8, 16], 
      next: 32,
      rule: 'multiply by 2'
    },
    { 
      sequence: [1, 3, 6, 10], 
      next: 15,
      rule: 'triangular numbers'
    },
    { 
      sequence: [1, 1, 2, 3, 5], 
      next: 8,
      rule: 'Fibonacci sequence'
    },
  ];

  // Higher levels get more complex patterns
  const advancedPatterns = [
    { 
      sequence: [3, 4, 7, 8, 11], 
      next: 12,
      rule: 'alternate +1, +3' 
    },
    { 
      sequence: [100, 90, 81, 73], 
      next: 66,
      rule: 'subtract 10, then 9, then 8...'
    },
    { 
      sequence: [4, 7, 12, 19, 28], 
      next: 39,
      rule: 'add 3, then 5, then 7...'
    },
  ];

  let selectedPattern;
  
  if (level <= 3) {
    selectedPattern = getRandomItem(patterns);
  } else {
    // 50% chance of advanced pattern for higher levels
    selectedPattern = Math.random() < 0.5 ? 
      getRandomItem(advancedPatterns) : 
      getRandomItem(patterns);
  }

  return {
    type: 'pattern',
    question: `What's the next number in this sequence? ${selectedPattern.sequence.join(', ')}, ...`,
    inputs: [
      {
        placeholder: 'Next number',
        type: 'number',
      }
    ],
    solution: selectedPattern.next.toString(),
    hint: `Think about how each number relates to the previous one.`,
    explanation: `The pattern follows the rule: ${selectedPattern.rule}.`
  };
};

// Generate a sequence-based puzzle
const generateSequencePuzzle = (level: number): PuzzleData => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
  // Simple letter sequences
  const simpleSequences = [
    {
      sequence: ['A', 'C', 'E', 'G'],
      next: 'I',
      rule: 'Skip one letter each time'
    },
    {
      sequence: ['A', 'B', 'D', 'G'],
      next: 'K',
      rule: 'Positions in alphabet: 1, 2, 4, 7, 11 (add 1, then 2, then 3...)'
    },
    {
      sequence: ['Z', 'Y', 'X', 'W'],
      next: 'V',
      rule: 'Reverse alphabet'
    },
    {
      sequence: ['A', 'E', 'I', 'O'],
      next: 'U',
      rule: 'Vowels in order'
    }
  ];
  
  // Complex letter sequences for higher levels
  const complexSequences = [
    {
      sequence: ['A', 'C', 'F', 'J'],
      next: 'O',
      rule: 'Positions: 1, 3, 6, 10, 15 (triangular numbers)'
    },
    {
      sequence: ['B', 'F', 'J', 'N'],
      next: 'R',
      rule: 'Start at B and add 4 positions each time'
    },
    {
      sequence: ['Z', 'W', 'T', 'Q'],
      next: 'N',
      rule: 'Move backward 3 positions each time'
    }
  ];
  
  let selectedSequence;
  
  if (level <= 2) {
    selectedSequence = getRandomItem(simpleSequences);
  } else {
    selectedSequence = Math.random() < 0.6 ? 
      getRandomItem(complexSequences) : 
      getRandomItem(simpleSequences);
  }
  
  return {
    type: 'sequence',
    question: `What letter comes next in this sequence? ${selectedSequence.sequence.join(', ')}, ...`,
    inputs: [
      {
        placeholder: 'Next letter',
        type: 'text',
        maxLength: 1
      }
    ],
    solution: selectedSequence.next,
    hint: `Think about the pattern of movement through the alphabet.`,
    explanation: `The sequence follows the rule: ${selectedSequence.rule}.`
  };
};

// Generate a logic-based puzzle
const generateLogicPuzzle = (level: number): PuzzleData => {
  const simpleLogicTemplates = [
    {
      template: "If ABC = 123 and DEF = 456, what does HIJ equal?",
      solution: "8910",
      rule: "Each letter corresponds to its position in the alphabet (A=1, B=2, etc.)"
    },
    {
      template: "If CAT = 24 and DOG = 26, what does BIRD equal?",
      solution: "27",
      rule: "Sum of the positions of each letter in the alphabet (C=3, A=1, T=20, so 3+1+20=24)"
    },
    {
      template: "If BLUE is coded as CMVF, how would you code RED?",
      solution: "SFE",
      rule: "Each letter is replaced by the letter that follows it in the alphabet"
    }
  ];
  
  const advancedLogicTemplates = [
    {
      template: "If 3456 = 18, 5678 = 26, and 2345 = 14, what does 4567 equal?",
      solution: "22",
      rule: "Sum of the digits"
    },
    {
      template: "If HOUSE = 71 and CHAIR = 49, what does TABLE equal?",
      solution: "48",
      rule: "Each letter is assigned its position value in the alphabet (A=1, B=2...) and then summed"
    },
    {
      template: "In a certain code, if MIND = 37, THINK = 52, what does PUZZLE equal?",
      solution: "83",
      rule: "Add the positions of the letters in the alphabet (M=13, I=9, N=14, D=4, so 13+9+14+4=40)"
    }
  ];
  
  let puzzle;
  
  if (level <= 2) {
    puzzle = getRandomItem(simpleLogicTemplates);
  } else {
    puzzle = Math.random() < 0.7 ? 
      getRandomItem(advancedLogicTemplates) : 
      getRandomItem(simpleLogicTemplates);
  }
  
  return {
    type: 'logic',
    question: puzzle.template,
    inputs: [
      {
        placeholder: 'Answer',
        type: 'text'
      }
    ],
    solution: puzzle.solution,
    hint: "Look for patterns in how the values relate to the letters or numbers.",
    explanation: `Solution method: ${puzzle.rule}.`
  };
};

// Generate a word-based puzzle
const generateWordPuzzle = (level: number): PuzzleData => {
  const anagrams = [
    {
      word: "LISTEN",
      anagram: "SILENT",
      hint: "What you do with your ears"
    },
    {
      word: "EARTH",
      anagram: "HEART",
      hint: "An organ in your body"
    },
    {
      word: "SAVE",
      anagram: "VASE",
      hint: "You put flowers in this"
    },
    {
      word: "NIGHT",
      anagram: "THING",
      hint: "An object or item"
    }
  ];
  
  const wordLogic = [
    {
      question: "What 5-letter word becomes shorter when you add two letters to it?",
      answer: "SHORT",
      hint: "Think literally about the word 'shorter'"
    },
    {
      question: "I'm a word that becomes shorter when you add two letters. What am I?",
      answer: "SHORT",
      hint: "Think literally about the word 'shorter'"
    },
    {
      question: "What 4-letter word can be written forward, backward, or upside down, and still be the same word?",
      answer: "NOON",
      hint: "Think about a time of day"
    }
  ];
  
  const missingVowels = [
    {
      incomplete: "C_MP_T_R",
      complete: "COMPUTER",
      hint: "An electronic device you use everyday"
    },
    {
      incomplete: "T_L_PH_N_",
      complete: "TELEPHONE",
      hint: "A communication device"
    },
    {
      incomplete: "K_YB__RD",
      complete: "KEYBOARD",
      hint: "You type on this"
    }
  ];
  
  let puzzle;
  let inputType: 'anagram' | 'logic' | 'missing' = 'logic';
  
  if (level <= 2) {
    // Simple puzzles
    if (Math.random() < 0.5) {
      inputType = 'anagram';
      puzzle = getRandomItem(anagrams);
    } else {
      inputType = 'missing';
      puzzle = getRandomItem(missingVowels);
    }
  } else {
    // More complex word puzzles for higher levels
    const rand = Math.random();
    if (rand < 0.3) {
      inputType = 'anagram';
      puzzle = getRandomItem(anagrams);
    } else if (rand < 0.7) {
      inputType = 'logic';
      puzzle = getRandomItem(wordLogic);
    } else {
      inputType = 'missing';
      puzzle = getRandomItem(missingVowels);
    }
  }
  
  if (inputType === 'anagram') {
    return {
      type: 'word',
      question: `Rearrange the letters of ${puzzle.word} to form another word.`,
      inputs: [
        {
          placeholder: 'New word',
          type: 'text'
        }
      ],
      solution: puzzle.anagram,
      hint: puzzle.hint,
      explanation: `${puzzle.word} and ${puzzle.anagram} are anagrams of each other.`
    };
  } else if (inputType === 'logic') {
    return {
      type: 'word',
      question: puzzle.question,
      inputs: [
        {
          placeholder: 'Answer',
          type: 'text'
        }
      ],
      solution: puzzle.answer,
      hint: puzzle.hint,
      explanation: `The answer is ${puzzle.answer}.`
    };
  } else {
    return {
      type: 'word',
      question: `Fill in the missing vowels: ${puzzle.incomplete}`,
      inputs: [
        {
          placeholder: 'Complete word',
          type: 'text'
        }
      ],
      solution: puzzle.complete,
      hint: puzzle.hint,
      explanation: `The complete word is ${puzzle.complete}.`
    };
  }
};

// Main function to generate puzzles based on type and level
export const generatePuzzle = (type: PuzzleType, level: number): PuzzleData => {
  switch(type) {
    case 'pattern':
      return generatePatternPuzzle(level);
    case 'sequence':
      return generateSequencePuzzle(level);
    case 'logic':
      return generateLogicPuzzle(level);
    case 'word':
      return generateWordPuzzle(level);
    default:
      // Default to pattern
      return generatePatternPuzzle(level);
  }
};
