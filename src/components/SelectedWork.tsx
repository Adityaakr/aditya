import { selectedWork } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

const SelectedWork = () => (
  <section id="work" className="py-20 px-6 border-t border-border">
    <div className="mx-auto max-w-4xl">
      <h2 className="text-2xl font-light tracking-tight text-foreground mb-12">selected work</h2>
      <div className="space-y-8">
        {selectedWork.map((item) => (
          <a
            key={item.title}
            href={item.link}
            className="group block py-3 border-b border-border/50 last:border-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-body font-medium text-foreground group-hover:text-muted-foreground transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground font-body">{item.description}</p>
              </div>
              <ArrowUpRight size={16} className="text-muted-foreground/40 group-hover:text-foreground transition-colors duration-200 mt-1 shrink-0" />
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default SelectedWork;
