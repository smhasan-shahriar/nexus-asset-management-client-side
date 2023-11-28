import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useRole from '../../Hooks/useRole';
import { useQuery } from '@tanstack/react-query';

const LimitedStockSection = () => {
    const axiosPublic = useAxiosPublic();
    const [currentUser, pending] = useRole();
    const getAssets = async () => {
        const response = await axiosPublic.get(
          `/assets?companySearch=${currentUser?.userCompany}`
        );
        return response.data;
      };
      const { data: assetList } = useQuery({
        queryKey: ["allAssets"],
        enabled: !pending,
        queryFn: getAssets,
      });
      const filteredList = assetList?.filter(item => item.assetQuantity < 10)
    return (
        <div className='my-10'>
        <h1 className="text-5xl text-center w-full flex justify-center items-center text-black py-10">
          Limited Stock Section
        </h1>
        <div className="flex justify-center">
          <div className="md:w-[700px] overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Asset Name</th>
                  <th>Asset Type</th>
                  <th>Asset Quantity</th>
                  <th>Date Added</th>
                </tr>
              </thead>
              <tbody>
                {filteredList?.map((asset, index) => (
                  <tr className="font-semibold" key={index}>
                    <th>{index + 1}</th>
                    <td>{asset.assetName}</td>
                    <td>{asset.assetType === 'returnable' && 'Returnable'}{asset.assetType === 'nonreturnable' && 'Non-returnable'}</td>
                    <td>{asset.assetQuantity === '0' ? 'Out of Stock' : asset.assetQuantity}</td>
                    <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
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

export default LimitedStockSection;