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
import { Patreon, Telegram, Instagram } from "components/Icons";

// const ENDPOINT = "http://127.0.0.1:4001";
const ENDPOINT = process.env.NEXT_PUBLIC_DISCORD_SERVER_DOMAIN;
// const ENDPOINT = "https://ditto-discord.herokuapp.com";
// const MSGENDPOINT = "http://127.0.0.1:4001/messages";
const MSGENDPOINT = `${ENDPOINT}/messages`;
const TESTAPI =
  "https://datausa.io/api/data?drilldowns=Nation&measures=Population";

console.log("ep", ENDPOINT);

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
    <footer className="fixed bottom-0 left-0 z-40 w-screen bg-black text-white border-t border-white grid grid-cols-[auto_auto] items-center">
      <div className="flex border-r border-r-white p-2">
        <button className="hover:opacity-80 mr-2">
          <a
            href="https://www.patreon.com/ditto_nation"
            target="_blank"
            rel="noreferrer"
          >
            <Patreon className="h-5 w-4 md:w-6" />
          </a>
        </button>

        <button className="hover:opacity-80">
          <a
            href="https://instagram.com/ditto_nation?igshid=YmMyMTA2M2Y="
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="max-h-6 w-5 md:w-6"
              src="/instagram.svg"
              alt="Instagram Logo"
            />
          </a>
        </button>
        <button className="ml-2 hover:opacity-80">
          <a href="https://t.me/ditto_nation" target="_blank" rel="noreferrer">
            <img
              className="max-h-6 w-5 md:w-6"
              src="/telegram.svg"
              alt="Telegram Logo"
            />
          </a>
        </button>
      </div>

      {isLoading && (
        <span className="teleFont overflow-hidden select-none px-4 teleFont text-xs font-bold !max-w-[70%] hover:text-pink cursor-pointer whitespace-nowrap">
          Loading... Loading... Loading... Loading... Loading... Loading...
          Loading... Loading... Loading... Loading... Loading... Loading...
          Loading... Loading... Loading... Loading...{" "}
        </span>
      )}
      {isError && (
        <span className="teleFont overflow-hidden  select-none whitespace-nowrap px-4 teleFont text-xs font-bold !max-w-[70%] hover:text-pink cursor-pointer">
          NO DISCORD TODAY - NO DISCORD TODAY - NO DISCORD TODAY - NO DISCORD
          TODAY - NO DISCORD TODAY - NO DISCORD TODAY - NO DISCORD TODAY
        </span>
      )}
      {list?.length > 0 && (
        <Marquee
          speed={isDesktop ? 20 : 24}
          pauseOnHover
          gradient={false}
          className="px-4 teleFont text-xs font-bold !min-w-[70%] hover:text-pink cursor-pointer"
        >
          <a
            href="https://discord.gg/uCyePCmH"
            target="_blank"
            rel="noreferrer"
          >
            <span className="select-none whitespace-nowrap">
              {[...list].reverse().join("  +++  ")}
            </span>
          </a>
        </Marquee>
      )}
    </footer>
  );
};

export default Footer;
