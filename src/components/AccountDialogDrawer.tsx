"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, UserRound, Trash2 } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'
import { useAuth } from '@/hooks/useAuth'
import { createAvatar } from '@dicebear/core'
import { notionistsNeutral } from '@dicebear/collection'

export function AccountDialogDrawer() {
  const { user, logout } = useAuth()
  
  // const [userData, setUserData] = useState({
  //   userName: user?.userName,
  //   email: user?.email,
  //   avatarSeed: 'John Doe'
  // })

  // const [editedData, setEditedData] = useState({
  //   userName: userData.userName,
  //   email: userData.email
  // })

  const [isOpen, setIsOpen] = useState(false)
  // const [isEditing, setIsEditing] = useState(false)
  const isMobile = useMediaQuery("(max-width: 500px)")

  const avatarUrl = createAvatar(notionistsNeutral, { seed: user?.email }).toDataUri()

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   setEditedData(prev => ({ ...prev, [name]: value }))
  // }

  const handleDeleteAccount = () => console.log('Delete account')
  const handleLogout = () => {
    logout()
  }

  // const handleSaveChanges = () => {
  //   setUserData(prev => ({
  //     ...prev,
  //     name: editedData.userName,
  //     email: editedData.email
  //   }))
  //   setIsEditing(false)
  //   // Here you would typically make an API call to update the user's information
  //   console.log('Saving changes:', editedData)
  // }

  // const startEditing = () => {
  //   setEditedData({
  //     userName: userData.userName,
  //     email: userData.email
  //   })
  //   setIsEditing(true)
  // }

  // const cancelEditing = () => {
  //   setEditedData({
  //     userName: userData.userName,
  //     email: userData.email
  //   })
  //   setIsEditing(false)
  // }

  const Content = () => (
    <div className="space-y-6 text-neutral-900 dark:text-neutral-200">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar className="size-20 rounded-xl">
            <AvatarImage src={avatarUrl} alt={user?.userName || 'Guest'} />
            <AvatarFallback>{user?.userName?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user?.userName || 'Guest'}</h2>
          <p className="text-sm text-muted-foreground">{user?.email || 'Guest@gmail.com'}</p>
        </div>
      </div>
      {/* <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="userName">Name</Label>
          <Input
            id="userName"
            name="userName"
            value={isEditing ? editedData.userName : user?.userName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={isEditing ? editedData.email : user?.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button onClick={handleSaveChanges} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={cancelEditing} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={startEditing} variant="outline" className="w-full">
            Edit Profile
          </Button>
        )}
      </div> */}
      {/* <Button onClick={handlePasswordChange} variant="outline" className="w-full">
        <Key className="h-4 w-4 mr-2" />
        Change Password
      </Button> */}
      <Dialog>
      <DialogTrigger asChild>
        {/* probar botón de motion primitives */}
        <Button variant="destructive" className='w-full'>
          <Trash2 />
          Delete Account
        </Button> 
      </DialogTrigger>
      <DialogContent className='text-neutral-900 dark:text-neutral-200'>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <p className="text-sm text-muted-foreground">
            Are you absolutely sure you want to delete your account? This action cannot be undone. 
            This will permanently delete your account and remove your data from our servers.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      <Button 
        onClick={handleLogout} 
        variant="outline" 
        className="w-full mt-4 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
        <Button variant="ghost" className="p-2 py-1.5 h-fit w-full rounded-sm font-normal flex items-center justify-start dark:hover:bg-neutral-800 hover:bg-neutral-100">
          <UserRound />
          Account
        </Button>        
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              Account Settings
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <Content />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2 py-1.5 h-fit w-full rounded-sm font-normal flex items-center justify-start dark:hover:bg-neutral-800 hover:bg-neutral-100">
          <UserRound />
          Account
        </Button> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-neutral-900 dark:text-neutral-200">
            Account Settings
          </DialogTitle>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  )
}