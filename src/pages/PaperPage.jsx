import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import QuestionSelector from '../components/QuestionSelector';
import QuestionViewer from '../components/QuestionViewer';
import QuestionFooter from '../components/QuestionFooter';

function PaperPage() {
  const { fileName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userAnswers, setUserAnswers] = useState({});
  const [checkedStatus, setCheckedStatus] = useState({});

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSelectedIdx(0);
    setUserAnswers({});
    setCheckedStatus({});

    const decodedFileName = decodeURIComponent(fileName);
    const fetchUrl = `${import.meta.env.BASE_URL}data/questions/${decodedFileName}`;

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Could not find question data for ${decodedFileName}`);
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
    if (!fileName) return 'GATE CS SOLVED PAPER';
    const decoded = decodeURIComponent(fileName);
    return decoded.replace('.json', '').replace(/-/g, ' ').toUpperCase();
  };

  const resolveImageUrl = (path) => {
    if (!path) return '';
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${import.meta.env.BASE_URL}${cleanPath}`;
  };

  const handleOptionSelect = (optLetter) => {
    if (checkedStatus[selectedIdx]) return;
    setUserAnswers((prev) => ({ ...prev, [selectedIdx]: optLetter }));
  };

  const handleNatChange = (e) => {
    if (checkedStatus[selectedIdx]) return;
    setUserAnswers((prev) => ({ ...prev, [selectedIdx]: e.target.value }));
  };

  const handleCheckAnswer = () => {
    setCheckedStatus((prev) => ({ ...prev, [selectedIdx]: true }));
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
  const optType = currentQuestion?.optionsType || 'text';

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

        <QuestionSelector
          questions={questions}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
          userAnswers={userAnswers}
          checkedStatus={checkedStatus}
        />

        <div className="w-full bg-[#E5E5E5] min-h-[500px] rounded-lg p-6 md:p-10 flex flex-col justify-between shadow-inner">
          <QuestionViewer
            question={currentQuestion}
            currentAnswer={currentAnswer}
            isCurrentlyChecked={isCurrentlyChecked}
            handleOptionSelect={handleOptionSelect}
            handleNatChange={handleNatChange}
            optType={optType}
            correctAnsArray={correctAnsArray}
            resolveImageUrl={resolveImageUrl}
          />

          <QuestionFooter
            selectedIdx={selectedIdx}
            questionsLength={questions.length}
            setSelectedIdx={setSelectedIdx}
            handleCheckAnswer={handleCheckAnswer}
            currentAnswer={currentAnswer}
            isCurrentlyChecked={isCurrentlyChecked}
          />
        </div>
      </div>
    </div>
  );
}

export default PaperPage;
