import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Wish from '@/models/Wish';
import Quote from '@/models/Quote';
import Shayari from '@/models/Shayari';
import Puzzle from '@/models/Puzzle';

export async function POST() {
  try {
    await connectDB();

    // Sample Wishes
    const wishes = [
      {
        title: "Birthday Wish",
        content: "May your birthday be filled with sunshine, smiles, laughter, love, and all the wonderful things that make you happy!",
        category: "birthday",
        language: "en",
        tags: ["birthday", "celebration", "joy"],
        isPublic: true
      },
      {
        title: "जन्मदिन की शुभकामना",
        content: "आपका जन्मदिन धूप, मुस्कान, हंसी, प्यार और उन सभी अद्भुत चीजों से भरा हो जो आपको खुश करती हैं!",
        category: "birthday",
        language: "hi",
        tags: ["जन्मदिन", "जश्न", "खुशी"],
        isPublic: true
      },
      {
        title: "Anniversary Wish",
        content: "Your love story continues to inspire us all. Wishing you both a lifetime of happiness and togetherness!",
        category: "anniversary",
        language: "en",
        tags: ["anniversary", "love", "togetherness"],
        isPublic: true
      },
      {
        title: "Success Wish",
        content: "Your hard work and dedication have paid off! Congratulations on your amazing achievement!",
        category: "success",
        language: "en",
        tags: ["success", "achievement", "congratulations"],
        isPublic: true
      }
    ];

    // Sample Quotes
    const quotes = [
      {
        title: "Motivational Quote",
        content: "The only impossible journey is the one you never begin. Start today, start now, start with what you have. Every expert was once a beginner.",
        category: "motivational",
        language: "en",
        tags: ["journey", "begin", "start", "expert"],
        isPublic: true
      },
      {
        title: "प्रेरणादायक कोट",
        content: "केवल वही यात्रा असंभव है जिसकी शुरुआत आप कभी नहीं करते। आज शुरू करें, अभी शुरू करें, जो है उसी से शुरू करें। हर विशेषज्ञ कभी शुरुआती था।",
        category: "motivational",
        language: "hi",
        tags: ["यात्रा", "शुरुआत", "आज", "विशेषज्ञ"],
        isPublic: true
      },
      {
        title: "Life Quote",
        content: "Life is not about waiting for the storm to pass. It's about learning to dance in the rain. Embrace every moment, good or bad.",
        category: "life",
        language: "en",
        tags: ["life", "storm", "dance", "embrace"],
        isPublic: true
      },
      {
        title: "Success Quote",
        content: "Success is not final, failure is not fatal. It is the courage to continue that counts. Keep moving forward, always.",
        category: "success",
        language: "en",
        tags: ["success", "failure", "courage", "forward"],
        isPublic: true
      }
    ];

    // Sample Shayari
    const shayari = [
      {
        title: "Romantic Shayari",
        content: "In your eyes I found my home,\nIn your heart I found my love,\nIn your soul I found my mate,\nForever yours, my heart will roam.",
        category: "romantic",
        language: "en",
        tags: ["love", "romance", "heart", "soul"],
        isPublic: true
      },
      {
        title: "रोमांटिक शायरी",
        content: "तेरी आंखों में मिला मुझे मेरा घर,\nतेरे दिल में मिला मुझे मेरा प्यार,\nतेरी रूह में मिला मुझे मेरा साथी,\nहमेशा तेरा रहेगा ये दिल बेकरार।",
        category: "romantic",
        language: "hi",
        tags: ["प्यार", "आंखें", "दिल", "रूह"],
        isPublic: true
      },
      {
        title: "Sad Shayari",
        content: "Silent tears speak the loudest,\nBroken hearts feel the deepest,\nLonely nights teach us strength,\nPain makes us the strongest.",
        category: "sad",
        language: "en",
        tags: ["tears", "broken", "lonely", "pain"],
        isPublic: true
      }
    ];

    // Sample Puzzles
    const puzzles = [
      {
        title: "Keyboard Riddle",
        question: "I have keys but no locks. I have space but no room. You can enter, but you can't go outside. What am I?",
        answer: "A keyboard",
        category: "riddles",
        difficulty: "easy",
        language: "en",
        tags: ["keys", "space", "enter", "technology"],
        isPublic: true
      },
      {
        title: "कीबोर्ड पहेली",
        question: "मेरे पास चाबियां हैं लेकिन ताले नहीं। मेरे पास जगह है लेकिन कमरा नहीं। आप प्रवेश कर सकते हैं, लेकिन बाहर नहीं जा सकते। मैं क्या हूं?",
        answer: "कीबोर्ड",
        category: "riddles",
        difficulty: "easy",
        language: "hi",
        tags: ["चाबियां", "जगह", "प्रवेश", "तकनीक"],
        isPublic: true
      },
      {
        title: "Math Puzzle",
        question: "If you have 3 apples and you take away 2, how many do you have?",
        answer: "2 apples (the ones you took)",
        category: "math",
        difficulty: "easy",
        language: "en",
        tags: ["apples", "subtraction", "trick", "simple"],
        isPublic: true
      }
    ];

    // Clear existing data
    await Promise.all([
      Wish.deleteMany({}),
      Quote.deleteMany({}),
      Shayari.deleteMany({}),
      Puzzle.deleteMany({})
    ]);

    // Insert sample data
    await Promise.all([
      Wish.insertMany(wishes),
      Quote.insertMany(quotes),
      Shayari.insertMany(shayari),
      Puzzle.insertMany(puzzles)
    ]);

    return NextResponse.json({
      message: 'Database seeded successfully',
      data: {
        wishes: wishes.length,
        quotes: quotes.length,
        shayari: shayari.length,
        puzzles: puzzles.length
      }
    });

  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}