import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Shayari from '@/models/Shayari';
import { authMiddleware } from '@/lib/auth';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const language = searchParams.get('language') || 'en';
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isPublic: true, language };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Get shayari with pagination
    const shayari = await Shayari.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Shayari.countDocuments(query);

    return NextResponse.json({
      shayari,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get shayari error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    const { user, error } = await authMiddleware(request);
    if (error) {
      return NextResponse.json({ error }, { status: 401 });
    }

    const { title, content, category, language, tags } = await request.json();

    // Validation
    if (!title || !content || !category || !language) {
      return NextResponse.json(
        { error: 'Title, content, category, and language are required' },
        { status: 400 }
      );
    }

    const shayari = new Shayari({
      title,
      content,
      category,
      language,
      tags: tags || [],
      author: user._id
    });

    await shayari.save();
    await shayari.populate('author', 'name');

    return NextResponse.json({
      message: 'Shayari created successfully',
      shayari
    }, { status: 201 });

  } catch (error) {
    console.error('Create shayari error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}