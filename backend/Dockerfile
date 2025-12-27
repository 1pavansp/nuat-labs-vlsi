# Use Ubuntu as base image with Icarus Verilog
FROM ubuntu:22.04

# Install Icarus Verilog and dependencies
RUN apt-get update && apt-get install -y \
    iverilog \
    gtkwave \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install --production

# Copy application code
COPY . .

# Create directories for temp files
RUN mkdir -p temp vcd_files

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1);})"

# Start server
CMD ["node", "server.js"]
