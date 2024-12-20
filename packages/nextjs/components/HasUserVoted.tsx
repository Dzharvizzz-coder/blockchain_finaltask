import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function HasUserVoted({ pollId }: { pollId: bigint }) {
  const [userAddress, setUserAddress] = useState<string>("");

  const { data: hasVoted } = useScaffoldReadContract({
    contractName: "VotingContract",
    functionName: "hasUserVoted",
    args: [pollId, userAddress],
  });

  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [isConnected, address]);

  if (hasVoted === undefined) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-sm">
        <span className="text-gray-600 text-sm">Проверяем статус...</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center mt-10 rounded-lg shadow-lg text-white ${
        hasVoted ? "bg-green-500" : "bg-red-400"
      }`}
    >
      <p className="text-lg font-medium">
        {hasVoted ? "Вы уже проголосовали в этом голосовании." : "Вы ещё не проголосовали в этом голосовании."}
      </p>
    </div>
  );
}
