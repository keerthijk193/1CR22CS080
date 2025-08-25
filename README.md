
 System Design Document – URL Shortener
1. Introduction
The goal of this project is to design and implement a client-side URL Shortener application
with logging middleware. The system allows users to shorten long URLs, store them
temporarily, and display analytical insights (logs of user actions). The emphasis is on
scalability, maintainability, and clear architectural choices.
2. Key Architectural Decisions
• Frontend Framework: React with Vite for fast development and optimized builds.
• Logging Middleware: Custom middleware implemented in React state to track all
user events (inputs, clicks, updates).
• Client-Side Only: Since no backend is required, all data (shortened URLs and logs) are
stored in the browser’s memory.
• Scalability Consideration: The architecture supports future backend integration (e.g.,
database, authentication, analytics).
3. Data Modelling
Entities:
1. URL Object
o id: unique identifier (random string or hash)
o originalUrl: user-provided long URL
o shortUrl: generated shortened URL
2. Log Entry
o timestamp: date & time of event
o type: event type (INPUT, CLICK, UPDATE)
o message: human-readable action
4. System Design & Flow
1. User Input Flow
o User enters a long URL → frontend generates a short URL using a random
string generator.
2. Logging Flow
o Every user action (typing, clicking, generating) is captured by the logging
middleware.
o Logs are appended to an in-memory list and displayed in the UI.
3. URL Shortening Algorithm
o Generate a random alphanumeric string of fixed length (e.g., 6 characters).
o Map it to the original URL in memory.
o Display http://short.ly/{id} as the shortened link.
5. Technology Selection & Justification
• React (with Vite): Provides modular component design, hot reload, and lightweight
builds.
• JavaScript (ES6+): Widely supported, simple to implement random string generation
and event logging.
• Browser Storage (Optional Future): Can extend to localStorage or sessionStorage for
persistence.
• Backend Integration (Future): Could connect to Node.js/Express + MongoDB for
persistent storage and analytics.
6. Assumptions
• The system runs entirely on the client (no backend/database).
• URLs are stored temporarily (lost on refresh).
• Logging is purely for demonstration and not persisted.
• Security features like authentication and malicious URL checks are not implemented
in this version.
7. Scalability & Maintainability
• Scalability:
o Current architecture supports quick integration of backend services (DB,
APIs).
o Logging middleware can be extended to send logs to an external server.
• Maintainability:
o React’s modular components make the code easy to extend.
o Clear separation of concerns (UI, state management, logging).
o Documentation and structured logging ensure better debugging.
