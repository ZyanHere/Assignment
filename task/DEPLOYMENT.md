# Frontend Deployment Guide

This guide explains how to set up and use the CI/CD pipeline for the Last Minute Deal frontend application.

## Overview

The CI/CD pipeline automatically builds and deploys the Next.js frontend application to an EC2 instance whenever code is pushed to the main branch or when manually triggered.

**Note**: This deployment is designed to work alongside your existing backend deployment on the same server. The frontend and backend will run on different ports and be served through different domains.

## Prerequisites

### 1. AWS Setup
- AWS Account with appropriate permissions
- EC2 instance running Ubuntu
- ECR repository for storing Docker images
- S3 bucket for static assets (if needed)

### 2. Domain Setup
- Domain name pointing to your EC2 instance
- Subdomain setup:
  - Frontend: `lastminutessdeal.com` (main domain)
  - Backend: `api.lastminutessdeal.com` (subdomain)
- SSL certificates (handled automatically by Certbot)

### 3. GitHub Secrets

Add the following secrets to your GitHub repository:

#### AWS Configuration
- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key

#### EC2 Configuration
- `EC2_HOST`: Your EC2 instance public IP or domain
- `EC2_USERNAME`: SSH username (usually `ubuntu`)
- `EC2_SSH_KEY`: Private SSH key for EC2 access

#### Application Configuration
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `FACEBOOK_APP_ID`: Facebook OAuth app ID
- `FACEBOOK_APP_SECRET`: Facebook OAuth app secret
- `AWS_S3_BUCKET`: S3 bucket name for file uploads
- `RAZORPAY_KEY_ID`: Razorpay payment gateway key
- `GOOGLE_PLACES_API_KEY`: Google Places API key

## Pipeline Features

### 1. Automated Build
- Builds Docker image with Next.js application
- Pushes to Amazon ECR
- Uses multi-stage build for optimized image size

### 2. Automated Deployment
- Deploys to EC2 instance via SSH
- Sets up Nginx reverse proxy
- Configures SSL certificates with Let's Encrypt
- Implements proper caching and security headers

### 3. Health Checks
- Verifies application startup
- Retries failed deployments
- Provides detailed logging

### 4. Security
- Runs container as non-root user
- Implements security headers
- Configures firewall rules
- Uses HTTPS with SSL certificates

## Manual Deployment

To manually trigger a deployment:

1. Go to your GitHub repository
2. Navigate to Actions tab
3. Select "Deploy Frontend to EC2" workflow
4. Click "Run workflow"
5. Optionally specify a custom image tag
6. Click "Run workflow"

## Environment Variables

The pipeline automatically creates a `.env` file on the EC2 instance with the following variables:

```bash
NODE_ENV=production
PORT=3000

# Next.js Configuration
NEXT_PUBLIC_API_URL=https://api.lastminutessdeal.com
NEXT_PUBLIC_APP_URL=https://lastminutessdeal.com

# Authentication Configuration
NEXTAUTH_URL=https://lastminutessdeal.com
NEXTAUTH_SECRET=your-secret

# OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=ap-southeast-2
AWS_S3_BUCKET_NAME=your-s3-bucket

# Payment Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key

# Google Services
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your-google-places-key
```

## Nginx Configuration

The pipeline automatically configures Nginx with:

- HTTP to HTTPS redirect
- SSL certificate management
- Security headers
- Gzip compression
- Static asset caching
- Proxy configuration for Next.js

## Monitoring and Logs

### Container Logs
```bash
# View frontend container logs
docker logs lmd-frontend

# View backend container logs
docker logs lmd-backend

# Follow logs in real-time
docker logs -f lmd-frontend
docker logs -f lmd-backend

# View recent logs
docker logs --tail=50 lmd-frontend
docker logs --tail=50 lmd-backend

# View all running containers
docker ps
```

### Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### Application Status
```bash
# Check all container status
docker ps

# Check frontend health
curl http://localhost:3000

# Check backend health
curl http://localhost:4000/health

# Check Nginx status
sudo systemctl status nginx

# Check Nginx configuration
sudo nginx -t

# View Nginx sites
ls -la /etc/nginx/sites-enabled/
```

## Troubleshooting

### Common Issues

1. **Container fails to start**
   - Check container logs: `docker logs lmd-frontend`
   - Verify environment variables are set correctly
   - Ensure port 3000 is available

2. **SSL certificate issues**
   - Check if domain is pointing to EC2 instance
   - Verify Certbot installation: `certbot --version`
   - Check certificate status: `sudo certbot certificates`

3. **Nginx configuration errors**
   - Test configuration: `sudo nginx -t`
   - Check syntax: `sudo nginx -s reload`
   - View error logs: `sudo tail -f /var/log/nginx/error.log`

4. **Build failures**
   - Check GitHub Actions logs
   - Verify Dockerfile syntax
   - Ensure all dependencies are in package.json

### Rollback

To rollback to a previous version:

1. Find the previous image tag in ECR
2. Update the deployment script to use the previous tag
3. Re-run the deployment workflow

## Security Considerations

- All sensitive data is stored as GitHub secrets
- Container runs as non-root user
- Firewall is configured to allow only necessary ports
- SSL certificates are automatically renewed
- Security headers are implemented in Nginx

## Running Frontend and Backend Together

### Architecture Overview
```
Internet
    ↓
Nginx (Port 80/443)
    ↓
├── Frontend (Port 3000) → lastminutessdeal.com
└── Backend (Port 4000)  → api.lastminutessdeal.com
```

### Resource Allocation
- **Frontend Container**: ~200-500MB RAM
- **Backend Container**: ~300-800MB RAM
- **Nginx**: ~50-100MB RAM
- **Total**: ~1-2GB RAM recommended

### Port Configuration
- **Frontend**: Port 3000 (Next.js)
- **Backend**: Port 4000 (Node.js)
- **Nginx**: Ports 80 (HTTP) and 443 (HTTPS)

### Domain Routing
- `https://lastminutessdeal.com` → Frontend (Port 3000)
- `https://api.lastminutessdeal.com` → Backend (Port 4000)

## Performance Optimization

- Multi-stage Docker build reduces image size
- Nginx caching for static assets
- Gzip compression enabled
- Optimized Next.js build with standalone output
- Shared Nginx instance for both services

## Support

For issues with the deployment pipeline:

1. Check GitHub Actions logs
2. Review container and Nginx logs
3. Verify all secrets are correctly configured
4. Ensure EC2 instance has sufficient resources 