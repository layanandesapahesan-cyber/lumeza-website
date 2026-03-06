# 🚨 VERCEL ERRORS & SOLUTIONS

Common Vercel deployment errors and fixes.

---

## 1. ❌ "nodeVersion is not allowed"

**Error Message**:
```
Invalid request: should NOT have additional property nodeVersion. 
Please remove it.
```

**Cause**: vercel.json contains `nodeVersion` property

**Solution**:
```
1. Edit vercel.json
2. Remove line: "nodeVersion": "18.x",
3. Save file
4. git add vercel.json
5. git commit -m "Fix vercel.json"
6. git push origin main
7. Vercel will auto-redeploy
```

**Auto-fix**:
```powershell
.\fix-vercel-config.ps1
```

---

## 2. ❌ "DATABASE_URL not found"

**Error Message**:
```
Error: DATABASE_URL is not defined
Failed to initialize Prisma client
```

**Cause**: Environment variable not set in Vercel

**Solution**:

1. **Open Vercel Dashboard**:
   ```
   https://vercel.com/layanandesapahesan-cyber/lumeza-website
   ```

2. **Navigate**: Settings → Environment Variables

3. **Add**:
   ```
   Key: DATABASE_URL
   Value: file:./prisma/dev.db
   Select: Production, Preview, Development
   Click: Save
   ```

4. **Redeploy**:
   - Deployments tab
   - Click ... on latest
   - Click Redeploy

---

## 3. ❌ "RESEND_API_KEY invalid"

**Error Message**:
```
Unauthorized: Invalid API key
Email service failed
```

**Cause**: RESEND_API_KEY not set or wrong format

**Solution**:

1. **Get real key** from https://resend.com/api-keys
   - Key format: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Never starts with "re_test" or "re_xxxx" placeholder

2. **Add to Vercel**:
   - Settings → Environment Variables
   - Key: RESEND_API_KEY
   - Value: `re_your_real_key_here`
   - Select: Production only (sensitive)
   - Save

3. **Test locally first**:
   ```powershell
   # In .env.local
   RESEND_API_KEY=re_your_actual_key
   npm run dev
   # Test /api/contact endpoint
   ```

---

## 4. ❌ "Prisma adapter not found"

**Error Message**:
```
Cannot find module '@prisma/adapter-better-sqlite3'
Error: Failed to resolve Prisma adapter
```

**Cause**: Prisma adapter not installed or not in build

**Solution**:

```powershell
# 1. Install locally
npm install @prisma/adapter-better-sqlite3 --save

# 2. Generate Prisma client
npx prisma generate

# 3. Build test
npm run build

# 4. If success, commit & push
git add package.json package-lock.json
git commit -m "Add: Prisma better-sqlite3 adapter"
git push origin main

# 5. Vercel will auto-redeploy
```

---

## 5. ❌ "TypeScript compilation failed"

**Error Message**:
```
Type error: Property 'something' does not exist
Failed: Build step failed
```

**Cause**: TypeScript compilation error

**Solution**:

```powershell
# 1. Check locally
npx tsc --noEmit

# 2. If errors, fix them
# Most common: implicit 'any' type in catch blocks
# Fix: .catch((error: unknown) => { ... })

# 3. Verify build
npm run build

# 4. If success, commit & push
git add .
git commit -m "Fix: TypeScript compilation errors"
git push origin main

# Check: VERCEL-TROUBLESHOOTING.md for type error solutions
```

---

## 6. ❌ "Build timeout (10-15 minutes)"

**Error Message**:
```
Build failed with timeout after 15 minutes
Build exceeded time limit
```

**Cause**: Build takes too long (usually due to dependencies)

**Solution**:

```powershell
# 1. Optimize dependencies
npm audit fix
npm prune

# 2. Check large packages
npm ls --depth=0

# 3. Remove unused packages
npm uninstall [package-name]

# 4. Clear .next cache
rm -r .next

# 5. Test build locally
npm run build

# 6. Push to trigger faster build
git add .
git commit -m "Optimize: reduce build time"
git push origin main
```

---

## 7. ❌ "npm install failed"

**Error Message**:
```
npm ERR! 404 Not Found
npm install failed
```

**Cause**: Package in package.json doesn't exist or is private

**Solution**:

```powershell
# 1. Check package.json for typos
cat package.json | grep -v "^//"

# 2. Test locally
rm -r node_modules package-lock.json
npm install

# 3. If works, push
git add package-lock.json
git commit -m "Update: dependencies"
git push origin main

# 4. If still fails, remove problematic package
npm uninstall [bad-package]
npm install
git add package.json package-lock.json
git commit -m "Remove: incompatible package"
git push origin main
```

---

## 8. ❌ "Function execution timeout"

**Error Message**:
```
Serverless function exceeded maximum duration of 10s
TimeoutError in API route
```

**Cause**: API endpoint takes too long (> 10 seconds)

**Solution**:

**Option A: Increase timeout (vercel.json)**
```json
{
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

Max allowed: 60 seconds (Hobby), 900 seconds (Pro)

**Option B: Optimize endpoint**
```typescript
// Make it faster:
// 1. Use indexes in database
// 2. Cache results
// 3. Reduce database queries
// 4. Async processing (webhook for heavy tasks)
```

**Commit & push**:
```powershell
git add vercel.json
git commit -m "Increase: API timeout to 30s"
git push origin main
```

---

## 9. ❌ "CORS error on API calls"

**Error Message**:
```
Access to XMLHttpRequest blocked by CORS policy
No 'Access-Control-Allow-Origin' header
```

**Cause**: API doesn't allow requests from frontend domain

**Solution**:

**Add CORS headers (api route)**:
```typescript
export async function GET(request: Request) {
  const headers = {
    'Access-Control-Allow-Origin': 'https://lumeza-website.vercel.app',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers })
  }
  
  // ... rest of code
  return Response.json(data, { headers })
}
```

**Or via vercel.json**:
```json
{
  "headers": [
    {
      "source": "/api/:path*",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://lumeza-website.vercel.app"
        }
      ]
    }
  ]
}
```

---

## 10. ❌ "502 Bad Gateway"

**Error Message**:
```
502 Bad Gateway
The request could not be processed
```

**Cause**: Server error during request processing

**Solutions**:

1. **Check Vercel logs**:
   - Dashboard → Deployments → Latest → View Logs

2. **Check API code for errors**:
   ```powershell
   npx tsc --noEmit  # Type errors
   npm run build     # Build errors
   ```

3. **Check database connection**:
   - Ensure DATABASE_URL set
   - Verify database file exists
   - Test locally: `npx prisma studio`

4. **Check environment variables**:
   - All required vars set in Vercel
   - Correct values (no typos)

5. **Redeploy**:
   ```
   Dashboard → Deployments → ... → Redeploy
   ```

---

## 📋 QUICK REFERENCE

| Error | Cause | Fix |
|-------|-------|-----|
| nodeVersion invalid | Vercel doesn't allow this | Remove from vercel.json |
| DATABASE_URL missing | Not configured | Add in Vercel Settings |
| RESEND_API_KEY invalid | Wrong key or format | Get real key from resend.com |
| Prisma adapter missing | Not installed | npm install @prisma/adapter-better-sqlite3 |
| TypeScript error | Compilation fails | Run: npx tsc --noEmit |
| Build timeout | Takes > 15 min | Optimize dependencies |
| npm install failed | Package doesn't exist | Check package.json, test locally |
| Function timeout | API takes > 10s | Increase maxDuration in vercel.json |
| CORS error | Missing headers | Add CORS headers to API routes |
| 502 Bad Gateway | Server error | Check logs, test locally |

---

## 🔍 DEBUG PROCESS

When deployment fails:

1. **Read Vercel Error Message**
   - Click deployment in Deployments tab
   - Look at error message and logs
   - Note the file and line number

2. **Verify Locally**
   ```powershell
   npm run build    # Test build locally
   npx tsc --check  # Check types
   npm run dev      # Test dev server
   ```

3. **Check Configuration**
   - vercel.json syntax
   - Environment variables
   - API routes
   - Dependencies

4. **Fix and Test**
   ```powershell
   # Fix the issue
   # ...
   
   # Test locally
   npm run build
   
   # Commit and push
   git add .
   git commit -m "Fix: [issue]"
   git push origin main
   ```

5. **Monitor Redeploy**
   - Vercel auto-triggers build
   - Check Deployments tab
   - Wait for 🟢 Ready status

---

## 📞 GET HELP

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Project Repo**: https://github.com/layanandesapahesan-cyber/lumeza-website

---

**Last Updated**: March 6, 2026  
**Status**: All common errors documented with solutions
