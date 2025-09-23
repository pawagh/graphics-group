# VCAIL Admin System Setup Guide

## Overview
The VCAIL website now includes a comprehensive admin system that allows authorized users to edit website content through a secure web interface.

## Features
- 🔐 Secure admin authentication with JWT tokens
- ✏️ Real-time content editing for homepage, footer, and SEO meta tags
- 👥 Team member management interface
- 📚 Publication management (framework ready)
- 🎓 Course management (framework ready)
- ⚙️ Admin settings and profile management

## Quick Setup

### Automatic Setup (Recommended)
Run the automated setup script:
```bash
npm run setup-admin
```

This will:
- Generate secure environment variables
- Create the `.env.local` file
- Set up default admin credentials
- Display login information

### Manual Setup
If you prefer manual setup, create a `.env.local` file in your project root with the following variables:

```env
# Admin Authentication
NEXTAUTH_SECRET=your-super-secret-nextauth-secret-key-here-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=admin@vcail.unc.edu
ADMIN_PASSWORD_HASH=$2b$12$xDXP9cm.r2yvnlNK9YClROGHxFylyO/BOpj8IBQ7KkwZltaVN9MIa

# JWT Secret for additional security
JWT_SECRET=your-jwt-secret-key-change-this-in-production
```

### 2. Default Admin Credentials
By default, the admin system uses:
- **Email:** `admin@vcail.unc.edu`
- **Password:** `admin123`

**⚠️ IMPORTANT:** Change these credentials in production!

### 3. Generate New Password Hash
To create a new admin password, use the following Node.js script:

```javascript
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 12);
  console.log('Password hash:', hash);
}

hashPassword('your-new-password');
```

Replace the `ADMIN_PASSWORD_HASH` in your `.env.local` file with the generated hash.

## Accessing the Admin Panel

### 1. Development
1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin`
3. Use the default credentials or your custom ones

### 2. Production
1. Ensure all environment variables are set
2. Build and deploy the application
3. Access: `https://yourdomain.com/admin`

## Admin Panel Features

### Dashboard Overview
- Website status monitoring
- Quick stats (publications, team members)
- System health indicators

### Content Management
- **Homepage Content:** Edit about us section, lab name, contact info
- **Hero Section:** Update title and subtitle
- **Footer Information:** Manage address, university, email, social links
- **SEO Meta Tags:** Update page title, description, and keywords

### Team Management
- Add/edit/remove team members
- Update roles and bio information
- Manage profile images

### Settings
- Admin profile management
- Password changes
- System configuration

## Security Features

### Authentication
- JWT-based authentication with secure tokens
- Session management with HTTP-only cookies
- Automatic token expiration (24 hours)

### Authorization
- Protected admin routes with middleware
- Token verification on all admin API calls
- Secure password hashing with bcrypt

### Content Protection
- All content updates require authentication
- Input validation and sanitization
- Error handling and logging

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout with auth provider
│   │   ├── login/
│   │   │   └── page.tsx        # Admin login page
│   │   └── page.tsx            # Admin dashboard
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts  # Login endpoint
│       │   └── verify/route.ts # Token verification
│       └── content/
│           ├── route.ts        # Content CRUD operations
│           └── homepage/route.ts # Homepage-specific updates
├── components/
│   └── admin/
│       └── ContentEditor.tsx   # Main content editing component
├── hooks/
│   └── useAuth.ts             # Authentication hook
├── lib/
│   ├── auth.ts                # Authentication utilities
│   └── content.ts             # Content management utilities
├── data/
│   └── content.json           # Editable content storage
└── middleware.ts              # Route protection middleware
```

## Customization

### Adding New Content Types
1. Update the `WebsiteContent` interface in `src/lib/content.ts`
2. Add corresponding fields to `src/data/content.json`
3. Create new API endpoints if needed
4. Update the `ContentEditor` component

### Styling
The admin interface uses Tailwind CSS with UNC branding colors:
- Carolina Blue: `#4B9CD3`
- UNC Navy: `#13294B`

### Additional Features
The system is designed to be extensible. You can add:
- Image upload functionality
- Rich text editors
- Publication management
- Course content editing
- User role management

## Troubleshooting

### Common Issues

1. **"Authentication required" errors**
   - Check if `.env.local` file exists and has correct variables
   - Verify JWT_SECRET is set

2. **Login fails with correct credentials**
   - Ensure ADMIN_PASSWORD_HASH matches your password
   - Check browser console for errors

3. **Content changes don't save**
   - Verify file permissions for `src/data/content.json`
   - Check server logs for errors

### Development Tips
- Use browser dev tools to monitor network requests
- Check the Next.js console for server-side errors
- Test authentication flow thoroughly before deployment

## Production Deployment

### Security Checklist
- [ ] Change default admin credentials
- [ ] Set strong JWT_SECRET
- [ ] Use HTTPS in production
- [ ] Set secure environment variables
- [ ] Enable proper logging
- [ ] Configure backup for content.json

### Performance
- The admin system uses client-side state management
- Content is stored in JSON for simplicity (consider database for larger sites)
- All admin routes are protected with middleware

## Support
For questions or issues with the admin system, refer to the main project documentation or contact the development team.
