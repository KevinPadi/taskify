import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

interface BackgroundCardProps {
  id: string;
  creator?: string; // Opcional para la tarjeta de color
  creatorLink?: string; // Opcional para la tarjeta de color
  imageUrl: string; // Opcional para la tarjeta de color
  isSelected: boolean;
  isDefaultOption?: boolean; // Prop para determinar si es la tarjeta de color
}

const BackgroundCard: React.FC<BackgroundCardProps> = ({
  id,
  creator,
  creatorLink,
  imageUrl,
  isSelected,
  isDefaultOption = false,
}) => {
  return (
    <div className="relative">
      <RadioGroupItem value={imageUrl} id={id} className="sr-only" />
      <Label
        htmlFor={id}
        className={`block relative cursor-pointer overflow-hidden rounded-lg aspect-video ${
          isDefaultOption
            ? "bg-neutral-200 dark:bg-neutral-900 flex items-center justify-center size-full"
            : ""
        }`}
      >
        {!isDefaultOption ? (
          <>
            <img
              src={imageUrl}
              alt={`Background by ${creator}`}
              className={`w-full object-cover transition-all duration-300 ${
                isSelected ? "brightness-75" : ""
              } hover:brightness-75`}
            />
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity ease-in-out duration-250 ${
                isSelected ? "opacity-100" : "opacity-0"
              }`}
            >
              <Check className="w-8 h-8 text-white" />
            </div>
            <div className="absolute inset-0 flex items-end justify-start opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-t from-black/50 to-transparent">
              <a
                href={creatorLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white ps-2 pb-2 hover:underline text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                {creator}
              </a>
            </div>
          </>
        ) : (
          // Contenido de la tarjeta de color por defecto 
          <div
            className={`text-xs font-medium text-center text-gray-600 dark:text-gray-300 ${
              isSelected ? "opacity-100 " : "opacity-65"
            }`}
          >
            <span className={`${isSelected ? 'hidden' : 'block'}`}>
              Default color
            </span>
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity ease-in-out duration-250 ${
                isSelected ? "opacity-100" : "opacity-0"
              }`}
            >
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>
          
        )}
        <div
          className={`absolute inset-0 border-2 rounded-lg pointer-events-none ${
            isSelected ? "border-white" : "border-transparent"
          }`}
        />
      </Label>
    </div>
  );
};

export default BackgroundCard;
