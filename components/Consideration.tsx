'use client';

import React, { useState } from 'react';

function getShapeForIndex(index: number): string {
  const shapes = ['◆', '■', '●', '▲'];  // Unicode shapes
  return shapes[index % shapes.length];
}

const DataEthicsQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const handleReset = () => {
    setCurrentStep(0);
    setResponses({});
    setSelectedChoice(null);
    setShowSummary(false);
  };

  const handleChoice = (choice: string) => {
    setSelectedChoice(choice);
    setResponses(prev => ({ ...prev, [currentStep]: choice }));
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedChoice(responses[currentStep - 1] || null);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedChoice(responses[currentStep + 1] || null);
    } else {
      setShowSummary(true);
    }
  };

  const questions = [
    {
      id: 1,
      question: "Who gets to be represented in your dataset?",
      choices: [
        "Only those who speak dominant languages",
        "Those who have internet access",
        "Those with formal education",
        "Communities who self-identify and consent",
      ],
      impact: "This choice determines whose voices and experiences are considered 'valid' in your data. Consider how this shapes power dynamics in knowledge production."
    },
    {
      id: 2,
      question: "How will you handle multilingual data collection?",
      choices: [
        "Translate everything to English",
        "Preserve original languages with translations",
        "Only collect in major languages",
        "Use community translators and preserve context",
      ],
      impact: "Language choices can flatten or preserve cultural nuances. Translation isn't neutral - it involves cultural interpretation."
    },
    {
      id: 3,
      question: "How will you approach cultural concepts that don't translate directly?",
      choices: [
        "Find the closest Western equivalent",
        "Exclude them as 'edge cases'",
        "Preserve original terms with detailed context",
        "Let communities define their own categories",
      ],
      impact: "This decision impacts whether unique cultural concepts are preserved or assimilated into dominant frameworks."
    },
    {
      id: 4,
      question: "How will you handle data collection about traditional knowledge?",
      choices: [
        "Treat it like any other data point",
        "Get permission from community leaders",
        "Implement community-controlled protocols",
        "Exclude traditional knowledge entirely",
      ],
      impact: "Traditional knowledge often has sacred or protected status. How do we respect these boundaries in data collection?"
    },
    {
      id: 5,
      question: "Who will have access to interpret the collected data?",
      choices: [
        "Academic researchers only",
        "Original communities first",
        "Open access to everyone",
        "Regulated access with community oversight",
      ],
      impact: "Data interpretation can reshape narratives about communities. Who gets to tell these stories matters."
    },
    {
      id: 6,
      question: "How will you handle demographic categories?",
      choices: [
        "Use standard government categories",
        "Let people self-identify freely",
        "Use community-defined categories",
        "Avoid demographic categorization",
      ],
      impact: "Categories can reinforce or challenge existing power structures. They shape how people are seen and counted."
    },
    {
      id: 7,
      question: "How will you address historical biases in your data collection?",
      choices: [
        "Focus only on current data",
        "Acknowledge biases in methodology",
        "Actively correct for historical exclusions",
        "Let communities document their histories",
      ],
      impact: "Historical biases shape current data. How we address them affects future representation."
    },
    {
      id: 8,
      question: "How will you handle sensitive cultural information?",
      choices: [
        "Collect everything available",
        "Use content warnings",
        "Follow cultural protocols",
        "Only collect what communities share willingly",
      ],
      impact: "Some information may be sacred or private. How do we respect these boundaries while collecting data?"
    },
    {
      id: 9,
      question: "Who profits from this data collection?",
      choices: [
        "Research institution",
        "Commercial entities",
        "Contributing communities",
        "Public domain with restrictions",
      ],
      impact: "Data collection often creates value. Who benefits from this value has ethical implications."
    },
    {
      id: 10,
      question: "How will you ensure long-term community benefit?",
      choices: [
        "Share research papers",
        "Provide monetary compensation",
        "Develop community resources",
        "Transfer data ownership to communities",
      ],
      impact: "Data collection should benefit source communities, not just researchers or institutions."
    }
  ];

  if (showSummary) {
    return (
      <div className="max-w-3xl mx-auto p-8 border border-gray-200">
        <div className="mb-8">
          <h2 className="text-xl font-normal mb-4">Data Ethics Analysis Summary</h2>
          <p className="text-gray-600 italic">Review your choices and their implications for data collection</p>
        </div>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="border-b border-gray-200 pb-4">
              <div className="mb-2">
                <span className="text-gray-400 mr-2">Question {index + 1}</span>
                <span className="font-medium">{q.question}</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-custom-green">●</span>
                <span>{responses[index]}</span>
              </div>
              <p className="mt-2 text-gray-600 italic text-sm">{q.impact}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 border border-gray-200">
          <p className="text-gray-600 italic">
            Consider how your choices shape power dynamics, cultural representation, 
            and community autonomy in your data collection process. Remember that 
            these decisions have real impacts on communities and their stories.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="mt-6 px-6 py-2 border border-gray-200 hover:bg-gray-50 w-full"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 border border-gray-200">
      <div className="mb-8">
        <h2 className="text-lg mb-2">Question {currentStep + 1} of 10</h2>
        <p className="text-xl font-normal">{questions[currentStep].question}</p>
      </div>

      <div className="space-y-3">
        {questions[currentStep].choices.map((choice, index) => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            className={`w-full text-left p-4 border border-gray-200 hover:bg-custom-green transition-colors 
              flex justify-between items-center group
              ${selectedChoice === choice ? 'bg-custom-green' : 'bg-white'}`}
          >
            <span>{choice}</span>
            <span className="text-gray-400 group-hover:text-custom-green">
              {getShapeForIndex(index)}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 border border-gray-200 italic text-gray-600">
        {questions[currentStep].impact}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePrevious}
          className={`px-6 py-2 border border-gray-200 
            ${currentStep === 0 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}`}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className={`px-6 py-2 border border-gray-200 
            ${!selectedChoice ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-custom-green'}`}
          disabled={!selectedChoice}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataEthicsQuestionnaire;