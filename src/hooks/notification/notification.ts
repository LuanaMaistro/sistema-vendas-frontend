import { notification } from "antd"
import NotificationDescription from "./notificationDescription"

export interface Notification {
  type: "info" | "warning" | "success" | "error",
  title: string,
  description: string
}

type useNotificationReturn = { notify: (n: Notification) => void, contextHolder: React.ReactElement }

export default function useNotification(): useNotificationReturn  {

  const [api, contextHolder] = notification.useNotification()

  const notify = ({ type, title, description }: Notification) => {
    api[type]({
      title,
      description: NotificationDescription({message: description}),
      placement: 'topLeft'
    })

  }

  return { notify, contextHolder }
}
