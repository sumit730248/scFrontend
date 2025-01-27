import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import generatedQuestions from '@/constants/generatedQuestions';

const CompanyQuestionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredCompanies = generatedQuestions.map(company => {
    const filteredQuestions = company.questions.filter(question =>
      (selectedDifficulty === 'All' || question.difficulty === selectedDifficulty) &&
      (searchTerm === '' || 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        question.question.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return { ...company, questions: filteredQuestions };
  }).filter(company => company.questions.length > 0); // Exclude companies with no matching questions

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/10 text-green-500';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-500';
      case 'Hard': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mt-10 mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Company Interview Questions
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search companies or questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="flex gap-2">
              {difficulties.map(diff => (
                <Button
                  key={diff}
                  variant={selectedDifficulty === diff ? "default" : "outline"}
                  onClick={() => setSelectedDifficulty(diff)}
                  className="min-w-[70px]"
                >
                  {diff}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredCompanies.map(company => (
            <div
              key={company.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedCompany(
                  expandedCompany === company.id ? null : company.id
                )}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {company.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {company.questions.length} questions
                    </p>
                  </div>
                </div>
                {expandedCompany === company.id ? 
                  <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                }
              </div>

              {expandedCompany === company.id && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                  {company.questions.map(question => (
                    <div
                      key={question.id}
                      className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                    >
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {question.question}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          {question.type}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Asked {question.askedCount} times
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {question.likes} likes
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyQuestionsPage;
