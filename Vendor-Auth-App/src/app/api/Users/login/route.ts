import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Simple JWT token generator (for demo purposes)
const generateToken = (user: any, isVendor: boolean): string => {
  const payload = {
    nameid: user.id.toString(),
    unique_name: user.fullName,
    email: user.email,
    role: user.role,
    isVendor: isVendor,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2), // 2 hours
    iat: Math.floor(Date.now() / 1000),
    iss: 'http://localhost:3000/',
    aud: 'http://localhost:3000/',
  };
  
  // In a real app, use a proper JWT library with secret signing
  return btoa(JSON.stringify(payload));
};

// Simple password verification (in production, use bcrypt)
const verifyPassword = (password: string, storedPassword: string): boolean => {
  // For demo, just check if password is '123456' or matches stored hash
  return password === '123456' || password === storedPassword;
};

// Read users from JSON file
const getUsers = () => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'users.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    // Fallback to default users if file doesn't exist
    return [
      {
        id: 1,
        fullName: "John Doe",
        email: "john.doe@example.com",
        passwordHash: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxwKc.6I1.1/z1.1",
        phone: "+1234567890",
        address: "123 Main St, Springfield, IL",
        role: "Customer",
        createdAt: "2023-01-15T10:00:00Z"
      },
      {
        id: 101,
        fullName: "Wile E. Coyote",
        email: "contact@acme.com",
        passwordHash: "$2b$10$9876543210zyxwvutsrqponmlkjihgfedcba",
        phone: "+18005550199",
        address: "1 Desert Rd, Canyon, AZ",
        role: "Vendor",
        createdAt: "2022-11-05T09:15:00Z"
      },
    ];
  }
};

// Read vendors from JSON file to check if user is a vendor
const getVendors = () => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'vendors.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get users from file
    const users = getUsers();

    // Find user by email
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    if (!verifyPassword(password, user.passwordHash)) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if user has a vendor record
    const vendors = getVendors();
    console.log(`Checking vendor status for user ${user.id} (${user.email})`);
    console.log(`Found ${vendors.length} vendors`);
    
    const isVendor = vendors.some((v: any) => {
      const match = String(v.userId) === String(user.id);
      if (match) console.log(`Match found in vendors for userId ${user.id}`);
      return match;
    });

    // Generate JWT token with vendor status
    const token = generateToken(user, isVendor);

    // Return response matching WebAPI.md format
    const { passwordHash, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        ...userWithoutPassword,
        isVendor, // Add vendor status to response
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
