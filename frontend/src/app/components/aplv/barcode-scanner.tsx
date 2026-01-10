'use client';

import { useState } from 'react';
import { useUser } from '../../../lib/userContext';

export default function BarcodeScanner() {
  const { userId } = useUser();
  const [result, setResult] = useState<any>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleScanSuccess = async (barcode: string) => {
    try {
      // Fetch product info
      const response = await fetch(
        `${apiUrl}/api/products/barcode/${barcode}`
      );
      const product = await response.json();

      setResult(product);

      // Save to user profile if logged in
      if (userId && product) {
        await fetch(
          `${apiUrl}/api/profiles/${userId}/scanned-products`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              productId: product.id,
              productName: product.name,
              brand: product.brand,
              barcode: product.barcode,
              isSafe: product.isSafe,
            }),
          }
        );
      }
    } catch (error) {
      console.error('Error scanning product:', error);
    }
  };

  return (
    <div>
      {/* Your scanner UI */}
      {result && (
        <div>
          <h2>{result.name}</h2>
          <p>{result.brand}</p>
          <p>Safe: {result.isSafe ? '✅ Yes' : '❌ No'}</p>
        </div>
      )}
    </div>
  );
}
