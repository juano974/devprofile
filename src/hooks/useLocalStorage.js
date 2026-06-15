import { useState } from "react"

/**
 * Custom hook to manage state synchronized with LocalStorage.
 * 
 * @param {string} key - The localStorage key name.
 * @param {any} initialValue - The initial value if no value is present in localStorage.
 * @returns {[any, Function]} - Stored value and its setter.
 */
function useLocalStorage(key, initialValue) {
  // State to store our value. 
  // Initializer function executes only on initial render.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Setter function that updates both the React state and LocalStorage
  const setValue = (value) => {
    try {
      // Support functional updates (e.g., setValue(prev => ...))
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
