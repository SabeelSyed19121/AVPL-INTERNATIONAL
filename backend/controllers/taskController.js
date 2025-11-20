// backend/controllers/taskController.js
const db = require('../models');

// Create task
const createTask = (req, res) => {
  const { title, description, status } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });

  const stmt = `INSERT INTO tasks (title, description, status, createdBy) VALUES (?, ?, ?, ?)`;
  db.run(stmt, [title, description || '', status || 'pending', req.user.id], function (err) {
    if (err) return res.status(500).json({ message: err.message });
    db.get(`SELECT * FROM tasks WHERE id = ?`, [this.lastID], (e, task) => {
      if (e) return res.status(500).json({ message: e.message });
      res.status(201).json(task);
    });
  });
};

// Get tasks (all for admin, own for user)
const getTasks = (req, res) => {
  if (req.user.role === 'admin') {
    db.all(`SELECT tasks.*, users.username AS owner FROM tasks LEFT JOIN users ON tasks.createdBy = users.id ORDER BY createdAt DESC`, [], (err, rows) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(rows);
    });
  } else {
    db.all(`SELECT * FROM tasks WHERE createdBy = ? ORDER BY createdAt DESC`, [req.user.id], (err, rows) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(rows);
    });
  }
};

// Get single task (admins can get any, users only own)
const getTaskById = (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (err, task) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!task) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && task.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(task);
  });
};

// Update task (only owner or admin)
const updateTask = (req, res) => {
  const id = req.params.id;
  const { title, description, status } = req.body;

  db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (err, task) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!task) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && task.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const stmt = `UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?`;
    db.run(stmt, [title || task.title, description || task.description, status || task.status, id], function (e) {
      if (e) return res.status(500).json({ message: e.message });
      db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (er, updated) => {
        if (er) return res.status(500).json({ message: er.message });
        res.json(updated);
      });
    });
  });
};

// Delete task (owner or admin; admin can delete any)
const deleteTask = (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (err, task) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!task) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && task.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (e) {
      if (e) return res.status(500).json({ message: e.message });
      res.json({ message: 'Deleted' });
    });
  });
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
