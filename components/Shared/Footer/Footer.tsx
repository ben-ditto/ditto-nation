import React, { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

import useMedia from "lib/useMedia";

//Fetch Patreon
import {
  useQuery,
  dehydrate,
  QueryClient,
  isError,
} from "@tanstack/react-query";
import { patreonRequestClient } from "src/lib/clients/axiosClient";

//Components
import Marquee from "react-fast-marquee";
import { Patreon, Instagram } from "components/Icons";

// const ENDPOINT = "http://127.0.0.1:4001";
const ENDPOINT = "https://ditto-discord.herokuapp.com";
// const MSGENDPOINT = "http://127.0.0.1:4001/messages";
const MSGENDPOINT = "https://ditto-discord.herokuapp.com/messages";
const TESTAPI =
  "https://datausa.io/api/data?drilldowns=Nation&measures=Population";

type restResponse = {
  messages: string[];
};

const Footer = () => {
  const [list, setList] = useState<string[]>([]);
  const [firstRequest, setFirstRequest] = useState(false);

  const isDesktop = useMedia();

  const { data, isLoading, isSuccess, isError, error } = useQuery<restResponse>(
    ["messages"],
    () => axios.get(MSGENDPOINT).then((res) => res.data),
    {
      onSuccess: (data) => {
        console.log("success");
        console.log("use init data", data);
        if (!firstRequest) {
          setList(data.messages.reverse());
          setFirstRequest(true);
          console.log("list after init", list);
        }
      },
    }
  );

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("FromAPI", (data: string) => {
      console.log("socketdata", data);
      let tempArr = [...list];
      console.log(tempArr);
      if (tempArr.length > 10) {
        tempArr.splice(0, 1);
      }
      tempArr.push(data);
      setList(() => tempArr);
      console.log("list final", list);
    });

    //Cleanup
    return () => {
      socket.disconnect();
    };
  }, [list]);

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-screen bg-black text-white grid grid-cols-[auto_auto] items-center">
      <div className="flex border-r border-r-white p-2">
        <button className="hover:opacity-80 mr-2">
          <a
            href="https://www.patreon.com/ben_ditto"
            target="_blank"
            rel="noreferrer"
          >
            <Patreon className="h-5 w-6" />
          </a>
        </button>
        <button className="hover:opacity-80 mr-2">
          <img className="max-h-6" src="/instagram.svg" alt="Instagram Logo" />
        </button>
        <button className="hover:opacity-80">
          <img className="max-h-6" src="/discord.svg" alt="Discord Logo" />
        </button>
      </div>

      {isLoading && (
        <span className="select-none whitespace-nowrap">
          Loading... Loading... Loading... Loading... Loading... Loading...
          Loading... Loading... Loading... Loading... Loading... Loading...
          Loading... Loading... Loading... Loading...{" "}
        </span>
      )}
      {isError && (
        <span className="select-none whitespace-nowrap">
          NO DISCORD TODAY - NO DISCORD TODAY - NO DISCORD TODAY - NO DISCORD
          TODAY - NO DISCORD TODAY - NO DISCORD TODAY - NO DISCORD TODAY
        </span>
      )}
      {list?.length > 0 && (
        <Marquee
          speed={isDesktop ? 10 : 18}
          pauseOnHover
          gradient={false}
          className="px-4 teleFont text-xs font-bold !min-w-[70%] hover:text-pink cursor-pointer"
        >
          <span className="select-none whitespace-nowrap">
            {[...list].reverse().join("  +++  ")}
          </span>
        </Marquee>
      )}
    </footer>
  );
};

export default Footer;
