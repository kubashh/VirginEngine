const inputStyle = {
  border: 0,
  margin: "8px 16px"
}

const save = () => {
  const { config, files } = window.data

  const toSave = {
    config,
    files
  }

  const jsonData = JSON.stringify(toSave)
  console.log(toSave)
  console.log(jsonData)

  const htmlElement = document.createElement(`a`)
  // Ustawienie typu i kodowania
  htmlElement.href = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`
  htmlElement.download = `${config.gameName}.deathengine`
  htmlElement.click()
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
      onClick={save}
    />
  </div>
}