import { FunctionComponent } from "react";

const Header: FunctionComponent = (props) => {
  return (
    <header className="flex flex-row h-16 items-center px-5 md:px-28 border-b-2 border-gray-400">
      <div className="w-2/6 md:w-1/2">
        <h3>SEWB BLOG</h3>
      </div>
      <div className="w-4/6 md:w-1/2">
        <ul className="flex  justify-end gap-4">
          <li>Our story</li>
          <li>Contact</li>
          <li>FAQ</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
