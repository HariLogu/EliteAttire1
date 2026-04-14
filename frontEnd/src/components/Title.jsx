const Title = ({text1,text2}) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
        <p className="uppercase text-black">{text1} <span className="text-amber-500 font-medium">{text2}</span>
        </p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] rounded bg-amber-800"></p>
    </div>
  )
}
export default Title

// ok