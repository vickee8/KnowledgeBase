# Use the official Ubuntu as the base image
FROM ubuntu:latest

# Update package lists and install Nginx
RUN apt-get update && \
    apt-get install -y nginx

# Copy your custom HTML file to the Nginx default directory
COPY my-custom-html.html /var/www/html/index.html

# Expose port 80 to allow external access
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

