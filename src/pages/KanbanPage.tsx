import { AppSidebar } from "@/components/app-sidebar"
import KanbanBoard from "@/components/KanbanBoard"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"

export default function KanbanPage() {
  const { board, boardId } = useParams()
  const location = useLocation();
  const { imageUrl } = location.state || {}
  const apiUrl = import.meta.env.VITE_BACKEND_URL
  const [ columnsData, setColumnsData ] = useState(null)
  const [ cardsData, setCardsData ] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/list/${boardId}`, { withCredentials: true });
        console.log(data)
        setColumnsData(data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCards = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/card/${boardId}`, { withCredentials: true });
        console.log(data)
        setCardsData(data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchColumns()
    fetchCards()
  }, [apiUrl, boardId])
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to='/boards'>
                      Boards
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{board}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div 
          className="flex flex-1 flex-col gap-4 p-4 relative bg-cover rounded-md" 
          style={{
          backgroundImage: imageUrl === 'none' ? '' : `url(${imageUrl})`}}
        >
          {/* Degradado negro */}
          <div className="absolute inset-0 bg-neutral-900/20 pointer-events-none"></div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <KanbanBoard boardColumns={columnsData} boardCards={cardsData} />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
