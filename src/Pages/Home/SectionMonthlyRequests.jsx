import React from 'react';

const SectionMonthlyRequests = ({requests}) => {
    const pendingRequests = requests?.sort((a, b) => {
        return new Date(b.requestedDate - a.requestedDate)
    })
   console.log(pendingRequests)
    return (
        <div className='my-10'>
       <h1 className="text-5xl w-full flex justify-center items-center text-black py-10">
        My Monthly Requests
      </h1>
      <div className='flex justify-center'>
          <div className="lg:w-[700px] overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Asset Name</th>
                  <th>Asset Type</th>
                  <th>Request Date</th>
                  <th>Request Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests?.map((asset, index) => (
                  <tr className='font-semibold' key={index}>
                    <th>{index + 1}</th>
                    <td>{asset.assetName}</td>
                    <td className='capitalize'>{asset.assetType}</td>
                    <td>{new Date(asset.requestedDate).toLocaleDateString()}</td>
                    <td className='text-red-500 font-bold capitalize'>{asset.status}</td>
          
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

export default SectionMonthlyRequests;