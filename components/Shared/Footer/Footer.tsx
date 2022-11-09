import React, { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

//Fetch Patreon
import { useQuery, dehydrate, QueryClient } from "@tanstack/react-query";
import { patreonRequestClient } from "src/lib/clients/axiosClient";

//Components
import Marquee from "react-fast-marquee";
import { Patreon, Instagram } from "components/Icons";

const ENDPOINT = "http://127.0.0.1:4001";
const TESTAPI =
  "https://datausa.io/api/data?drilldowns=Nation&measures=Population";

const Footer = () => {
  const { isLoading, error, data, isFetching } = useQuery(["astro"], () =>
    axios.get(TESTAPI).then((res) => res.data)
  );

  console.log(data);
  let arr: any[] = [];

  if (data) {
    arr = data.data;
    arr = arr.concat(arr);
  }

  const [list, setList] = useState([]);
  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);

  //   socket.on("FromAPI", (data) => {
  //     let tempArr = data;
  //     setList(tempArr);
  //   });

  //   //Cleanup
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-screen bg-black text-white grid grid-cols-[auto_auto]">
      <div className="flex border-r border-r-white p-4">
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

      <Marquee
        speed={1.5}
        pauseOnHover
        gradient={false}
        className="p-4 uppercase font-bold !min-w-[70%] hover:text-lime"
      >
        {data &&
          arr.map((el, idx) => (
            <span key={idx} className="select-none">
              {el.Year}: {el.Population}
              {" - "}
            </span>
          ))}
      </Marquee>
    </footer>
  );
};

export default Footer;
