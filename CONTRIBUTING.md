# Contributing to Bunkify

Thank you for your interest in contributing to Bunkify! 🚀

**💬 Join our Discord Community:** [https://discord.gg/nsv4Yc38](https://discord.gg/nsv4Yc38)

We welcome all contributions—code, design, documentation, and ideas. Please read these guidelines to make your contribution process smooth and effective.

---

## 🗺️ App Structure & Navigation

- **AppLayout** (in `src/components/AppLayout.tsx`) provides the global, responsive navigation bar (top bar on desktop, hamburger on mobile) and wraps all pages.
- **Main pages are in `src/app/`**:
  - `landing/page.tsx` — Landing page
  - `auth/page.tsx` — Google OAuth login (⚠️ Login via Discord is mandatory to access the app.)
  - `dashboard/page.tsx` — Home/dashboard after login
  - `subjects/page.tsx` — Manage subjects
  - `attendance/page.tsx` — Attendance overview
  - `settings/page.tsx` — App settings

> 💡 **Adding New Pages:** To add a new main page, create a folder inside `src/app/` and add a `page.tsx`. Don't forget to update `AppLayout.tsx` to reflect changes in the navigation bar.

---

## 🚀 Getting Started

### 1. Fork & Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/bunkify.git
cd bunkify
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

You have two options for setting up your environment variables:

#### Option A: Create Your Own Environment File
Create a new `**.env.local**` file at the root of the project:

```bash
touch .env.local
```

#### Option B: Copy the Template
Use the existing `**.env.local**` template:

```bash
cp .env.local.example .env.local
```

> 📁 **File Location:** Make sure your `**.env.local**` file is in your project root directory alongside `package.json`

---

## 🔑 Setting Up Google OAuth

Bunkify uses Google OAuth for authentication. Follow these steps to get your Google Client ID:

### Step-by-Step Google Cloud Setup

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**

2. **Create or Select Project**
   - Create a new project or select an existing one
   - Note down your project name for reference

3. **Enable APIs & Set Up Credentials**
   - Navigate to **APIs & Services** → **Credentials**
   - Click **"+ CREATE CREDENTIALS"** → Select **"OAuth client ID"**

4. **Configure OAuth Consent Screen**
   - If prompted, set up the OAuth consent screen
   - Select **"External"** user type
   - Fill in the required basic information (App name, User support email, etc.)
   - Add your email as a test user during development

5. **Create OAuth Client**
   - Choose **"Web Application"** as the application type
   - Set a name like `Bunkify Dev Client`
   - Under **"Authorized redirect URIs"**, add:
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - Click **Create** and copy your **Client ID**

### 6. Add Client ID to Environment

Open your `**.env.local**` file and add your Client ID:

```bash
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID==your-client-id-here.apps.googleusercontent.com

```

> ⚠️ **Security Note:** Never commit your `**.env.local**` file to version control. It's already included in `**.gitignore**`.

---

## 🏃‍♂️ Running the Development Server

Once you've completed the setup:

```bash
# Install dependencies (if not done already)
npm install

# Start the development server
npm run dev
```

Your app will be available at [http://localhost:3000/](http://localhost:3000) 🎉

---

## 📝 Development Guidelines

### Code Style
- Follow existing code patterns and conventions
- Use TypeScript for type safety
- Keep components modular and reusable
- Write meaningful commit messages

### Testing Your Changes
- Test your changes on both desktop and mobile views
- Ensure authentication flow works correctly
- Verify that existing functionality isn't broken

### Before Submitting
- [ ] Code follows project conventions
- [ ] All environment variables are documented
- [ ] Changes are tested locally
- [ ] No sensitive data is committed

---

## 🤝 How to Contribute

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit them:
   ```bash
   git commit -m "Add: your descriptive commit message"
   ```

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request** with a clear description of your changes

---

## 💭 Need Help?

- 💬 Join our [Discord community](https://discord.gg/nsv4Yc38) for real-time support
- 🐛 Report bugs via GitHub Issues
- 💡 Share feature ideas in our Discord or GitHub Discussions

We're excited to see what you'll build with Bunkify! 🚀