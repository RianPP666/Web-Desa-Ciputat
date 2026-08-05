import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Path to the JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'gallery.json');
    
    // Read current data
    const fileData = fs.readFileSync(filePath, 'utf8');
    const gallery = JSON.parse(fileData);
    
    // Create new item
    const newItem = {
      id: Date.now().toString(),
      title: data.title,
      category: data.category,
      type: 'image',
      url: data.imageUrl
    };
    
    // Add to the beginning of the array
    gallery.unshift(newItem);
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(gallery, null, 2));
    
    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error saving gallery data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), 'src', 'data', 'gallery.json');
    
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
      title: data.title,
      category: data.category,
      url: data.imageUrl
    };
    
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
    return NextResponse.json({ success: true, item: list[index] });
  } catch (error) {
    console.error('Error updating gallery data:', error);
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
    
    const filePath = path.join(process.cwd(), 'src', 'data', 'gallery.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const list = JSON.parse(fileData);
    
    const updatedList = list.filter((item: any) => item.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(updatedList, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery data:', error);
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
