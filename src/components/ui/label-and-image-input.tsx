import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Label } from "./label"
import { LabelAndInput } from "./label-and-input"

interface ImageInputProps{
    id?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isRequired?: boolean,
    name?: string,
    label?: string,
}

function LabelAndImageInput({id='image', name='image', label='Image', onChange = () => {}, isRequired = true}: ImageInputProps) {
  return (
    <LabelAndInput
      id={id}
      type="file"
      onChange={onChange}
      label={label}
      accept="image/*"
      name={name}
      className="mt-2 border rounded-lg p-2"
    />
  )
}
export { LabelAndImageInput }
