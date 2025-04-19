import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { Sidebar } from './sidebar';

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-30 safe-area-inset-x safe-area-inset-t">
      <h1 className="font-bold text-lg xs:text-xl sm:text-2xl text-primary">NexusAI</h1>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open sidebar">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 w-[80vw] max-w-xs min-w-[220px] h-full overflow-y-auto bg-white"
        >
          <Sidebar className="w-full h-full bg-white flex flex-col" />
        </SheetContent>
      </Sheet>
    </div>
  );
}
