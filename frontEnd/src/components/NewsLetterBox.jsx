const NewsletterBox = () => {

    function onSubmitHandler(event){
        event.preventDefault()
    }

  return (
    <div className="text-center my-8">
        <p className="capitalize text-2xl font-medium text-gray-800">subscribe now & get 20% off</p>
        <p className="text-gray-600 mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, possimus.
        </p>
        <form action="" onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border-1 p-2 rounded border-amber-400 pl-3" >
            <input className="w-full  sm:flex-1 focus:outline-none" type="email" placeholder="Enter the Email" required/>
            <button type="submit" className="bg-amber-300 text-black rounded capitalize p-1 hover:scale-105 transition ease-in-out hover:cursor-pointer" >subscribe</button>
        </form>
    </div>
  )
}
export default NewsletterBox

// ok