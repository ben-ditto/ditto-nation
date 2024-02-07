import { ChangeEvent, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import axios from "axios";

//Layout
import { getLayout } from "components/Layout/Layout";

//Components
import Button from "components/UI/Button";

//Use Query Mutation Stuff
import {
  useQueryClient,
  useIsMutating,
  useMutation,
} from "@tanstack/react-query";

const Login = () => {
  interface InputData {
    email: string;
    password: string;
  }

  const router = useRouter();

  const [input, setInput] = useState<InputData>({
    email: "",
    password: "",
  });

  const handleLogin = async (input: InputData) => {
    const res = await axios.post(
      "/api/login",
      { email: input.email, password: input.password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return res.data;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));

    console.log(input);
  };

  const { mutate, isLoading, isError, error } = useMutation(handleLogin, {
    onSuccess: (data) => {
      console.log("response", data); //This is the response you get back
      console.log(router);
      router.push("/admin");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(input);
  };

  return (
    <>
      <NextSeo
        title={"Login Page"}
        description={"Login Page"}
        openGraph={{
          type: "website",
          title: "Login Page",
          description: "Login Page",
          url: "https://www.ditto-nation.com/login",
        }}
        noindex={true}
      />
      <section className="px-4 max-w-8xl mx-auto">
        <h1 className="uppercase font-bold text-2xl lg:text-3xl">Login</h1>

        <div className="flex flex-col">
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              placeholder="email"
              type="email"
              required
              value={input.email}
              onChange={handleChange}
              className="border border-textbase px-2 py-1 shadow-xl md:shadow-none md:hover:shadow-xl "
            />
            <input
              name="password"
              placeholder="password"
              type="password"
              required
              value={input.password}
              onChange={handleChange}
              className="border border-textbase px-2 py-1 shadow-xl md:shadow-none md:hover:shadow-xl "
            />

            <Button
              Component={"button"}
              type="submit"
              value=""
              name="subscribe"
              loading={isLoading}
              className="border uppercase text-sm border-textbase rounded-md px-2 py-1 shadow-xl md:shadow-none md:hover:shadow-xl transition-all duration-150 ease-in-out hover:bg-lime"
            >
              {isLoading ? "logging in" : "log in"}
            </Button>
          </form>
          {isError && <p className=" text-pink text-sm">Invalid Login Data</p>}
        </div>
      </section>
    </>
  );
};

Login.getLayout = getLayout;

export default Login;
