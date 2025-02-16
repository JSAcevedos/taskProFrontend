import React from 'react'

export default function Input({className, label, ...props}) {
    const inputClass = "border border-black rounded-sm p-3 bg-white text-black w-full"
    
  return (
    <>
    <label>{label}</label>
    <input className={inputClass + " " + className} {...props}/>
    </>
  )
}
