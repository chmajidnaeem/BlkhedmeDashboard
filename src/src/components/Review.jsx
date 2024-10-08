import React from 'react'
import ReviewImg from '../Assets/manImg.jpg'

const Review = () => {
    const reviews = [
        { name: "Ali Akbar", rating: "★★★★★", image: ReviewImg, desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum hic inventore omnis consequuntur laudantium doloribus ullam eveniet ex reiciendis neque.", time:"3 Weeks ago" },
        { name: "Ali Akbar", rating: "★★★★★", image: ReviewImg, desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum hic inventore omnis consequuntur laudantium doloribus ullam eveniet ex reiciendis neque.", time:"3 Weeks ago" },
        { name: "Ali Akbar", rating: "★★★★★", image: ReviewImg, desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum hic inventore omnis consequuntur laudantium doloribus ullam eveniet ex reiciendis neque.", time:"3 Weeks ago" },
        { name: "Ali Akbar", rating: "★★★★★", image: ReviewImg, desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum hic inventore omnis consequuntur laudantium doloribus ullam eveniet ex reiciendis neque.", time:"3 Weeks ago" },
      ];
  return (
    <>
    {reviews.map((review, id)=>(
    <div key={id} className='bg-[#FFFFFF] flex gap-4 p-4 w-full md:w-2/3 my-3 rounded-md shadow-md font-poppins'>
    <div className="image w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-ccenter">
        <img src={review.image} alt="review-image" className="w-full h-full object-cover " />
    </div>
    <div>
        <div className='flex items-center gap-4'>
        <h1 className='font-semibold'>{review.name} </h1>
        <span className='text-[12px] font-medium text-[#616161]'>{review.time}</span>
        </div>
        <span className='text-[12px] text-[#616161]'>Rating <span className='text-[#E5801A] ml-1'>{review.rating}</span></span>
        <p>{review.desc}</p>
    </div>
</div>
    ))}
</>
  )
}

export default Review