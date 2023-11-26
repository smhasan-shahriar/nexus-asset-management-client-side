import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const MakeCustomRequest = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    const currentDate = new Date();
    console.log(user)
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const assetName = form.name.value;
        const assetType = form.type.value;
        const assetPrice = form.price.value;
        const assetImage = form.image.value;
        const requestReason = form.reason.value;
        const requestInfo = form.info.value;
        const employeeEmail = user?.email;
        const dateAdded = currentDate;
        const status = "pending"
        const newRequest = {assetName, assetType, assetPrice, assetImage, requestReason, requestInfo, employeeEmail, dateAdded, status}
        console.log(newRequest)
        axiosPublic.post("/create-custom-request", newRequest)
        .then(res => {
            if(res.data.insertedId) {
                toast("Custom request successfully added")
            }
        })
    }
  return (
    <div>
      <Helmet>
        <title>Nexus | Custom Request</title>
      </Helmet>
      <h1 className="text-5xl w-full bg-black flex justify-center items-center text-white py-20">
        Make a custom Request
      </h1>
      <form onSubmit={handleSubmit} className="card-body">
        <div className="flex lg:gap-5 flex-col lg:flex-row">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Asset Name</span>
            </label>
            <input
              type="text"
              placeholder="Asset Name"
              className="input input-bordered"
              name="name"
              required
            />
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered"
              name="price"
              step="0.01"
              required
            />
          </div>
        </div>
        <div className="flex gap-5 flex-col lg:flex-row">
          <div className="form-control lg:w-1/5">
            <label className="label">
              <span className="label-text">Asset Type</span>
            </label>
            <select name="type" className="input input-bordered">
              <option value="returnable">Returnable</option>
              <option value="nonreturnable">Non Returnable</option>
            </select>
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Asset Image URL</span>
            </label>
            <input
              type="text"
              placeholder="Image URL"
              className="input input-bordered"
              name="image"
              required
            />
          </div>
        </div>

        <div className="flex lg:gap-5 flex-col">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Why you need this</span>
            </label>
            <input
              type="text"
              placeholder="Why you need this"
              className="input input-bordered"
              name="reason"
              required
            />
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Additional Information</span>
            </label>
            <input
              type="text"
              placeholder="Write Additional Information"
              className="input input-bordered"
              name="info"
              required
            />
          </div>
        </div>
        <input
          className="btn normal-case text-lg font-semibold bg-blue-600 text-white my-5"
          type="submit"
          value="Request"
        />
      </form>
    </div>
  );
};

export default MakeCustomRequest;
