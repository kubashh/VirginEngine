export const File = ({ style = {}, file, name, deep = 0 }) => {
  return <>
    <div
      style={{
        ...style,
        cursor: "pointer",
        marginLeft: deep * 10
      }}
      onClick={() => {
        console.log(name)
      }}
    >
      {name}
    </div>
    {file.type === `folder` ? <>
      {Object.entries(file).map(([key, value]) => {
        if(key === `type`) {
          return
        }
        return <File
          file={value}
          name={key}
          key={key}
          deep={deep + 1}
        />
      })}
    </> : <></>}
  </>
}