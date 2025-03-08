import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Label } from "./label"

interface LabelAndInputProps {
  className?: string,
  label: string,
  id?: string,
  name: string,
  type?: React.HTMLInputTypeAttribute,
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isRequired?: boolean,
  accept?: string,
}

function LabelAndInput({
  className = "",
  label = "label",
  id,
  name,
  type,
  value,
  onChange = () => { },
  isRequired = true,
  accept,
}: LabelAndInputProps) {
  if (!id) id = label.replace(' ', '_').toLowerCase();
  if (!name) name = id;
  return (
    <div
      className={cn("grid w-full items-center gap-1.5", className)}
    >
      <Label htmlFor={id}>{label}</Label>
      <Input 
        id={id} type={type} name={name} onChange={onChange} 
        value={value} required={isRequired} accept={accept}
      />
    </div>
  )
}

export { LabelAndInput }
