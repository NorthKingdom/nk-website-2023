import React, { useEffect, useState } from 'react'

export const useFontsLoaded = () => {
  const [doneLoading, setDoneLoading] = useState(false)

  useEffect(() => {
    document.fonts.ready.then(() => {
      setDoneLoading(true)
    })
  })

  return doneLoading
}
