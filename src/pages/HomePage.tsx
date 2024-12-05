import { DrawerDialogDemo } from "@/components/AuthForm"
import { ModeToggle } from "@/components/mode-toggle"

const HomePage = () => {

  return (
    <section className="max-h-screen overflow-hidden">
      <header className="bg-neutral-100 dark:bg-neutral-900 w-80 h-auto p-1 rounded-xl mx-auto mt-4 flex items-center justify-between">
        <span>
          LOGO
        </span>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <DrawerDialogDemo />
        </div>
      </header>
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