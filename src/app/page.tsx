'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookOpen, FileText, Home as HomeIcon } from 'lucide-react';

export default function Home() {
  const [content, setContent] = useState<string>('');
  const [selectedDoc, setSelectedDoc] = useState<string>('Project-Hail-Mary-Chapter1.md');
  const [loading, setLoading] = useState<boolean>(false);

  const documents = [
    { name: 'Project Hail Mary - Chapter 1', file: 'Project-Hail-Mary-Chapter1.md', icon: BookOpen },
    { name: 'Novel Content (Raw)', file: 'novel-content.md', icon: FileText },
  ];

  useEffect(() => {
    loadDocument(selectedDoc);
  }, [selectedDoc]);

  const loadDocument = async (filename: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/${filename}`);
      const text = await response.text();
      setContent(text);
    } catch (error) {
      console.error('Failed to load document:', error);
      setContent('# Error\n\nFailed to load the document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Self-Improvement Library</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedDoc('Project-Hail-Mary-Chapter1.md')}
            className="gap-2"
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📚 Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {documents.map((doc) => {
                  const Icon = doc.icon;
                  return (
                    <Button
                      key={doc.file}
                      variant={selectedDoc === doc.file ? 'default' : 'ghost'}
                      className="w-full justify-start gap-2"
                      onClick={() => setSelectedDoc(doc.file)}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{doc.name}</span>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">ℹ️ About</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  This project contains curated learning resources, book excerpts, and personal
                  development content.
                </p>
                <Separator className="my-3" />
                <p className="font-medium text-foreground">Current Selection:</p>
                <p className="mt-1">
                  Project Hail Mary by Andy Weir - A thrilling science fiction novel about survival
                  and discovery in space.
                </p>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <Card>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none p-8">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  </div>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="mb-4 mt-8 text-4xl font-bold">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="mb-3 mt-6 text-3xl font-semibold">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mb-2 mt-4 text-2xl font-medium">{children}</h3>
                      ),
                      p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary pl-4 italic">
                          {children}
                        </blockquote>
                      ),
                      code: ({ children, className }) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{children}</code>
                        ) : (
                          <code className={className}>{children}</code>
                        );
                      },
                      hr: () => <Separator className="my-8" />,
                      ul: ({ children }) => <ul className="mb-4 ml-6 list-disc">{children}</ul>,
                      ol: ({ children }) => <ol className="mb-4 ml-6 list-decimal">{children}</ol>,
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="text-primary underline hover:no-underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © 2026 Self-Improvement Project. Content for educational purposes only. Please support
            the original authors.
          </p>
        </div>
      </footer>
    </div>
  );
}
