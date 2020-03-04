/** @jsx jsx */
import React from "react";
import { render } from "react-dom";
import { jsx, Global } from "@emotion/core";
import rainbow from "./rainbow-bg.png";

function App() {
  return (
    <div
      css={{
        width: "1024px",
        height: "512px",
        background: `url(${rainbow})`,
        backgroundSize: "cover",
        position: "inherit",
        display: "flex",
        overflow: "hidden"
      }}
    >
      <Global
        styles={{
          "*": {
            boxSizing: "border-box",
            margin: 0,
            padding: 0,
            fontFamily: "system-ui",
            fontSize: 20
          }
        }}
      />
      <div
        css={{
          background: "#1B1F2A",
          margin: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          flex: 1,
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: `
  0 2.8px 2.2px rgba(0, 0, 0, 0.02),
  0 6.7px 5.3px rgba(0, 0, 0, 0.028),
  0 12.5px 10px rgba(0, 0, 0, 0.035),
  0 22.3px 17.9px rgba(0, 0, 0, 0.042),
  0 41.8px 33.4px rgba(0, 0, 0, 0.05),
  0 100px 80px rgba(0, 0, 0, 0.07)
;`
        }}
      >
        <h1
          css={{
            color: "#E4E6E6",
            fontWeight: 900,
            fontSize: 48,
            maxWidth: "60%"
          }}
        >
          {window.title}
        </h1>
        <hr
          css={{
            backgroundImage: `url(${rainbow})`,
            height: 11,
            width: 90,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "none",
            margin: "1rem 0",
            borderRadius: "11px"
          }}
        />
        <div css={{ display: "flex", justifyContent: "space-between" }}>
          <ul
            css={{
              color: "#E4E6E6",
              listStyleType: "none",
              display: "flex",
              "& li": {
                marginRight: ".5rem",
                "&:not(:last-child):after": {
                  content: "'•'",
                  position: "relative",
                  marginLeft: ".5rem"
                }
              }
            }}
          >
            {window.tags && window.tags.map(tag => <li>{tag}</li>)}
          </ul>
          <span
            css={{
              color: "#E4E6E6"
            }}
          >
            Chris Biscardi
          </span>
        </div>
      </div>
    </div>
  );
}

render(<App />, document.getElementById("corgi"));
