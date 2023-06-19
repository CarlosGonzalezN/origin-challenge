import React from "react";
import Navbar from "../../components/Navbar";
import InputButtonComponent from "../../components/Autocomplete";
import TableComponent from "../../components/Table";
import { GloblaProvider } from "../../context/GlobalState";

const Home: React.FC = () => {
  return (
    <GloblaProvider>
      <>
        <Navbar logo="" userName="" />
        <div className="container">
          <div className="flex justify-center items-center m-6">
            <InputButtonComponent />
          </div>
          <div className="m-10">
            <TableComponent data={[]} />
          </div>
        </div>
      </>
    </GloblaProvider>
  );
};

export default Home;
