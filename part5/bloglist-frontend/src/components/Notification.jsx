const Notification = ({ notificationObject }) => {
  if (notificationObject === null) {
    return null
  }

  return (
    <div className={notificationObject.status}>
      {notificationObject.message}
    </div>
  )
}

export default Notification