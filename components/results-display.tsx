'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Copy, Check, Share2, LinkIcon } from 'lucide-react';
import { useState } from 'react';

interface ResultsDisplayProps {
  results: {
    removedBg: string | null;
    enhanced: string | null;
    listing: any | null;
    poster: string | null;
    shareLink: string | null;
  };
  isProcessing: boolean;
}

export default function ResultsDisplay({
  results,
  isProcessing,
}: ResultsDisplayProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadImage = (src: string, filename: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename;
    link.click();
  };

  if (!results.removedBg && !isProcessing) {
    return (
      <Card className="p-8 border-slate-700 bg-slate-800/50 text-center">
        <p className="text-slate-400">
          Select a category and click "Start Processing" to generate your product listing
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {results.poster && (
        <Card className="p-6 border-slate-700 bg-slate-800/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Product Poster</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => downloadImage(results.poster!, 'product-poster.png')}
              className="text-slate-300 hover:bg-slate-700"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <div className="aspect-square rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
            <img
              src={results.poster || "/placeholder.svg"}
              alt="Product poster"
              className="w-full h-full object-cover"
            />
          </div>
        </Card>
      )}

      {/* Background Removed */}
      {results.removedBg && (
        <Card className="p-6 border-slate-700 bg-slate-800/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Background Removed</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => downloadImage(results.removedBg!, 'product-no-bg.png')}
              className="text-slate-300 hover:bg-slate-700"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <div className="aspect-square rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
            <img
              src={results.removedBg || "/placeholder.svg"}
              alt="Background removed"
              className="w-full h-full object-contain"
            />
          </div>
        </Card>
      )}

      {/* Enhanced Image */}
      {results.enhanced && (
        <Card className="p-6 border-slate-700 bg-slate-800/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Enhanced Image</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => downloadImage(results.enhanced!, 'product-enhanced.png')}
              className="text-slate-300 hover:bg-slate-700"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <div className="aspect-square rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
            <img
              src={results.enhanced || "/placeholder.svg"}
              alt="Enhanced product"
              className="w-full h-full object-contain"
            />
          </div>
        </Card>
      )}

      {/* Product Listing */}
      {results.listing && (
        <Card className="p-6 border-slate-700 bg-slate-800/50">
          <h3 className="font-semibold text-white mb-4">Generated Listing</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400">Title</label>
              <div className="flex gap-2 mt-1">
                <div className="flex-1 bg-slate-900 rounded px-3 py-2 text-white text-sm border border-slate-700">
                  {results.listing.title}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(results.listing.title, 'title')}
                  className="text-slate-300 hover:bg-slate-700"
                >
                  {copied === 'title' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-400">Description</label>
              <div className="flex gap-2 mt-1">
                <textarea
                  value={results.listing.description}
                  readOnly
                  className="flex-1 bg-slate-900 rounded px-3 py-2 text-white text-sm border border-slate-700 resize-none h-24"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(results.listing.description, 'description')
                  }
                  className="text-slate-300 hover:bg-slate-700"
                >
                  {copied === 'description' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-400">Tags</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {results.listing.tags?.map((tag: string, idx: number) => (
                  <div
                    key={idx}
                    className="bg-orange-500/10 border border-orange-400 text-orange-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {results.listing.price && (
              <div>
                <label className="text-sm text-slate-400">Suggested Price (NGN)</label>
                <div className="bg-slate-900 rounded px-3 py-2 text-white text-sm border border-slate-700 mt-1">
                  ₦ {results.listing.price}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {results.shareLink && (
        <Card className="p-6 border-orange-500/30 bg-orange-500/5">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-orange-400" />
            Share Your Listing
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-slate-400">Shareable Link</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={results.shareLink}
                  readOnly
                  className="flex-1 bg-slate-900 rounded px-3 py-2 text-white text-sm border border-slate-700 font-mono"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(results.shareLink!, 'link')}
                  className="text-orange-300 hover:bg-orange-500/10"
                >
                  {copied === 'link' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <button
              onClick={() => {
                const text = `Check out this amazing product! ${results.shareLink}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="w-full bg-gradient-to-r from-orange-400 to-amber-500 text-white py-2 rounded-lg font-medium hover:from-orange-500 hover:to-amber-600 transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share on WhatsApp
            </button>
          </div>
        </Card>
      )}

      {isProcessing && (
        <Card className="p-6 border-slate-700 bg-slate-800/50 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-slate-400">Processing your product image...</p>
        </Card>
      )}
    </div>
  );
}
