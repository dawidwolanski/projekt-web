import query from '../db.js';

// Pobierz wszystkie projekty
const getProjects = async (req, res) => {
  try {
    const rows = await query('SELECT * FROM projects');
    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Pobierz projekt po ID
const getProject = async (req, res) => {
  try {
    const rows = await query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectTasks = async (req, res) => {
  try {
    const rows = await query('SELECT * FROM tasks WHERE project_id = ?', [req.params.id]);
    res.json(rows);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dodaj nowy projekt
const createProject = async (req, res) => {
  try {
    const { description, name, priority, stage } = req.body;
    const result = await query(
      'INSERT INTO projects (description, name, priority, stage) VALUES (?, ?, ?, ?)',
      [description, name, priority, stage]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Zaktualizuj projekt
const updateProject = async (req, res) => {
  try {
    const { description, name, priority, stage } = req.body;
    const result = await query(
      'UPDATE projects SET description = ?, name = ?, priority = ?, stage = ? WHERE id = ?',
      [description, name, priority, stage, req.params.id]
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Project updated successfully' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Usuń projekt
const deleteProject = async (req, res) => {
  try {
    const result = await query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getProjects, getProject, createProject, updateProject, deleteProject, getProjectTasks };
