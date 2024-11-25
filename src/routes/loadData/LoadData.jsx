import { editor } from "../../data"
import { load } from "./load"

const inputStyle = {
  display: "block",
  backgroundColor: "black",
  padding: "20px 50px",
  border: "4px solid white",
  margin: "60px auto",
  textDecoration: "none",
  color: "white",
  fontSize: 60,
  width: 500,
  cursor: "pointer",
  whiteSpace: "nowrap",
  textAlign: "center",
  transitionDuration: "200ms",
  "&:hover": {
    backgroundColor: "#444"
  }
}

export const LoadData = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 3
      }}
    >
      <div
        style={{
          marginTop: "35vh"
        }}
      />
      <input
        style={inputStyle}
        type="button"
        value="Load Project"
        onClick={load}
      />
      <input
        style={inputStyle}
        type="button"
        value="New project"
        onClick={() => {
          editor.setUp = true
          editor.reload()
        }}
      />
    </div>
  )
}