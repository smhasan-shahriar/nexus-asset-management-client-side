import React, { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const RequestAsset = () => {
    const axiosPublic = useAxiosPublic()
    const [searchField, setSearchField] = useState('')
    const [assetTypeField, setAssetTypeField] = useState('')
    const getAssets = async () => {
      const response = await axiosPublic.get(`/assets?search=${searchField}&typeField=${assetTypeField}`)
      return response.data;
    }
    const handleSubmit = e => {
      e.preventDefault();
      const search = e.target.search.value; 
      setSearchField(search)
    }
    const {data: assetList} = useQuery({
        queryKey: ["allAssets", searchField, assetTypeField],
        queryFn: getAssets
    })
    console.log(assetList)
  return (
    <div>
      <h1 className="text-5xl w-full bg-black flex justify-center items-center text-white py-20">
        Request for an Asset
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
              <span className="label-text">Filter by Asset Type</span>
            </label>
            <select onChange={e => setAssetTypeField(e.target.value)} name="assetType" defaultValue="" className="input input-bordered">
            <option value="">All</option>
              <option value="returnable">Returnable</option>
              <option value="nonreturnable">Non Returnable</option>
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
        <h1 className='text-2xl font-bold mx-auto text-center my-5'>Asset List</h1>
      <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Asset Name</th>
        <th>Asset Type</th>
        <th>Availability</th>
        <th>Request</th>
      </tr>
    </thead>
    <tbody>
        {
            assetList?.map((asset, index) =>  <tr key={index}>
                <th>{index + 1}</th>
                <td>{asset.assetName}</td>
                <td>{asset.assetType}</td>
                <td>{parseInt(asset.assetQuantity) ? 'Available' : 'Out of Stock'}</td>
                <td className=""><button disabled={!parseInt(asset.assetQuantity)}  className="btn bg-blue-500 text-white">Request</button></td>
                
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

export default RequestAsset;