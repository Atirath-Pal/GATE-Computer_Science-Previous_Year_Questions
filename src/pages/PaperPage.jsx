import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function PaperPage() {
  const { fileName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- NEW STATE FOR INTERACTIVITY ---
  // Stores the user's selected option or typed answer per question index
  const [userAnswers, setUserAnswers] = useState({});
  // Stores whether the user has clicked "Check Answer" for a specific question index
  const [checkedStatus, setCheckedStatus] = useState({});

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSelectedIdx(0);
    
    // Reset user progress when switching papers
    setUserAnswers({});
    setCheckedStatus({});

    const decodedFileName = decodeURIComponent(fileName);
    const fetchUrl = `${import.meta.env.BASE_URL}data/questions/${decodedFileName}`;

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Could not find question data for ${decodedFileName}`);
        }
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [fileName]);

  const getDisplayTitle = () => {
    if (!fileName) return "GATE CS SOLVED PAPER";
    const decoded = decodeURIComponent(fileName);
    return decoded.replace('.json', '').replace(/-/g, ' ').toUpperCase();
  };

  const resolveImageUrl = (path) => {
    if (!path) return '';
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${import.meta.env.BASE_URL}${cleanPath}`;
  };

  // --- INTERACTIVE HANDLERS ---
  const handleOptionSelect = (optLetter) => {
    if (checkedStatus[selectedIdx]) return; // Prevent changing answer after checking
    setUserAnswers(prev => ({
      ...prev,
      [selectedIdx]: optLetter
    }));
  };

  const handleNatChange = (e) => {
    if (checkedStatus[selectedIdx]) return; // Prevent changing after checking
    setUserAnswers(prev => ({
      ...prev,
      [selectedIdx]: e.target.value
    }));
  };

  const handleCheckAnswer = () => {
    setCheckedStatus(prev => ({
      ...prev,
      [selectedIdx]: true
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl font-medium text-gray-500 animate-pulse">Loading interactive environment...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error loading paper</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Go Back Home
        </Link>
      </div>
    );
  }

  const currentQuestion = questions[selectedIdx];
  const isCurrentlyChecked = checkedStatus[selectedIdx];
  const currentAnswer = userAnswers[selectedIdx];

  // Helper to safely format correct answer array for comparison
  const correctAnsArray = currentQuestion?.correctAnswer 
    ? (Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer : [currentQuestion.correctAnswer])
    : [];

  return (
    <div className="min-h-screen bg-white p-4 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-[1280px] flex flex-col gap-6 md:gap-8">
        
        <div className="self-start">
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            ← Back to All Papers
          </Link>
        </div>

        <div className="w-full bg-[#E5E5E5] min-h-[120px] md:min-h-[160px] flex flex-col items-center justify-center rounded-lg p-4 text-center">
          <span className="text-xl md:text-3xl text-black font-semibold tracking-wide">
            {getDisplayTitle()}
          </span>
          <span className="text-sm text-gray-600 mt-2 font-medium">
            Test your knowledge. Select an answer and check your logic.
          </span>
        </div>

        {/* Question Selection Grid */}
        <div className="w-full bg-[#E5E5E5] p-6 rounded-lg">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
            Select Question ({questions.length} available)
          </h3>
          <div className="flex flex-wrap gap-2">
            {questions.map((q, idx) => {
              // Visual indicators on the grid for attempted/checked questions
              const hasAnswered = userAnswers[idx] !== undefined && userAnswers[idx] !== "";
              const isChecked = checkedStatus[idx];
              
              let btnClass = "bg-white text-black border-gray-300 hover:bg-gray-100";
              if (selectedIdx === idx) {
                btnClass = "bg-black text-white border-black scale-105 shadow-md";
              } else if (isChecked) {
                btnClass = "bg-gray-300 text-gray-600 border-gray-400 opacity-60"; // Checked indicator
              } else if (hasAnswered) {
                btnClass = "bg-blue-100 text-blue-800 border-blue-300"; // Answered but not checked indicator
              }

              return (
                <button
                  key={q.number || idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-12 h-12 text-sm font-bold rounded-md border transition-all flex items-center justify-center ${btnClass}`}
                >
                  {q.number || (idx + 1)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Question Area */}
        <div className="w-full bg-[#E5E5E5] min-h-[500px] rounded-lg p-6 md:p-10 flex flex-col justify-between shadow-inner">
          
          <div>
            <div className="border-b border-gray-400 pb-3 mb-6 flex justify-between items-center text-black">
              <span className="font-bold text-sm tracking-wider uppercase">
                Question {currentQuestion?.number} • {currentQuestion?.subject || currentQuestion?.tag?.join(", ") || "General"} ({currentQuestion?.type})
              </span>
              <span className="font-semibold text-sm">
                Marks: {currentQuestion?.marks}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-lg md:text-2xl text-black font-medium leading-relaxed whitespace-pre-line">
                {currentQuestion?.questionText}
              </p>
            </div>

            {currentQuestion?.imageUrl && (
              <div className="mb-8 max-w-full flex justify-start">
                <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm inline-block">
                  <img 
                    src={resolveImageUrl(currentQuestion.imageUrl)} 
                    alt={`Diagram for Question ${currentQuestion.number}`}
                    className="max-h-[350px] w-auto max-w-full object-contain rounded"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Answer Options Grid */}
            {currentQuestion?.options ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                {currentQuestion.options.map((opt, oIdx) => {
                  const optLetter = String.fromCharCode(65 + oIdx); // A, B, C, D
                  const isSelected = currentAnswer === optLetter;
                  const isCorrectOption = correctAnsArray.includes(optLetter);
                  
                  // Determine Dynamic Styling based on state
                  let optionStyle = "bg-white border-gray-300 hover:border-black";
                  
                  if (isCurrentlyChecked) {
                    if (isCorrectOption) {
                      optionStyle = "bg-emerald-100 border-emerald-500 ring-2 ring-emerald-500 shadow-md"; // Reveal correct answer
                    } else if (isSelected && !isCorrectOption) {
                      optionStyle = "bg-red-100 border-red-500 ring-2 ring-red-500 opacity-80"; // Highlight user's wrong answer
                    } else {
                      optionStyle = "bg-gray-100 border-gray-200 opacity-50"; // Fade out other wrong options
                    }
                  } else if (isSelected) {
                    optionStyle = "bg-blue-50 border-blue-500 ring-2 ring-blue-500 shadow-md"; // User selection state
                  }

                  return (
                    <div 
                      key={oIdx} 
                      onClick={() => handleOptionSelect(optLetter)}
                      className={`border p-5 rounded-lg cursor-pointer transition-all flex items-center ${optionStyle} ${isCurrentlyChecked ? 'cursor-default' : 'hover:-translate-y-0.5'}`}
                    >
                      <span className={`font-bold mr-3 ${isCurrentlyChecked && isCorrectOption ? 'text-emerald-700' : isCurrentlyChecked && isSelected && !isCorrectOption ? 'text-red-700' : isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                        {optLetter})
                      </span>
                      <span className={`font-medium ${isCurrentlyChecked && isCorrectOption ? 'text-emerald-900' : isCurrentlyChecked && isSelected && !isCorrectOption ? 'text-red-900' : 'text-black'}`}>
                        {opt}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* For NAT questions */
              <div className="max-w-md">
                <div className={`bg-white border p-4 rounded-lg shadow-sm transition-all ${isCurrentlyChecked ? 'border-gray-300' : (currentAnswer ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300')}`}>
                  <span className="text-gray-500 text-sm block mb-2 font-semibold uppercase">Numerical Answer Input</span>
                  <input 
                    type="text" 
                    value={currentAnswer || ""}
                    onChange={handleNatChange}
                    disabled={isCurrentlyChecked}
                    placeholder="Enter numerical value" 
                    className={`w-full p-3 rounded border font-medium text-black focus:outline-none focus:border-blue-500 ${isCurrentlyChecked ? 'bg-gray-100 cursor-not-allowed border-gray-300' : 'bg-white border-gray-300'}`}
                  />
                </div>
                
                {/* NAT Answer Reveal Box */}
                {isCurrentlyChecked && (
                  <div className="mt-4 p-4 bg-emerald-100 border-l-4 border-emerald-500 rounded-r-lg flex items-center justify-between">
                    <span className="font-semibold text-emerald-800">Accepted Answer / Range:</span>
                    <span className="text-xl font-black text-emerald-900">{correctAnsArray.join(" OR ")}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Nav Footer inside the Question box */}
          <div className="border-t border-gray-400 pt-6 mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button 
              disabled={selectedIdx === 0}
              onClick={() => setSelectedIdx(prev => prev - 1)}
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold bg-white text-black border border-gray-300 rounded-md hover:bg-gray-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← PREVIOUS
            </button>
            
            {/* The Check Answer Button */}
            <button 
              onClick={handleCheckAnswer}
              disabled={!currentAnswer || isCurrentlyChecked}
              className={`w-full sm:w-auto px-8 py-3 text-sm font-black tracking-widest uppercase rounded-md transition-all shadow-md ${
                isCurrentlyChecked 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
                  : !currentAnswer
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/30 active:scale-95'
              }`}
            >
              {isCurrentlyChecked ? '✓ ANSWER CHECKED' : 'CHECK ANSWER'}
            </button>

            <button 
              disabled={selectedIdx === questions.length - 1}
              onClick={() => setSelectedIdx(prev => prev + 1)}
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold bg-black text-white rounded-md hover:bg-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              NEXT →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default PaperPage;