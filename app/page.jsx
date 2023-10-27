//import React from "react";

import Link from "next/link";

const Rogue_Index = () => {
  return (
    <div>
      <h1>Rogue Index</h1>
      <Link href={"/User"}>
        <button>User</button>
      </Link>
    </div>
  );
};

export default Rogue_Index;
