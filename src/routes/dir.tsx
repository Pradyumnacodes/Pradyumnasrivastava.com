import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { TerminalGate } from '../components/directory/TerminalGate';
import { DirectoryListing } from '../components/directory/DirectoryListing';

export const Route = createFileRoute('/dir')({
  component: DirComponent,
});

function DirComponent() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check sessionStorage
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

  return <DirectoryListing />;
}
