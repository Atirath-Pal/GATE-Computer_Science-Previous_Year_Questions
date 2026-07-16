import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function PaperPage() {
  const { year } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the JSON file whenever the "year" parameter changes
  useEffect(() => {
    setLoading(true);
    setError(null);
    setSelectedIdx(0); // Reset to question 1 when swapping years

    // Using import.meta.env.BASE_URL handles subdirectory routing on GitHub Pages perfectly
    const fetchUrl = `${import.meta.env.BASE_URL}data/questions/gate-${year}.json`;

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Could not find question data for GATE CS ${year}`);
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
  }, [year]);

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl font-medium text-gray-500">Loading questions...</div>
      </div>
    );
  }

  // Error Screen
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

  return (
    <div className="min-h-screen bg-white p-4 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-[1280px] flex flex-col gap-6 md:gap-8">
        
        {/* Back Button Link */}
        <div className="self-start">
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            ← Back to All Papers
          </Link>
        </div>

        {/* Block 1: Heading Block */}
        <div className="w-full bg-[#E5E5E5] min-h-[120px] md:min-h-[160px] flex flex-col items-center justify-center rounded-lg p-4">
          <span className="text-xl md:text-3xl text-black font-semibold tracking-wide">
            GATE CS {year} SOLVED PAPER
          </span>
          <span className="text-sm text-gray-600 mt-2 font-medium">
            Double-check formulas and solutions with interactive step-by-step guidance
          </span>
        </div>

        {/* Block 2: Question Selection Grid */}
        <div className="w-full bg-[#E5E5E5] p-6 rounded-lg">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
            Select Question ({questions.length} available)
          </h3>
          <div className="flex flex-wrap gap-2">
            {questions.map((q, idx) => (
              <button
                key={q.number}
                onClick={() => setSelectedIdx(idx)}
                className={`w-12 h-12 text-sm font-bold rounded-md border transition-all flex items-center justify-center ${
                  selectedIdx === idx
                    ? "bg-black text-white border-black scale-105 shadow-md"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
              >
                {q.number}
              </button>
            ))}
          </div>
        </div>

        {/* Block 3: Selected Question Area */}
        <div className="w-full bg-[#E5E5E5] min-h-[500px] rounded-lg p-6 md:p-10 flex flex-col justify-between">
          
          <div>
            {/* Subject and Marks Metadata header */}
            <div className="border-b border-gray-400 pb-3 mb-6 flex justify-between items-center text-black">
              <span className="font-bold text-sm tracking-wider uppercase">
                Question {currentQuestion?.number} • {currentQuestion?.subject} ({currentQuestion?.type})
              </span>
              <span className="font-semibold text-sm">
                Marks: {currentQuestion?.marks}
              </span>
            </div>

            {/* Main Question Text */}
            <div className="mb-8">
              <p className="text-lg md:text-2xl text-black font-medium leading-relaxed whitespace-pre-line">
                {currentQuestion?.questionText}
              </p>
            </div>

            {/* Answer Options Grid */}
            {currentQuestion?.options ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                {currentQuestion.options.map((opt, oIdx) => (
                  <div 
                    key={oIdx} 
                    className="bg-white border border-gray-300 hover:border-black p-5 rounded-lg cursor-pointer transition-all flex items-center shadow-sm"
                  >
                    <span className="font-bold text-gray-600 mr-3">
                      {String.fromCharCode(65 + oIdx)})
                    </span>
                    <span className="text-black font-medium">{opt}</span>
                  </div>
                ))}
              </div>
            ) : (
              /* For NAT questions */
              <div className="max-w-md bg-white border border-gray-300 p-4 rounded-lg shadow-sm">
                <span className="text-gray-500 text-sm block mb-2 font-semibold uppercase">Numerical Answer Input</span>
                <input 
                  type="text" 
                  disabled 
                  placeholder="Enter numerical value" 
                  className="w-full bg-gray-100 p-3 rounded border border-gray-300 font-medium text-black cursor-not-allowed"
                />
              </div>
            )}
          </div>

          {/* Quick Nav Footer inside the Question box */}
          <div className="border-t border-gray-400 pt-6 mt-10 flex justify-between items-center">
            <button 
              disabled={selectedIdx === 0}
              onClick={() => setSelectedIdx(prev => prev - 1)}
              className="px-5 py-2.5 text-sm font-bold bg-white text-black border border-gray-300 rounded-md hover:bg-gray-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← PREVIOUS
            </button>
            <button 
              disabled={selectedIdx === questions.length - 1}
              onClick={() => setSelectedIdx(prev => prev + 1)}
              className="px-5 py-2.5 text-sm font-bold bg-black text-white rounded-md hover:bg-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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