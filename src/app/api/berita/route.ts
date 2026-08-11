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
    const validationError = validateRequired(data, ['title', 'excerpt', 'content', 'date']);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (data.image && !isValidImageUrl(data.image)) {
      return NextResponse.json({ error: 'URL gambar tidak valid' }, { status: 400 });
    }

    // Path to the JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'news.json');
    
    // Read current data
    let newsList = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      newsList = JSON.parse(fileData);
    }
    
    // Create new item with sanitized data
    const title = sanitizeString(data.title, 200);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const newItem = {
      id: Date.now().toString(),
      title: title,
      slug: slug,
      date: sanitizeString(data.date, 20),
      category: sanitizeString(data.category, 50) || "Berita",
      thumbnail: data.image,
      excerpt: sanitizeString(data.excerpt, 500),
      content: sanitizeString(data.content)
    };
    
    // Add to the beginning of the array
    newsList.unshift(newItem);
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(newsList, null, 2));
    
    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error saving news data:', error);
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
    const validationError = validateRequired(data, ['id', 'title', 'excerpt', 'content', 'date']);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (data.image && !isValidImageUrl(data.image)) {
      return NextResponse.json({ error: 'URL gambar tidak valid' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'news.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const newsList = JSON.parse(fileData);
    
    const index = newsList.findIndex((item: any) => item.id === data.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    // Update fields with sanitized data
    const title = sanitizeString(data.title, 200);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    newsList[index] = {
      ...newsList[index],
      title: title,
      slug: slug,
      date: sanitizeString(data.date, 20),
      category: sanitizeString(data.category, 50) || "Berita",
      thumbnail: data.image,
      excerpt: sanitizeString(data.excerpt, 500),
      content: sanitizeString(data.content)
    };
    
    fs.writeFileSync(filePath, JSON.stringify(newsList, null, 2));
    return NextResponse.json({ success: true, item: newsList[index] });
  } catch (error) {
    console.error('Error updating news data:', error);
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
    
    const filePath = path.join(process.cwd(), 'src', 'data', 'news.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const newsList = JSON.parse(fileData);
    
    const updatedList = newsList.filter((item: any) => item.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(updatedList, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting news data:', error);
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
