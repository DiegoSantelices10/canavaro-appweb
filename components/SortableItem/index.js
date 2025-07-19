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
      className="bg-gray-50 p-4 rounded-md shadow-sm text-slate-950 w-full"
    >
      <h1 className="font-montserrat font-medium">{user.name}</h1>
    </div>
  );
}

export default SortableItem;