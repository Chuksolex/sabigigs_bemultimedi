
import React from "react"

const InfoSection = ({state, handleChange}) => {
    
    return(
    
    <div className="info-container">
 
  
   <label htmlFor="title" className="fs-2 fw-bold">Title:</label>
                <input
                className="form-control fs-2"
                type="text"
                name="title"
                placeholder="e.g. I will do something I'm really good at"
                onChange={handleChange}
                value={state.title}
                />
  

  <label className="my-2 mr-2 fs-2 fw-bold" htmlFor="">Category:</label> 
      <select className="form-select form-select-lg mb-3 my-4 required fs-2" name="cat"  value={state.cat}  id="cat" onChange={handleChange}>
                <option >Open this menu to select</option>
                <option value="Web Development">Web Development</option>
                <option value="Web Design">Web Design</option>
                <option value="Software">Software</option>
                <option value="Email Marketing">Email Marketing</option>
                <option value="SEO Services">SEO Services</option>
                <option value="Social Media Marketing">Social Media Marketing</option>
                <option value="Advertising">Advertising</option>
                <option value="Business">Business</option>
                <option value="music">Blog Articles Writing</option>
                <option value="Transcription">Transcription</option>
                <option value="Translation">Translation</option>
                <option value="Art &amp; Illustration">Art &amp; Illustration</option>
                <option value="Translation">Translation</option>
                <option value="Logo &amp; Identity Branding">Logo &amp; Identity Branding</option>
                <option value="Print Design">Print Design</option>
                <option value="Mustic and Video">Music and Video</option>

        </select>
  

    <label for="description" className="fs-2 fw-bold">Description:</label> <br/>
     <textarea
                            name="desc"
                            id=""
                            placeholder="Describe this gig in detail and introduce your service to customers"
                            cols="100"
                            rows="6"
                            className="form-control fs-4"
                            value={state.desc}
                            onChange={handleChange}
                            ></textarea>
                             
    <label htmlFor="discount" className="fs-2 fw-bold">Discount:</label>
                <input
                className="form-control fs-2"
                type="number"
                name="discountOffer"
                value={state.discountOffer}
                onChange={handleChange}
                />
                <span>Will not apply until you switch it on. Put discounts on only the gigs you need them not all</span>
  
</div>

    )
}
export default InfoSection
