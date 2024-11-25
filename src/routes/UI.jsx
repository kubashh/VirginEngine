const inputStyle = {
  border: 0,
  margin: "8px 16px"
}

export const UI = () => {
  return <div
    style={{
      position: "absolute",
      display: "flex",
      flexDirection: "row",
      zIndex: 1,
      right: 0
    }}
  >
    <input
      type="button"
      value="Save"
      style={inputStyle}
      onClick={() => {
        console.log(`Saving...`)
      }}
    />
  </div>
}