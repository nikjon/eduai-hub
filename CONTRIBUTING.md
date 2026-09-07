# Contributing to EduAI Hub

We're excited that you're interested in contributing to EduAI Hub! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to:
- Be respectful and inclusive
- Support other contributors
- Report inappropriate behavior
- Focus on constructive feedback

## Getting Started

### Prerequisites
- Node.js v18+
- Git
- PostgreSQL or Supabase account
- OpenAI API key

### Development Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/eduai-hub.git
   cd eduai-hub
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Install dependencies**
   ```bash
   npm run install-all
   ```

5. **Setup environment variables**
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env.local
   # Edit files with your credentials
   ```

6. **Start development servers**
   ```bash
   npm run dev
   ```

## Development Workflow

### Making Changes

1. **Keep commits small and focused**
   ```bash
   git commit -m "feat: add password reset functionality"
   ```

2. **Use conventional commits**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation
   - `style:` - Code style changes
   - `refactor:` - Code refactoring
   - `perf:` - Performance improvements
   - `test:` - Test additions/changes
   - `chore:` - Maintenance tasks

3. **Write clear commit messages**
   ```bash
   git commit -m "feat: add two-factor authentication
   
   - Implement TOTP-based 2FA
   - Add verification endpoint
   - Update user model with secret key
   - Add tests for 2FA flow"
   ```

### Testing

Before submitting a PR:

1. **Run linting**
   ```bash
   npm run lint
   ```

2. **Test locally**
   - Frontend: Manual testing in browser
   - Backend: Test endpoints with curl/Postman
   - Database: Verify data integrity

3. **Test across browsers**
   - Chrome
   - Firefox
   - Safari
   - Edge

### Creating a Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/YourFeatureName
   ```

2. **Open a Pull Request on GitHub**
   - Use a descriptive title
   - Reference any related issues
   - Describe your changes
   - Include screenshots if UI changes

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   
   ## How Has This Been Tested?
   Describe testing approach
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Tests added/updated
   - [ ] Documentation updated
   - [ ] No breaking changes
   ```

## Code Style

### Frontend (React)

```javascript
// Use functional components with hooks
export default function ComponentName() {
  const [state, setState] = useState(null);

  return (
    <div className="your-classes">
      {/* Content */}
    </div>
  );
}

// Always use prop types or TypeScript
// Use meaningful variable names
// Keep components under 400 lines
```

### Backend (Express)

```javascript
// Use async/await
router.post('/endpoint', async (req, res) => {
  try {
    // Process request
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Always handle errors
// Use meaningful route names
// Validate input with Joi
```

### CSS/Tailwind

```jsx
// Use Tailwind classes
<div className="bg-slate-800 border border-cyan-500/20 p-6 rounded-xl">
  {/* Content */}
</div>

// Keep class names organized
// Use color variables consistently
// Maintain responsive design
```

## Commit Guidelines

### Good Commit Message
```
feat: add AI chat message editing

- Allow users to edit previously sent messages
- Update message in database
- Refresh chat UI after edit
- Add error handling for edit failures
```

### Bad Commit Message
```
fixed stuff
updated code
changes
```

## Pull Request Guidelines

1. **Before submitting:**
   - [ ] Code follows style guide
   - [ ] Tests are passing
   - [ ] No console errors/warnings
   - [ ] Documentation is updated
   - [ ] Commit history is clean

2. **Keep PRs focused**
   - One feature per PR
   - Don't mix refactoring with features
   - Keep PR size manageable

3. **Respond to feedback**
   - Address all comments
   - Push follow-up commits
   - Maintain respectful communication

## Issue Reporting

### Bug Report

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox
- Version: 1.0.0
```

### Feature Request

```markdown
## Description
Clear description of the feature

## Use Case
Why this feature is needed

## Proposed Solution
How you envision it working

## Alternatives Considered
Other approaches

## Additional Context
Any other information
```

## Project Structure Guidelines

### Adding a New Frontend Page

1. Create file: `client/src/pages/YourPage.jsx`
2. Add route in `App.jsx`
3. Update `Navbar.jsx` if needed
4. Add styling with Tailwind
5. Update documentation

### Adding a New API Endpoint

1. Create route handler in `server/src/routes/`
2. Import in `server/src/index.js`
3. Add validation with Joi
4. Update `API.md`
5. Add test cases

### Adding a Database Table

1. Add SQL to `server/src/database/schema.sql`
2. Create Supabase migration
3. Update related services
4. Document the change

## Documentation

### Update README if:
- Adding major features
- Changing setup process
- Adding new dependencies
- Changing project structure

### Update API.md if:
- Adding/modifying endpoints
- Changing request/response format
- Adding new error codes

### Add JSDoc comments:
```javascript
/**
 * Fetches user profile from database
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User profile object
 * @throws {Error} If user not found
 */
async function getUserProfile(userId) {
  // Implementation
}
```

## Testing

### Manual Testing
- Test on multiple browsers
- Test on mobile/tablet
- Test with slow network
- Test with different screen sizes

### Automated Testing (Future)
- Unit tests for utilities
- Integration tests for APIs
- E2E tests for critical flows

## Performance Considerations

- Minimize bundle size
- Optimize images
- Use lazy loading
- Implement pagination
- Cache when appropriate
- Minimize API calls

## Security Guidelines

- Never commit secrets/keys
- Validate all inputs
- Use parameterized queries
- Keep dependencies updated
- Report security issues privately

## Getting Help

- **Documentation**: Check README and API docs
- **Discord**: Join community discussions
- **GitHub Issues**: Search existing issues
- **Email**: contact@eduaihub.com

## Recognition

Contributors are recognized in:
- README contributors section
- Release notes
- GitHub contributors page
- Community recognition

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Open an issue or reach out to the maintainers. We're here to help!

---

**Thank you for contributing to EduAI Hub! 🎉**

Happy coding!
