const { files } = window.data

export const File = ({ style = {}, file = files, name }) => {
  return <div
    style={{
      ...style,
      display: "flex",
      flexDirection: "column",
      cursor: "pointer"
    }}
    onClick={() => {
      console.log(name)
    }}
  >
    {file.type === `folder` ? <div
      style={{
        marginLeft: 10
      }}
    >
      {Object.entries(file).map(([key, value]) => {
        return <File
          file={value}
          name={key}
          key={key}
        />
      })}
    </div> : <>
      {name}
    </> }
  </div>
}