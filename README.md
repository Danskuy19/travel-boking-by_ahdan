# TravelHub - Premium Travel Booking Platform

> A modern, responsive travel booking platform built with vanilla HTML, CSS, and JavaScript ES6+

## 📖 Deskripsi

TravelHub adalah platform booking travel premium yang dirancang dengan teknologi modern dan user experience terbaik. Website ini menampilkan destinasi populer, hotel berkualitas, dan memudahkan pengguna untuk melakukan booking dengan antarmuka yang intuitif.

**Dibangun tanpa menggunakan framework!** Hanya HTML5, CSS3, dan Vanilla JavaScript (ES6+)

## ✨ Fitur Utama

### 🎨 Desain & UI/UX
- **Responsive Design** - Desktop, Tablet, Mobile optimized
- **Dark Mode** - Toggle tema dengan local storage persistence
- **Glassmorphism** - Modern glass effect UI
- **Smooth Animations** - Fade, slide, scale, bounce animations
- **Scroll Reveal** - AOS-like animations on scroll

### 🔍 Pencarian & Filter
- Live search dengan autocomplete
- Advanced filter (price, rating, facilities)
- Search history
- Keyboard shortcuts (Ctrl+K)

### 🏨 Fitur Booking
- Search form dengan validation
- Booking history dengan edit/delete
- Favorites management
- Toast notifications

### 🛠️ Teknologi
- **Navbar** - Sticky dengan transparent effect
- **Hero Section** - Carousel dengan background images
- **Countdown Timer** - Promo flash sale countdown
- **Animated Counters** - Statistics animation
- **Modal** - Login, Favorites
- **Floating Chat** - Customer support widget
- **Back to Top Button** - Smooth scroll

### 💾 Data Persistence
- Local Storage untuk favorites
- Booking history management
- Dark mode preference
- Search history

### 📱 Responsive Breakpoints
- Desktop: 1024px+
- Tablet: 768px - 1024px
- Mobile: 480px - 768px
- Small Mobile: 320px - 480px

## 📁 Struktur Folder

```
travel-booking/
├── index.html                 # Main page
├── pages/
│   ├── destinations.html      # Destinasi page
│   ├── hotels.html            # Hotels page
│   ├── gallery.html           # Gallery page
│   ├── booking.html           # Booking form
│   ├── testimonials.html      # Testimonials
│   ├── about.html             # About us
│   ├── contact.html           # Contact form
│   └── 404.html               # 404 page
├── css/
│   ├── variables.css          # CSS variables & root
│   ├── style.css              # Main styles
│   ├── animation.css          # Animations
│   ├── components.css         # Component styles
│   └── responsive.css         # Media queries
├── js/
│   ├── app.js                 # Main app logic
│   ├── utils.js               # Utility functions
│   ├── storage.js             # Local storage management
│   ├── toast.js               # Notifications
│   ├── counter.js             # Counters & countdown
│   ├── slider.js              # Carousel & slider
│   ├── search.js              # Search functionality
│   ├── filter.js              # Filter management
│   ├── gallery.js             # Gallery & lightbox
│   ├── booking.js             # Booking form
│   └── weather.js             # Weather API
├── assets/
│   ├── images/                # Image assets
│   └── icons/                 # Icon assets
├── .gitignore
├── .netlify.toml              # Netlify config
├── package.json
└── README.md                  # Documentation
```

## 🚀 Cara Menjalankan

### Local Development

```bash
# Clone repository
git clone https://github.com/Danskuy19/travel-booking.git
cd travel-booking

# Buka dengan local server (Python)
python -m http.server 8000

# Atau dengan Node.js
npx http-server

# Kunjungi http://localhost:8000
```

### Requirement
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection untuk load external assets

## 🌐 Deploy ke Netlify

### Method 1: GitHub Integration

1. Push code ke GitHub
2. Pergi ke [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect GitHub repository
5. Build settings:
   - **Build command**: (kosongkan)
   - **Publish directory**: `.`
6. Deploy!

### Method 2: Drag & Drop

1. Pergi ke [netlify.com](https://netlify.com)
2. Drag & drop folder project
3. Website langsung live!

### Method 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# Deploy production
netlify deploy --prod
```

## 🎯 Features Breakdown

### Navbar
- ✅ Sticky positioning
- ✅ Transparent saat di hero
- ✅ Background color saat scroll
- ✅ Mobile hamburger menu
- ✅ Search dengan autocomplete
- ✅ Dark mode toggle
- ✅ Favorites badge
- ✅ Login button

### Hero Section
- ✅ Image carousel (3 slides)
- ✅ Search booking form
- ✅ Promo banner dengan countdown
- ✅ Animated statistics
- ✅ Carousel navigation buttons

### Popular Destinations
- ✅ Grid layout
- ✅ Card dengan image
- ✅ Price dan rating
- ✅ Hover effects
- ✅ Explore button

### Featured Hotels
- ✅ Hotel cards
- ✅ Favorite button
- ✅ Star rating
- ✅ Facilities tags
- ✅ Book now button

### Booking System
- ✅ Booking form validation
- ✅ Toast notifications
- ✅ Booking history (local storage)
- ✅ Edit/Delete bookings
- ✅ Search bookings

### Favorites
- ✅ Add/remove favorites
- ✅ Favorites modal
- ✅ Persistent storage
- ✅ Badge counter

### Gallery
- ✅ Masonry grid layout
- ✅ Lightbox modal
- ✅ Image navigation
- ✅ Keyboard shortcuts

### Testimonials
- ✅ Auto-rotating slider
- ✅ Rating display
- ✅ Avatar images
- ✅ Smooth transitions

### Newsletter
- ✅ Email subscription
- ✅ Email validation
- ✅ Success notification

### Countdown Promo
- ✅ Countdown timer
- ✅ Days, hours, minutes, seconds
- ✅ Auto update

### Footer
- ✅ 4 column layout
- ✅ Social media links
- ✅ Quick links
- ✅ Contact info
- ✅ Copyright

### Additional Features
- ✅ Back to top button
- ✅ Floating chat widget
- ✅ Scroll progress bar
- ✅ Offline detection
- ✅ Loading screen
- ✅ Modal system
- ✅ Toast notifications

## 🎨 Color Palette

```css
--primary: #2563eb        /* Blue */
--secondary: #38bdf8      /* Cyan */
--accent: #f59e0b        /* Amber */
--danger: #ef4444        /* Red */
--success: #22c55e       /* Green */
```

## 📊 Browser Support

| Browser | Support |
|---------|----------|
| Chrome  | ✅ 90+  |
| Firefox | ✅ 88+  |
| Safari  | ✅ 14+  |
| Edge    | ✅ 90+  |

## 📝 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + K` | Open search |
| `Esc` | Close modal/search |
| `Arrow Up/Down` | Navigate gallery |
| `Enter` | Send chat message |

## 🔧 Customization

### Mengubah Colors

Edit di `css/variables.css`:

```css
:root {
    --primary: #your-color;
    --secondary: #your-color;
    --accent: #your-color;
}
```

### Mengubah Font

Ganti di `css/variables.css` dan HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@400;600;700&display=swap" rel="stylesheet">
```

## 📦 Dependencies

- Font Awesome 6.4.0 (Icons)
- Google Fonts - Poppins (Typography)
- Unsplash (Images)
- OpenWeather API (Weather data - optional)

## ⚡ Performance

- Lighthouse Score: 95+
- Mobile Friendly: ✅
- Page Load: < 2s
- No framework overhead
- Minimal CSS (< 100kb)
- Minimal JS (< 50kb)

## 🐛 Known Issues

None currently!

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Payment gateway
- [ ] User authentication
- [ ] More destinations
- [ ] Multiple languages
- [ ] Real-time booking
- [ ] Review system

## 📄 License

MIT License - feel free to use for personal and commercial projects

## 👨‍💻 Author

**Front-End Engineer**
- Years of Experience: 15+
- Technologies: HTML5, CSS3, JavaScript ES6+

## 🤝 Contributing

Contributions welcome! Please:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 💬 Support

Jika ada pertanyaan atau issue:

1. Check GitHub Issues
2. Create new issue dengan detail
3. Contact via floating chat widget

## 📞 Contact

- Email: info@travelhub.com
- Phone: +1 (800) 123-4567
- Address: 123 Travel Street, World City

---

**Made with ❤️ by Front-End Engineers**

*Last Updated: 2024*
