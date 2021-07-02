import React, { useState } from "react";
import gardeningImg from "../../assets/images/gardeningIllustration.png";
import "./Registration.scss";
import { useAuth } from "../../contexts/UserAuthContext";
import { useHistory } from "react-router-dom";

export default function UserDetails() {
  const [coords, setCoords] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserDetails } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      await setUserDetails(firstName, coords[0], coords[1]);
      history.push("/dashboard");
    } catch (error) {
      setError("Could not save user details.");
    }
  }

  const getLocation = (e) => {
    e.preventDefault();
    setCoords([]);
    setIsLoading(true);
    navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(function (result) {
          setIsLoading(false);
          setCoords([result.coords.latitude, result.coords.longitude]);
        })
      : setError("Could not get coordinates.");
  };

  return (
    <div className="row">
      <div className="form">
        <div className="form-top">
          <h1>Almost there...</h1>
          <p>We just need a few more details to get your account set up!</p>
          {error && <p>{error}</p>}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <button id="get-location-button" onClick={getLocation}>
            Get Location
          </button>
          {isLoading && <p>Loading...</p>}
          {coords && (
            <p>
              Your coordinates: {coords[0]},{coords[1]}
            </p>
          )}
          <button
            disabled={firstName === "" || coords.length === 0 ? true : false}
            type="submit"
          >
            Let's Go!
          </button>
        </form>
      </div>
      <div className="illustration">
        <img src={gardeningImg} alt="Gardening illustration" />
      </div>
    </div>
  );
}
