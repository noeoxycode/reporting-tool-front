import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Label } from "./label"

interface LabelAndInputProps{
    className?: string,
    label: string,
    id?: string,
    type?: React.HTMLInputTypeAttribute,
    value: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isRequired?: boolean,
}

function LabelAndInput({ className = "", label = "label", id, type, value, onChange = () => {}, isRequired = true}: LabelAndInputProps) {
  if(!id) id = label.replace(' ', '_').toLowerCase();
  return (
    <div
    className={cn("grid w-full max-w-sm items-center gap-1.5", className)}
    >
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} type={type} name={id} onChange={onChange} value={value} required={isRequired}/>
    </div>
  )
}

export { LabelAndInput }
