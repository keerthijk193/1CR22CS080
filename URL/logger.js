// logger.js
export function logEvent(eventType, details) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] [${eventType}]`, details);

  // You can also store logs in localStorage if needed:
  let logs = JSON.parse(localStorage.getItem("logs") || "[]");
  logs.push({ timestamp, eventType, details });
  localStorage.setItem("logs", JSON.stringify(logs));
}
