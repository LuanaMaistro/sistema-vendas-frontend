interface NotificationDescriptionProps {
  message: string
}
export default function NotificationDescription({ message }: NotificationDescriptionProps) {
  return (
    <p>{message}</p>
  )
}
