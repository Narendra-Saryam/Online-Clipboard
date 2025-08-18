import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import FileShare from './components/FileShare'
import Retrieve from './components/Retrieve'

function App() {
  return (
    <>
      <Navbar />
      <div className='flex md:flex-row sm:flex-col flex-col mt-4 md:mt-14 gap-5 md:gap-10'>
        <Hero />
        <FileShare />
      </div>
      <Retrieve />
    </>
  )
}

export default App
