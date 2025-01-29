import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchAll = async () => {
      if (!baseUrl) return
      try {
        const response = await axios.get(baseUrl)
        if (response) {
          setResources(resources.concat(response.data))
        } else {
          setResources([])
        }
      } catch (error) {
        setResources([])
      }
    }
    fetchAll()
  }, [baseUrl])

  const create = async (resource) => {
     const response = await axios.post(baseUrl, resource)
     setResources(resources.concat(response.data))
     return response.data
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}