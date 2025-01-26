import { DrawerDialogDemo } from "@/components/AuthForm"
import Header from "@/components/Header"
import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/hooks/useAuth"
import { Github, Send } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const { user } = useAuth(); // Accede al contexto de autenticación
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    if (user) {
      navigate('/boards'); // Cambia "/dashboard" por la ruta que desees
    }
  }, [user, navigate]); // Ejecuta el efecto cuando cambie `user`

  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow mx-auto max-w-screen-xl px-4 py-8 text-center sm:px-6 lg:px-8 mb-20">
        <div className="space-y-4 md:space-y-8">
          <div className="mx-auto max-w-xl space-y-6">
            <h1 className="text-4xl text-neutral-900 dark:text-neutral-100 sm:text-5xl text-balance">
              Your tasks, perfectly organized with 
              <span className="text-sky-400 dark:text-sky-400 font-medium"> Taskify</span>
            </h1>
            <DrawerDialogDemo />
          </div>
          <img src="/src/assets/taskify-kanban-board-screenshot.webp" className="rounded-xl shadow-lg aspect-video" alt="" />
        </div>
      </div>
      <footer className="w-full absolute bottom-0 left-0 bg-neutral-200 dark:bg-neutral-950">
  <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="flex justify-center sm:justify-start dark:text-teal-300">
        <div className="flex gap-2 items-center">
          <Logo />
          <span className="font-semibold text-xl text-black dark:text-white">Taskify</span>
        </div>
      </div>
      <div className="text-center sm:text-left mt-4 sm:mt-0">
        <p className="text-neutral-900 dark:text-neutral-400 text-sm">
          Made by <a href="https://www.linkedin.com/in/kevinpadi/" className="underline hover:text-neutral-800 dark:hover:text-neutral-300">Kevin Padilla</a>
        </p>
      </div>
      <div className="flex justify-center sm:justify-end gap-4 mt-4 sm:mt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={'icon'} variant={'default'} className="rounded-full bg-neutral-200 dark:bg-neutral-200 text-black dark:text-black hover:bg-neutral-200 hover:dark:bg-neutral-200 transition-all ease-in-out border border-white dark:border-black">
                <Send />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send feedback</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={'icon'} variant={'default'} className="rounded-full bg-neutral-200 dark:bg-neutral-200 text-black dark:text-black hover:bg-neutral-200 hover:dark:bg-neutral-200 transition-all ease-in-out border border-white dark:border-black">
                <Github />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go to repo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  </div>
</footer>

    </section>

  )
}

export default HomePage