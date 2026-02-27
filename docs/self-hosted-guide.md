# Self-Hosted SQ Guide

**Run your own SQ instance locally or on your infrastructure**

---

## Overview

SQ Cloud is convenient, but you might want to self-host for:
- Air-gapped environments
- Data sovereignty requirements
- Development/testing
- Cost control at scale
- Custom integrations

This guide covers installation, configuration, and operations.

---

## Requirements

### Minimum
- 1 CPU core
- 512 MB RAM
- 1 GB disk
- Rust toolchain (for building)

### Recommended (Production)
- 2+ CPU cores
- 2 GB RAM
- SSD storage
- Linux (Ubuntu 22.04+ or similar)

---

## Installation

### Option 1: Build from Source

```bash
# Clone the repository
git clone https://github.com/wbic16/SQ
cd SQ

# Build release binary
cargo build --release

# Binary is at ./target/release/sq
```

### Option 2: Pre-built Binary

```bash
# Download latest release (when available)
curl -LO https://github.com/wbic16/SQ/releases/latest/download/sq-linux-x64
chmod +x sq-linux-x64
mv sq-linux-x64 /usr/local/bin/sq
```

### Option 3: Docker

```dockerfile
FROM rust:1.75 as builder
WORKDIR /app
RUN git clone https://github.com/wbic16/SQ .
RUN cargo build --release

FROM debian:bookworm-slim
COPY --from=builder /app/target/release/sq /usr/local/bin/
EXPOSE 1337
CMD ["sq", "--port", "1337", "--phext", "/data"]
```

```bash
docker build -t sq .
docker run -d -p 1337:1337 -v /path/to/phexts:/data sq
```

---

## Configuration

### Command Line Options

```bash
sq --help

Options:
  --port <PORT>       HTTP port (default: 1337)
  --phext <PATH>      Directory containing .phext files
  --readonly          Disable write operations
  --cors <ORIGINS>    Allowed CORS origins (comma-separated)
  --log <LEVEL>       Log level: error, warn, info, debug, trace
```

### Basic Startup

```bash
# Serve phext files from ./data on port 1337
sq --port 1337 --phext ./data

# Read-only mode (safe for public exposure)
sq --port 1337 --phext ./data --readonly

# With CORS for web apps
sq --port 1337 --phext ./data --cors "https://myapp.com,http://localhost:3000"
```

### Environment Variables

```bash
export SQ_PORT=1337
export SQ_PHEXT_DIR=/var/lib/sq
export SQ_LOG_LEVEL=info
export SQ_CORS_ORIGINS="*"

sq  # Uses environment variables
```

---

## Directory Structure

```
/var/lib/sq/
├── docs.phext           # Documentation phext
├── users.phext          # User data phext
├── logs.phext           # Application logs
└── .sq/
    ├── config.toml      # Optional config file
    └── tokens/          # JWT tokens (if auth enabled)
```

### Config File (Optional)

```toml
# /var/lib/sq/.sq/config.toml

port = 1337
readonly = false
log_level = "info"

[cors]
origins = ["https://myapp.com"]
credentials = true

[auth]
enabled = true
jwt_secret = "your-secret-here"  # Use env var in production
token_expiry = "7d"
```

---

## Running as a Service

### systemd (Linux)

```ini
# /etc/systemd/system/sq.service

[Unit]
Description=SQ Phext Server
After=network.target

[Service]
Type=simple
User=sq
Group=sq
WorkingDirectory=/var/lib/sq
ExecStart=/usr/local/bin/sq --port 1337 --phext /var/lib/sq
Restart=always
RestartSec=5

# Security hardening
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/sq

[Install]
WantedBy=multi-user.target
```

```bash
# Create service user
sudo useradd -r -s /bin/false sq
sudo mkdir -p /var/lib/sq
sudo chown sq:sq /var/lib/sq

# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable sq
sudo systemctl start sq

# Check status
sudo systemctl status sq
journalctl -u sq -f
```

### Docker Compose

```yaml
# docker-compose.yml

version: '3.8'

services:
  sq:
    build: .
    ports:
      - "1337:1337"
    volumes:
      - sq-data:/data
    environment:
      - SQ_LOG_LEVEL=info
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:1337/api/v2/version"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  sq-data:
```

---

## Reverse Proxy

### nginx

```nginx
# /etc/nginx/sites-available/sq

upstream sq_backend {
    server 127.0.0.1:1337;
}

server {
    listen 443 ssl http2;
    server_name sq.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/sq.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sq.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://sq_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support (if needed)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### Caddy

```
# Caddyfile

sq.yourdomain.com {
    reverse_proxy localhost:1337
}
```

---

## Backups

### Simple Backup

```bash
#!/bin/bash
# backup-sq.sh

BACKUP_DIR="/backups/sq"
PHEXT_DIR="/var/lib/sq"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/sq-$DATE.tar.gz" -C "$PHEXT_DIR" .

# Keep last 30 days
find "$BACKUP_DIR" -name "sq-*.tar.gz" -mtime +30 -delete
```

### Git-based Backup

```bash
cd /var/lib/sq
git init  # Once
git add *.phext
git commit -m "Backup $(date +%Y-%m-%d)"
git push origin main
```

Phext files are plain text — Git handles them perfectly.

### Continuous Sync

```bash
# Cron job: sync every hour
0 * * * * cd /var/lib/sq && git add -A && git commit -m "Auto-sync $(date)" && git push
```

---

## Monitoring

### Health Check Endpoint

```bash
curl http://localhost:1337/api/v2/version
# Returns: {"version": "0.5.0", "status": "ok"}
```

### Basic Monitoring Script

```bash
#!/bin/bash
# check-sq.sh

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:1337/api/v2/version)

if [ "$RESPONSE" != "200" ]; then
    echo "SQ unhealthy: HTTP $RESPONSE"
    # Alert logic here (email, Slack, PagerDuty, etc.)
    exit 1
fi

echo "SQ healthy"
```

### Prometheus Metrics (if enabled)

```bash
curl http://localhost:1337/metrics
```

---

## Security

### Firewall

```bash
# Only allow local access (behind reverse proxy)
sudo ufw allow from 127.0.0.1 to any port 1337

# Or specific IPs
sudo ufw allow from 10.0.0.0/8 to any port 1337
```

### Authentication

If exposing publicly, enable JWT authentication:

```toml
# config.toml
[auth]
enabled = true
jwt_secret = "${SQ_JWT_SECRET}"  # From environment
```

Generate tokens:

```bash
sq token create --user alice --expiry 30d
# Returns: eyJhbGciOiJIUzI1NiIs...
```

### Read-Only Mode

For public documentation servers:

```bash
sq --readonly --phext ./docs
```

Write operations return 403 Forbidden.

---

## Troubleshooting

### SQ won't start

```bash
# Check port availability
lsof -i :1337

# Check permissions
ls -la /var/lib/sq

# Run with debug logging
sq --log debug --phext ./data
```

### Slow responses

```bash
# Check phext file sizes
du -sh /var/lib/sq/*.phext

# Files over 50MB may need splitting
# See best-practices.md for guidance
```

### Out of memory

```bash
# Monitor memory usage
watch -n 1 'ps aux | grep sq'

# Increase limits if needed
# /etc/systemd/system/sq.service.d/override.conf
[Service]
MemoryMax=4G
```

### Disk full

```bash
# Check disk usage
df -h /var/lib/sq

# Clean old backups
find /backups -name "*.tar.gz" -mtime +7 -delete
```

---

## Upgrading

```bash
# Stop service
sudo systemctl stop sq

# Backup current binary
sudo cp /usr/local/bin/sq /usr/local/bin/sq.bak

# Install new version
cd /path/to/SQ
git pull
cargo build --release
sudo cp target/release/sq /usr/local/bin/

# Start service
sudo systemctl start sq

# Verify
curl http://localhost:1337/api/v2/version
```

---

## When to Use SQ Cloud Instead

Consider SQ Cloud if you need:
- Zero ops overhead
- Managed backups
- Automatic updates
- SLA guarantees
- Multi-region replication

Self-host if you need:
- Air-gapped deployment
- Custom security requirements
- Cost optimization at scale
- Full control

---

## Related Resources

- [API Reference](./api-reference.md) — Endpoint documentation (same API for self-hosted)
- [Cookbook](./cookbook.md) — Practical recipes and patterns
- [Security](./security.md) — Security considerations for your deployment
- [Architecture](./architecture.md) — How SQ is designed
- [Troubleshooting](./troubleshooting.md) — Common issues and solutions

---

*Questions? Ask in [Discord](https://discord.com/invite/clawd).*
