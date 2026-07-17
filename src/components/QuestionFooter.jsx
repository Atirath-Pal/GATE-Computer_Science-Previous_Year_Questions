function QuestionFooter({
  selectedIdx,
  questionsLength,
  setSelectedIdx,
  handleCheckAnswer,
  currentAnswer,
  isCurrentlyChecked,
}) {
  return (
    <div className="border-t border-gray-400 pt-6 mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
      <button
        disabled={selectedIdx === 0}
        onClick={() => setSelectedIdx((prev) => prev - 1)}
        className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold bg-white text-black border border-gray-300 rounded-md hover:bg-gray-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ← PREVIOUS
      </button>

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
        disabled={selectedIdx === questionsLength - 1}
        onClick={() => setSelectedIdx((prev) => prev + 1)}
        className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold bg-black text-white rounded-md hover:bg-gray-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        NEXT →
      </button>
    </div>
  );
}

export default QuestionFooter;
