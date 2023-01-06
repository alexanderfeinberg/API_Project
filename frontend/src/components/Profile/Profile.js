import Bookings from "../Bookings/Bookings";
import Listings from "../Listings/Listings";
import ProfileCard from "../ProfileCard/ProfileCard";
import UserReviews from "../Reviews/UserReviews";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserSpotsThunk } from "../../store/spots/spotThunks";
import { getUserReviewsThunk } from "../../store/reviews/reviewThunk";
import { loadBookingsByIdThunk } from "../../store/bookings/bookingThunk";

import "./Profile.css";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const listings = useSelector((state) => state.spots);
  const bookings = useSelector((state) => state.bookings.bookingList);
  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    (async () => {
      await dispatch(getUserSpotsThunk(user));
      await dispatch(loadBookingsByIdThunk(user.id));
      await dispatch(getUserReviewsThunk(user.id));
    })();
  }, []);

  useEffect(() => {
    console.log("PROFILE USE EFFECT ", listings, bookings, reviews);
    if (listings && bookings && reviews) setIsLoaded(true);
  }, [listings, bookings, reviews]);

  if (!isLoaded) return null;
  return (
    <div className="profile-container">
      <ProfileCard user={user} reviews={reviews} />
      <div className="profile-content">
        <div classNAme="profile-item profile-content-header">
          <h2>Hi, I'm {user.firstName}</h2>
          <div className="join-date">
            Joined in {new Date(user.createdAt).getFullYear()}
          </div>
        </div>
        <div className="profile-item profile-content-about">
          <h4>About</h4>
        </div>
        <div className="profile-item profile-trips">
          <Bookings bookings={bookings} />
        </div>
        <div className="profile-item profile-listings">
          <Listings user={user} spots={listings} />
        </div>
        <div className="profile-item profile-reviews">
          <UserReviews reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
