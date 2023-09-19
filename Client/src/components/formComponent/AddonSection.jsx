
import React from "react";
 

const AddonSection = ({ state, handleAddAddon, handleRemoveAddon }) => {
  return (
    <div className="addon-section">
      
      {state.addons.length > 0 && (
        <div className="addon-list">
          {state.addons.map((addon, index) => (
            <div key={index} className="addon-item">
              <h3 className="fs-2">{addon.title}</h3>
              <p className="fs-4">{addon.shortDesc}</p>
              <p  className="fs-4" >Price: ${addon.price}</p>
              <button onClick={() => handleRemoveAddon(addon)} className="btn btn-lg btn-primary">Remove</button>
            </div>
          ))}
        </div>
      )}

      {/* Form to add new addons */}
      <form onSubmit={handleAddAddon}>
        <label className="fs-2 fw-bold">Title:</label>
        <input className="fs-4" type="text" name="addonTitle" />
        <label className="fs-2 fw-bold" >Short Description:</label>
        <textarea className="fs-4"  name="addonShortDesc"></textarea>
        <label className="fs-2 fw-bold">Price:</label>
        <input className="fs-4"  type="number" name="addonPrice" />
        <button type="submit" className="btn btn-lg btn-primary">Add Addon</button>
      </form>
    </div>
  );
};

export default AddonSection;

