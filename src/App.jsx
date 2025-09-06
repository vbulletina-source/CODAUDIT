import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Download, CheckCircle, Circle } from 'lucide-react';
import { cn } from './lib/utils';

// Utility function for class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Card Component
const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

// Checkbox Component
const Checkbox = ({ checked, onCheckedChange, className, ...props }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    {checked && (
      <CheckCircle className="h-4 w-4 text-primary-foreground" />
    )}
  </button>
);

// Select Component
const Select = ({ value, onValueChange, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative" {...props}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span>{value || 'Select score...'}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      {isOpen && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
          {children.map((child, index) => (
            <div
              key={index}
              onClick={() => {
                onValueChange(child.props.value);
                setIsOpen(false);
              }}
              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
            >
              {child.props.children}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ value, children }) => (
  <div value={value}>{children}</div>
);

// Textarea Component
const Textarea = ({ className, ...props }) => (
  <textarea
    className={cn(
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

// Button Component
const Button = ({ className, variant = 'default', size = 'default', ...props }) => {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
  };
  
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

// Sales stages data
const salesStages = [
  {
    id: 'welcome',
    title: 'Welcome & Confirmation',
    criteria: [
      'Warm and professional greeting',
      'Confirmed appointment details',
      'Established rapport with prospect',
      'Set clear expectations for the call',
      'Obtained permission to proceed'
    ]
  },
  {
    id: 'objections',
    title: 'Initial Objections',
    criteria: [
      'Listened actively to concerns',
      'Acknowledged objections respectfully',
      'Asked clarifying questions',
      'Provided initial reassurance',
      'Maintained positive tone'
    ]
  },
  {
    id: 'needs',
    title: 'Identification of Needs',
    criteria: [
      'Asked open-ended discovery questions',
      'Identified pain points and challenges',
      'Understood current situation',
      'Explored desired outcomes',
      'Confirmed understanding of needs'
    ]
  },
  {
    id: 'presentation',
    title: 'Product Presentation',
    criteria: [
      'Tailored presentation to identified needs',
      'Highlighted relevant features and benefits',
      'Used compelling examples and stories',
      'Maintained engagement throughout',
      'Addressed questions effectively'
    ]
  },
  {
    id: 'preparation',
    title: 'Preparation for Courses',
    criteria: [
      'Explained course structure and timeline',
      'Discussed learning objectives',
      'Addressed scheduling concerns',
      'Outlined support and resources',
      'Set realistic expectations'
    ]
  },
  {
    id: 'pricing',
    title: 'Price & Objection Handling',
    criteria: [
      'Presented pricing clearly and confidently',
      'Emphasized value proposition',
      'Handled price objections skillfully',
      'Offered payment options if applicable',
      'Maintained focus on benefits'
    ]
  },
  {
    id: 'completion',
    title: 'Completion of Sale',
    criteria: [
      'Asked for the sale directly',
      'Handled final objections',
      'Confirmed next steps clearly',
      'Scheduled follow-up actions',
      'Ended on a positive note'
    ]
  }
];

function App() {
  const [expandedStages, setExpandedStages] = useState({});
  const [stageData, setStageData] = useState(
    salesStages.reduce((acc, stage) => {
      acc[stage.id] = {
        checklist: stage.criteria.reduce((checkAcc, criterion, index) => {
          checkAcc[index] = false;
          return checkAcc;
        }, {}),
        score: '',
        comments: ''
      };
      return acc;
    }, {})
  );

  const toggleStage = (stageId) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  const updateChecklist = (stageId, criterionIndex, checked) => {
    setStageData(prev => ({
      ...prev,
      [stageId]: {
        ...prev[stageId],
        checklist: {
          ...prev[stageId].checklist,
          [criterionIndex]: checked
        }
      }
    }));
  };

  const updateScore = (stageId, score) => {
    setStageData(prev => ({
      ...prev,
      [stageId]: {
        ...prev[stageId],
        score
      }
    }));
  };

  const updateComments = (stageId, comments) => {
    setStageData(prev => ({
      ...prev,
      [stageId]: {
        ...prev[stageId],
        comments
      }
    }));
  };

  const getTotalScore = () => {
    return Object.values(stageData).reduce((total, stage) => {
      return total + (parseInt(stage.score) || 0);
    }, 0);
  };

  const getChecklistStats = () => {
    let completed = 0;
    let total = 0;
    
    Object.values(stageData).forEach(stage => {
      Object.values(stage.checklist).forEach(checked => {
        total++;
        if (checked) completed++;
      });
    });
    
    return { completed, total, pending: total - completed };
  };

  const exportToJSON = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      totalScore: getTotalScore(),
      checklistStats: getChecklistStats(),
      stages: salesStages.map(stage => ({
        ...stage,
        data: stageData[stage.id]
      }))
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-audit-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const checklistStats = getChecklistStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Script Evaluation Table
          </h1>
          <p className="text-lg text-gray-600">
            Sales Call Audit System
          </p>
        </div>

        <div className="space-y-6">
          {salesStages.map((stage, index) => (
            <Card key={stage.id} className="overflow-hidden">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleStage(stage.id)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {index + 1}. {stage.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    {stageData[stage.id].score && (
                      <span className="text-sm font-medium text-blue-600">
                        Score: {stageData[stage.id].score}/5
                      </span>
                    )}
                    {expandedStages[stage.id] ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <AnimatePresence>
                {expandedStages[stage.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="space-y-6">
                      {/* Key Criteria */}
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-gray-800">
                          Key Criteria
                        </h4>
                        <ul className="space-y-2">
                          {stage.criteria.map((criterion, criterionIndex) => (
                            <li key={criterionIndex} className="flex items-start space-x-2">
                              <Circle className="h-2 w-2 mt-2 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-700">{criterion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Auditor Checklist */}
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-gray-800">
                          Auditor Checklist
                        </h4>
                        <div className="space-y-3">
                          {stage.criteria.map((criterion, criterionIndex) => (
                            <div key={criterionIndex} className="flex items-center space-x-3">
                              <Checkbox
                                checked={stageData[stage.id].checklist[criterionIndex]}
                                onCheckedChange={(checked) => 
                                  updateChecklist(stage.id, criterionIndex, checked)
                                }
                              />
                              <label className="text-sm text-gray-700 cursor-pointer flex-1">
                                {criterion}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Score and Comments Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Score */}
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-gray-800">
                            Score (1-5)
                          </h4>
                          <Select
                            value={stageData[stage.id].score}
                            onValueChange={(score) => updateScore(stage.id, score)}
                          >
                            <SelectItem value="1">1 - Poor</SelectItem>
                            <SelectItem value="2">2 - Below Average</SelectItem>
                            <SelectItem value="3">3 - Average</SelectItem>
                            <SelectItem value="4">4 - Good</SelectItem>
                            <SelectItem value="5">5 - Excellent</SelectItem>
                          </Select>
                        </div>

                        {/* Comments */}
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-gray-800">
                            Comments
                          </h4>
                          <Textarea
                            placeholder="Add your observations and feedback..."
                            value={stageData[stage.id].comments}
                            onChange={(e) => updateComments(stage.id, e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>

        {/* Summary Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Evaluation Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {getTotalScore()}/35
                </div>
                <div className="text-sm text-gray-600">Total Score</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {checklistStats.completed}
                </div>
                <div className="text-sm text-gray-600">Completed Items</div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {checklistStats.pending}
                </div>
                <div className="text-sm text-gray-600">Pending Items</div>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                onClick={exportToJSON}
                className="inline-flex items-center space-x-2"
                size="lg"
              >
                <Download className="h-5 w-5" />
                <span>Export to JSON</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;