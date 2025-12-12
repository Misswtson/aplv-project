import express from 'express';
import { db } from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create or get user profile
router.post('/profiles', (req, res) => {
  const { name, email } = req.body;
  
  try {
    const userId = uuidv4();
    const stmt = db.prepare(`
      INSERT INTO user_profiles (id, name, email)
      VALUES (?, ?, ?)
    `);
    
    stmt.run(userId, name, email || null);
    res.json({ id: userId, name, email });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create profile' });
  }
});

// Get user profile with scanned products
router.get('/profiles/:userId', (req, res) => {
  const { userId } = req.params;
  
  try {
    const profile = db.prepare(`
      SELECT * FROM user_profiles WHERE id = ?
    `).get(userId);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    const scannedProducts = db.prepare(`
      SELECT * FROM scanned_products 
      WHERE user_id = ?
      ORDER BY scanned_at DESC
    `).all(userId);
    
    res.json({ ...profile, scannedProducts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Save scanned product to user profile
router.post('/profiles/:userId/scanned-products', (req, res) => {
  const { userId } = req.params;
  const { productId, productName, brand, barcode, isSafe } = req.body;
  
  try {
    const id = uuidv4();
    const stmt = db.prepare(`
      INSERT INTO scanned_products 
      (id, user_id, product_id, product_name, brand, barcode, is_safe)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(id, userId, productId, productName, brand, barcode, isSafe);
    res.json({ id, message: 'Product saved' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to save product' });
  }
});

// Get scanned products history
router.get('/profiles/:userId/scanned-products', (req, res) => {
  const { userId } = req.params;
  
  try {
    const products = db.prepare(`
      SELECT * FROM scanned_products 
      WHERE user_id = ?
      ORDER BY scanned_at DESC
    `).all(userId);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;
