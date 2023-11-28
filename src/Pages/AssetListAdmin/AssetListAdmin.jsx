import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet";
import useRole from "../../Hooks/useRole";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AssetListAdmin = () => {
  const axiosPublic = useAxiosPublic();
  const [quantityIndex, setQuantityIndex] = useState("");
  const [searchField, setSearchField] = useState("");
  const [quantityStatus, setQuantityStatus] = useState("");
  const [assetTypeField, setAssetTypeField] = useState('')
  const [currentUser, pending] = useRole();
  const navigate = useNavigate()
  const getAssets = async () => {
    const response = await axiosPublic.get(
      `/assets?sortField=assetQuantity&sortOrder=${quantityIndex}&typeField=${assetTypeField}&search=${searchField}&quantityStatus=${quantityStatus}&companySearch=${currentUser?.userCompany}`
    );
    return response.data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    setSearchField(search);
  };
  const { data: assetList, refetch: assetListRefetch } = useQuery({
    queryKey: ["allAssets", quantityIndex, searchField, quantityStatus, assetTypeField],
    enabled: !pending,
    queryFn: getAssets,
  });
  const handleDelete = id => {
    axiosPublic.delete(`/delete-asset/${id}`)
    .then(res => {
      if(res.data.deletedCount > 0){
        toast('asset deleted');
        assetListRefetch();
      }
      else{
        toast(res.data.message)
      }
    })
  }
  return (
    <div>
      <Helmet>
        <title>Nexus | Asset List</title>
      </Helmet>
      <h1 className="text-5xl w-full bg-black flex justify-center items-center text-white py-20">
        Asset List
      </h1>
      <div className=" rounded-lg lg:text-right my-5">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex justify-between items-center flex-col lg:flex-row gap-5"
        >
          <div className="flex items-center gap-3">
            <label className="label">
              <span className="label-text">Filter by Status</span>
            </label>
            <select
              onChange={(e) => setQuantityStatus(e.target.value)}
              name="category"
              defaultValue=""
              className="input input-bordered"
            >
              <option value="">No Selection</option>
              <option value="available">Available</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="label">
              <span className="label-text">Filter by Asset Type</span>
            </label>
            <select onChange={e => setAssetTypeField(e.target.value)} name="assetType" defaultValue="" className="input input-bordered">
            <option value="">All</option>
              <option value="returnable">Returnable</option>
              <option value="nonreturnable">Non Returnable</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="label">
              <span className="label-text">Sort by Quantity</span>
            </label>
            <select
              onChange={(e) => setQuantityIndex(e.target.value)}
              defaultValue=""
              name="category"
              className="input input-bordered"
            >
              <option value="">No Selection</option>
              <option value="1">low to high</option>
              <option value="-1">high to low</option>
            </select>
          </div>
          <div>
            <input
            onChange={(e) => setSearchField(e.target.value)}
              name="search"
              className="text-sm p-[13px] md:w-[360px] w-[220px] border border-r-0"
              type="text"
              placeholder="Search by title"
            />
            <input
              type="submit"
              className="w-[110px] h-[50px] bg-[#FF444A] text-white rounded-r-lg font-semibold btn rounded-none"
              value="Search"
            ></input>
          </div>
        </form>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Product Quantity</th>
                <th>Date Added</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {assetList?.map((asset, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{asset.assetName}</td>
                  <td>{asset.assetType === 'returnable' && 'Returnable'}{asset.assetType === 'nonreturnable' && 'Non-returnable'}</td>
                  <td>{asset.assetQuantity}</td>
                  <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                  <td className="">
                    <Link to={`/updateasset/${asset._id}`} className="btn bg-orange-500 text-white">
                      Update
                    </Link>
                  </td>
                  <td className="">
                    <button onClick={()=> handleDelete(asset._id)} className="btn bg-red-600 text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetListAdmin;
