import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { DIRECTORY_DATA } from '../data/directory-data';
import { useState, useEffect } from 'react';
import { TerminalGate } from '../components/directory/TerminalGate';

export const Route = createFileRoute('/dir/$slug')({
  component: DirSlugComponent,
  loader: ({ params }) => {
    const file = DIRECTORY_DATA.find((f) => f.slug === params.slug);
    if (!file) throw notFound();
    return { file };
  },
});

function DirSlugComponent() {
  const { file } = Route.useLoaderData();
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('vault_unlocked') === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem('vault_unlocked', 'true');
    setIsUnlocked(true);
  };

  if (!isUnlocked) {
    return <TerminalGate onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-mono px-6 py-24 sm:px-12 lg:px-24 flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="mb-16">
          <div className="flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            <Link to="/dir" className="hover:text-foreground transition-colors">/private/vault</Link>
            <span>/</span>
            <span className="text-foreground">{file.filename}</span>
          </div>
          <div className="h-px w-full bg-border" />
        </div>

        <article className="prose prose-neutral dark:prose-invert max-w-none font-sans font-light">
          {file.content}
        </article>
      </div>
    </div>
  );
}
