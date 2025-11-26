import fs from 'fs';
import path from 'path';
import { User, Vendor } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'public', 'data');

export const getUsers = (): User[] => {
  try {
    const filePath = path.join(DATA_DIR, 'users.json');
    if (!fs.existsSync(filePath)) return [];
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading users.json:', error);
    return [];
  }
};

export const getVendors = (): Vendor[] => {
  try {
    const filePath = path.join(DATA_DIR, 'vendors.json');
    if (!fs.existsSync(filePath)) return [];
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading vendors.json:', error);
    return [];
  }
};
