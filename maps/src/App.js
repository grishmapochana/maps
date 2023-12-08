import React, { useState, useEffect } from "react";
import { getCities, shortestPath } from "./utils/api";

export default function App() {
  const [cities, setCities] = useState([]);
  const [userSelected, setUserSelected] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    getCitiesData();
  }, []);

  async function getCitiesData() {
    const data = await getCities();
    setCities(data);
  }

  function handleClick(city) {
    setUserSelected([...userSelected, city]);
  }

  async function handleSubmit() {
    const data = await shortestPath({ cities: userSelected });
    setData(data);
  }

  return (
    <div className=" mx-auto max-h-full py-10 container flex flex-col gap-4 mt-10  ">
      <h1 className="text-center text-2xl font-semibold pr-5 ">CITIES</h1>
      <div className="h-96 overflow-y-scroll flex  flex-col gap-2 items-center justify-center">
        {cities?.map((city, index) => (
          <div className="" key={index}>
            <button
              className="text-violet-500"
              onClick={() => {
                handleClick(city);
              }}
            >
              {city.name}
            </button>
          </div>
        ))}
      </div>

      <h1 className="text-center text-2xl font-semibold pr-5 ">
        USER SELECTED CITIES
      </h1>
      <div className="overflow-y-scroll flex  flex-col gap-2 items-center ">
        {userSelected.length > 0 &&
          userSelected.map((city, index) => (
            <div className="" key={index}>
              <span className="text-green-500">{city.name}</span>
            </div>
          ))}
      </div>
      <button
        className="bg-blue-500 text-white w-44 mx-auto rounded-lg px-2 py-2"
        onClick={() => handleSubmit()}
      >
        get shortest path
      </button>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-center text-2xl font-semibold pr-5 ">
            SHORTEST PATH
          </h1>
          <div className="overflow-y-scroll flex  justify-center gap-2 items-center ">
            {data &&
              data.path?.map((city, index) => (
                <div className="" key={index}>
                  <span className="text-green-500">{city.name} </span>
                </div>
              ))}
          </div>
        </div>
        <div>
          <h1 className="text-center text-2xl font-semibold pr-5 ">
            TOTAL COMBINATIONS
          </h1>
          <div className="overflow-y-scroll flex flex-col  justify-center gap-2 items-center ">
            {data &&
              data.allPermutations?.map((city, index) => (
                <div className="" key={index}>
                  <div>
                    {city.map((n, i) => (
                      <span className="text-green-500">{n.name} </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          <h1 className="text-center text-2xl font-semibold pr-5">
            DISTANCE
            <br />
            {data.distance}
          </h1>
        </div>
      </div>
    </div>
  );
}
