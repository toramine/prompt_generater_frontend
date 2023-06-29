import '../styles/globals.css'
import TopBar from '../components/TopBar'
import onDragEnd from '../components/GeneratePrompt'
import GeneratePrompt from '../components/GeneratePrompt'
import { DragDropContext } from "react-beautiful-dnd";


export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <DragDropContext onDragEnd={onDragEnd}> */}
        <TopBar />
        <Component {...pageProps} />
      {/* </DragDropContext> */}
    </>
  )
}
