import React from "react";

interface LinkBottomProps {
  label: string;
  url: string;
}

const LinkBottom: React.FC<LinkBottomProps> = ({ label, url }) => {
  return (
    <a className="link-bottom" href={url}>
      {label}
    </a>
  );
};

export default LinkBottom;
