export const Header = ({ text, elements }) => {
  return (
    <>
      <div style={{ paddingLeft: 8, borderBottom: `2px solid #aaa` }}>
        {text}
      </div>
      {elements?.map((element) => element)}
    </>
  )
}
