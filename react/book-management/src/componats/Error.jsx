import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <p>
        There is no such page. Please <Link to="/"> go to Home Page.</Link>
      </p>
    </div>
  );
};

export default Error;
