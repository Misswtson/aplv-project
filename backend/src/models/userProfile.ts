import Database from 'better-sqlite3';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  createdAt: Date;
}

export interface ScannedProduct {
  id: string;
  userId: string;
  productId: number;
  productName: string;
  brand: string;
  barcode: string;
  isSafe: boolean;
  scannedAt: Date;
}

export function createUserProfileTable(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS scanned_products (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      product_id INTEGER,
      product_name TEXT NOT NULL,
      brand TEXT,
      barcode TEXT NOT NULL,
      is_safe BOOLEAN,
      scanned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES user_profiles(id)
    )
  `);
}
