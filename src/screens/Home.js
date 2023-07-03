import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// import Corousel from "../components/Corousel";
import axios from "axios";
export default function Home() {
  const [search,setSearch]=useState("")
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = () => {
    axios.post("https://mernbackend-96yx.onrender.com/api/foodData").then((response) => {
      setFoodItem(response.data[0]);
      setFoodCat(response.data[1]);

      console.log(response.data[0],response.data[1]);
    });
  };
  // const loadData = () => {
  //   axios.post("https://foodmanbackend.onrender.com/api/foodData?search=${search}").then((response) => {
  //     setFoodItem(response.data[0]);
  //     setFoodCat(response.data[1]);
  //     console.log(response.data[0],response.data[1]);
  //   });
  // };
  

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
    <div className="carousel-caption" style={{zIndex:"10"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={search} onChange={(e)=>setSearch(e.target.value)} />
     
    </div>
    </div>
    <div className="carousel-item active">
      <img className="d-block w-100" src="https://source.unsplash.com/random/10×10/?burger" style={{filter: "brightness(30%)"}} alt="First slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://source.unsplash.com/random/900×700/?barbeque" alt="Second slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="..." alt="Third slide"/>
    </div>
  </div>
</div>
      </div>

      <div className="container">
        {foodCat && foodCat.length > 0  ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem !== [] ? (
                  foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map((filterItems) => {
                      return (
                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3 ">
                          <Card foodItems={filterItems}
                                options={filterItems.options[0]}
                                // img={filterItems.img}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>"No such data found"</div>
                )}
              </div>
            );
          })
        ) : (
          <div>"No data available"</div>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
