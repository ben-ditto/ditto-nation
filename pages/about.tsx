import React from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { dehydrate, QueryClient } from "@tanstack/react-query";

//Layout
import { getLayout } from "components/Layout/Layout";

//Components
import ExternalLink from "components/Shared/ExternalLink";

const About = () => {
  return (
    <>
      <NextSeo
        title={"About"}
        description={"About Page"}
        openGraph={{
          type: "website",
          title: "About",
          description: "About Page",
          url: "https://www.ditto-nation.com/about",
        }}
      />
      <section className="px-4 max-w-8xl mx-auto">
        <h1 className="uppercase font-bold text-2xl lg:text-3xl">About</h1>
        <p className="mt-3 mb-2 lg:mt-4 lg:text-xl max-w-[850px] 2xl:max-w-[1312px]">
          Ved tidenes morgen delte en fjord seg og sprutet ut vulkansk stein,
          som en salamander med vinger steg opp fra. Han tilintetgjorde tusenvis
          av hærer og slukte sjelene til millioner. Det ble ført en krig for å
          stoppe ham, men intet menneske og ingen algoritme kunne beseire ham.
          Til den dag i dag hersker han over alt fra sitt bevoktede domene,
          plassert på et taggete fjell av blod og tårer. Navnet hans er Ben
          Ditto.
        </p>
      </section>

      <section className="pt-8 px-4 max-w-8xl mx-auto md:grid md:grid-cols-2">
        <div className="mb-4">
          <h2 className="py-2 uppercase font-bold text-l lg:text-xl">
            Socials
          </h2>
          <ul>
            <li>
              <h3 className="underline pt-2 underline-offset-2">Instagram</h3>
              <ol>
                <li className="hover:text-pink break-words pb-2">
                  <a href="https://www.instagram.com/ben_ditto/">
                    https://www.instagram.com/ben_ditto/
                  </a>
                </li>
                <li className="hover:text-pink break-words pb-2">
                  <a href="https://www.instagram.com/ben_ditto_resurrections/">
                    https://www.instagram.com/ben_ditto_resurrections/
                  </a>
                </li>
                <li className="hover:text-pink break-words">
                  <a href="https://www.instagram.com/ditto_nation/">
                    https://www.instagram.com/ditto_nation/
                  </a>
                </li>
              </ol>
            </li>
            <li>
              <h3 className="underline pt-2 underline-offset-2">Telegram</h3>

              <ol>
                <li className="pb-2">
                  <a
                    className="hover:text-pink break-words"
                    href="https://t.me/ditto_nation"
                  >
                    https://t.me/ditto_nation
                  </a>
                </li>
                <li className="">
                  <a
                    className="hover:text-pink break-words"
                    href="https://t.me/+IXs8tD7D3lplNzA8"
                  >
                    https://t.me/+IXs8tD7D3lplNzA8
                  </a>
                </li>
              </ol>
            </li>
            <li>
              <h3 className="pt-2 underline underline-offset-2">Discord</h3>

              <a
                className="hover:text-pink break-words"
                href="https://discord.gg/Mqd8FQP6SP"
              >
                https://discord.gg/Mqd8FQP6SP
              </a>
            </li>
            <li>
              <h3 className="pt-2 underline underline-offset-2">Spotify</h3>

              <a
                className="hover:text-pink break-words"
                href="https://open.spotify.com/user/0qjc53d1rlr3lnk9h4fsgbfol?si=pBufPh5HT1edu4i2QqSXew&nd=1"
              >
                https://open.spotify.com/user/0qjc53d1rlr3lnk9h4fsgbfol?si=pBufPh5HT1edu4i2QqSXew&nd=1
              </a>
            </li>
            <li>
              <h3 className=" pt-2 underline underline-offset-2">
                Twitter – I NEVER USE IT!
              </h3>

              <a
                className="hover:text-pink break-words"
                href="https://www.twitter.com/ditto_nation "
              >
                https://www.twitter.com/ditto_nation
              </a>
            </li>
            <li>
              <h3 className="pt-2 underline underline-offset-2">
                TikTok – I NEVER USE IT!
              </h3>
              <ol>
                <li className="hover:text-pink break-words">
                  <a href="https://www.tiktok.com/@ben_ditto_actual?_t=8VA5DbhX10v&_r=1">
                    https://www.tiktok.com/@ben_ditto_actual?_t=8VA5DbhX10v&_r=1
                  </a>
                </li>
              </ol>
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="py-2 uppercase font-bold text-l lg:text-xl">
            Interviews
          </h2>
          <ol>
            <li className="hover:text-pink break-words pb-2">
              <ExternalLink text=" https://www.interviewmagazine.com/culture/search-history-meet-ben-ditto-the-guy-meme-ing-his-way-through-war" />
            </li>
            <li className="hover:text-pink break-words pb-2">
              <ExternalLink text=" https://1granary.com/fashion-image/ben-ditto-on-hacking-nfts-and-the-future-of-image/" />
            </li>
            <li className="hover:text-pink break-words pb-2">
              <ExternalLink text=" https://www.batshittimes.com/ben-ditto-into-the-mouth-of-madness" />
            </li>
            <li className="hover:text-pink break-words pb-2">
              <ExternalLink text=" https://fnewsmagazine.com/2022/03/ben-dittos-ingenious-gaze/" />
            </li>
            <li className="hover:text-pink break-words">
              <ExternalLink text=" https://www.dezeen.com/2020/03/18/the-1975-birthday-party-ben-ditto-music-video/" />
            </li>
          </ol>
        </div>
        <div className="mb-4">
          <h2 className="py-2 uppercase font-bold text-l lg:text-xl">Agency</h2>
          https://concreterep.com/artists/ben-ditto
        </div>
        <div className="mb-4">
          <h2 className="py-2 uppercase font-bold text-l lg:text-xl">Agent</h2>
          lindsay@concreterep.com
        </div>
        <div className="mb-4">
          <h2 className="py-2 uppercase font-bold text-l lg:text-xl">
            Contact
          </h2>
          <h3 className="pt-2 underline underline-offset-2"> Email</h3>
          info@ditto-nation.com
          <h3 className="pt-2 underline underline-offset-2">
            {" "}
            Telegram Messenger
          </h3>
          @ben_ditto
        </div>
        <div>
          <h2 className="py-2 uppercase font-bold text-l lg:text-xl">Web</h2>
          <a
            className="hover:text-pink break-words"
            href="https://www.jason-andrew.com/"
            target="_blank"
            rel="noreferrer"
          >
            https://www.jason-andrew.com/
          </a>
        </div>
      </section>

      <section className="px-4 mt-8 max-w-8xl">
        <ul className="flex gap-4 font-black ">
          <li className=" hover:text-pink transition-all duration-150 ease-linear">
            <Link href="/shipping">
              <a>Shipping</a>
            </Link>
          </li>
          <li className="hover:text-pink transition-all duration-150 ease-linear">
            <Link href="/legal">
              <a>Terms & Conditions</a>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};

About.getLayout = getLayout;

export default About;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 20, // In seconds
  };
};
