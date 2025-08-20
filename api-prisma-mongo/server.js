const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ➕ CREATE
app.post('/todos', async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await prisma.todo.create({ data: { title } });
    res.json(todo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 📥 READ ALL
app.get('/todos', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 🔍 READ ONE (com parms)
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({ where: { id } });
    res.json(todo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ✏️ UPDATE
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = await prisma.todo.update({
      where: { id },
      data: { title, completed },
    });
    res.json(todo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ❌ DELETE
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.todo.delete({ where: { id } });
    res.json({ message: 'Todo deletado' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
