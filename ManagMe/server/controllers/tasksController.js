import query from '../db.js';

const getTasks = async (req, res) => {
  try {
    const tasks = await query('SELECT * FROM tasks');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getTask = async (req, res) => {
  try {
    const rows = await query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsersToAssign = async (req, res) => {
  try {
    const rows = await query(`SELECT firstName, lastName FROM users WHERE role = 'devops' OR role = 'developer'`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const createTask = async (req, res) => {
  try {
    const { assignedUser = null, createdDate = null, description, estimatedTime = null, name, priority, stage, story, project_id, startDate = null, endDate = null } = req.body;
    const r = await query(
      'INSERT INTO tasks (assignedUser, createdDate, description, estimatedTime, name, priority, stage, story, project_id, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [assignedUser, createdDate, description, estimatedTime, name, priority, stage, story, project_id, startDate, endDate]
    );
    console.log(r);
    
    res.status(201).json({ message: 'Task added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { assignedUser, createdDate, description, estimatedTime, name, priority, stage, story, project_id, startDate, endDate } = req.body;
    const result = await query(
      'UPDATE tasks SET assignedUser = ?, createdDate = ?, description = ?, estimatedTime = ?, name = ?, priority = ?, stage = ?, story = ?, project_id = ?, startDate = ?, endDate = ? WHERE id = ?',
      [assignedUser, createdDate, description, estimatedTime, name, priority, stage, story, project_id, startDate, endDate, req.params.id]
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Task updated successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteTask = async (req, res) => {
  try {
    const result = await query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTasks, getTask, createTask, updateTask, deleteTask, getUsersToAssign };
