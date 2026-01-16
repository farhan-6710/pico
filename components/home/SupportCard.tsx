import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { X, DollarSign, Coffee, Sparkles as SparklesIcon } from "lucide-react";

export const SupportCard = ({ buttonAction }: { buttonAction: () => void }) => {
  return (
    <Card className="relative overflow-hidden bg-linear-to-br from-accent-soft-hover via-brand/10 to-transparent border border-brand/30 transition-all duration-500 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/10 group rounded-xl">
      {/* Close button */}
      <div className="absolute right-3 top-3 z-200">
        <Button
          variant="ghost"
          size="icon"
          onClick={buttonAction}
          aria-label="Dismiss support card"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Animated background glow */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <CardHeader className="gap-3 relative z-10">
        {/* Icon with pulse animation */}
        <div className="relative w-fit shrink-0">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg animate-pulse" />
            <div className="relative p-2 rounded-full bg-linear-to-br from-primary/30 to-primary/10 border border-primary/30">
              <DollarSign
                aria-label="Dollar sign icon"
                className="size-6 text-primary animate-pulse"
              role="img"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-muted text-[10px] font-bold uppercase tracking-wider">
            Support Pico
          </span>
          <h3 className="pr-8 text-sm font-semibold">Help Us Grow 🌱</h3>
          <p className="text-xs text-muted-foreground">
            Pico is free, no ads, no subscriptions. Your support helps us
            continue growing.
          </p>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 px-6">
        <Button
          size="lg"
          onClick={() =>
            window.open("https://buymeacoffee.com/picons", "_blank")
          }
          className="w-full gap-2"
        >
          <Coffee className="size-4" />
          Support
        </Button>
      </CardContent>

      {/* Decorative sparkles */}
      <div className="absolute top-3 right-12 text-primary/30 animate-float pointer-events-none">
        <SparklesIcon className="size-3" />
      </div>
      <div className="absolute bottom-4 right-4 text-primary/20 animate-float-delayed pointer-events-none">
        <SparklesIcon className="size-2" />
      </div>
    </Card>
  );
};
