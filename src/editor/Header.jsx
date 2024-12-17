export const Header = ({ text }) => {
  return <div>
    <div
      style={{
        paddingLeft: 8
      }}
    >
      {text}
    </div>
    <div
      style={{
        border: `1px solid #aaa`
      }}
    />
  </div>
}