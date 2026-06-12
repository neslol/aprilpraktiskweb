import React from 'react'

const Contact = () => {
  return (
    <section className="fixed text-white xl:border-white xl:border-8 xl:rounded-md xl:top-30 xl:left-1/2 xl:-translate-x-1/2 xl:w-3/5 xl:h-4/5 w-full h-4/5 shadow-2xl overflow-hidden bg-black/25">
        <h2 className='text-center text-2xl pt-50'>Kontakt</h2>
        <form>
            <div className="grid grid-col gap-0 w-3/5 mx-auto">
                <h5>Navn</h5>
                <input className='shadow border-white border-3 text-white rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline overflow-y-auto overflow-x-hidden' type="text" />
                <h5 className='pt-4'>Email</h5>
                <input className='shadow border-white border-3 text-white rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline overflow-y-auto overflow-x-hidden' type="text" />
                <h5 className='pt-4'>Comment</h5>
                <textarea
                className='shadow border-white border-3 text-white rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline overflow-y-auto overflow-x-hidden'
                name="comment"
                />
            </div>
            <button className='shadow border-white border-3 bg-green-500 rounded-md py-2 px-3'>Send besked</button>
        </form>
    </section>
  )
}

export default Contact