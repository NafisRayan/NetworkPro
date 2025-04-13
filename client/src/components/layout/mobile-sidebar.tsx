import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { Sidebar } from './sidebar';

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-10 px-4 py-3 flex items-center justify-between">
      <h1 className="font-bold text-xl text-primary">NexusAI</h1>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[280px]">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
}
