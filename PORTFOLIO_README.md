# Portfolio Website - أسامة محمد زكريا جنيدي

A complete, full-stack portfolio website with database connectivity, admin dashboard, and Arabic RTL support.

## ✅ What Has Been Created

### 1. **Database Schema (Prisma + SQLite)**
- **UserInfo**: Personal information (name, job title, email, phone, location, birthdate)
- **AboutInfo**: About me content (main intro, paragraph 1, paragraph 2)
- **Skill**: Skills with categories (technical, marketing, personal) and icons
- **Experience**: Work experience with company, title, description, current job status
- **Project**: Projects with tags and categories
- **Tag**: Project tags (related to projects)
- **Course**: Training courses

### 2. **API Routes (Backend)**
All API routes created and connected to the database:
- `GET/PUT /api/userinfo` - Personal info CRUD
- `GET/PUT /api/about` - About info CRUD
- `GET/POST /api/skills` - Skills list and create
- `DELETE /api/skills/[id] - Delete skill
- `GET/POST /api/experience` - Experience list and create
- `DELETE /api/experience/[id]` - Delete experience
- `GET/POST /api/projects` - Projects list and create
- `DELETE /api/projects/[id]` - Delete project

### 3. **Frontend Pages**

#### Portfolio Page (`/portfolio`)
- Beautiful RTL Arabic interface
- Hero section with personal info and contact cards
- About section with statistics
- Skills section grouped by category
- Experience timeline with alternating layout
- Projects grid with tags
- Contact section
- Sticky footer
- Smooth animations using Framer Motion

#### Admin Dashboard (`/admin`)
- Full CRUD interface for all content
- Tabbed interface for easy navigation
- Real-time statistics display
- Form validation
- Preview modal to view portfolio changes
- Toast notifications for user feedback
- Modern, clean UI using shadcn/ui components

### 4. **Features Implemented**
- ✅ RTL (Right-to-Left) Arabic support
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Database connectivity with Prisma ORM
- ✅ Full CRUD operations via API
- ✅ Animated transitions and hover effects
- ✅ Modern gradient color scheme
- ✅ Toast notifications
- ✅ Form validation
- ✅ SEO-optimized metadata
- ✅ Admin dashboard with live preview

### 5. **Color Scheme**
Primary: #0A2647 (Dark Blue)
Secondary: #144272 (Medium Blue)
Accent: #205295 (Lighter Blue)
Light: #2C74B3 (Blue)

## 📁 File Structure

```
src/
├── app/
│   ├── portfolio/
│   │   └── page.tsx         # Main portfolio page
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   ├── api/
│   │   ├── userinfo/
│   │   │   └── route.ts    # User info API
│   │   ├── about/
│   │   │   └── route.ts    # About info API
│   │   ├── skills/
│   │   │   ├── route.ts       # Skills list/create API
│   │   │   └── [id]/
│   │   │       └── route.ts   # Delete skill API
│   │   ├── experience/
│   │   │   ├── route.ts       # Experience list/create API
│   │   │   └── [id]/
│   │   │       └── route.ts   # Delete experience API
│   │   └── projects/
│   │       ├── route.ts       # Projects list/create API
│   │       └── [id]/
│   │           └── route.ts   # Delete project API
│   ├── layout.tsx                # Root layout with RTL
│   └── page.tsx                 # Redirects to /portfolio
└── lib/
    └── db.ts                    # Prisma client

prisma/
├── schema.prisma               # Database schema
└── seed.ts                     # Default data seeder
```

## 🚀 How to Use

### Access the Website
1. **Portfolio**: Navigate to `http://localhost:3000/portfolio`
2. **Admin Dashboard**: Navigate to `http://localhost:3000/admin`

### Managing Content
1. Go to `/admin`
2. Use the tabbed interface to edit:
   - Personal Information
   - About Me
   - Skills
   - Experience
   - Projects
3. Click "Save Changes" to persist data
4. Use "Preview Site" to see changes in real-time

### Seeding Default Data
```bash
bun run db:seed
```

### Database Operations
```bash
# Push schema changes
bun run db:push

# Generate Prisma client
bun run db:generate
```

## 📊 Database Structure

The database has been seeded with:
- **1** User Info record
- **1** About Info record
- **18** Skills (6 technical, 6 marketing, 6 personal)
- **5** Work experiences
- **3** Projects with tags
- **5** Courses

## 🎨 Design Highlights

- **Typography**: IBM Plex Sans Arabic & Tajawal fonts
- **Icons**: Lucide React icon library
- **Components**: shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions
- **Colors**: Professional blue gradient scheme
- **Responsive**: Mobile-first responsive design

## 🔧 Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: Sonner (Toast)
- **Forms**: React Hook Form + Zod validation

## 📝 Notes

- All data is stored in SQLite database
- Admin dashboard allows full content management
- Portfolio page displays data from database
- Both pages are fully responsive
- Arabic RTL support throughout
- SEO metadata properly configured

## 🎯 Next Steps (Optional Enhancements)

1. Add image upload functionality for profile picture
2. Add authentication for admin panel
3. Add social media links management
4. Add more statistics/analytics
5. Add blog/portfolio case studies section
6. Deploy to production hosting
7. Add contact form with email sending

---

**Built with ❤️ for أسامة محمد زكريا جنيدي**
