import React, { useState } from 'react';
import { Send, Sparkles, Brain, Clock } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export function AskDoubt() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI academic assistant powered by Gemini. I can help you with doubts related to your subjects, explain concepts, solve problems, and guide you through academic challenges. What would you like to know today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (in real implementation, this would call Gemini API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    // Enhanced AI responses for better demo experience
    const responses = {
      database: "Database normalization is the process of organizing data to reduce redundancy and improve data integrity. Here's a quick overview:\n\n• **1NF (First Normal Form)**: Each column contains atomic values\n• **2NF (Second Normal Form)**: No partial dependencies on composite keys\n• **3NF (Third Normal Form)**: No transitive dependencies\n\n**Example**: A student table with student_id, name, course_id, course_name violates 3NF because course_name depends on course_id, not directly on student_id.\n\nWould you like me to explain any specific normal form with detailed examples?",
      
      algorithm: "Great question about algorithms! Here's a comprehensive overview:\n\n**Time Complexity Analysis**:\n• O(1) - Constant time (array access)\n• O(log n) - Logarithmic (binary search)\n• O(n) - Linear (linear search)\n• O(n log n) - Linearithmic (merge sort)\n• O(n²) - Quadratic (bubble sort)\n\n**Space Complexity**: Measures memory usage\n\n**Example**: Binary search has O(log n) time complexity because it eliminates half the search space in each iteration.\n\nWhat specific algorithm would you like me to explain or help you implement?",
      
      programming: "Programming concepts can be challenging! I can help with:\n\n**Core Concepts**:\n• Data structures (arrays, linked lists, trees, graphs)\n• Object-oriented programming (classes, inheritance, polymorphism)\n• Algorithm design and optimization\n• Debugging techniques\n• Code optimization\n\n**Languages**: Java, Python, C++, JavaScript, and more\n\n**Best Practices**:\n• Clean code principles\n• Design patterns\n• Testing strategies\n\nCould you share more details about what specific programming topic you're working on?",
      
      math: "Mathematics is the foundation of computer science! Here are key areas:\n\n**Discrete Mathematics**:\n• Logic and proofs\n• Set theory\n• Graph theory\n• Combinatorics\n\n**Calculus**:\n• Derivatives and integrals\n• Limits and continuity\n• Applications in optimization\n\n**Statistics & Probability**:\n• Descriptive statistics\n• Probability distributions\n• Hypothesis testing\n\n**Linear Algebra**:\n• Vectors and matrices\n• Eigenvalues and eigenvectors\n• Applications in machine learning\n\nWhat mathematical concept would you like me to explain or help you solve?",
      
      ai: "Artificial Intelligence is fascinating! Here's an overview:\n\n**Machine Learning Types**:\n• Supervised Learning (classification, regression)\n• Unsupervised Learning (clustering, dimensionality reduction)\n• Reinforcement Learning (reward-based learning)\n\n**Key Algorithms**:\n• Neural Networks\n• Decision Trees\n• Support Vector Machines\n• K-means Clustering\n\n**Applications**:\n• Natural Language Processing\n• Computer Vision\n• Robotics\n• Recommendation Systems\n\nWhat specific AI topic interests you?",
      
      web: "Web development is exciting! Here's the full stack:\n\n**Frontend**:\n• HTML5, CSS3, JavaScript\n• React, Vue, Angular\n• Responsive design\n• Progressive Web Apps\n\n**Backend**:\n• Node.js, Python, Java\n• RESTful APIs\n• Database integration\n• Authentication & security\n\n**DevOps**:\n• Version control (Git)\n• CI/CD pipelines\n• Cloud deployment\n• Performance optimization\n\nWhat aspect of web development would you like to explore?",
      
      default: "That's an interesting question! I'm here to help with various academic topics including:\n\n• **Computer Science**: Programming, algorithms, data structures\n• **Mathematics**: Calculus, statistics, discrete math\n• **Database Systems**: SQL, normalization, design\n• **Web Development**: Frontend, backend, full-stack\n• **Artificial Intelligence**: Machine learning, neural networks\n• **Software Engineering**: Design patterns, testing, architecture\n\nCould you provide more context or specify which subject area this relates to? This will help me give you a more targeted and useful explanation with examples!"
    };

    const lowerQuestion = question.toLowerCase();
    
    // Enhanced keyword matching
    if (lowerQuestion.includes('database') || lowerQuestion.includes('sql') || lowerQuestion.includes('normalization') || lowerQuestion.includes('dbms')) {
      return responses.database;
    } else if (lowerQuestion.includes('algorithm') || lowerQuestion.includes('complexity') || lowerQuestion.includes('big o') || lowerQuestion.includes('sorting') || lowerQuestion.includes('searching')) {
      return responses.algorithm;
    } else if (lowerQuestion.includes('programming') || lowerQuestion.includes('code') || lowerQuestion.includes('java') || lowerQuestion.includes('python') || lowerQuestion.includes('javascript') || lowerQuestion.includes('oop')) {
      return responses.programming;
    } else if (lowerQuestion.includes('math') || lowerQuestion.includes('calculus') || lowerQuestion.includes('statistics') || lowerQuestion.includes('probability') || lowerQuestion.includes('discrete')) {
      return responses.math;
    } else if (lowerQuestion.includes('ai') || lowerQuestion.includes('machine learning') || lowerQuestion.includes('neural') || lowerQuestion.includes('artificial intelligence')) {
      return responses.ai;
    } else if (lowerQuestion.includes('web') || lowerQuestion.includes('html') || lowerQuestion.includes('css') || lowerQuestion.includes('react') || lowerQuestion.includes('frontend') || lowerQuestion.includes('backend')) {
      return responses.web;
    } else {
      return responses.default;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Academic Assistant</h1>
              <p className="text-blue-100">Powered by Google Gemini - Ask any academic doubt</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-lg px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="text-sm leading-relaxed whitespace-pre-line">
                  {message.content.split('\n').map((line, index) => {
                    if (line.startsWith('•')) {
                      return (
                        <div key={index} className="ml-2 mb-1">
                          {line}
                        </div>
                      );
                    } else if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <div key={index} className="font-semibold mb-2 mt-2">
                          {line.replace(/\*\*/g, '')}
                        </div>
                      );
                    } else if (line.trim() === '') {
                      return <br key={index} />;
                    } else {
                      return (
                        <div key={index} className="mb-1">
                          {line}
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="flex items-center mt-2 text-xs opacity-70">
                  <Clock className="h-3 w-3 mr-1" />
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 animate-pulse text-blue-600" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Demo Questions */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <p className="text-sm text-gray-600 mb-3">Try these demo questions:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Explain database normalization",
              "What is Big O notation?",
              "Help with sorting algorithms",
              "Explain machine learning",
              "Web development basics"
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => setInputValue(question)}
                className="text-xs bg-white border border-gray-300 rounded-lg px-3 py-1 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex space-x-4">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your academic doubt here... (e.g., 'Explain database normalization' or 'Help with sorting algorithms')"
              className="flex-1 resize-none border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <Sparkles className="h-3 w-3 mr-1" />
            <span>Powered by Google Gemini AI - Responses are generated based on academic knowledge</span>
          </div>
        </div>
      </div>
    </div>
  );
}