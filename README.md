# VCAIL Lab Website

A modern, responsive website for the Visual Computing and Augmented Intelligence Lab at UNC Chapel Hill, built with Next.js and featuring a comprehensive admin content management system.

## Features

### 🌟 Website Features
- **Responsive Design**: Modern, mobile-first design with UNC branding
- **Dynamic Content**: Editable content through admin interface
- **Performance Optimized**: Built with Next.js for optimal loading speeds
- **SEO Friendly**: Proper meta tags and structured data
- **Accessibility**: WCAG compliant design

### 🔐 Admin System
- **Secure Authentication**: JWT-based login with bcrypt password hashing
- **Content Management**: Real-time editing of website content
- **Team Management**: Add, edit, and manage team members
- **Publication System**: Framework for managing research publications
- **Course Management**: Interface for course information
- **Settings Panel**: Admin profile and system configuration

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Admin System
```bash
npm run setup-admin
```

This will:
- Generate secure environment variables
- Create the `.env.local` file
- Set up default admin credentials
- Display login information

### 3. Start Development Server
```bash
npm run dev
```

### 4. Access the Website
- **Main Site**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

### 5. Admin Login
- **Email**: `admin@vcail.unc.edu`
- **Password**: `admin123`

⚠️ **Change these credentials in production!**

## Manual Admin Setup

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

### Generate New Password Hash

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

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin interface pages
│   │   ├── layout.tsx      # Admin layout with auth provider
│   │   ├── login/
│   │   │   └── page.tsx    # Admin login page
│   │   └── page.tsx        # Admin dashboard
│   ├── api/                # API routes
│   │   ├── auth/
│   │   │   ├── login/route.ts  # Login endpoint
│   │   │   └── verify/route.ts # Token verification
│   │   ├── content/
│   │   │   ├── route.ts        # Content CRUD operations
│   │   │   └── homepage/route.ts # Homepage-specific updates
│   │   └── publications/
│   │       └── route.ts        # Publications CRUD API
│   ├── components/         # Reusable components
│   └── publications/       # Publication pages
│       ├── page.tsx         # Publications listing
│       └── [slug]/page.tsx  # Individual publication page
├── components/
│   └── admin/              # Admin-specific components
│       ├── ContentEditor.tsx      # Main content editing component
│       └── PublicationManager.tsx # Publications management component
├── hooks/                  # Custom React hooks
│   └── useAuth.tsx         # Authentication hook
├── lib/                    # Utility functions
│   ├── auth.ts            # Authentication utilities
│   ├── content.ts          # Content management utilities
│   └── publications.ts     # Publications management utilities
├── data/                   # Content storage
│   ├── content.json        # Editable content storage
│   └── publications.json  # Publications data storage
└── proxy.ts               # Route protection proxy
```

## Admin System

The admin system allows authorized users to:

- ✏️ **Edit Homepage Content**: About section, lab information, hero text
- 🏢 **Update Footer**: Contact info, address, social links
- 🔍 **Manage SEO**: Meta titles, descriptions, keywords
- 👥 **Team Management**: Add/edit team member profiles
- 📚 **Publications**: Manage research publications
- 🎓 **Courses**: Update course information (framework ready)

### Admin Panel Features

#### Dashboard Overview
- Website status monitoring
- Quick stats (publications, team members)
- System health indicators

#### Content Management
- **Homepage Content:** Edit about us section, lab name, contact info
- **Hero Section:** Update title and subtitle
- **Footer Information:** Manage address, university, email, social links
- **SEO Meta Tags:** Update page title, description, and keywords

#### Publications Management
- ✅ **View all publications** with search and filtering
- ✅ **Add new publications** with comprehensive form
- ✅ **Edit existing publications** inline
- ✅ **Delete publications** with confirmation
- ✅ **Dynamic slug generation** from titles
- ✅ **Tag management** for categorization
- ✅ **Real-time updates** on the public website

#### Team Management
- Add/edit/remove team members
- Update roles and bio information
- Manage profile images

#### Settings
- Admin profile management
- Password changes
- System configuration

## Usage Guide

### Managing Publications

1. **Access Publications**: Click "Publications" in the admin sidebar
2. **Add New Publication**:
   - Click "Add Publication"
   - Fill in the required fields:
     - Title (required)
     - Authors (required)
     - Publication details (e.g., "SIGGRAPH 2024")
     - Image URL (optional)
     - Publication link (optional)
     - Tags (comma-separated)
   - Click "Add Publication"

3. **Edit Publication**:
   - Click "Edit" next to any publication
   - Modify the fields as needed
   - Click "Update Publication"

4. **Delete Publication**:
   - Click "Delete" next to any publication
   - Confirm the deletion in the modal

### Managing Content

1. **Edit Homepage Content**:
   - Click "Edit Content" in the admin sidebar
   - Modify lab name, about section, contact email, etc.
   - Click "Save Homepage Content"

2. **Update Footer Information**:
   - Scroll to the Footer section
   - Edit address, university, email, social links
   - Click "Save Footer Content"

3. **Manage SEO Settings**:
   - Scroll to the SEO Meta Tags section
   - Update page title, description, keywords
   - Click "Save SEO Settings"

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - Token verification

### Publications
- `GET /api/publications` - Get all publications
- `POST /api/publications` - Create new publication
- `PUT /api/publications` - Update publication
- `DELETE /api/publications` - Delete publication

### Content Management
- `GET /api/content` - Get website content
- `POST /api/content` - Update website content
- `POST /api/content/homepage` - Update homepage content

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run setup-admin` - Set up admin system

### Technologies Used

- **Framework**: Next.js 16.0.7
- **Styling**: Tailwind CSS
- **Authentication**: JWT + bcrypt
- **State Management**: React hooks
- **TypeScript**: Full type safety
- **Content Storage**: JSON-based (easily upgradeable to database)

### Technical Implementation

#### Data Storage
- **Publications**: Stored in `src/data/publications.json`
- **Content**: Stored in `src/data/content.json`
- **Migration**: Automatic migration from static data to JSON files

#### State Management
- **React Context** for authentication state
- **Local state** for component data
- **Real-time updates** after modifications

## Security

### Security Features

- 🔐 JWT-based authentication
- 🛡️ Password hashing with bcrypt (12 rounds)
- 🚧 Protected admin routes with proxy
- 🔒 Secure session management
- ✅ Input validation and sanitization
- **CSRF protection** via SameSite cookies
- **JWT tokens** with 24-hour expiration

### Authentication
- JWT-based authentication with secure tokens
- Session management with HTTP-only cookies
- Automatic token expiration (24 hours)

### Authorization
- Protected admin routes with proxy
- Token verification on all admin API calls
- Secure password hashing with bcrypt

### Content Protection
- All content updates require authentication
- Input validation and sanitization
- Error handling and logging

## Deployment

### Production Checklist
- [ ] Change default admin credentials
- [ ] Set secure environment variables
- [ ] Configure HTTPS
- [ ] Set up proper logging
- [ ] Configure content backup
- [ ] Enable HTTPS in production
- [ ] Set secure cookie flags for production

### Environment Variables
Required for production:
```env
NEXTAUTH_SECRET=your-secure-secret
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD_HASH=your-bcrypt-hash
JWT_SECRET=your-jwt-secret
```

### Production Setup
1. **Change default admin credentials**:
   ```bash
   npm run setup-admin
   ```

2. **Set environment variables**:
   ```env
   ADMIN_EMAIL=your-admin@email.com
   ADMIN_PASSWORD_HASH=your-bcrypt-hashed-password
   JWT_SECRET=your-secure-jwt-secret
   ```

3. **Enable HTTPS** in production
4. **Set secure cookie flags** for production

### Performance
- The admin system uses client-side state management
- Content is stored in JSON for simplicity (consider database for larger sites)
- All admin routes are protected with proxy

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
   - Clear browser cookies

3. **Content changes don't save**
   - Verify file permissions for `src/data/content.json`
   - Check server logs for errors
   - Ensure you're logged in

4. **Publications not updating**
   - Ensure you're logged in
   - Check file permissions on data directory
   - Verify API endpoints are working

5. **Images not loading**
   - Check image URLs are valid
   - Ensure images are accessible
   - Fallback images will be used for broken links

### Development Tips
- Use browser dev tools to monitor network requests
- Check the Next.js console for server-side errors
- Test authentication flow thoroughly before deployment

## Data Migration

The system automatically migrates from the old static data structure to the new JSON-based system. If you need to manually migrate:

1. Publications data will be automatically migrated from `src/app/publications/data.ts` to `src/data/publications.json`
2. Content data is stored in `src/data/content.json`

## Mobile Support

The admin interface is fully responsive and works on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones

## Research Focus

The VCAIL is dedicated to advancing research in:
- **Artificial Intelligence:** Developing new AI models and algorithms
- **Visual Computing:** Exploring innovative approaches in graphics, vision, and visualization
- **Interdisciplinary Projects:** Combining expertise from various fields to drive breakthroughs

## Future Enhancements

Possible future additions:
- [ ] Team member management (UI ready)
- [ ] Course content management (UI ready)
- [ ] File upload for images
- [ ] Bulk publication import
- [ ] Analytics dashboard
- [ ] Multi-user support with roles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues:
- Review the code documentation
- Check the troubleshooting section above
- Contact the development team

## License

This project is developed for the Visual Computing and Augmented Intelligence Lab at UNC Chapel Hill.

---

**Last Updated**: January 2025  
**Version**: 1.0.0
