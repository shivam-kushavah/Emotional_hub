import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <Navigation />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}