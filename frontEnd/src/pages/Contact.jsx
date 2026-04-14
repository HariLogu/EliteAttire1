import { assets } from "../assets/assets"
import NewsletterBox from "../components/NewsLetterBox"
import Title from "../components/Title"

const Contact = () => {
  return (
    <div>
      <div className="my-8 uppercase text-2xl">
        <Title text1={"contact"} text2={"us"}/>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <img src={assets.contact} alt="" className="w-full md:max-w-1/2" />
        <div className="flex flex-col w-full max-w-1/2 justify-center gap-4">
          <p className="text-lg font-medium capitalize">our store</p>
          <p className="flex flex-col text-sm capitalize text-gray-500">
            <p>54709 william street ,</p>
            <p className="w-full">chennai-600012 tamilNadu</p>
          </p>
          <p className="flex flex-col text-sm text-gray-500"> 
            <span className="capitalize">tel:(91) 99878 78786</span>
            <span>Email:logesh@gmail.com</span>
          </p>
          <p className="text-lg font-medium  capitalize">careers at forever</p>
          <p className="flex flex-col text-sm capitalize text-gray-500">Learn more about our teams and job openings</p>
          <button className="hover:bg-black bg-white  border text-black cursor-pointer text-sm active:bg-gray-500 hover:text-white flex my-5 rounded justify-start w-fit capitalize px-3 py-2 transition-all ease-in-out">explore jobs</button>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}
export default Contact


// ok