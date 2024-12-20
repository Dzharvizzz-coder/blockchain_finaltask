import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function CreatePoll() {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [optionInput, setOptionInput] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  const { writeContractAsync, isMining } = useScaffoldWriteContract({
    contractName: "VotingContract",
  });

  const addOption = () => {
    if (optionInput.trim()) {
      setOptions([...options, optionInput.trim()]);
      setOptionInput("");
    }
  };

  const createPoll = async () => {
    if (question && options.length > 1 && duration > 0) {
      await writeContractAsync({
        functionName: "createPoll",
        args: [question, options, BigInt(duration)],
      });
    } else {
      alert("Пожалуйста, заполните все поля корректно.");
    }
  };

  return (
    <div className="max-w-lg bg-white shadow-md rounded-md overflow-hidden border border-gray-200 mb-10">
      <div className="bg-blue-600 p-6 text-white text-center">
        <h2 className="text-3xl font-semibold">Создание голосования</h2>
        <p className="text-sm mt-1">Заполните детали голосования ниже</p>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
            Вопрос голосования
          </label>
          <input
            id="question"
            type="text"
            placeholder="Введите ваш вопрос"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Добавить вариант ответа"
            value={optionInput}
            onChange={e => setOptionInput(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={addOption}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Добавить
          </button>
        </div>

        {options.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Варианты ответа</h3>
            <ul className="space-y-1">
              {options.map((opt, idx) => (
                <li key={idx} className="px-4 py-2 bg-gray-100 rounded-md border border-gray-200">
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Длительность (в секундах)
          </label>
          <input
            id="duration"
            type="number"
            placeholder="Введите длительность"
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          onClick={createPoll}
          disabled={isMining}
          className={`w-full py-3 text-white font-medium rounded-md transition duration-150 focus:outline-none focus:ring-2 ${isMining ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400"}`}
        >
          {isMining ? "Создание..." : "Создать голосование"}
        </button>
      </div>
    </div>
  );
}
