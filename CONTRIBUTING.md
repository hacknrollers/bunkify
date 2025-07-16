# Contributing to Bunkify

Thank you for your interest in contributing to Bunkify! 🚀

**💬 Join our Discord Community:** [https://discord.gg/XnKbVYXH](https://discord.gg/XnKbVYXH)

We welcome all contributions—code, design, documentation, and ideas. Please read these guidelines to make your contribution process smooth and effective.

## 🗺️ App Structure & Navigation

- **AppLayout** (in `src/components/AppLayout.tsx`) provides the global, responsive navigation bar (top bar on desktop, hamburger on mobile) and wraps all pages.
- **Main pages are in `src/app/`**:
  - `landing/page.tsx` — Landing page
  - `auth/page.tsx` — Google OAuth login
  - `dashboard/page.tsx` — Home/dashboard after login
  - `subjects/page.tsx` — Manage subjects
  - `attendance/page.tsx` — Attendance overview
  - `settings/page.tsx` — App settings
- To add a new main page, create a new folder in `src/app/` and add a `page.tsx` file. To add a new nav item, update `AppLayout.tsx`.

## 🏷️ Contribution Guidelines

- **Use clear, meaningful commit messages.**
- **Keep the code clean and responsive.**
- **Run `npm run lint` before submitting a pull request.**
- **Open an Issue before making major changes** (for discussion and feedback).
- **Respect open-source etiquette:**
  - Be kind and constructive in discussions.
  - Review others’ PRs with helpful feedback.
  - Don’t spam or self-promote.
- **Pull Requests for Hacktoberfest:**
  - This repo is tagged for Hacktoberfest! PRs here count towards your goals.

## 🛠️ How to Contribute

1. **Fork the repository** and clone it locally.
2. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** (code, docs, etc.).
4. **Test your changes locally.**
5. **Run linting:**
   ```bash
   npm run lint
   ```
6. **Commit with a clear message:**
   ```bash
   git commit -m "feat: add new attendance animation"
   ```
7. **Push to your fork and open a Pull Request at:**
   [https://github.com/hacknrollers/bunkify/pulls](https://github.com/hacknrollers/bunkify/pulls)
8. **Wait for review and feedback.**

## 💡 Need Help?
- Open an Issue for questions, suggestions, or to discuss major changes at [https://github.com/hacknrollers/bunkify/issues](https://github.com/hacknrollers/bunkify/issues).
- **Join our Discord for help and discussion:** [https://discord.gg/XnKbVYXH](https://discord.gg/XnKbVYXH)

Thank you for making Bunkify better! ✨ 