import { createSignal } from "../lib/framework";

const NOTIFICATION_TIMELIFE_MS = 6000;

const notificationsSignal = createSignal<Notification[]>([], () => {
  const element = document.getElementById(`notifications`);
  if (element) element.style.display = notificationsSignal.get().length > 0 ? `` : `none`;
});

export function addNotification(label: string) {
  notificationsSignal.set((prev) => [
    ...prev,
    {
      label,
      creationDate: performance.now(),
    },
  ]);

  setTimeout(() => {
    notificationsSignal.set((prev) =>
      prev.filter((n) => n.creationDate + NOTIFICATION_TIMELIFE_MS > performance.now()),
    );
  }, NOTIFICATION_TIMELIFE_MS);
}

export function Notifications() {
  return (
    <div
      id="notifications"
      style={{ display: `none` }}
      className="right-0 bottom-0 flex flex-col-reverse select-text"
    >
      <NotificationsContent />
    </div>
  );
}

function NotificationsContent() {
  const notifications = notificationsSignal.use();

  return (
    <>
      {notifications.map((n) => (
        <span
          key={n.label}
          className="mb-2 w-80 text-sm md:text-base border px-3 py-1.5 rounded-lg border-zinc-400 notification"
        >
          {n.label}
        </span>
      ))}
    </>
  );
}

type Notification = {
  label: string;
  creationDate: number;
};
