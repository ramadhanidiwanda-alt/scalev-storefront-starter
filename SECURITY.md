# 🔒 Security Guidelines

## ⚠️ IMPORTANT: Protecting Your Credentials

This repository is designed to be used as both:
1. **Open source template** - Shared publicly on GitHub
2. **Your personal store** - With your real Scalev credentials

---

## 🛡️ What is Protected by .gitignore

### ✅ Automatically Ignored (Safe)

These files are in `.gitignore` and will NEVER be committed:

```
.env.local                    # Your personal credentials
.env.development.local
.env.test.local
.env.production.local
node_modules/                 # Dependencies
.next/                        # Build files
.vercel/                      # Deployment config
```

### ⚠️ What You Should NEVER Commit

**Credentials:**
- Scalev Store ID
- Scalev API Key
- Any API keys or secrets
- Database passwords
- OAuth client secrets

**Personal Data:**
- Customer information
- Order data
- Test user accounts
- Personal notes with sensitive info

**Build Artifacts:**
- `node_modules/`
- `.next/`
- `out/`
- `dist/`

---

## ✅ Safe Workflow for Development & Open Source

### Step 1: Initial Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/scalev-storefront-starter.git
cd scalev-storefront-starter

# Create your local environment file (gitignored)
cp .env.example .env.local

# Add your real credentials to .env.local
# This file will NEVER be committed
```

### Step 2: Verify .gitignore is Working

```bash
# Check git status - .env.local should NOT appear
git status

# If .env.local appears, something is wrong!
# Make sure .gitignore exists and contains .env*.local
```

### Step 3: Safe Development

```bash
# Work on features
git checkout -b feature/my-feature

# Make changes to code (NOT .env.local)
# Commit your changes
git add src/
git commit -m "feat: add new feature"

# Push to GitHub
git push origin feature/my-feature
```

---

## 🔍 Before Every Commit - Security Checklist

Run this checklist BEFORE every commit:

```bash
# 1. Check what will be committed
git status

# 2. Review changes
git diff

# 3. Make sure no credentials in diff
# Look for:
# - API keys
# - Store IDs
# - Passwords
# - Tokens

# 4. If safe, commit
git commit -m "your message"
```

---

## 🚨 What to Do If You Accidentally Commit Credentials

### If You Haven't Pushed Yet:

```bash
# Remove the last commit (keeps changes)
git reset HEAD~1

# Remove the sensitive file from git
git rm --cached .env.local

# Make sure .gitignore is correct
echo ".env*.local" >> .gitignore

# Commit again (without credentials)
git add .
git commit -m "your message"
```

### If You Already Pushed:

**⚠️ CRITICAL: Your credentials are now public!**

1. **Immediately revoke credentials:**
   - Go to Scalev Dashboard
   - Regenerate API Key
   - Update your local `.env.local`

2. **Remove from Git history:**
   ```bash
   # This is complex - consider these options:
   
   # Option 1: Force push (if no one else has pulled)
   git reset HEAD~1
   git push --force
   
   # Option 2: Use git filter-branch (advanced)
   # Option 3: Delete and recreate repository
   ```

3. **Update all deployments:**
   - Update environment variables on Vercel/Netlify
   - Redeploy with new credentials

---

## 🎯 Best Practices

### DO ✅

- **Use `.env.local` for all secrets**
- **Keep `.env.example` updated** (without real values)
- **Review `git diff` before committing**
- **Use different credentials for dev/prod**
- **Rotate credentials regularly**
- **Enable 2FA on Scalev account**

### DON'T ❌

- **Never commit `.env.local`**
- **Never hardcode credentials in code**
- **Never share credentials in issues/PRs**
- **Never commit with `git add .` without checking**
- **Never disable `.gitignore`**
- **Never commit `node_modules/`**

---

## 📋 Environment Variables Strategy

### For Open Source (Public)

**`.env.example`** - Committed to Git:
```bash
NEXT_PUBLIC_SCALEV_API_BASE=https://api.scalev.com
NEXT_PUBLIC_SCALEV_STORE_ID=your_store_id_here
NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY=your_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Scalev Storefront
```

### For Your Personal Use (Private)

**`.env.local`** - NOT committed (gitignored):
```bash
NEXT_PUBLIC_SCALEV_API_BASE=https://api.scalev.com
NEXT_PUBLIC_SCALEV_STORE_ID=12345
NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY=sk_live_abc123xyz
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=My Store
```

---

## 🔐 Additional Security Measures

### 1. Scalev Dashboard Security

- Enable 2FA (Two-Factor Authentication)
- Use strong, unique password
- Regularly review API access logs
- Set allowed origins correctly
- Use different keys for dev/prod

### 2. GitHub Repository Security

- Enable branch protection on `main`
- Require PR reviews
- Enable secret scanning
- Use GitHub Actions secrets for CI/CD
- Don't store secrets in repository settings

### 3. Deployment Security (Vercel/Netlify)

- Use environment variables (not committed)
- Enable preview deployment protection
- Use different credentials per environment
- Enable automatic HTTPS
- Set proper CORS headers

---

## 🧪 Testing Security

### Check for Leaked Credentials

```bash
# Search for potential secrets in git history
git log -p | grep -i "api_key\|secret\|password"

# Check current files
grep -r "sk_live_\|sk_test_" src/

# Use git-secrets (recommended)
git secrets --scan
```

### Verify .gitignore

```bash
# List all files git is tracking
git ls-files

# .env.local should NOT be in this list
# If it is, remove it:
git rm --cached .env.local
```

---

## 📞 Reporting Security Issues

If you find a security vulnerability:

1. **DO NOT** open a public issue
2. Email: security@yourproject.com (or create private security advisory)
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

---

## ✅ Security Checklist for Contributors

Before submitting a PR:

- [ ] No credentials in code
- [ ] No `.env.local` in commits
- [ ] No hardcoded API keys
- [ ] No sensitive data in comments
- [ ] `.env.example` is up to date
- [ ] All secrets use environment variables
- [ ] Tested with dummy credentials

---

## 🎓 Learn More

**Resources:**
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [Git Secrets Tool](https://github.com/awslabs/git-secrets)
- [Scalev Security Best Practices](https://docs.scalev.com/security)

---

## 📝 Summary

**Golden Rules:**
1. ✅ `.env.local` = Your secrets (gitignored)
2. ✅ `.env.example` = Template (committed)
3. ✅ Always check `git diff` before commit
4. ✅ Never commit credentials
5. ✅ Rotate credentials if exposed

**Stay Safe! 🔒**

---

*Last Updated: 2026-05-29*
