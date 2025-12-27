const express = require('express');
const router = express.Router();

// Get all problems
router.get('/', async (req, res) => {
    // Mock data - would come from database
    const problems = [
        {
            id: 1,
            title: "Design a 2:1 Multiplexer",
            difficulty: "easy",
            category: "rtl",
            acceptance: 87,
            submissions: 12400
        }
    ];

    res.json({ problems });
});

// Get single problem
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    // Mock problem data
    const problem = {
        id: parseInt(id),
        title: "Design a 2:1 Multiplexer",
        difficulty: "easy",
        category: "rtl",
        description: "Implement a 2-to-1 multiplexer using Verilog...",
        template: "module mux_2to1(\n    input wire a,\n    input wire b,\n    input wire sel,\n    output wire y\n);\n    // Your code here\nendmodule",
        testCases: [
            { inputs: { a: 1, b: 0, sel: 0 }, expected: { y: 1 } },
            { inputs: { a: 1, b: 0, sel: 1 }, expected: { y: 0 } }
        ]
    };

    res.json({ problem });
});

module.exports = router;
