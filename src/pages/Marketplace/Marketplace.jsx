import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Marketplace() {
  let navigate = useNavigate();
  useEffect(() => {
    setTimeout(() =>{
      navigate("/");
    }, 2000)
  }, [navigate])
  return (
    <div className="container flex md:pt-20 items-start justify-center relative z-[1] min-h-screen w-full">
      <p className="bg-light text-dark-light p-9 rounded-2xl font-bold text-xl">
        we are working on relase this feature.
      </p>
    </div>
  );
}

export default Marketplace;
