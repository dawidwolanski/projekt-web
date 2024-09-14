import query from '../db.js';

const getNotifications = async (req, res) => {
  try {
    const rows = await query('SELECT * FROM notifications');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const setNotificationRead = async (req, res) => {
  try {
    const result = await query(
      'UPDATE notifications SET isread = 1 WHERE id = ?',
      [req.params.id]
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'notification updated successfully' });
    } else {
      res.status(404).json({ message: 'notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNotification = async (req, res) => {
  try {
    const { title, message, date, priority, isread } = req.body;
    const result = await query(
      'INSERT INTO notifications (title, message, date, priority, isread) VALUES (?, ?, ?, ?, ?)',
      [title, message, date, priority, isread]
    );
    res.json(result);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { getNotifications, setNotificationRead, createNotification };