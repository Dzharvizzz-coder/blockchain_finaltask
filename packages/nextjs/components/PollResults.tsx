import { useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function PollResults() {
  const [pollId, setPollId] = useState<number>(-1);

  const { data } = useScaffoldReadContract({
    contractName: "VotingContract",
    functionName: "getResults",
    args: [BigInt(pollId)],
  });

  return (
    <div className="flex flex-col items-center p-8 bg-green-900 text-white rounded-xl shadow-lg max-w-md">
      <h3 className="text-3xl font-bold mb-6">Результаты голосования</h3>
      <input
        type="number"
        placeholder="Введите ID голосования"
        onChange={e => setPollId(e.target.value ? Number(e.target.value) : -1)}
        className="w-full p-3 mb-6 bg-white text-gray-800 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
      {data && (
        <div className="w-full p-6 bg-yellow-700 text-white rounded-lg shadow-lg">
          <ul className="space-y-3">
            {data[0].map((option: string, idx: number) => (
              <li key={idx} className="flex justify-between items-center text-lg font-medium">
                <span>{option}</span>
                <span className="bg-gray-900 px-3 py-1 rounded-full text-yellow-300">
                  {Number(data[1][idx])} голосов
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
