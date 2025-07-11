import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Card from '@/models/Card';
import { authMiddleware } from '@/lib/auth';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const skip = (page - 1) * limit;
    const userId = searchParams.get('userId');

    // Build query
    let query = {};
    
    if (userId) {
      // Get user's cards
      query.author = userId;
    } else {
      // Get public cards
      query.isPublic = true;
    }

    // Get cards with pagination
    const cards = await Card.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Card.countDocuments(query);

    return NextResponse.json({
      cards,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get cards error:', error);
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

    const { title, content, design, isPublic = false } = await request.json();

    // Validation
    if (!title || !content || !design) {
      return NextResponse.json(
        { error: 'Title, content, and design are required' },
        { status: 400 }
      );
    }

    const card = new Card({
      title,
      content,
      design,
      author: user._id,
      isPublic
    });

    await card.save();
    await card.populate('author', 'name');

    return NextResponse.json({
      message: 'Card created successfully',
      card
    }, { status: 201 });

  } catch (error) {
    console.error('Create card error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}