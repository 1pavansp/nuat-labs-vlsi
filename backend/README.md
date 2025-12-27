# ZOI Code Backend - Real Verilog Judging System

Backend API with Icarus Verilog integration for real VLSI code execution.

## Features

✅ **Real Verilog Execution** - Icarus Verilog compiler & simulator
✅ **Automatic Testbench Generation** - Creates testbenches from test cases
✅ **VCD Parsing** - Generates real waveform data
✅ **Secure Sandboxing** - Isolated execution with timeouts
✅ **RESTful API** - Express.js server with authentication
✅ **Docker Support** - Containerized execution environment

## Prerequisites

### Local Development
- Node.js 16+
- Icarus Verilog (`iverilog`)

**Install Icarus Verilog:**

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install iverilog
```

**macOS:**
```bash
brew install icarus-verilog
```

**Windows:**
Download from http://iverilog.icarus.com/

### Production (Docker)
- Docker
- Docker Compose

## Setup

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your settings
```

3. **Run server:**
```bash
npm start
```

Server runs on http://localhost:3001

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Problems
- `GET /api/problems` - List all problems
- `GET /api/problems/:id` - Get problem details

### Submission
- `POST /api/submit` - Submit code for execution

**Request:**
```json
{
  "problemId": 1,
  "code": "module mux_2to1(...); ... endmodule",
  "language": "verilog"
}
```

**Response:**
```json
{
  "success": true,
  "status": "accepted",
  "testsPassed": 4,
  "testsTotal": 4,
  "testResults": [...],
  "waveformData": {...},
  "compilationOutput": "...",
  "executionTime": 1234
}
```

### Admin
- `GET /api/admin/stats` - Platform statistics
- `POST /api/admin/problems` - Create problem
- `PUT /api/admin/problems/:id` - Update problem
- `DELETE /api/admin/problems/:id` - Delete problem

## How It Works

1. **User submits code** → API receives Verilog code
2. **Testbench generation** → Auto-generates testbench from test cases
3. **Compilation** → Runs `iverilog` to compile design + testbench
4. **Simulation** → Executes with `vvp`, generates VCD file
5. **Result parsing** → Parses output for pass/fail + waveforms
6. **Response** → Returns results to frontend

## Docker Deployment

Build image:
```bash
docker build -t zoicode-backend .
```

Run container:
```bash
docker run -p 3001:3001 \
  -e NODE_ENV=production \
  -e JWT_SECRET=your_secret \
  zoicode-backend
```

## Testing

Test the API:
```bash
curl -X POST http://localhost:3001/api/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "problemId": 1,
    "code": "module mux_2to1(input wire a, input wire b, input wire sel, output wire y); assign y = sel ? b : a; endmodule",
    "language": "verilog"
  }'
```

## Security Features

- **Execution timeout** (30s default)
- **Isolated temp directories**
- **Resource limits** (via Docker)
- **Input validation**
- **Rate limiting**
- **JWT authentication**

## Production Deployment

**Recommended:**
- Railway.app
- Render.com
- DigitalOcean App Platform

All support Docker containers with Icarus Verilog!

## Future Enhancements

- [ ] Verilator integration (faster simulation)
- [ ] VHDL support
- [ ] Synthesis reports
- [ ] Power analysis
- [ ] Custom waveform viewer
- [ ] Code coverage metrics

## License

MIT
