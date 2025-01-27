function generateQuestions() {
const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Facebook",
  "Apple",
  "Netflix",
  "Tesla",
  "Uber",
  "Spotify",
  "Airbnb",
  "Salesforce",
  "Adobe",
  "Intel",
];
  
  // Define ranges for number of questions per difficulty
  const difficultyRanges = {
    Easy: { min: 5, max: 12 },
    Medium: { min: 3, max: 8 },
    Hard: { min: 2, max: 5 }
  };

  const types = [
    "System Design",
    "Algorithms",
    "Data Structures",
    "Networking",
    "Database",
    "Security",
    "Cloud Computing",
    "AI/ML",
    "Operating Systems",
    "Web Development"
  ];

  const questionsPool = {
    Easy: [
      "Implement bubble sort",
      "Find the maximum element in an array",
      "Reverse a linked list",
      "Check if a string is a palindrome",
      "Generate Fibonacci sequence",
      "Find the second largest number in an array",
      "Implement a stack using arrays",
      "Check if a number is prime",
      "Convert a binary number to decimal",
      "Check if two strings are anagrams",
      "Merge two sorted arrays",
      "Find the GCD of two numbers",
      "Remove duplicates from an array",
      "Sort an array using selection sort",
      "Count the number of vowels in a string"
    ],
    Medium: [
      "Implement a LRU Cache",
      "Find the longest increasing subsequence",
      "Implement a binary search tree",
      "Design a URL shortening service",
      "Find the first non-repeating character in a string",
      "Detect a cycle in a linked list",
      "Find all subsets of a set",
      "Implement Dijkstra's shortest path algorithm",
      "Design a simple chat application",
      "Implement a trie for string matching",
      "Convert an infix expression to postfix",
      "Find the kth largest element in an array",
      "Implement quicksort",
      "Check if a binary tree is balanced"
    ],
    Hard: [
      "Design a distributed key-value store",
      "How would you design Google Drive?",
      "Design Amazon's shopping cart system",
      "Implement a consistent hashing algorithm",
      "How would you design a load balancer?",
      "Design a fault-tolerant distributed database",
      "Optimize a caching mechanism for real-time systems",
      "Implement Paxos or Raft consensus algorithm",
      "How would you design a social media platform?",
      "Design a payment gateway",
      "Build a scalable recommendation system",
      "Implement a distributed file system like HDFS"
    ]
  };

  // Helper function to get random number within range
  const getRandomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Helper function to get random questions without duplicates
  const getRandomQuestions = (pool, count) => {
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const companyQuestions = companies.map((company, companyId) => {
    let questionId = companyId * 1000; // Increased range for question IDs
    const questions = Object.entries(difficultyRanges).flatMap(([difficulty, range]) => {
      // Generate random number of questions for this difficulty
      const questionCount = getRandomInRange(range.min, range.max);
      
      // Get random questions from pool without duplicates
      const selectedQuestions = getRandomQuestions(questionsPool[difficulty], questionCount);
      
      return selectedQuestions.map(questionText => ({
        id: ++questionId,
        question: questionText,
        difficulty: difficulty,
        type: types[Math.floor(Math.random() * types.length)],
        askedCount: getRandomInRange(50, 250), // Random asked count between 50-250
        likes: getRandomInRange(20, 120), // Random likes between 20-120
        lastAsked: new Date(Date.now() - getRandomInRange(0, 90) * 24 * 60 * 60 * 1000).toISOString() // Random date within last 90 days
      }));
    });

    return {
      id: companyId + 1,
      name: company,
      logo: `/api/placeholder/48/48?text=${company[0]}`, // Creates placeholder with company initial
      questions: questions
    };
  });

  return companyQuestions;
}

const generatedQuestions = generateQuestions();

export default generatedQuestions;
