import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Read vendors from JSON file
const getVendors = () => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'vendors.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
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

// Write vendors to JSON file
const saveVendors = (vendors: any[]) => {
  const filePath = path.join(process.cwd(), 'public', 'data', 'vendors.json');
  fs.writeFileSync(filePath, JSON.stringify(vendors, null, 2), 'utf8');
};

// Write users to JSON file
const saveUsers = (users: any[]) => {
  const filePath = path.join(process.cwd(), 'public', 'data', 'users.json');
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = parseInt(id);
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { message: 'Invalid user ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      businessName,
      contactName,
      businessPhone,
      businessEmail,
      businessAddress,
      serviceArea,
      serviceType,
      description,
      website,
      instagram,
      facebook,
      linkedin,
    } = body;

    if (!businessName || !contactName || !businessEmail) {
      return NextResponse.json(
        { message: 'Business name, contact name, and email are required' },
        { status: 400 }
      );
    }

    // Get existing vendors
    const vendors = getVendors();

    // Check if vendor already exists for this user
    if (vendors.some((v: any) => v.userId === userId)) {
      return NextResponse.json(
        { message: 'Vendor already exists for this user' },
        { status: 400 }
      );
    }

    // Create new vendor
    const newVendor = {
      id: Math.max(...vendors.map((v: any) => v.id), 0) + 1,
      userId,
      businessName,
      contactName,
      businessPhone: businessPhone || '',
      businessEmail,
      businessAddress: businessAddress || '',
      serviceArea: serviceArea || '',
      serviceType: serviceType || '',
      description: description || '',
      website: website || '',
      instagram: instagram || '',
      facebook: facebook || '',
      linkedin: linkedin || '',
      ratingAverage: 0,
      reviewCount: 0,
      listings: null,
    };

    // Save vendor to file
    vendors.push(newVendor);
    saveVendors(vendors);

    console.log('New vendor registered and saved to file:', newVendor);

    // Return vendor object matching WebAPI.md format
    return NextResponse.json(newVendor);

  } catch (error) {
    console.error('Vendor registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
