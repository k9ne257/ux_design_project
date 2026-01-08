"use client"

import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'
import { Search } from 'lucide-react'

export default function NavSearchBar() {
  return (
    
    <div className="flex w-full max-w-sm items-center gap-2">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
      <Button type="button" variant="outline">
        Suchen
      </Button>
    </div>    
    
  )
}
