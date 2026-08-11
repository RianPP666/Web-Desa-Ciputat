import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAuthTokenFromHeader, sanitizeString, validateRequired, isValidImageUrl } from '@/lib/api-utils';

export async function POST(request: Request) {
  try {
    // SEC-1: Verifikasi autentikasi
    const token = getAuthTokenFromHeader(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // SEC-2: Validasi input
    const validationError = validateRequired(data, ['name', 'product', 'location']);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (data.image && !isValidImageUrl(data.image)) {
      return NextResponse.json({ error: 'URL gambar tidak valid' }, { status: 400 });
    }

    // Path to the JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'umkm.json');
    
    // Read current data
    let umkmList = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      umkmList = JSON.parse(fileData);
    }
    
    // Create new item with sanitized data
    const newItem = {
      id: Date.now().toString(),
      name: sanitizeString(data.name, 200),
      product: sanitizeString(data.product, 200),
      category: sanitizeString(data.category, 50),
      price: sanitizeString(data.price, 50),
      location: sanitizeString(data.location, 300),
      phone: sanitizeString(data.phone, 20),
      description: sanitizeString(data.description, 2000),
      image: data.image,
    };
    
    // Add to the beginning of the array
    umkmList.unshift(newItem);
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(umkmList, null, 2));
    
    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error saving UMKM data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    // SEC-1: Verifikasi autentikasi
    const token = getAuthTokenFromHeader(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // SEC-2: Validasi input
    const validationError = validateRequired(data, ['id', 'name', 'product', 'location']);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (data.image && !isValidImageUrl(data.image)) {
      return NextResponse.json({ error: 'URL gambar tidak valid' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'umkm.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const list = JSON.parse(fileData);
    
    const index = list.findIndex((item: any) => item.id === data.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    list[index] = {
      ...list[index],
      name: sanitizeString(data.name, 200),
      product: sanitizeString(data.product, 200),
      category: sanitizeString(data.category, 50),
      price: sanitizeString(data.price, 50),
      location: sanitizeString(data.location, 300),
      phone: sanitizeString(data.phone, 20),
      description: sanitizeString(data.description, 2000),
      image: data.image
    };
    
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
    return NextResponse.json({ success: true, item: list[index] });
  } catch (error) {
    console.error('Error updating umkm data:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // SEC-1: Verifikasi autentikasi
    const token = getAuthTokenFromHeader(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    const filePath = path.join(process.cwd(), 'src', 'data', 'umkm.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const list = JSON.parse(fileData);
    
    const updatedList = list.filter((item: any) => item.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(updatedList, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting umkm data:', error);
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
