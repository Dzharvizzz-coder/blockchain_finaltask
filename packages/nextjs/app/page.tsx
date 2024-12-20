"use client";

import { useEffect } from "react";
import CreatePoll from "../components/CreatePoll";
import PollList from "../components/PollList";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import PollResults from "~~/components/PollResults";

const Page: NextPage = () => {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      console.log("Пользователь подключен: ", address);
    }
  }, [isConnected, address]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="min-h-[80vh] bg-gray-500 p-3 rounded-xl flex row gap-5 space-x-10">
        <CreatePoll />

        <PollList />

        <PollResults />
      </div>
    </div>
  );
};

export default Page;
