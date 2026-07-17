import { InlineMath } from 'react-katex';
import MathText from './MathText';

function QuestionViewer({
  question,
  currentAnswer,
  isCurrentlyChecked,
  handleOptionSelect,
  handleNatChange,
  optType,
  correctAnsArray,
  resolveImageUrl,
}) {
  return (
    <div>
      <div className="border-b border-gray-400 pb-3 mb-6 flex justify-between items-center text-black">
        <span className="font-bold text-sm tracking-wider uppercase">
          Question {question?.number} • {question?.subject || question?.tag?.join(', ') || 'General'} ({question?.type})
        </span>
        <span className="font-semibold text-sm">
          Marks: {question?.marks}
        </span>
      </div>

      <div className="mb-6">
        <div className="text-lg md:text-2xl text-black font-medium leading-relaxed whitespace-pre-line">
          <MathText text={question?.questionText} />
        </div>
      </div>

      {question?.imageUrl && (
        <div className="mb-8 max-w-full flex justify-start">
          <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm inline-block">
            <img
              src={resolveImageUrl(question.imageUrl)}
              alt={`Diagram for Question ${question.number}`}
              className="max-h-[350px] w-auto max-w-full object-contain rounded"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>
      )}

      {question?.options ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {question.options.map((opt, oIdx) => {
            const optLetter = String.fromCharCode(65 + oIdx);
            const isSelected = currentAnswer === optLetter;
            const isCorrectOption = correctAnsArray.includes(optLetter);

            let optionStyle = 'bg-white border-gray-300 hover:border-black';
            if (isCurrentlyChecked) {
              if (isCorrectOption) optionStyle = 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-500 shadow-md';
              else if (isSelected && !isCorrectOption) optionStyle = 'bg-red-100 border-red-500 ring-2 ring-red-500 opacity-80';
              else optionStyle = 'bg-gray-100 border-gray-200 opacity-50';
            } else if (isSelected) {
              optionStyle = 'bg-blue-50 border-blue-500 ring-2 ring-blue-500 shadow-md';
            }

            let optionContent;
            if (optType === 'image') {
              optionContent = (
                <img
                  src={resolveImageUrl(opt)}
                  alt={`Option ${optLetter}`}
                  className="max-h-[120px] object-contain rounded"
                />
              );
            } else if (optType === 'latex') {
              optionContent = <InlineMath math={opt} />;
            } else {
              optionContent = <MathText text={opt} />;
            }

            return (
              <div
                key={oIdx}
                onClick={() => handleOptionSelect(optLetter)}
                className={`border p-5 rounded-lg cursor-pointer transition-all flex items-center ${optionStyle} ${isCurrentlyChecked ? 'cursor-default' : 'hover:-translate-y-0.5'}`}
              >
                <span className={`font-bold mr-4 ${isCurrentlyChecked && isCorrectOption ? 'text-emerald-700' : isCurrentlyChecked && isSelected && !isCorrectOption ? 'text-red-700' : isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                  {optLetter})
                </span>
                <span className={`font-medium w-full overflow-x-auto ${isCurrentlyChecked && isCorrectOption ? 'text-emerald-900' : isCurrentlyChecked && isSelected && !isCorrectOption ? 'text-red-900' : 'text-black'}`}>
                  {optionContent}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-md">
          <div className={`bg-white border p-4 rounded-lg shadow-sm transition-all ${isCurrentlyChecked ? 'border-gray-300' : (currentAnswer ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300')}`}>
            <span className="text-gray-500 text-sm block mb-2 font-semibold uppercase">Numerical Answer Input</span>
            <input
              type="text"
              value={currentAnswer || ''}
              onChange={handleNatChange}
              disabled={isCurrentlyChecked}
              placeholder="Enter numerical value"
              className={`w-full p-3 rounded border font-medium text-black focus:outline-none focus:border-blue-500 ${isCurrentlyChecked ? 'bg-gray-100 cursor-not-allowed border-gray-300' : 'bg-white border-gray-300'}`}
            />
          </div>

          {isCurrentlyChecked && (
            <div className="mt-4 p-4 bg-emerald-100 border-l-4 border-emerald-500 rounded-r-lg flex items-center justify-between">
              <span className="font-semibold text-emerald-800">Accepted Answer / Range:</span>
              <span className="text-xl font-black text-emerald-900">{correctAnsArray.join(' OR ')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionViewer;
