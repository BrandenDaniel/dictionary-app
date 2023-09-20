import React from "react";

const NoDefinition = () => {
  return (
    <div className="no-definition">
      <span>😕</span>

      <h2>No Definitions Found</h2>

      <p>
        {`
        Sorry pal, we couldn't find definitions for the word you were looking
        for. You can try the search again at later time or head to the web
        instead.
        `}
      </p>
    </div>
  );
};

export default NoDefinition;
