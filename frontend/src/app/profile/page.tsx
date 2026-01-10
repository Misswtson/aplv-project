'use client';

import { useEffect, useState } from 'react';
import { useUser } from '../../lib/userContext';

export default function ProfilePage() {
  const { user, userId } = useUser();
  const [scannedProducts, setScannedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (userId) {
      fetchScannedProducts();
    }
  }, [userId]);

  const fetchScannedProducts = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/profiles/${userId}/scanned-products`
      );
      const data = await response.json();
      setScannedProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Please log in to view your profile</div>;
  }

  return (
    <div className="container py-8">
      <h1>My Profile</h1>
      <p>Name: {user.name}</p>
      {user.email && <p>Email: {user.email}</p>}

      <h2 className="mt-8">Scanned Products History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : scannedProducts.length === 0 ? (
        <p>No scanned products yet</p>
      ) : (
        <div className="grid gap-4">
          {scannedProducts.map((product: any) => (
            <div key={product.id} className="border p-4 rounded">
              <h3>{product.product_name}</h3>
              <p>{product.brand}</p>
              <p>Safe: {product.is_safe ? '✅' : '❌'}</p>
              <small>{new Date(product.scanned_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
