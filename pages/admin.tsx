import React, { useState } from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";
import axios from "axios";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import { UiFileInputButton } from "components/Upload/UiFileInput";

//Layout
import { getLayout } from "components/Layout/Layout";

const Admin = () => {
  const onChange = async (formData: any) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const response = await axios.post("/api/admin/file", formData, config);

    console.log("response", response.data);
  };

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
        <UiFileInputButton
          label="Upload Single File"
          uploadFileName="theFiles"
          onChange={onChange}
        />
      </section>
    </>
  );
};

Admin.getLayout = getLayout;

export default Admin;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 20, // In seconds
  };
};
