import Title from "../components/Title"
import {assets} from "../assets/assets"
import NewsletterBox from "../components/NewsLetterBox"

const About = () => {
  return (
    <div >
      <div className="text-2xl text-center pt-8 border-t uppercase">
          <Title text1={"about"} text2={"us"}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        {/* image grid */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-2">
          {
            [assets.men_F,assets.women_F,assets.women_F1,assets.kids_F].map((img,idx)=>(
              <img src={img} key={idx} className="w-full h-full object-cover rounded"/>
            ))
          }
        </div>
        {/* text-section */}
        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-gray-600">
        <p className="text-2xl uppercase">
          <Title text1={"our"} text2={"fashions"}/>
        </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores repellat hic, maxime voluptates praesentium mollitia molestiae nostrum iste vero. Atque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora in voluptatum dolores fuga ipsam dolorum ullam voluptas, fugit quae accusantium?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque corrupti modi quod recusandae consectetur repellendus sit, nostrum vel ipsam dolores.</p>
          <b className="text-gray-800 capitalize">our mission</b>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores numquam aliquid obcaecati placeat voluptatum suscipit?</p>
        </div>
      </div>

      <div className="text-xl py-4 uppercase">
        <Title text1={"why"} text2={"choose us"}/> 
      </div>

      <div className="flex gap-8 flex-col md:flex-row mt-5">
        <div className="border-r border-b border-gray-500 p-2 rounded">
          <b className="capitalize text-xl md:text-lg">quality assurance</b>
          <p className="mt-3 text-lg md:text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim odit aliquid adipisci eius eaque maxime sint, beatae fugit culpa incidunt!</p>
        </div>
        <div className="border-r border-b border-gray-500 p-2 rounded">
          <b className="capitalize text-xl md:text-lg">convenience</b>
          <p className="mt-3 text-lg md:text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim odit aliquid adipisci eius eaque maxime sint, beatae fugit culpa incidunt!</p>
        </div>
        <div className="border-r border-b border-gray-500 p-2 rounded">
          <b className="capitalize text-xl md:text-lg">exceptional customer service</b>
          <p className="mt-3 text-lg md:text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim odit aliquid adipisci eius eaque maxime sint, beatae fugit culpa incidunt!</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}
export default About

// ok