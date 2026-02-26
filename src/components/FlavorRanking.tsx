import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flavors, type Flavor } from "@/data/flavors";
import { GripVertical, MessageSquare, ChevronUp, ChevronDown, Send } from "lucide-react";
import { toast } from "sonner";

interface SortableFlavorProps {
  flavor: Flavor;
  rank: number;
  comment: string;
  onCommentChange: (comment: string) => void;
  showComment: boolean;
  onToggleComment: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const SortableFlavor = ({
  flavor,
  rank,
  comment,
  onCommentChange,
  showComment,
  onToggleComment,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: SortableFlavorProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: flavor.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  const rankColors: Record<number, string> = {
    1: "bg-primary text-primary-foreground",
    2: "bg-primary/70 text-primary-foreground",
    3: "bg-primary/50 text-primary-foreground",
  };

  return (
    <div ref={setNodeRef} style={style} className={`${isDragging ? "opacity-50" : ""}`}>
      <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-3 md:p-4 group hover:border-primary/30 transition-colors">
        {/* Rank */}
        <div className={`w-10 h-10 rounded-md flex items-center justify-center font-display text-xl shrink-0 ${rankColors[rank] || "bg-secondary text-secondary-foreground"}`}>
          {rank}
        </div>

        {/* Image */}
        <div className="w-16 h-10 md:w-24 md:h-14 rounded overflow-hidden shrink-0">
          <img src={flavor.image} alt={flavor.name} className="w-full h-full object-contain" />
        </div>

        {/* Name */}
        <div className="flex-1 min-w-0">
          <p className="font-display text-lg md:text-xl text-foreground truncate">{flavor.name}</p>
          <div className="flex gap-1.5">
            {flavor.tags.map(tag => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-sm bg-secondary text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onToggleComment}
            className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title="Add comment"
          >
            <MessageSquare size={16} />
          </button>
          <div className="flex flex-col">
            <button
              onClick={onMoveUp}
              disabled={isFirst}
              className="w-8 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
            >
              <ChevronUp size={14} />
            </button>
            <button
              onClick={onMoveDown}
              disabled={isLast}
              className="w-8 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
            >
              <ChevronDown size={14} />
            </button>
          </div>
          <div
            {...attributes}
            {...listeners}
            className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing touch-none"
          >
            <GripVertical size={18} />
          </div>
        </div>
      </div>

      {/* Comment area */}
      {showComment && (
        <div className="ml-[52px] mt-2 mb-1">
          <textarea
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder={`What do you think about ${flavor.name}?`}
            className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            rows={2}
          />
        </div>
      )}
    </div>
  );
};

const FlavorRanking = () => {
  const [rankedFlavors, setRankedFlavors] = useState<Flavor[]>([...flavors]);
  const [comments, setComments] = useState<Record<string, string>>({});
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setRankedFlavors((items) => {
        const oldIndex = items.findIndex((f) => f.id === active.id);
        const newIndex = items.findIndex((f) => f.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    setRankedFlavors((items) => arrayMove(items, index, newIndex));
  };

  return (
    <section id="rank" className="px-4 md:px-12 lg:px-20 py-16">
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-2">
        Rank the Drop
      </h2>
      <p className="text-muted-foreground mb-10 text-sm tracking-wide">
        DRAG OR TAP ARROWS TO RANK YOUR FAVORITES FROM #1 TO #8
      </p>

      <div className="max-w-2xl mx-auto space-y-2">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={rankedFlavors.map((f) => f.id)} strategy={verticalListSortingStrategy}>
            {rankedFlavors.map((flavor, index) => (
              <SortableFlavor
                key={flavor.id}
                flavor={flavor}
                rank={index + 1}
                comment={comments[flavor.id] || ""}
                onCommentChange={(val) => setComments((prev) => ({ ...prev, [flavor.id]: val }))}
                showComment={openComments[flavor.id] || false}
                onToggleComment={() =>
                  setOpenComments((prev) => ({ ...prev, [flavor.id]: !prev[flavor.id] }))
                }
                onMoveUp={() => moveItem(index, "up")}
                onMoveDown={() => moveItem(index, "down")}
                isFirst={index === 0}
                isLast={index === rankedFlavors.length - 1}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <div className="max-w-2xl mx-auto mt-8 flex justify-center">
        <button
          onClick={() => {
            toast.success("Rankings submitted! Thanks for voting 🍿");
          }}
          className="bg-primary text-primary-foreground px-10 py-3 rounded-sm font-semibold text-sm tracking-wider hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Send size={16} />
          SUBMIT RANKINGS
        </button>
      </div>
    </section>
  );
};

export default FlavorRanking;
