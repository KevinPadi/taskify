import { DrawerDialogDemo } from "@/components/AuthForm"
import Header from "@/components/Header"
import { useAuth } from "@/hooks/useAuth"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const HomePage = () => {
  const { user } = useAuth(); // Accede al contexto de autenticación
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    if (user) {
      navigate('/boards'); // Cambia "/dashboard" por la ruta que desees
    }
  }, [user, navigate]); // Ejecuta el efecto cuando cambie `user`

  return (
    <section className="max-h-screen overflow-hidden">
      <Header />
      <span className="bg-blue-300 absolute top-40 mt-40">
        <Link to={'/boards'}>
          to boards
        </Link>
      </span>
      <div className="flex flex-col items-center gap-20 mt-20">
        <div className="flex flex-col gap-12 max-w-xl text-center">
          <h1 className="text-neutral-900 dark:text-neutral-200 text-3xl md:text-5xl font-medium text-balance">
            Manage your tasks projects easily with Taskify
          </h1>
          <DrawerDialogDemo />
        </div>
        <img className="w-3/4 rounded-3xl" src="https://cdn.dribbble.com/userupload/16632999/file/original-4125e67a724a5fc78d9b2597ca5e69af.png?resize=1504x1128" alt="kanban board image" />
      </div>
    </section>
  )
}

export default HomePage