import { Link } from "react-router-dom";
import CardDropdownMenu from "./CardDropdownMenu";

type ProjectCardProps = {
  name: string
  imageUrl: string
  _id: string
};

const ProjectCard = ({ name, imageUrl, _id }: ProjectCardProps) => {

  return (
    <Link 
      to={`/kanban/${name}/${_id}`}
      state={{ imageUrl }}
    >
      <article
        className={`relative aspect-video rounded-xl border border-neutral-300 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-200 hover:cursor-pointer transition-all ease-in-out overflow-hidden`}
        style={
          imageUrl !== "none"
            ? {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : { backgroundColor: "var(--neutral-900)" }
        }
      >
        {/* Degradado negro */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-transparent to-transparent pointer-events-none"></div>

        {/* Contenido */}
        <div className="relative z-10 p-4 flex items-center justify-between">
          <h1 className={`font-medium text-neutral-200`}>{name}</h1>
          <CardDropdownMenu name={name} imageUrl={imageUrl} _id={_id} />
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
