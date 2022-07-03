import '/styles/globals.css'
import LayoutHome from './layouts/layoutHome'
import LayoutWelcome from './layouts/layoutWelcome'

const layouts = {
  layoutHome: LayoutHome,
  layoutWelcome: LayoutWelcome
}

function MyApp({ Component, pageProps }) {
 
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
