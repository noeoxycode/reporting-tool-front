import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Label } from "./label"
import { LabelAndInput } from "./label-and-input"

interface ImageInputProps<T>{
    id?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isRequired?: boolean,
    name: keyof T,
    label?: string,
}

function LabelAndImageInput<T>({id='image', name, label='Image', onChange = () => {}, isRequired = true}: ImageInputProps<T>) {
  return (
    <LabelAndInput<T>
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
