import EndPoll from "~~/components/EndPoll";
import HasUserVoted from "~~/components/HasUserVoted";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function PollList() {
  const { data: pollCount } = useScaffoldReadContract({
    contractName: "VotingContract",
    functionName: "getPollCount",
  });

  const renderPolls = () => {
    if (!pollCount) return <p className="text-center text-white">Загрузка...</p>;
    const polls = [];
    for (let i: number = 0; i < pollCount; i++) {
      polls.push(<PollItem key={i} pollId={BigInt(i)} />);
    }
    return polls;
  };

  return (
    <div className="max-w-3xl bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-orange-500 p-6 text-white">
        <h2 className="text-3xl font-bold text-center">Список голосований</h2>
      </div>
      <div className="p-6 space-y-6">
        {pollCount && pollCount > 0 ? (
          renderPolls()
        ) : (
          <p className="text-center text-gray-500">Нет активных голосований</p>
        )}
      </div>
    </div>
  );
}

function PollItem({ pollId }: { pollId: bigint }) {
  const { data } = useScaffoldReadContract({
    contractName: "VotingContract",
    functionName: "getPollDetails",
    args: [BigInt(pollId)],
  });

  const { writeContractAsync } = useScaffoldWriteContract({
    contractName: "VotingContract",
  });

  if (!data) return <p className="text-center text-gray-500">Загрузка...</p>;

  const [question, options, , isActive] = data;
  return (
    <div className="bg-gray-50 p-5 rounded-md shadow-md border border-gray-200 mb-10">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{question}</h3>
      <ul className="space-y-2">
        {options.map((opt: string, idx: number) => (
          <li key={idx} className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-700 font-medium">{opt}</span>
            {isActive && (
              <button
                onClick={() =>
                  writeContractAsync({
                    functionName: "vote",
                    args: [BigInt(pollId), BigInt(idx)],
                  })
                }
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Голосовать
              </button>
            )}
          </li>
        ))}
      </ul>
      {!isActive && <p className="mt-4 text-sm text-red-500">Голосование завершено</p>}
      {isActive && <EndPoll pollId={pollId} />}
      <HasUserVoted pollId={pollId} />
    </div>
  );
}
