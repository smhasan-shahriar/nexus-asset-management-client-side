import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const AssetListAdmin = () => {
    const axiosPublic = useAxiosPublic()
    const [quantityIndex, setQuantityIndex] = useState('')
    const [searchField, setSearchField] = useState('')
    const getAssets = async () => {
      const response = await axiosPublic.get(`/assets?sortField=assetQuantity&sortOrder=${quantityIndex}&search=${searchField}`)
      return response.data;
    }
    const handleSubmit = e => {
      e.preventDefault();
      const search = e.target.search.value; 
      setSearchField(search)
    }
    const {data: assetList} = useQuery({
        queryKey: ["allAssets", quantityIndex, searchField],
        queryFn: getAssets
    })
    console.log(assetList)
  return (
    <div>
      <h1 className="text-5xl w-full bg-black flex justify-center items-center text-white py-20">
        Asset List
      </h1>
      <div className=" rounded-lg lg:text-right my-5">
        <form onSubmit={handleSubmit} className="mx-auto flex justify-between items-center flex-col lg:flex-row gap-5">
          <div className="flex items-center gap-3">
            <label className="label">
              <span className="label-text">Filter by Status</span>
            </label>
            <select name="category" className="input input-bordered">
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="label">
              <span className="label-text">Sort by Quantity</span>
            </label>
            <select onChange={e => setQuantityIndex(e.target.value)} defaultValue="" name="category" className="input input-bordered">
              <option value="">No Selection</option>
              <option value="asc">low to high</option>
              <option value="desc">high to low</option>
            </select>
          </div>
          <div>
            <input
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
        <th>Product Quantity</th>
        <th>Date Added</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {
            assetList?.map((asset, index) =>  <tr key={index}>
                <th>{index + 1}</th>
                <td>{asset.assetName}</td>
                <td>{asset.assetQuantity}</td>
                <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                <td className=""><button  className="btn bg-orange-500 text-white">Update</button></td>
                <td className=""><button  className="btn bg-red-600 text-white">Delete</button></td>
              </tr>)
        }
      {/* row 1 */}
     
   
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default AssetListAdmin;
