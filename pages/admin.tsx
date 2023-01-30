import React, { useState } from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { dehydrate, QueryClient } from "@tanstack/react-query";

//Layout
import { getLayout } from "components/Layout/Layout";

//Components
import ExternalLink from "components/Shared/ExternalLink";
import Button from "components/UI/Button";

const About = () => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer>();
  const [uploadData, setUploadData] = useState();

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc((prev) => onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    console.log(fileInput);
    formData.append("upload_preset", "my-uploads");
  }

  return (
    <>
      <NextSeo
        title={"Admin Dashboard"}
        description={"Admin Dashboard Page"}
        openGraph={{
          type: "website",
          title: "Admin Dashboard",
          description: "Admin Dashboard",
          url: "https://www.ditto-nation.com/admin",
        }}
        noindex={true}
      />
      <section className="px-4 max-w-8xl mx-auto">
        <h1 className="uppercase font-bold text-2xl lg:text-3xl">Dashboard</h1>

        <p>Dashboard Stuff like upload and delete images etc.</p>
      </section>

      <section className="px-4 mt-8 max-w-8xl">
        <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input type="file" name="file" />
          </p>

          {/* <img src={imageSrc} /> */}

          {imageSrc && !uploadData && (
            <p>
              <Button
                Component={"button"}
                type="submit"
                className="border uppercase text-sm border-black rounded-md px-2 py-1 shadow-xl md:shadow-none md:hover:shadow-xl transition-all duration-150 ease-in-out hover:bg-lime"
              >
                Upload Files
              </Button>
            </p>
          )}

          {uploadData && (
            <code>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )}
        </form>
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
