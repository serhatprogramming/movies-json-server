const Notification = ({ notification }) => {
  if (notification === null) return null;
  return (
    <div className={`notification ${notification.type}`}>
      <span className="icon">{notification.type === "error" ? "X" : "!"}</span>
      <span className="message">{notification.message}</span>
    </div>
  );
};

export default Notification;
