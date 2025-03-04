export const Arrow = (open, setOpen, haveChilds = true) =>
  haveChilds ? (
    <div
      style={{
        cursor: `pointer`,
        width: 24,
        height: 24,
        textAlign: `center`,
        justifySelf: `center`,
        borderRadius: 12,
        transform: `rotate(${open ? 90 : 0}deg)`,
        transition: `transform 150ms`
      }}
      onClick={() => setOpen(!open)}
    >
      {`>`}
    </div>
  ) : (
    <div style={{ marginLeft: 24 }} />
  )
