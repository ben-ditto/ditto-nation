import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

//Components
import Marquee from "react-fast-marquee";
import { Patreon, Instagram } from "components/Icons";

const ENDPOINT = "http://127.0.0.1:4001";
const TESTAPI = "http://api.open-notify.org/astros.json";

const Footer = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios("http://api.open-notify.org/astros.json");

        console.log(result.data.people);
        let tempArr = result.data.people.map((obj) => {
          return `${obj.name}: ${obj.craft}`;
        });
        setList(tempArr);
      } catch {
        console.log("eror");
      }
    };

    getData();
  }, []);

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
        pauseOnHover
        gradient={false}
        className="p-4 uppercase font-bold !min-w-[70%]"
      >
        {list.map((el, idx) => (
          <span key={idx}>{el + " - "}</span>
        ))}
      </Marquee>
    </footer>
  );
};

export default Footer;
