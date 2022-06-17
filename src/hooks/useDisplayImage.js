//from https://stackoverflow.com/questions/43992427/how-to-display-a-image-selected-from-input-type-file-in-reactjs

import { useState } from "react"

export function useDisplayImage() {
  const [result, setResult] = useState("")

  function uploader(e) {
    const imageFile = e.target.files[0]

    const reader = new FileReader()
    reader.addEventListener("load", (e) => {
      setResult(e.target.result)
    })
    console.log(imageFile)
    imageFile instanceof Blob && reader.readAsDataURL(imageFile)
  }

  return { result, uploader }
}
