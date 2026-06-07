const Notification = ({ message, type }: { message: string; type: string }) => {
  const notificationStyle = {
    color: type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    border: `2px solid ${type === "error" ? "red" : "green"}`,
    padding: 10,
    marginBottom: 10,
  }
  if (!message) {
    return null
  }
  return <div style={notificationStyle}>{<p>{message}</p>}</div>
}

export default Notification
