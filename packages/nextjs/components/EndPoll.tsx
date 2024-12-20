import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function EndPoll({ pollId }: { pollId: bigint }) {
  const { writeContractAsync, isMining } = useScaffoldWriteContract({
    contractName: "VotingContract",
  });

  const handleEndPoll = async () => {
    try {
      await writeContractAsync({
        functionName: "endPoll",
        args: [pollId],
      });
      alert("Голосование успешно завершено!");
    } catch (error) {
      console.error("Ошибка при завершении голосования:", error);
      alert("Не удалось завершить голосование.");
    }
  };

  return (
    <div className="p-6 bg-red-600 text-white rounded-lg shadow-lg mx-auto max-w-md">
      <h3 className="text-2xl font-semibold mb-2">Завершить голосование</h3>
      <p className="text-lg mb-4">Вы уверены, что хотите завершить это голосование?</p>
      <button
        onClick={handleEndPoll}
        disabled={isMining}
        className={`w-full py-3 rounded-lg text-lg font-medium ${
          isMining ? "bg-gray-400 cursor-not-allowed" : "bg-red-700 hover:bg-red-800 active:bg-red-900"
        }`}
      >
        {isMining ? "Завершение..." : "Завершить голосование"}
      </button>
    </div>
  );
}
