const Notification = ({ notificationObject }) => {
    if (notificationObject === null) {
        return null
    }

    let className = "success"

    if (notificationObject.status === "error") {
        className = "error"
    }

    return (
        <div className={className}>
        {notificationObject.message}
        </div>
    )
}

export default Notification