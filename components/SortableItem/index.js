import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ user }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: user.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-white px-6 py-4 rounded-[1.5rem] shadow-sm border border-slate-100 text-slate-700 w-full hover:border-red-200 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
    >
      <h1 className="font-bold text-sm tracking-tight group-hover:text-slate-950 transition-colors uppercase">
        {user.name}
      </h1>
    </div>
  );
}

export default SortableItem;