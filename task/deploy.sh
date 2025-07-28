#!/bin/bash

# Frontend Deployment Script
# Usage: ./deploy.sh [dev|prod|local]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Build Docker image
build_image() {
    local tag=$1
    print_status "Building Docker image with tag: $tag"
    docker build -t lmd-frontend:$tag .
    print_success "Docker image built successfully"
}

# Run container locally
run_local() {
    local tag=$1
    local port=${2:-3000}
    
    print_status "Stopping existing container if running..."
    docker stop lmd-frontend-local 2>/dev/null || true
    docker rm lmd-frontend-local 2>/dev/null || true
    
    print_status "Starting container on port $port..."
    docker run -d \
        --name lmd-frontend-local \
        -p $port:3000 \
        --env-file .env.local \
        lmd-frontend:$tag
    
    print_success "Container started successfully"
    print_status "Application available at: http://localhost:$port"
}

# Deploy to development environment
deploy_dev() {
    print_status "Deploying to development environment..."
    
    # Check if docker-compose is available
    if ! command -v docker-compose &> /dev/null; then
        print_error "docker-compose is not installed. Please install it first."
        exit 1
    fi
    
    # Build and start development environment
    docker-compose --profile dev up -d --build
    
    print_success "Development environment deployed successfully"
    print_status "Application available at: http://localhost:3001"
}

# Deploy to production environment
deploy_prod() {
    print_status "Deploying to production environment..."
    
    # Check if docker-compose is available
    if ! command -v docker-compose &> /dev/null; then
        print_error "docker-compose is not installed. Please install it first."
        exit 1
    fi
    
    # Build and start production environment
    docker-compose up -d --build
    
    print_success "Production environment deployed successfully"
    print_status "Application available at: http://localhost:3000"
}

# Clean up containers and images
cleanup() {
    print_status "Cleaning up containers and images..."
    
    # Stop and remove containers
    docker stop lmd-frontend-local 2>/dev/null || true
    docker rm lmd-frontend-local 2>/dev/null || true
    
    # Remove images
    docker rmi lmd-frontend:latest 2>/dev/null || true
    docker rmi lmd-frontend:dev 2>/dev/null || true
    
    # Clean up unused resources
    docker system prune -f
    
    print_success "Cleanup completed"
}

# Show logs
show_logs() {
    local container_name=${1:-lmd-frontend-local}
    
    if docker ps -q -f name=$container_name | grep -q .; then
        print_status "Showing logs for $container_name..."
        docker logs -f $container_name
    else
        print_error "Container $container_name is not running"
        exit 1
    fi
}

# Show status
show_status() {
    print_status "Container status:"
    docker ps -a --filter "name=lmd-frontend" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
}

# Main script logic
main() {
    local command=${1:-help}
    
    case $command in
        "dev")
            check_docker
            build_image "dev"
            deploy_dev
            ;;
        "prod")
            check_docker
            build_image "latest"
            deploy_prod
            ;;
        "local")
            check_docker
            build_image "latest"
            run_local "latest"
            ;;
        "build")
            check_docker
            build_image "latest"
            ;;
        "cleanup")
            cleanup
            ;;
        "logs")
            show_logs $2
            ;;
        "status")
            show_status
            ;;
        "help"|*)
            echo "Frontend Deployment Script"
            echo ""
            echo "Usage: $0 [command]"
            echo ""
            echo "Commands:"
            echo "  dev     - Deploy to development environment (port 3001)"
            echo "  prod    - Deploy to production environment (port 3000)"
            echo "  local   - Run container locally (port 3000)"
            echo "  build   - Build Docker image only"
            echo "  cleanup - Clean up containers and images"
            echo "  logs    - Show container logs"
            echo "  status  - Show container status"
            echo "  help    - Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0 dev"
            echo "  $0 prod"
            echo "  $0 local"
            echo "  $0 logs lmd-frontend-local"
            ;;
    esac
}

# Run main function with all arguments
main "$@" 