import { NextRequest, NextResponse } from 'next/server';
import { getUsers, getVendors } from '@/lib/db';
import { decodeJWT } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = decodeJWT(token);

    if (!decoded || !decoded.nameid) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    const userId = parseInt(decoded.nameid);
    const users = getUsers();
    const user = users.find((u: any) => u.id === userId);

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const vendors = getVendors();
    const isVendor = vendors.some((v: any) => String(v.userId) === String(userId));
    const vendor = vendors.find((v: any) => String(v.userId) === String(userId));

    // Remove password hash
    const { passwordHash, ...userWithoutPassword } = user as any;

    return NextResponse.json({
      ...userWithoutPassword,
      isVendor,
      vendor: vendor || null,
    });

  } catch (error) {
    console.error('Error in /me:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
