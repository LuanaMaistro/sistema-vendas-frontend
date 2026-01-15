import { App } from "antd"
import NotificationDescription from "./notificationDescription"

export interface Notification {
  type: "info" | "warning" | "success" | "error",
  title: string,
  description: string
}

type useNotificationReturn = { notify: (n: Notification) => void }

export default function useNotification(): useNotificationReturn  {

  const { notification } = App.useApp()

  const notify = ({ type, title, description }: Notification) => {
    notification[type]({
      title,
      description: NotificationDescription({message: description}),
      placement: 'topLeft'
    })

  }

  return { notify }
}
