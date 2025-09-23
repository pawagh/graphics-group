# VCAIL Lab Website - Complete Admin System Guide

## Overview

The VCAIL Lab Website now includes a fully functional admin system that allows authenticated administrators to manage publications, edit website content, and perform other administrative tasks.

## 🚀 Quick Start

### Default Admin Credentials
- **Email**: `admin@vcail.unc.edu`
- **Password**: `admin123`

### Access the Admin Panel
1. Navigate to `/admin/login`
2. Enter your credentials
3. You'll be redirected to the admin dashboard at `/admin`

## ✨ Features Implemented

### 1. Authentication System
- **JWT-based authentication** with secure token storage
- **Password hashing** using bcrypt
- **Session management** with cookies
- **Route protection** for admin pages
- **Auto-logout** on token expiration

### 2. Publications Management
- ✅ **View all publications** with search and filtering
- ✅ **Add new publications** with comprehensive form
- ✅ **Edit existing publications** inline
- ✅ **Delete publications** with confirmation
- ✅ **Dynamic slug generation** from titles
- ✅ **Tag management** for categorization
- ✅ **Real-time updates** on the public website

### 3. Content Management
- ✅ **Homepage content editing** (hero text, about section, contact info)
- ✅ **Footer information** management
- ✅ **SEO meta tags** editing
- ✅ **Real-time preview** of changes

### 4. User Interface
- ✅ **Modern, responsive design** with Tailwind CSS
- ✅ **Intuitive navigation** with sidebar menu
- ✅ **Loading states** and error handling
- ✅ **Success/error notifications**
- ✅ **Mobile-friendly** interface

## 📁 File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout with auth provider
│   │   ├── login/
│   │   │   └── page.tsx        # Login page
│   │   └── page.tsx            # Main admin dashboard
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts    # Login API endpoint
│   │   │   └── verify/
│   │   │       └── route.ts    # Token verification
│   │   ├── content/
│   │   │   ├── route.ts        # Content management API
│   │   │   └── homepage/
│   │   │       └── route.ts    # Homepage content API
│   │   └── publications/
│   │       └── route.ts        # Publications CRUD API
│   └── publications/
│       ├── page.tsx            # Updated to use dynamic data
│       └── [slug]/
│           └── page.tsx        # Updated individual publication page
├── components/
│   └── admin/
│       ├── ContentEditor.tsx   # Content management component
│       └── PublicationManager.tsx # Publications management component
├── data/
│   ├── content.json           # Website content storage
│   └── publications.json     # Publications data storage
├── hooks/
│   └── useAuth.tsx           # Authentication hook
├── lib/
│   ├── auth.ts               # Authentication utilities
│   ├── content.ts            # Content management utilities
│   └── publications.ts       # Publications management utilities
└── middleware.ts             # Route protection middleware
```

## 🔧 API Endpoints

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

## 🛠️ Technical Implementation

### Data Storage
- **Publications**: Stored in `src/data/publications.json`
- **Content**: Stored in `src/data/content.json`
- **Migration**: Automatic migration from static data to JSON files

### Security Features
- **JWT tokens** with 24-hour expiration
- **Password hashing** with bcrypt (12 rounds)
- **CSRF protection** via SameSite cookies
- **Route protection** middleware
- **Input validation** on all forms

### State Management
- **React Context** for authentication state
- **Local state** for component data
- **Real-time updates** after modifications

## 📝 Usage Guide

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

## 🔒 Security Considerations

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

### Password Security
- Default password is `admin123` (change immediately!)
- Passwords are hashed with bcrypt
- Use the setup script to generate secure hashes

## 🚨 Troubleshooting

### Common Issues

1. **Can't log in**:
   - Check credentials (default: admin@vcail.unc.edu / admin123)
   - Clear browser cookies
   - Check console for errors

2. **Publications not updating**:
   - Ensure you're logged in
   - Check file permissions on data directory
   - Verify API endpoints are working

3. **Images not loading**:
   - Check image URLs are valid
   - Ensure images are accessible
   - Fallback images will be used for broken links

### Development
```bash
# Start development server
npm run dev

# Check for linting issues
npm run lint

# Build for production
npm run build
```

## 🔄 Data Migration

The system automatically migrates from the old static data structure to the new JSON-based system. If you need to manually migrate:

1. Publications data will be automatically migrated from `src/app/publications/data.ts` to `src/data/publications.json`
2. Content data is stored in `src/data/content.json`

## 📱 Mobile Support

The admin interface is fully responsive and works on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones

## 🎯 Future Enhancements

Possible future additions:
- [ ] Team member management
- [ ] Course content management
- [ ] File upload for images
- [ ] Bulk publication import
- [ ] Analytics dashboard
- [ ] Multi-user support with roles

## 📞 Support

For technical support or questions about the admin system, please refer to this documentation or check the codebase comments for implementation details.

---

**Last Updated**: January 2025
**Version**: 1.0.0
