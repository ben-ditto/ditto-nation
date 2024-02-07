import { useState } from "react";
import clsx from "clsx";

const ToggleTheme = () => {
  const [theme, setTheme] = useState("dark");

  const toggleThemeHandler = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      {/* <button className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></button> */}
      <button
        onClick={toggleThemeHandler}
        className={clsx(
          "w-11 h-6 bg-transparent rounded-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all border border-textbase",
          theme === "light" &&
            "pointer-events-none after:-translate-x-full rtl:after:-translate-x-full after:bg-black"
        )}
      ></button>
      {/* <span className="ms-3 text-sm font-medium text-textbase dark:text-gray-300">
        {theme}
      </span> */}
    </label>
  );
};

export default ToggleTheme;
