Create a premium dark web dashboard UI for an app called Ghostyc.

IMPORTANT:
This is ONLY the Web Dashboard UI for Ghostyc.
Do NOT build the actual iPhone app, Windows agent, Railway backend, Android bridge, or real remote-control system.
Do NOT make this an AI app.
Do NOT present Ghostyc as SaaS, enterprise software, public signup software, or a team platform.
This dashboard is a private personal control panel for one user controlling one personal Windows PC.

APP NAME:
Ghostyc

APP PURPOSE:
Ghostyc is a private personal remote PC control ecosystem built for one user. The web dashboard is the secondary control panel used from desktop or mobile browsers to wake/start the user’s Windows PC, send commands, view status, view logs, and monitor system health in real time.

VISUAL STYLE:
Use a premium black/gray/white interface inspired by the uploaded reference images.

Style requirements:
- Black background
- Dark charcoal panels
- White/gray text
- White glow accents instead of red
- No red gradient
- Replace the red energy/glow from the reference with soft white/silver glow
- Subtle glassmorphism
- Rounded cards
- Fine grid background
- Spider-web / neural-line / signal-line background pattern
- Thin technical grid lines like a blueprint/dashboard
- Small white node dots in the grid
- Minimal phantom/ghost branding using the provided ghost logo
- Use the ghost logo in the sidebar/topbar/hero area
- The logo should feel premium, glassy, subtle, and futuristic
- No cartoon style
- No RGB gamer style
- No cringe hacker style
- No enterprise SaaS look
- No colorful gradients except very subtle white/gray glow
- Keep the UI clean, quiet, sharp, and expensive-looking

NAVIGATION STYLE:
The top navigation/tabs should look like the fourth reference image:
- Small floating rounded pill navigation
- Dark translucent background
- Thin subtle border
- Soft inner shadow
- White/gray text
- Active tab has slightly brighter text and subtle glow
- Tabs should feel compact and premium

Use tabs like:
- Home
- Control
- Commands
- Processes
- Screenshots
- Logs
- Diagnostics
- Settings

LAYOUT:
Create a responsive web dashboard with:
- A top floating pill navigation bar
- Ghostyc logo/wordmark
- Main dashboard content area
- Clean card-based layout
- Desktop-first design but mobile responsive
- Subtle background grid across the entire page
- White neural-line accents behind cards
- Use empty states where real data would be connected later
- Do not use fake working data that pretends to be real

MAIN HOME DASHBOARD:
Include these sections:

1. PC Status Card
Show:
- Device name: My Windows PC
- Connection state: Connected / Disconnected / Sleeping / Offline
- Agent status
- Relay status
- Wake bridge status
- Last heartbeat
- Current uptime
- Current IP placeholder
- WebSocket state

2. Quick Controls Card
Buttons:
- Wake PC
- Shutdown
- Restart
- Sleep
- Lock
- Screenshot

Button style:
- Dark rounded buttons
- Thin white border
- White glow on hover
- Destructive actions should be subtle, not bright red

3. Live Activity Card
Show a real-time style event stream layout:
- Command received
- Sent to relay
- Windows agent executed
- Response returned
- Connection changed
Use placeholders clearly marked as sample UI state, not fake real data.

4. System Health Card
Show:
- CPU placeholder
- Memory placeholder
- Disk placeholder
- Network placeholder
- Agent health
- Relay health
- Wake bridge health

CONTROL PAGE:
Create a control panel for sending PC actions.

Sections:
- Power controls
- App launcher
- Website opener
- Volume control
- Keyboard shortcuts
- Custom command/path input

Controls needed:
- Open app input
- Open website input
- Send keyboard shortcut input
- Volume slider
- Mute/unmute toggle
- Custom command/path input
- Execute button
- Request ID display placeholder

COMMANDS PAGE:
Create a command history and command queue UI.

Table columns:
- Timestamp
- Request ID
- Command
- Device
- Status
- Duration
- Retry count
- Error

Statuses:
- Pending
- Sent
- Running
- Success
- Failed

PROCESSES PAGE:
Create UI for listing open apps/processes.

Include:
- Search bar
- Process table
- Process name
- PID
- CPU
- Memory
- Status
- Close button

Do not make it look like enterprise monitoring software.
Keep it personal and minimal.

SCREENSHOTS PAGE:
Create a screenshot viewer page.

Include:
- Capture Screenshot button
- Latest screenshot preview card
- Timestamp
- Device name
- Download button
- Refresh button
- Empty state if no screenshot exists

LOGS PAGE:
Create a detailed logs UI.

Logs must support filtering by:
- iPhone app
- Web dashboard
- Railway relay
- Windows agent
- Android WoL bridge

Each log row should include:
- Timestamp
- Service name
- Device name
- Command name
- Request ID
- Duration
- Status
- Error message
- Retry count
- Connection state

Include:
- Search logs input
- Filter chips
- Status filters
- Export logs button
- Clear local view button
- Expandable log details panel with stack trace placeholder

DIAGNOSTICS PAGE:
Create a diagnostics/testing page.

Include cards for:
- REST API health
- WebSocket connection
- Railway relay connection
- Windows agent heartbeat
- Android Wake-on-LAN bridge
- Command round-trip test
- Screenshot test
- Log stream test

Each diagnostic card should have:
- Status indicator
- Last checked
- Test button
- Result message area

SETTINGS PAGE:
Create a private one-user settings page.

Include:
- Private token/password auth section
- API endpoint setting
- WebSocket endpoint setting
- Device name
- PC agent identifier
- Wake bridge identifier
- Logging verbosity
- Environment variable reminder section

Security rules shown in UI:
- Personal use only
- One user only
- Private token/password auth
- Secrets stored in .env
- No OAuth
- No public signup
- No multi-user accounts
- No roles
- No billing

COMPONENT STYLE:
Use:
- Large rounded cards
- Thin white/gray borders
- Dark translucent surfaces
- Subtle blur
- Soft white glow
- Minimal icons
- Monospace text for logs/request IDs/commands
- Clean sans-serif for UI text
- Small status dots
- Fine dividers
- Elegant spacing

COLOR PALETTE:
Use only:
- Pure black
- Near black
- Charcoal
- Dark gray
- Medium gray
- Light gray
- White
- Soft silver glow

Avoid:
- Red
- Neon green
- RGB colors
- Blue SaaS dashboard colors
- Purple AI gradients
- Loud accent colors

BACKGROUND:
Create a dark technical background combining:
- Fine square grid
- Larger grid sections
- Small white dots/nodes
- Thin neural/spider-web lines
- Very subtle white glow rising from the bottom
- No red glow

BRANDING:
Use the uploaded phantom/ghost logo.
The branding should feel like:
- Private
- Silent
- Secure
- Minimal
- Technical
- Premium
- Personal

The logo should be used subtly, not oversized everywhere.

COPY/TEXT TONE:
Use direct, technical labels.
Avoid marketing language.
Avoid SaaS phrases like:
- “Scale your team”
- “Enterprise ready”
- “Invite members”
- “Upgrade plan”
- “Analytics platform”
- “AI powered”

Use labels like:
- Relay Online
- Agent Connected
- Wake Bridge Ready
- Last Heartbeat
- Request ID
- Command Result
- Live Logs
- Diagnostics
- Local Machine

BUILD PHILOSOPHY:
The dashboard should visually support a simple, reliable, observable, maintainable system.

Do not include:
- Team management
- Billing
- Public signup
- OAuth login
- Role management
- Analytics dashboard
- Enterprise architecture diagrams
- Kubernetes
- Redis
- Queues
- Microservices
- Fake AI assistant
- Chatbot
- AI website builder features

OUTPUT REQUIREMENT:
Build a polished responsive web dashboard UI only.
Use realistic placeholder states but clearly avoid pretending real backend data exists.
Focus on visual design, layout, dashboard structure, and components.
The final result should look like a premium black-and-white private remote PC control dashboard named Ghostyc.