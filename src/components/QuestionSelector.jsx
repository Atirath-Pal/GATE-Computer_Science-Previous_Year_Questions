function QuestionSelector({
  questions,
  selectedIdx,
  setSelectedIdx,
  userAnswers,
  checkedStatus,
}) {
  return (
    <div className="w-full bg-[#E5E5E5] p-6 rounded-lg">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
        Select Question ({questions.length} available)
      </h3>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) => {
          const hasAnswered = userAnswers[idx] !== undefined && userAnswers[idx] !== '';
          const isChecked = checkedStatus[idx];

          let btnClass = 'bg-white text-black border-gray-300 hover:bg-gray-100';
          if (selectedIdx === idx) {
            btnClass = 'bg-black text-white border-black scale-105 shadow-md';
          } else if (isChecked) {
            btnClass = 'bg-gray-300 text-gray-600 border-gray-400 opacity-60';
          } else if (hasAnswered) {
            btnClass = 'bg-blue-100 text-blue-800 border-blue-300';
          }

          return (
            <button
              key={q.number || idx}
              onClick={() => setSelectedIdx(idx)}
              className={`w-12 h-12 text-sm font-bold rounded-md border transition-all flex items-center justify-center ${btnClass}`}
            >
              {q.number || idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionSelector;
