import React from "react";

interface IProps {
  text: string;
}

const ExternalLink: React.FC<IProps> = ({ text }) => {
  return (
    <a href={text} rel="noreferrer" target="_blank">
      {text}
    </a>
  );
};

export default ExternalLink;
