import React, { ReactElement, useEffect } from "react";
import clsx from "clsx";

//Hooks
import { useUI } from "components/UI/context";
import { useAcceptCookies } from "lib/useAcceptCookies";
//components
import Nav from "components/Shared/Nav";
import Footer from "components/Shared/Footer";
import FeatureBar from "components/Shared/FeatureBar";
import Button from "components/UI/Button";

interface IProps {
  main: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ main }) => {
  const { displayMenu } = useUI();
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();

  // useEffect(() => {
  //   console.log("rerender");
  // }, []);`

  return (
    <>
      <Nav />
      <main
        // math >.<
        className={clsx(
          displayMenu
            ? "top-[181px] min-h-[calc(100%-253px)]"
            : "top-[118px] min-h-[calc(100%-190px)]",
          "lg:top-[118px] lg:min-h-[calc(100%-214px)] relative py-4 px-4 pb-20 md:px-6 xl:px-8 lg:py-8 lg:pb-16 lg:mt-6 lg:mb-0 transition-all duration-300 ease-in-out"
        )}
      >
        {main}
      </main>
      <Footer />
      <FeatureBar
        title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
        hide={acceptedCookies}
        className="border-t border-black"
        action={
          <Button
            className="rounded-md px-1 py-1 md:max-w-xs hover:bg-accent-2"
            onClick={() => onAcceptCookies()}
          >
            Accept cookies
          </Button>
        }
      />
    </>
  );
};

export const getLayout = (page: ReactElement) => <Layout main={page} />;

export default Layout;
