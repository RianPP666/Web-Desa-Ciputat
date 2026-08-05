import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Path to the JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'news.json');
    
    // Read current data
    let newsList = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      newsList = JSON.parse(fileData);
    }
    
    // Create new item
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const newItem = {
      id: Date.now().toString(),
      title: data.title,
      slug: slug,
      date: data.date,
      category: data.category || "Berita",
      thumbnail: data.image,
      excerpt: data.excerpt,
      content: data.content
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
    const data = await request.json();
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
    
    // Update fields
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    newsList[index] = {
      ...newsList[index],
      title: data.title,
      slug: slug,
      date: data.date,
      category: data.category || "Berita",
      thumbnail: data.image,
      excerpt: data.excerpt,
      content: data.content
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
