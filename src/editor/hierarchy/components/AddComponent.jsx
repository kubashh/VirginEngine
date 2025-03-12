export const AddComponent = ({ text, onClick }) => (
  <input
    type="button"
    value={`+ ${text}`}
    style={{ padding: `6px 12px`, fontSize: 16 }}
    onClick={onClick}
  />
)
