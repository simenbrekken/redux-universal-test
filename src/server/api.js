import { Router } from 'express';

const categories = [
  { id: 1, name: 'Clothing' },
    { id: 11, name: 'Pants', parent: 1 },
    { id: 12, name: 'T-Shirts', parent: 1 },

  { id: 2, name: 'Shoes' },
    { id: 21, name: 'Boots', parent: 2 },
    { id: 22, name: 'Loafers', parent: 2 },

  { id: 3, name: 'Accessories' },
  { id: 31, name: 'Jewellery', parent: 3 },
    { id: 311, name: 'Necklaces', parent: 31 },
      { id: 3111, name: 'Silver', parent: 311 },
      { id: 3112, name: 'Gold', parent: 311 },
];

const router = new Router();
router.get('/categories', (req, res) => res.json(categories));

export default router;
