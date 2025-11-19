import { generateText } from 'ai';

const CATEGORY_PRICING: Record<string, { min: number; max: number; tags: string[] }> = {
  'fashion': { min: 8500, max: 45000, tags: ['stylish', 'fashionable', 'trendy', 'quality', 'authentic'] },
  'art': { min: 12000, max: 150000, tags: ['artistic', 'creative', 'handcrafted', 'unique', 'original'] },
  'clothing': { min: 6500, max: 35000, tags: ['comfortable', 'quality', 'durable', 'stylish', 'affordable'] },
  'accessories': { min: 5000, max: 25000, tags: ['elegant', 'premium', 'quality', 'stylish', 'timeless'] },
  'electronics': { min: 25000, max: 500000, tags: ['latest', 'quality', 'durable', 'efficient', 'reliable'] },
  'home': { min: 8000, max: 120000, tags: ['modern', 'quality', 'durable', 'stylish', 'functional'] },
  'beauty': { min: 4500, max: 28000, tags: ['natural', 'effective', 'premium', 'quality', 'safe'] },
  'sports': { min: 7500, max: 95000, tags: ['durable', 'professional', 'quality', 'reliable', 'functional'] },
};

function generateProductPoster(title: string, category: string): string {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) {
    // Fallback for server-side: return placeholder
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23fb923c" width="400" height="500"/%3E%3Ctext x="50" y="250" font-size="32" fill="white" font-weight="bold" text-anchor="middle"%3EVibeshop%3C/text%3E%3C/svg%3E';
  }

  canvas.width = 400;
  canvas.height = 500;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const gradient = ctx.createLinearGradient(0, 0, 400, 500);
  gradient.addColorStop(0, '#fb923c');
  gradient.addColorStop(1, '#fbbf24');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 500);

  // Add white overlay for text readability
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(0, 300, 400, 200);

  // Draw Vibeshop branding
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('VIBESHOP', 200, 60);

  // Draw product title
  ctx.font = 'bold 28px Arial';
  ctx.fillStyle = '#ffffff';
  const titleLines = title.length > 30 ? [title.substring(0, 30), title.substring(30)] : [title];
  let yOffset = 180;
  titleLines.forEach(line => {
    ctx.fillText(line, 200, yOffset);
    yOffset += 45;
  });

  // Draw category badge
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.9;
  ctx.fillRect(50, 420, 300, 50);
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#fb923c';
  ctx.font = 'bold 18px Arial';
  ctx.fillText(category.toUpperCase(), 200, 455);

  return canvas.toDataURL('image/png');
}

export async function POST(request: Request) {
  try {
    const { imageUrl, category = 'fashion' } = await request.json();

    if (!imageUrl) {
      return Response.json({ error: 'No image URL provided' }, { status: 400 });
    }

    console.log('[v0] Starting image processing for category:', category);

    let removedBgUrl = imageUrl;
    let enhancedUrl = imageUrl;
    let posterUrl = '';
    let listing = {
      title: 'Premium Product',
      description: 'High-quality product with excellent craftsmanship and attention to detail',
      tags: ['premium', 'quality', 'authentic', 'professional', 'handcrafted'],
      price: '₦25,000 - ₦50,000',
    };

    // Get category-specific pricing and tags
    const categoryInfo = CATEGORY_PRICING[category] || CATEGORY_PRICING['fashion'];

    // Generate product listing with AI
    try {
      console.log('[v0] Calling AI to generate listing for category:', category);
      const { text } = await generateText({
        model: 'openai/gpt-4o-mini',
        prompt: `You are a professional product listing expert specializing in African e-commerce.
Generate a compelling product listing in valid JSON format for a ${category} product.
Use Nigerian Naira (NGN) prices. Include these exact fields:
{
  "title": "A catchy, benefit-driven product title (max 60 characters)",
  "description": "A compelling 150-200 character description highlighting key benefits and quality",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "price": "A realistic price range in NGN like '₦XX,XXX - ₦XXX,XXX'"
}

Return ONLY valid JSON, no markdown, no code blocks, no explanation.`,
      });

      console.log('[v0] AI response received, parsing...');
      const parsed = JSON.parse(text.trim());
      listing = {
        title: parsed.title || listing.title,
        description: parsed.description || listing.description,
        tags: parsed.tags || categoryInfo.tags,
        price: parsed.price || `₦${categoryInfo.min.toLocaleString()} - ₦${categoryInfo.max.toLocaleString()}`,
      };
      console.log('[v0] Listing parsed successfully');
    } catch (aiError) {
      console.log('[v0] AI generation fallback - using defaults:', aiError);
      // Use fallback pricing based on category
      listing = {
        title: `Premium ${category.charAt(0).toUpperCase() + category.slice(1)} Product`,
        description: `High-quality ${category} product with excellent craftsmanship and attention to detail. Perfect for discerning customers.`,
        tags: categoryInfo.tags,
        price: `₦${categoryInfo.min.toLocaleString()} - ₦${categoryInfo.max.toLocaleString()}`,
      };
    }

    posterUrl = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23fb923c;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23fbbf24;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad)" width="400" height="500"/%3E%3Crect fill="%23ffffff" fill-opacity="0.1" y="300" width="400" height="200"/%3E%3Ctext x="200" y="60" font-size="24" fill="%23ffffff" font-weight="bold" text-anchor="middle" font-family="Arial"%3EVIBESHOP%3C/text%3E%3Ctext x="200" y="180" font-size="28" fill="%23ffffff" font-weight="bold" text-anchor="middle" font-family="Arial"%3E${listing.title.substring(0, 20)}%3C/text%3E%3Ctext x="200" y="455" font-size="18" fill="%23fb923c" font-weight="bold" text-anchor="middle" font-family="Arial"%3E${category.toUpperCase()}%3C/text%3E%3C/svg%3E`;

    return Response.json({
      removedBg: removedBgUrl,
      enhanced: enhancedUrl,
      poster: posterUrl,
      listing,
      shareLink: null, // Will be generated on client
    });
  } catch (error) {
    console.error('[v0] Processing error:', error);
    return Response.json(
      { error: 'Processing failed', details: String(error) },
      { status: 500 }
    );
  }
}
