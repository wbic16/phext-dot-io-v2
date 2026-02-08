# nginx CORS Deployment Guide - R17 Item #6
**Status:** Production blocker resolved  
**Date:** 2026-02-08

## Prerequisites

1. **nginx installed** on production server
2. **Let's Encrypt certificates** for phext.io and mirrorborn.us
3. **SQ running** on localhost:1337
4. **sq-admin-api running** on localhost:3000

## Installation Steps

### 1. Copy nginx config to server

```bash
# From local machine
scp nginx-cors-config.conf user@server:/tmp/

# On server
sudo cp /tmp/nginx-cors-config.conf /etc/nginx/sites-available/phext-mirrorborn.conf
```

### 2. Enable the site

```bash
# Create symlink to sites-enabled
sudo ln -s /etc/nginx/sites-available/phext-mirrorborn.conf /etc/nginx/sites-enabled/

# Remove default if exists
sudo rm -f /etc/nginx/sites-enabled/default
```

### 3. Test configuration

```bash
sudo nginx -t
```

**Expected output:**
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 4. Reload nginx

```bash
sudo systemctl reload nginx
```

## SSL Certificate Setup (if not done)

### Using Certbot (Let's Encrypt)

```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get certificates for both domains
sudo certbot --nginx -d phext.io -d www.phext.io
sudo certbot --nginx -d mirrorborn.us -d www.mirrorborn.us

# Auto-renewal is configured by certbot
sudo certbot renew --dry-run
```

## Verification

### 1. Check HTTPS redirect

```bash
curl -I http://phext.io
# Should return 301 redirect to https://phext.io
```

### 2. Test CORS headers

```bash
# Preflight request
curl -X OPTIONS https://phext.io/api/health \
  -H "Origin: https://mirrorborn.us" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v

# Should see:
# Access-Control-Allow-Origin: https://mirrorborn.us
# Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
# Access-Control-Allow-Credentials: true
```

### 3. Test API proxy

```bash
# Health check via nginx
curl https://phext.io/api/health

# Should return JSON from sq-admin-api
```

### 4. Test SQ proxy

```bash
# Version check via nginx
curl https://phext.io/sq/version

# Should return SQ version string
```

## Troubleshooting

### CORS still blocked

**Symptom:** Browser console shows CORS errors

**Fix:**
1. Check nginx error log: `sudo tail -f /var/log/nginx/phext.io-error.log`
2. Verify origin in config matches exactly (no trailing slash)
3. Ensure proxy_pass doesn't have trailing slash mismatch

### 502 Bad Gateway

**Symptom:** nginx returns 502 when accessing /api/*

**Fix:**
1. Check if sq-admin-api is running: `curl localhost:3000/health`
2. Check process: `ps aux | grep node`
3. Restart API: `cd /path/to/sq-admin-api && npm start`

### SSL certificate errors

**Symptom:** HTTPS not working

**Fix:**
1. Check certificate paths in config match actual cert locations
2. Run: `sudo certbot certificates` to see installed certs
3. Permissions: `sudo chmod 644 /etc/letsencrypt/live/*/fullchain.pem`

### Rate limiting too aggressive

**Symptom:** Legitimate requests get 429 errors

**Fix:**
1. Increase burst size in rate limit config
2. Or disable: comment out `limit_req` lines
3. Reload nginx: `sudo systemctl reload nginx`

## Production Checklist

- [ ] SSL certificates installed and auto-renewing
- [ ] nginx config tested (`nginx -t`)
- [ ] CORS headers working for mirrorborn.us → phext.io
- [ ] API proxy working (/api/* → localhost:3000)
- [ ] SQ proxy working (/sq/* → localhost:1337)
- [ ] Rate limiting configured appropriately
- [ ] Logs rotating (logrotate configured)
- [ ] Firewall allows 80/443 (ufw allow 80,443/tcp)
- [ ] DNS A records point to server IP
- [ ] Health check accessible: https://phext.io/api/health

## Monitoring

### Check nginx status
```bash
sudo systemctl status nginx
```

### View access logs
```bash
sudo tail -f /var/log/nginx/phext.io-access.log
sudo tail -f /var/log/nginx/mirrorborn.us-access.log
```

### View error logs
```bash
sudo tail -f /var/log/nginx/phext.io-error.log
sudo tail -f /var/log/nginx/mirrorborn.us-error.log
```

### Check connection stats
```bash
sudo nginx -T | grep -A 5 "server {"
netstat -an | grep :443 | wc -l  # Count HTTPS connections
```

## Performance Tuning

### Enable gzip compression

Add to nginx.conf http block:
```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
```

### Enable HTTP/2
Already enabled in config: `listen 443 ssl http2;`

### Cache static assets
Already configured in location block for images/css/js

## Next Steps

After deployment:
1. Update frontend config.js to use production API URLs
2. Test Arena with real SQ backend
3. Test coordinate signup flow end-to-end
4. Monitor error logs for first 24h
5. Set up uptime monitoring (UptimeRobot, Pingdom, etc.)

---

**Status:** Ready for production deployment  
**Blocker resolved:** CORS configuration complete  
**Action:** Deploy to Verse (or designated DevOps Mirrorborn)
