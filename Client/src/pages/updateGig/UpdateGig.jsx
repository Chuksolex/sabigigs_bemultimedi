// import React, { useEffect, useState } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";
// import GigUpdateForm from "../../components/gigUpdateForm/GigUpdateForm"; // Component for displaying and updating gig data

// const UpdateGig = () => {
//   const { gigId } = useParams();
//   const history = useHistory();

//   // Fetch gig data using gigId
//   const { data: gig, isLoading } = useQuery(["gig", gigId], () =>
//     newRequest.get(`/gigs/${gigId}`)
//   );

//   // Update gig mutation
//   const updateGigMutation = useMutation((updatedGig) =>
//     newRequest.put(`/gigs/${gigId}`, updatedGig)
//   );

//   const handleUpdate = async (updatedGig) => {
//     try {
//       await updateGigMutation.mutateAsync(updatedGig);
//       // Redirect to the gig details page after successful update
//       history.push(`/gigs/${gigId}`);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//     // if (isLoading) {
//     //   return <div>Loading...</div>;
//     // }

//   return (
//     <div>
//       <h1>Update Gig</h1>
//       <GigUpdateForm gig={gig} onSubmit={handleUpdate} />
//     </div>
//   );
// };

// export default UpdateGig;
