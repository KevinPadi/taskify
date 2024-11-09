import { useState } from 'react';
import { LogIn, UserRoundPlus, Rocket  } from 'lucide-react';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormMessage, FormItem, FormLabel } from './ui/form';
import CTAButton from "./CTAButton";
import useLogin from '@/hooks/useLogin';
import useRegister from '@/hooks/useRegister';
import { useAuth } from '@/hooks/useAuth';
import { RegisterData } from '@/types';
export function DrawerDialogDemo() {
  const [open, setOpen] = useState(false)
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
        <ProfileForm />
        <DrawerDescription className="hidden"></DrawerDescription>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm() {
  const { userLoginSchema, onSubmitLogin } = useLogin()
  const { userRegisterSchema } = useRegister()
  const { register } = useAuth()
  
  // TODO: agregar una ruta protegida para probar auth | agregar react toastify para mostrar notifiaciones
 

  const onSubmit = (data: RegisterData) => {
    register(data)
  }

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
      <Form {...userLoginSchema}>
          <form onSubmit={userLoginSchema.handleSubmit(onSubmitLogin)} className="space-y-6">

            {/* Email Field */}
            <FormField
              control={userLoginSchema.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={userLoginSchema.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Submit Button */}
            <Button type="submit" className='w-full'>Enter in my account</Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="register" className="pt-5 text-neutral-900 dark:text-neutral-200">
        <Form {...userRegisterSchema}>
          <form onSubmit={userRegisterSchema.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Name Field */}
            <FormField
              control={userRegisterSchema.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={userRegisterSchema.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={userRegisterSchema.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Submit Button */}
            <Button className='w-full' type="submit">Create new account</Button>
          </form>
        </Form>
      </TabsContent>
   </Tabs>
  )
}
