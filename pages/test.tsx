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
import MarqueeTwo from "components/Shared/Footer/components/Marquee";
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
        console.log(tempArr[1]);
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
    <>
      {/* {isLoading && (
        <span className="select-none">
          Loading... Loading... Loading... Loading... Loading... Loading...
          Loading... Loading... Loading... Loading... Loading... Loading...
          Loading... Loading... Loading... Loading...{" "}
        </span>
      )}
      {isError && (
        <span className="select-none">
          NO DISCORD TODAY - NO DISCORD TODAY - NO DISCORD TODAY - NO DISCORD
          TODAY - NO DISCORD TODAY - NO DISCORD TODAY - NO DISCORD TODAY
        </span>
      )}
      <Marquee speed={isDesktop ? 10 : 10} delay={2}>
        {list?.length > 0 && (
          // [...list].reverse().map((el, idx) => (
          //   <span key={idx} className="select-none">
          //     {` ${el} - `}
          //   </span>
          // ))
          <span className="select-none">
            {[...list].reverse().join("  +++  ")}
          </span>
        )}
      </Marquee> */}

      <MarqueeTwo />
    </>
  );
};

export default Footer;
