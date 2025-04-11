const NotFound = () => {
  document.body.style.backgroundColor = "rgb(42, 43, 43)";
  const errormsg1 = `I'm sorry :(`;
  const errormsg2 = `We can't find the page!`;
  return (
    <div
      style={{
        display: "flex",
        margin: "0 auto",
        justifyContent: "center",
        marginTop: "100px",
        color: "white",
        fontWeight: "bold",
        fontSize: "3em",
      }}
    >
      <div
        id="errormsg"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
          color: "white",
          fontWeight: "bold",
          fontSize: "2em",
        }}
      >
        <div style={{ display: "block", width: "100%", textAlign: "center" }}>
          {errormsg1}{" "}
        </div>
        <div style={{ display: "block", width: "100%", textAlign: "center" }}>
          {errormsg2}{" "}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
