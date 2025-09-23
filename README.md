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

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin interface pages
│   ├── api/               # API routes
│   ├── components/        # Reusable components
│   └── ...                # Other pages
├── components/
│   └── admin/             # Admin-specific components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── data/                  # Content storage
└── middleware.ts          # Route protection
```

## Admin System

The admin system allows authorized users to:

- ✏️ **Edit Homepage Content**: About section, lab information, hero text
- 🏢 **Update Footer**: Contact info, address, social links
- 🔍 **Manage SEO**: Meta titles, descriptions, keywords
- 👥 **Team Management**: Add/edit team member profiles
- 📚 **Publications**: Manage research publications (framework ready)
- 🎓 **Courses**: Update course information (framework ready)

For detailed admin setup instructions, see [ADMIN_SETUP.md](./ADMIN_SETUP.md).

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run setup-admin` - Set up admin system

### Technologies Used

- **Framework**: Next.js 15.3.4
- **Styling**: Tailwind CSS
- **Authentication**: JWT + bcrypt
- **State Management**: React hooks
- **TypeScript**: Full type safety
- **Content Storage**: JSON-based (easily upgradeable to database)

## Security

- 🔐 JWT-based authentication
- 🛡️ Password hashing with bcrypt
- 🚧 Protected admin routes with middleware
- 🔒 Secure session management
- ✅ Input validation and sanitization

## Deployment

### Production Checklist
- [ ] Change default admin credentials
- [ ] Set secure environment variables
- [ ] Configure HTTPS
- [ ] Set up proper logging
- [ ] Configure content backup

### Environment Variables
Required for production:
```env
NEXTAUTH_SECRET=your-secure-secret
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD_HASH=your-bcrypt-hash
JWT_SECRET=your-jwt-secret
```

## Research Focus

The VCAIL is dedicated to advancing research in:
- **Artificial Intelligence:** Developing new AI models and algorithms
- **Visual Computing:** Exploring innovative approaches in graphics, vision, and visualization
- **Interdisciplinary Projects:** Combining expertise from various fields to drive breakthroughs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues:
- Check [ADMIN_SETUP.md](./ADMIN_SETUP.md) for admin system help
- Review the code documentation
- Contact the development team

## License

This project is developed for the Visual Computing and Augmented Intelligence Lab at UNC Chapel Hill.