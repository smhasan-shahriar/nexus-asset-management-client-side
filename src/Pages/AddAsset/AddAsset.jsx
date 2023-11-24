import React from 'react';

const AddAsset = () => {
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const assetName = form.name.value;
        const assetType = form.type.value;
        const assetQuantity = form.quantity.value;
        const newAsset = {assetName, assetType, assetQuantity}
        console.log(newAsset)
    }
    return (
        <div>
            <h1 className='text-5xl w-full bg-black flex justify-center items-center text-white py-20'>Add an Asset</h1>
            <form onSubmit={handleSubmit} className="card-body">
        
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              placeholder="Product Name"
              className="input input-bordered"
              name="name"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Type</span>
            </label>
            <select name="type" className="input input-bordered">
              <option value="returnable">Returnable</option>
              <option value="nonreturnable">Non Returnable</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Quantity</span>
            </label>
            <input
              type="number"
              placeholder="Product Quantity"
              className="input input-bordered"
              name="quantity"
              required
            />
          </div>
 
        <input
          className="btn normal-case text-lg font-semibold bg-black text-white my-5"
          type="submit"
          value="Add"
        />
      </form>
        </div>
    );
};

export default AddAsset;