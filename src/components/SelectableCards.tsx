"use client"

import { RadioGroup } from "@/components/ui/radio-group"
import BackgroundCard from "./ImageCard"
import { useEffect, useState } from "react"

interface BackgroundOption {
  id: string
  creator: string
  creatorLink: string
  isDefault: boolean
  imageUrl: string
}

type BackgroundSelectorProps = {
  selectedBackground?: string
  setSelectedBackground: (background: string) => void
}

const backgrounds: BackgroundOption[] = [
  {
    id: "1",
    creator: "NEOM",
    creatorLink : "https://unsplash.com/es/@neom",
    isDefault: false,
    imageUrl: "https://images.unsplash.com/photo-1682685794761-c8e7b2347702?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    creator: "Simon Berger",
    creatorLink : "https://unsplash.com/es/@8moments",
    isDefault: false,
    imageUrl: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=1806&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    creator: "Nick Da Fonseca",
    creatorLink : "https://unsplash.com/es/@nickdafonseca",
    isDefault: false,
    imageUrl: "https://plus.unsplash.com/premium_photo-1711065884259-f7b68ba11912?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    creator: "NEOM",
    creatorLink : "https://unsplash.com/es/@neom",
    isDefault: false,
    imageUrl: "https://images.unsplash.com/photo-1682686581220-689c34afb6ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "5",
    creator: "Phill Brown",
    creatorLink : "https://unsplash.com/es/@phillbrown",
    isDefault: false,
    imageUrl: "https://images.unsplash.com/photo-1707007694363-b8afb46ed639?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "6",
    creator: "Octavian Rosca",
    creatorLink : "https://unsplash.com/es/@tavi004",
    isDefault: false,
    imageUrl: "https://images.unsplash.com/photo-1506514283824-e2a49afa0d06?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "7",
    creator: "NEOM",
    creatorLink : "https://unsplash.com/es/@neom",
    isDefault: false,
    imageUrl: "https://images.unsplash.com/photo-1682687218608-5e2522b04673?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "8",
    creator: "NEOM",
    creatorLink : "https://unsplash.com/es/@neom",
    isDefault: false,
    imageUrl: "https://images.unsplash.com/photo-1682685797365-41f45b562c0a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "default",
    creator: "",
    creatorLink : "",
    isDefault: true,
    imageUrl: "none",
  }
]

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ selectedBackground, setSelectedBackground }) => {
  const [currentBackground, setCurrentBackground] = useState<string>("")

  useEffect(() => {
    if (selectedBackground) {
      setCurrentBackground(selectedBackground)
    } else {
      setCurrentBackground("") // Sin selección inicial
    }
  }, [selectedBackground])

  const handleChange = (newBackground: string) => {
    setCurrentBackground(newBackground)
    setSelectedBackground(newBackground)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <RadioGroup
        value={currentBackground}
        onValueChange={handleChange}
        className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto rounded-md"
      >
        {backgrounds.map((bg) => (
          <BackgroundCard
            key={bg.id}
            id={bg.id}
            creator={bg.creator}
            creatorLink={bg.creatorLink}
            imageUrl={bg.imageUrl}
            isSelected={currentBackground === bg.imageUrl}
            isDefaultOption={bg.isDefault}
          />
        ))}
      </RadioGroup>
    </div>
  )
}

export default BackgroundSelector
