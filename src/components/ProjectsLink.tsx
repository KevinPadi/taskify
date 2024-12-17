import { Link } from "react-router-dom";
import CardDropdownMenu from "./CardDropdownMenu";
import { Button } from "./ui/button"

const ProjectsLink: React.FC<{ item: { name: string; background: string; _id: string } }> = ({ item }) => {
  return (
    <Link to={`/kanban/${item.name}`}>
      <article className="flex items-center justify-between group">
      <Button variant={'link'} asChild className="text-neutral-900 dark:text-neutral-300 font-normal">
        <a href={'#'}> 
          <span>{item.name}</span>
        </a>
      </Button>
      <CardDropdownMenu name={item.name} imageUrl={item.background} _id={item._id} />
      </article>
    </Link>
  )
}

export default ProjectsLink