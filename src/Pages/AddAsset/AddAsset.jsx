import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';
import useRole from '../../Hooks/useRole';
import { Helmet } from 'react-helmet';

const AddAsset = () => {
    const axiosPublic = useAxiosPublic()
    const [user] = useRole();
    const currentDate = new Date();
    console.log(user)
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const assetName = form.name.value;
        const assetType = form.type.value;
        const assetQuantity = form.quantity.value;
        const userCompany = user?.userCompany;
        const dateAdded = currentDate;
        const newAsset = {assetName, assetType, assetQuantity, userCompany, dateAdded}
        console.log(newAsset)
        axiosPublic.post("/create-asset", newAsset)
        .then(res => {
            if(res.data.insertedId) {
                toast("Asset successfully added")
            }
        })
    }
    return (
        <div>
          <Helmet>
                <title>Nexus | Add Asset</title>
            </Helmet>
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
          disabled = {!user}
        />
      </form>
        </div>
    );
};

export default AddAsset;