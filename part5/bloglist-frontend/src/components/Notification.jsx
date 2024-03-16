import PropTypes from 'prop-types'

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

Notification.propTypes = {
  notificationObject: PropTypes.object.isRequired
}

export default Notification