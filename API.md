# API Documentation

Complete REST API documentation for EduAI Hub.

## Base URL

```
Development: http://localhost:5000/api
Production: https://eduai-hub-api.render.com/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

## Response Format

All responses are in JSON format:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

Error responses:
```json
{
  "error": "Error message",
  "status": 400
}
```

---

## Authentication Endpoints

### Sign Up

Create a new user account.

**Endpoint**: `POST /auth/signup`

**Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe"
}
```

**Response** (201):
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

---

### Login

Authenticate with email and password.

**Endpoint**: `POST /auth/login`

**Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

---

### Verify Token

Verify if a JWT token is valid.

**Endpoint**: `POST /auth/verify`

**Headers**: Required Bearer token

**Response** (200):
```json
{
  "valid": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

---

## Chat Endpoints

### Get Chat History

Retrieve all chat sessions for the user.

**Endpoint**: `GET /chat/history`

**Headers**: Required Bearer token

**Response** (200):
```json
[
  {
    "id": "uuid",
    "title": "Physics Questions",
    "created_at": "2024-09-06T10:00:00Z"
  }
]
```

---

### Create New Chat

Start a new chat session.

**Endpoint**: `POST /chat/new`

**Headers**: Required Bearer token

**Body**:
```json
{
  "title": "Math Help"
}
```

**Response** (201):
```json
{
  "id": "uuid",
  "title": "Math Help"
}
```

---

### Send Message

Send a message to the AI and get a response.

**Endpoint**: `POST /chat/message`

**Headers**: Required Bearer token

**Body**:
```json
{
  "chatId": "uuid",
  "message": "What is the Pythagorean theorem?"
}
```

**Response** (200):
```json
{
  "message": "The Pythagorean theorem states that a² + b² = c²...",
  "messageId": "uuid"
}
```

---

### Get Chat Messages

Get all messages in a specific chat.

**Endpoint**: `GET /chat/:chatId`

**Headers**: Required Bearer token

**Response** (200):
```json
[
  {
    "id": "uuid",
    "role": "user",
    "content": "What is photosynthesis?",
    "created_at": "2024-09-06T10:00:00Z"
  },
  {
    "id": "uuid",
    "role": "assistant",
    "content": "Photosynthesis is the process by which plants...",
    "created_at": "2024-09-06T10:01:00Z"
  }
]
```

---

### Delete Chat

Delete a chat session.

**Endpoint**: `DELETE /chat/:chatId`

**Headers**: Required Bearer token

**Response** (200):
```json
{
  "message": "Chat deleted"
}
```

---

## Notes Endpoints

### Get All Notes

Retrieve notes with optional filters.

**Endpoint**: `GET /notes?subject=Physics&semester=Sem1&search=Mechanics`

**Query Parameters**:
- `subject` (optional): Physics, Chemistry, Biology, Mathematics
- `semester` (optional): Sem1, Sem2, Sem3, Sem4
- `search` (optional): Search by title

**Response** (200):
```json
[
  {
    "id": "uuid",
    "title": "Physics Mechanics",
    "subject": "Physics",
    "semester": "Sem1",
    "url": "https://...",
    "created_at": "2024-09-06T10:00:00Z"
  }
]
```

---

### Get Single Note

Get detailed information about a note.

**Endpoint**: `GET /notes/:id`

**Response** (200):
```json
{
  "id": "uuid",
  "title": "Physics Mechanics",
  "subject": "Physics",
  "semester": "Sem1",
  "content": "...",
  "url": "https://...",
  "uploaded_by": "uuid",
  "created_at": "2024-09-06T10:00:00Z"
}
```

---

### Upload Note

Upload a new note (Admin only).

**Endpoint**: `POST /notes`

**Headers**: Required Bearer token (admin)

**Body**:
```json
{
  "title": "Physics Mechanics",
  "subject": "Physics",
  "semester": "Sem1",
  "content": "...",
  "url": "https://example.com/notes.pdf"
}
```

**Response** (201):
```json
{
  "id": "uuid",
  "message": "Note uploaded successfully"
}
```

---

### Bookmark Note

Bookmark a note for quick access.

**Endpoint**: `POST /notes/:id/bookmark`

**Headers**: Required Bearer token

**Response** (200):
```json
{
  "message": "Note bookmarked"
}
```

---

### Get User Bookmarks

Get all bookmarked notes.

**Endpoint**: `GET /notes/user/bookmarks`

**Headers**: Required Bearer token

**Response** (200):
```json
[
  {
    "id": "uuid",
    "notes": {
      "id": "uuid",
      "title": "Physics Mechanics",
      "subject": "Physics"
    }
  }
]
```

---

## Quiz Endpoints

### Get All Quizzes

Retrieve available quizzes.

**Endpoint**: `GET /quiz?category=Biology&difficulty=Medium`

**Query Parameters**:
- `category` (optional): Biology, Physics, Chemistry, Mathematics
- `difficulty` (optional): Easy, Medium, Hard

**Response** (200):
```json
[
  {
    "id": "uuid",
    "title": "Biology Chapter 5",
    "category": "Biology",
    "difficulty": "Medium",
    "questions": 10
  }
]
```

---

### Get Quiz with Questions

Get quiz details including all questions.

**Endpoint**: `GET /quiz/:id`

**Response** (200):
```json
{
  "id": "uuid",
  "title": "Biology Chapter 5",
  "description": "Test your knowledge...",
  "category": "Biology",
  "difficulty": "Medium",
  "questions": [
    {
      "id": "uuid",
      "text": "What is the powerhouse of the cell?",
      "options": ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"]
    }
  ]
}
```

---

### Submit Answer

Submit an answer to a quiz question.

**Endpoint**: `POST /quiz/:id/answer`

**Headers**: Required Bearer token

**Body**:
```json
{
  "questionId": "uuid",
  "selectedAnswer": "Mitochondria"
}
```

**Response** (200):
```json
{
  "isCorrect": true,
  "correctAnswer": "Mitochondria"
}
```

---

### Get User Results

Get all quiz results for the user.

**Endpoint**: `GET /quiz/user/results`

**Headers**: Required Bearer token

**Response** (200):
```json
[
  {
    "id": "uuid",
    "quiz_id": "uuid",
    "score": 8,
    "total_questions": 10,
    "created_at": "2024-09-06T10:00:00Z"
  }
]
```

---

### Get Leaderboard

Get top scorers on quizzes.

**Endpoint**: `GET /quiz/leaderboard`

**Response** (200):
```json
[
  {
    "users": {
      "full_name": "John Doe"
    },
    "score": 95,
    "created_at": "2024-09-06T10:00:00Z"
  }
]
```

---

## User Endpoints

### Get Profile

Get user profile information.

**Endpoint**: `GET /user/profile`

**Headers**: Required Bearer token

**Response** (200):
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "John Doe",
  "bio": "Student",
  "avatar": "https://...",
  "is_premium": false
}
```

---

### Update Profile

Update user profile information.

**Endpoint**: `PUT /user/profile`

**Headers**: Required Bearer token

**Body**:
```json
{
  "fullName": "John Doe",
  "bio": "Physics student",
  "avatar": "https://..."
}
```

**Response** (200):
```json
{
  "message": "Profile updated successfully"
}
```

---

### Get Statistics

Get user learning statistics.

**Endpoint**: `GET /user/stats`

**Headers**: Required Bearer token

**Response** (200):
```json
{
  "xp": 2450,
  "questions_asked": 24,
  "quizzes_taken": 12,
  "notes_downloaded": 8,
  "badges_earned": 5
}
```

---

### Get Badges

Get all badges earned by user.

**Endpoint**: `GET /user/badges`

**Headers**: Required Bearer token

**Response** (200):
```json
[
  {
    "badges": {
      "id": "uuid",
      "name": "Quick Learner",
      "icon": "⚡"
    }
  }
]
```

---

### Get Study Streak

Get current study streak information.

**Endpoint**: `GET /user/streak`

**Headers**: Required Bearer token

**Response** (200):
```json
{
  "days": 7,
  "lastStudyDate": "2024-09-06"
}
```

---

## Admin Endpoints

All admin endpoints require admin authentication.

### Get Dashboard Stats

Get platform overview statistics.

**Endpoint**: `GET /admin/dashboard`

**Headers**: Required Bearer token (admin)

**Response** (200):
```json
{
  "totalUsers": 1250,
  "totalQuizzes": 45,
  "totalNotes": 320,
  "timestamp": "2024-09-06T10:00:00Z"
}
```

---

### Get All Users

List all registered users.

**Endpoint**: `GET /admin/users`

**Headers**: Required Bearer token (admin)

**Response** (200):
```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2024-09-06T10:00:00Z"
  }
]
```

---

### Get All Quizzes

List all quizzes on platform.

**Endpoint**: `GET /admin/quizzes`

**Headers**: Required Bearer token (admin)

**Response** (200):
```json
[
  {
    "id": "uuid",
    "title": "Biology Chapter 5",
    "category": "Biology",
    "created_at": "2024-09-06T10:00:00Z"
  }
]
```

---

### Create Quiz

Create a new quiz.

**Endpoint**: `POST /admin/quizzes`

**Headers**: Required Bearer token (admin)

**Body**:
```json
{
  "title": "Physics Mechanics",
  "category": "Physics",
  "difficulty": "Medium",
  "description": "Test your mechanics knowledge"
}
```

**Response** (201):
```json
{
  "id": "uuid",
  "message": "Quiz created successfully"
}
```

---

### Get Analytics

Get platform analytics and insights.

**Endpoint**: `GET /admin/analytics`

**Headers**: Required Bearer token (admin)

**Response** (200):
```json
{
  "averageScore": 76,
  "totalAttempts": 5420,
  "recentActivity": [
    {
      "score": 85,
      "created_at": "2024-09-06T10:00:00Z"
    }
  ]
}
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Server Error - Internal error |

---

## Rate Limiting

All endpoints are rate-limited to:
- **100 requests per 15 minutes** per IP

Rate limit headers in response:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1693996800
```

---

## Examples

### cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123!"}'

# Send chat message
curl -X POST http://localhost:5000/api/chat/message \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"chatId":"uuid","message":"What is photosynthesis?"}'
```

### JavaScript/Fetch

```javascript
// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'SecurePass123!'
  })
});
const data = await response.json();
const token = data.token;

// Get user stats
const statsRes = await fetch('http://localhost:5000/api/user/stats', {
  headers: {'Authorization': `Bearer ${token}`}
});
const stats = await statsRes.json();
console.log(stats);
```

---

## Support

For API issues:
1. Check the error message and code
2. Verify your authentication token
3. Check request format
4. Review rate limiting
5. Open an issue on GitHub

---

Generated: 2024-09-06
Last Updated: 2024-09-06
