'use client';

import { useState } from 'react';
import { Upload, ImageIcon, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UploadSectionProps {
  onImageUpload: (imageUrl: string) => void;
}

export default function UploadSection({ onImageUpload }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFile = async (file: File) => {
    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          onImageUpload(result);
          setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read file');
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('[v0] Upload error:', err);
      setError('Upload failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-cyan-400 bg-cyan-500/5'
            : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Drop your product photo here
            </h3>
            <p className="text-slate-400 mb-4">or click to browse files</p>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="file-input"
            disabled={isLoading}
          />

          <Button
            onClick={() => document.getElementById('file-input')?.click()}
            disabled={isLoading}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            {isLoading ? 'Processing...' : 'Select Image'}
          </Button>

          <p className="text-xs text-slate-500 mt-4">
            Supported formats: JPG, PNG, WebP (Max 10MB)
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
