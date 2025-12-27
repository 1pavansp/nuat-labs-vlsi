# NUAT Labs - VLSI Semiconductor Ecosystem & ZOI Code Platform

A premium, professional-grade VLSI semiconductor company website featuring an integrated coding platform for hardware engineers.

## 🌟 Features

### NUAT Labs Website
- **Premium Semiconductor Design**: High-end VLSI company showcase with chip-themed animations
- **Complete VLSI Ecosystem**: RTL to GDSII flow visualization
- **Interactive Animations**: 
  - Circuit board traces with glowing nodes
  - Electron particle system (50 particles)
  - Rotating silicon wafer (3D visualization)
  - Live signal waveforms
  - 3D chip die flip animation
  - Binary data streams

### ZOI Code Platform
A fully functional **LeetCode for VLSI Engineers** featuring:

#### Problem Solving Interface
- **Split-Pane Layout**: Description on left, code editor on right
- **Verilog/SystemVerilog/VHDL Editor**: Syntax highlighting, line numbers
- **Mock Simulator**: Real-time Verilog simulation with test execution
- **Waveform Viewer**: Canvas-based signal timing diagrams
- **Synthesis Metrics**: Gate count, Power, Area, Delay calculations
- **Technology Nodes**: 3nm, 7nm, 28nm process selection

#### Challenge Library
- **18 VLSI Problems**: Easy, Medium, and Hard difficulty levels
- **8 Categories**: RTL Design, Verification, FSM, Synthesis, Timing Analysis, Low Power, CDC, Physical Design
- **Real Test Cases**: Automated verification with pass/fail indicators
- **Success Animations**: Confetti on problem completion

#### Additional Features
- **Leaderboard**: Global rankings with top 3 podium, user stats
- **Company Interview Questions**: 18 questions from NVIDIA, Intel, AMD, Qualcomm, TSMC, Broadcom
- **Difficulty Filtering**: Easy/Medium/Hard problem filtering

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone <your-repo-url>
cd "NUAT Labs"
```

2. Start local server:
```bash
python -m http.server 8000
```

3. Open in browser:
```
http://localhost:8000/
```

## 📁 Project Structure

```
NUAT Labs/
├── index.html              # Main NUAT Labs website
├── styles.css              # Main website styles
├── script.js               # Main website animations
├── zoicode.html            # ZOI Code landing page
├── zoicode.css             # ZOI Code styles
├── zoicode.js              # ZOI Code functionality
├── problem.html            # Problem solving interface
├── problem-editor.css      # Code editor styles
├── problem-solver.js       # Verilog simulator & waveform generator
├── leaderboard.html        # Rankings & stats
├── leaderboard.js          # Leaderboard data
├── interviews.html         # Company interview questions
└── README.md               # This file
```

## 🎨 Design System

### Colors
- **Silicon Blue**: #0066CC, #00A3E0
- **Circuit Green**: #00FF41
- **Metallic Silver**: #C0C0C0, #E8E8E8
- **Gold Contacts**: #FFD700, #FFA500

### Typography
- **Primary**: Inter (UI elements)
- **Monospace**: JetBrains Mono (code/specs)

## 🔧 Technologies

- **Pure Vanilla JavaScript** - No frameworks or dependencies
- **HTML5 Canvas** - For waveforms and animations
- **CSS3** - Grid, Flexbox, animations
- **Intersection Observer API** - Scroll animations

## 💎 Key Highlights

### Animations
- ✅ Circuit board animated background
- ✅ Electron flow particle effects
- ✅ Rotating silicon wafer
- ✅ Signal waveform visualizations
- ✅ 3D chip flip animation
- ✅ Logic gate signal propagation
- ✅ Success confetti

### Problem Solver
- ✅ Verilog syntax parsing
- ✅ Test case execution
- ✅ Waveform generation
- ✅ Synthesis metrics calculation
- ✅ Multi-tab interface (Testcases/Results/Waveform/Synthesis)

## 📚 Problem Categories

1. **RTL Design** (45 problems) - Verilog/VHDL coding
2. **Verification** (28 problems) - Testbench/UVM
3. **FSM Design** (22 problems) - State machines
4. **Synthesis** (18 problems) - Logic optimization
5. **Timing Analysis** (15 problems) - Setup/hold
6. **Low Power** (12 problems) - Power optimization
7. **CDC** (10 problems) - Clock domain crossing
8. **Physical Design** (8 problems) - Place & route

## 🏆 Leaderboard

Track your progress with:
- Global rankings
- Personal statistics
- Difficulty breakdown (Easy/Medium/Hard)
- Streak counter
- Points system

## 🏢 Company Interview Questions

Real questions from:
- **NVIDIA** - GPU/AI design challenges
- **Intel** - CPU/memory systems
- **AMD** - PCIe, DDR interfaces
- **Qualcomm** - Mobile SoC, low power
- **TSMC** - Physical design, DRC/LVS
- **Broadcom** - Networking, packet buffers

## 📱 Responsive Design

Fully responsive across:
- Desktop (1920px+)
- Laptop (1200px+)
- Tablet (768px+)
- Mobile (640px+)

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📄 License

MIT License - Feel free to use for educational purposes

## 👥 Credits

Designed and developed as a premium VLSI semiconductor ecosystem platform.

---

**Built with 💙 for the VLSI engineering community**
