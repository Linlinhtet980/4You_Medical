import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src', 'data', 'product.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const products = JSON.parse(rawData);

const updatedProducts = products.map(product => {
  // Use ui-avatars which is very reliable and returns PNG
  const encodedName = encodeURIComponent(product.name);
  const imageUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=200&bold=true`;

  return {
    ...product,
    image: imageUrl
  };
});

fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2));
console.log('Successfully updated 100 products with new image URLs!');
