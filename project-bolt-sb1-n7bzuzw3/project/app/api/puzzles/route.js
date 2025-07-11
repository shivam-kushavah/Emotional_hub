import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Puzzle from '@/models/Puzzle';
import { authMiddleware } from '@/lib/auth';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
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
    
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }
    
    if (search) {
      query.$or = [
        { question: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Get puzzles with pagination
    const puzzles = await Puzzle.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Puzzle.countDocuments(query);

    return NextResponse.json({
      puzzles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get puzzles error:', error);
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

    const { title, question, answer, category, difficulty, language, tags } = await request.json();

    // Validation
    if (!title || !question || !answer || !category || !difficulty || !language) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const puzzle = new Puzzle({
      title,
      question,
      answer,
      category,
      difficulty,
      language,
      tags: tags || [],
      author: user._id
    });

    await puzzle.save();
    await puzzle.populate('author', 'name');

    return NextResponse.json({
      message: 'Puzzle created successfully',
      puzzle
    }, { status: 201 });

  } catch (error) {
    console.error('Create puzzle error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}