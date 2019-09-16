const express = require('express');
const router = express.Router();

// Get all memories
router.get('/', async (req, res) => {
  const allMemories = memories;
  res.render('memories/all-memories', { allMemories });
});

// Add a new memory
router.get('/new', (req, res) => {
  res.render('memories/new-memory');
});

router.post('/new', async (req, res) => {
  const { title, description } = req.body;
  const errors = [];

  if (!title) errors.push({text: 'Please write a title!'});
  if (!description) errors.push({text: 'Please write a description!'});
  if (errors.length > 0) return res.render('memories/new-memory', { errors, title, description });

  const newMemory = {
    id: memories.length.toString(),
    creationDate: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
    title,
    description
  }

  memories.push(newMemory);

  req.flash('success_message', 'Memory added successfully!');
  res.redirect('/memories');
});

// Edit a memory
router.get('/:id', async (req, res) => {
  const memory = memories.find(memory => memory.id === req.params.id);
  res.render('memories/edit-memory', { memory });
});

router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  const memory = { title, description }

  if (!title) errors.push({text: 'Please write a title!'});
  if (!description) errors.push({text: 'Please write a description!'});
  if (errors.length > 0) return res.render('memories/edit-memory', { errors, memory });

  memories = memories.map(memory => {
    if(memory.id.toString() === req.params.id) {
      memory.title = title,
      memory.description = description
    }
    return memory;
  });

  req.flash('success_message', 'Memory edited successfully!');
  res.redirect('/memories');
});

// Delete a memory
router.delete('/:id', async (req, res) => {
  if (memories.find(memory => memory.id.toString() === req.params.id)) {
    memories = memories.filter(memory => memory.id.toString() !== req.params.id);
  }

  req.flash('success_message', 'Memory deleted successfully!');
  res.redirect('/memories');
});

module.exports = router;
