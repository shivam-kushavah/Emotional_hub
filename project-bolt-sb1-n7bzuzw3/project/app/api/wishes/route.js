import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Wish from '@/models/Wish';
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

    // Get wishes with pagination
    const wishes = await Wish.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Wish.countDocuments(query);

    return NextResponse.json({
      wishes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get wishes error:', error);
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

    const wish = new Wish({
      title,
      content,
      category,
      language,
      tags: tags || [],
      author: user._id
    });

    await wish.save();
    await wish.populate('author', 'name');

    return NextResponse.json({
      message: 'Wish created successfully',
      wish
    }, { status: 201 });

  } catch (error) {
    console.error('Create wish error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}