import { Link } from "react-router-dom";
import CardDropdownMenu from "./CardDropdownMenu";
import { Button } from "./ui/button"

const ProjectsLink: React.FC<{ item: { name: string; background: string; _id: string } }> = ({ item }) => {
  return (
    <span>
      <article className="flex items-center justify-between group">
      <Button variant={'link'} asChild className="text-neutral-900 dark:text-neutral-300 font-normal">
        <Link 
          to={`/kanban/${item.name}/${item._id}`}
          state={{ imageUrl: item.background }}
        > 
          {item.name}
        </Link>
      </Button>
      <CardDropdownMenu name={item.name} imageUrl={item.background} _id={item._id} onInteraction={(e) => e.stopPropagation()} />
      </article>
    </span>
  )
}

export default ProjectsLink