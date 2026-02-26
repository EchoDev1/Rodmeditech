# RodMeditech Admin Portal Setup Guide

## Overview
Your website now has a complete admin portal with database management for About, Leadership/Founders, and Contact pages.

## Features Implemented

### 1. Database Schema (Prisma + SQLite)
- **Admin Users** - Authentication system
- **About Page** - Mission & Vision content
- **Core Values** - Company values with icons
- **Milestones** - Company timeline
- **Founders/Leadership** - Team profiles with photo upload
- **Contact Info** - Contact details (address, phone, email, hours)
- **FAQs** - Frequently asked questions

### 2. Admin Portal Routes
- `/admin/login` - Admin login page
- `/admin` - Dashboard overview
- `/admin/about` - Manage About page content
- `/admin/founders` - Manage founders/leadership profiles
- `/admin/contact` - Manage contact info and FAQs

### 3. API Endpoints
All CRUD operations available via REST API in `/api/*`

## Setup Instructions

### Step 1: Start the Development Server
```bash
npm run dev
```

### Step 2: Initialize the Database
Once the server is running, open your browser and visit:
```
http://localhost:3000/api/init
```

This will:
- Create the database with all tables
- Seed it with your existing content
- Create the default admin user

You should see a success message with login credentials.

### Step 3: Log In to Admin Portal
Visit: `http://localhost:3000/admin/login`

**Login Credentials:**
- Email: `admin@rodmeditech.com`
- Password: `admin123`

**⚠️ IMPORTANT:** Change your password immediately after first login!

## Admin Portal Usage

### Managing About Page
1. Go to `/admin/about`
2. Edit Mission & Vision statements
3. Add/Edit/Delete Core Values
4. Add/Edit/Delete Company Milestones

### Managing Founders/Leadership
1. Go to `/admin/founders`
2. Click "Add Founder" to create new profile
3. Upload profile photo (supports JPG, PNG, etc.)
4. Add name, role, bio, specialties
5. Add portfolio/LinkedIn URL and email
6. Photos are automatically uploaded to `/public/uploads/founders/`

### Managing Contact Page
1. Go to `/admin/contact`
2. Edit contact information (address, phone, email, hours)
3. Add/Edit/Delete FAQs

### Features:
- ✅ Photo upload for founders
- ✅ Real-time preview
- ✅ Drag and reorder (via order field)
- ✅ Active/inactive toggle for FAQs
- ✅ All changes reflect immediately on the website

## File Structure

```
Rodmeditech/
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── dev.db              # SQLite database file
│   └── migrations/         # Database migrations
├── src/
│   ├── app/
│   │   ├── admin/          # Admin portal pages
│   │   │   ├── about/
│   │   │   ├── founders/
│   │   │   ├── contact/
│   │   │   └── login/
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication
│   │   │   ├── about/      # About content
│   │   │   ├── founders/   # Founders CRUD
│   │   │   ├── contact/    # Contact info
│   │   │   ├── faqs/       # FAQs
│   │   │   ├── upload/     # File upload
│   │   │   └── init/       # Database initialization
│   │   ├── about/page.js   # Updated to fetch from DB
│   │   └── contact/page.js # Updated to fetch from DB
│   ├── components/
│   │   └── AdminNav.jsx    # Admin navigation
│   ├── lib/
│   │   └── prisma.js       # Prisma client instance
│   └── middleware.js       # Auth middleware
└── public/
    └── uploads/
        └── founders/       # Uploaded photos
```

## Database Management

### View Database Contents
```bash
npx prisma studio
```
This opens a GUI at `http://localhost:5555` to view/edit database records.

### Reset Database
To start fresh:
```bash
npx prisma migrate reset
```
Then visit `/api/init` again to reseed.

## Security Notes

1. **Change Default Password:** Use the admin portal to update your password immediately
2. **Production Setup:**
   - Set a strong `JWT_SECRET` in `.env`
   - Use PostgreSQL or MySQL instead of SQLite for production
   - Enable HTTPS
   - Add rate limiting to auth endpoints
3. **Disable Init Endpoint:** After initial setup, delete or protect the `/api/init` route

## Troubleshooting

### Cannot login?
- Make sure you've visited `/api/init` first
- Check that the database file exists at `prisma/dev.db`
- Try resetting the database with `npx prisma migrate reset`

### Changes not showing on website?
- The website pages fetch data from the database on each page load
- Clear your browser cache and refresh

### Photo upload not working?
- Ensure the `public/uploads/founders/` directory exists
- Check file permissions
- Max file size is handled by Next.js (default 4MB)

## Environment Variables

Add these to your `.env` file (already configured):
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-change-in-production"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## API Documentation

### About Page
- `GET /api/about` - Fetch all about content
- `PUT /api/about` - Update mission & vision

### Values
- `GET /api/values` - List all values
- `POST /api/values` - Create new value
- `PUT /api/values/[id]` - Update value
- `DELETE /api/values/[id]` - Delete value

### Milestones
- `GET /api/milestones` - List all milestones
- `POST /api/milestones` - Create milestone
- `PUT /api/milestones/[id]` - Update milestone
- `DELETE /api/milestones/[id]` - Delete milestone

### Founders
- `GET /api/founders` - List all founders
- `GET /api/founders/[id]` - Get single founder
- `POST /api/founders` - Create founder
- `PUT /api/founders/[id]` - Update founder
- `DELETE /api/founders/[id]` - Delete founder

### Contact Info
- `GET /api/contact` - List all contact info
- `POST /api/contact` - Create contact info
- `PUT /api/contact/[id]` - Update contact info
- `DELETE /api/contact/[id]` - Delete contact info

### FAQs
- `GET /api/faqs` - List all active FAQs
- `POST /api/faqs` - Create FAQ
- `PUT /api/faqs/[id]` - Update FAQ
- `DELETE /api/faqs/[id]` - Delete FAQ

### File Upload
- `POST /api/upload` - Upload founder photo
  - Accepts: `multipart/form-data`
  - Field name: `file`
  - Returns: `{ url: "/uploads/founders/filename.jpg" }`

## Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Check the terminal/server logs
3. Make sure all dependencies are installed: `npm install`
4. Try regenerating the Prisma client: `npx prisma generate`

---

**Built with:**
- Next.js 16
- React 19
- Prisma ORM
- SQLite Database
- Tailwind CSS
- JWT Authentication
