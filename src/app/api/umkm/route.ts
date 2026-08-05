import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Path to the JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'umkm.json');
    
    // Read current data
    let umkmList = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      umkmList = JSON.parse(fileData);
    }
    
    // Create new item
    const newItem = {
      id: Date.now().toString(),
      ...data
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
    const data = await request.json();
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
      name: data.name,
      product: data.product,
      category: data.category,
      price: data.price,
      location: data.location,
      phone: data.phone,
      description: data.description,
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
