import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Label } from "./label"

interface LabelAndInputProps<T> {
  className?: string,
  label: string,
  id?: string,
  name: keyof T,
  type?: React.HTMLInputTypeAttribute,
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isRequired?: boolean,
  accept?: string,
}

function LabelAndInput<T>({
  className = "",
  label = "label",
  id,
  name,
  type,
  value,
  onChange = () => { },
  isRequired = true,
  accept,
}: LabelAndInputProps<T>) {
  if (!id) id = label.replace(' ', '_').toLowerCase();
  return (
    <div
      className={cn("grid w-full items-center gap-1.5", className)}
    >
      <Label htmlFor={id}>{label}</Label>
      <Input 
        id={id} type={type} name={name.toString()} onChange={onChange} 
        value={value} required={isRequired} accept={accept}
      />
    </div>
  )
}

export { LabelAndInput }
