import * as React from "react"
import { LogIn, UserRoundPlus, Rocket  } from 'lucide-react';
import { cn } from "@/lib/utils"
import { useMediaQuery } from "usehooks-ts"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CTAButton from "./CTAButton";

export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <CTAButton />      
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium text-neutral-900 dark:text-neutral-200 flex items-center gap-3">
              Let's get started
              <Rocket /> 
            </DialogTitle>
          </DialogHeader>
          <ProfileForm />
          <DialogDescription className="hidden">
          </DialogDescription>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
       <CTAButton />
      </DrawerTrigger>
      <DrawerContent className="pb-5">
        <DrawerTitle className="text-xl text-center font-medium text-neutral-900 dark:text-neutral-200 pt-4 flex items-center justify-center gap-2">
          Let's get started
          <Rocket /> 
        </DrawerTitle>
        <ProfileForm className="px-4" />
        <DrawerDescription className="hidden"></DrawerDescription>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
     <Tabs defaultValue="login" className="w-full pt-5 px-5 md:p-0">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">
          <LogIn className="size-5 mr-2" />
          Login
        </TabsTrigger>
        <TabsTrigger value="register">
          <UserRoundPlus className="size-5 mr-2" />
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="pt-5 text-neutral-900 dark:text-neutral-200">
        <form className={cn("grid items-start gap-6", className)}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input className="text-white" type="email" id="email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" />
          </div>
          <Button type="submit">Enter in my account</Button>
        </form>
      </TabsContent>
      <TabsContent value="register" className="pt-5 text-neutral-900 dark:text-neutral-200">
        <form className={cn("grid items-start gap-6", className)}>
          <div className="grid gap-2">
            <Label htmlFor="userName">Name</Label>
            <Input id="userName" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input type="password" id="confirmPassword" />
          </div>
          <Button type="submit">Create new account</Button>
        </form>
      </TabsContent>
   </Tabs>
  )
}
