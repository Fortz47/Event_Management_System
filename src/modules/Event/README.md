# Events
POST   /api/events
GET    /api/events
PATCH  /api/events/:eventId
DELETE /api/events/:eventId

# Event Participants
POST   /api/events/:eventId/participants
GET    /api/events/:eventId/participants
PATCH  /api/events/:eventId/participants
DELETE /api/events/:eventId/participants

# Event Organizer
POST   /api/events/:eventId/organizers
GET    /api/events/:eventId/organizers
PATCH  /api/events/:eventId/organizers

# Event Co-organizers
POST   /api/events/:eventId/co-organizers
GET    /api/events/:eventId/co-organizers
PATCH  /api/events/:eventId/co-organizers
DELETE /api/events/:eventId/co-organizers