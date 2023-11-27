import React from "react";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useRole from "../../Hooks/useRole";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UpdateAsset = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { id } = useParams();
  const getAsset = async () => {
    const response = await axiosPublic.get(`/asset/${id}`);
    return response.data;
  };
  const { data: assetNow } = useQuery({
    queryKey: ["assetNow"],
    queryFn: getAsset,
  });
  console.log(assetNow);
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const assetName = form.name.value;
    const assetType = form.type.value;
    const assetQuantity = form.quantity.value;
    const updatedAsset = { assetName, assetType, assetQuantity };
    axiosPublic.put(`/update-asset/${id}`, updatedAsset).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast("Asset successfully updated");
        navigate("/assets");
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>Nexus | Update Asset</title>
      </Helmet>
      <h1 className="text-5xl w-full bg-black flex justify-center items-center text-white py-20">
        Update Asset
      </h1>
      <form onSubmit={handleUpdate} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            defaultValue={assetNow?.assetName}
            className="input input-bordered"
            name="name"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Type</span>
          </label>
          <select
            name="type"
            defaultValue={assetNow?.assetType}
            className="input input-bordered"
          >
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
            defaultValue={assetNow?.assetQuantity}
            className="input input-bordered"
            name="quantity"
            required
          />
        </div>

        <input
          className="btn normal-case text-lg font-semibold bg-black text-white my-5"
          type="submit"
          value="Update"
        />
      </form>
    </div>
  );
};

export default UpdateAsset;
