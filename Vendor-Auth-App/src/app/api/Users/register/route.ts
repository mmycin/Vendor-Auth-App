import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Simple password hash for demo (in production, use bcrypt on backend)
const hashPassword = (password: string): string => {
  return `$2b$10$${btoa(password).substring(0, 50)}`;
};

// Read users from JSON file
const getUsers = () => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'users.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
};

// Write users to JSON file
const saveUsers = (users: any[]) => {
  const filePath = path.join(process.cwd(), 'public', 'data', 'users.json');
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, password, address, role } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: 'Full name, email, and password are required' },
        { status: 400 }
      );
    }

    // Get existing users
    const users = getUsers();

    // Check if email already exists
    if (users.some((u: any) => u.email === email)) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: Math.max(...users.map((u: any) => u.id), 0) + 1,
      fullName,
      email,
      phone: phone || '',
      passwordHash: hashPassword(password),
      address: address || '',
      role: role || 'Customer',
      createdAt: new Date().toISOString(),
    };

    // Save to file
    users.push(newUser);
    saveUsers(users);

    console.log('New user registered and saved to file:', newUser);

    // Return response matching WebAPI.md format
    return NextResponse.json({
      message: 'User registered successfully',
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
