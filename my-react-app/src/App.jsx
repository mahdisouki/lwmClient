import { useState } from 'react'
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactPage from './pages/Contact'
import Home from './pages/Home'
import Quotations from './pages/Quotations'
import MovingServicesPage from './pages/MovingServicesPage'
import Services from './pages/Services'
import ServiceDetails from './pages/ServiceDetails'
import Checkout from './pages/Checkout'
import Faq from './pages/Faq'
import BlogPage from './pages/Blog'
import BlogDetailPage from './pages/BlogDetail'
import ScrollToTop from './components/ScrollToTop'
import PaymentSuccess from './pages/PaymentSuccess'
import CartPage from './pages/CartPage'
import TermsConditions from './pages/Terms'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CustomerReview from './pages/Review'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)
  return (
  <>
      
      <Router>
        <ScrollToTop/>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route path='/services' element={<Services/>} />
          <Route path='/Quote' element={<Quotations/>} />
          <Route path='/moving-services' element={<MovingServicesPage/>} />
          <Route path='/product-detail/:id' element={<ServiceDetails/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/faq' element={<Faq/>}/>
          <Route path='/Blog' element={<BlogPage/>}/>
          <Route path='/BlogDetail/:id' element={<BlogDetailPage/>}/>
          <Route path='/payment-success' element={<PaymentSuccess/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/terms-conditions' element={<TermsConditions/>}/>
          <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
          <Route path="/review/:orderId" element={<CustomerReview />} />
        </Routes>
        <Footer/>
      </Router>
     
  </>
      
  )
}

export default App
