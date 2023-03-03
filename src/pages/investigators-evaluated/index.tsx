import "react";

export default function Hello() {
  return (
    <div>
      <div>
        <div style={{ color: "black" }}>调查评估啦啦啦</div>
        <div
          style={{
            boxSizing: "border-box",
            width: "100%",
            padding: "40px",
            backgroundColor: "var(--color-fill-2)",
            display: "flex",
            justifyContent: "start",
            color: "black",
            alignItems: "center",
          }}
        >
          {/* <Image width={200} src={helloImg} /> */}
          <h3
            style={{
              fontWeight: "bold",
              marginLeft: "50px",
            }}
          >
            调查评估啦啦啦!
          </h3>
        </div>
      </div>
    </div>
  );
}
