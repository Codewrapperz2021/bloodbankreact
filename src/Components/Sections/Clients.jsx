import { Carousel, Tag } from "antd";
import React from "react";

export default function Clients() {
  return (
    <section
      id="clients"
      // class="pt-page pt-page-5"
      className="my_section"
      data-id="clients"
    >
      <div style={{fontSize:'100px',position:'absolute',top:'5%',left:'50%'}} >
      <div  class="spinner-grow text-danger" role="status">
        <span class="visually-hidden"></span>
      </div>
      <div  class="spinner-grow text-danger" role="status">
        <span class="visually-hidden"></span>
      </div>
      <div  class="spinner-grow text-danger" role="status">
        <span class="visually-hidden"></span>
      </div>
      </div>
      <div class="container">
        <div class="row d-flex " style={{ height: "90vh" }}>
          <div class="col-lg-4 pr-lg-5 p-0">
            <div class="heading-area">
              <h6 class="sub-title main-color"></h6>
              <h2 class="title">
                <Tag color="red" style={{ fontSize: "36px", border: "none" }}>
                  Our Volunteers
                </Tag>
              </h2>
              <p
                class="paragraph"
                style={{ color: "#093764", fontSize: "16px" }}
              >
                Our volunteers are always ready to help you.
              </p>
            </div>
            <div id="client-nav"></div>
          </div>

          <div class="col-lg-8" style={{}}>
            <div id="" class=" ">
              <Carousel autoplay={true} pauseOnHover={false}>
                <div class="client-box">
                  <i class="lni-quotation q-icon"></i>
                  <p>
                    I will be at your service anytime you require blood in Delhi
                    24*7.
                  </p>

                  <div class="client-img">
                    <img
                      src="https://megaone.acrothemes.com/personal/img/avatar-1.png"
                      alt="client"
                    />
                  </div>
                  <h5 class="client-name mb-0">Saurabh</h5>
                  <span class="client-designation">Delhi</span>
                </div>
                <div class="client-box">
                  <i class="lni-quotation q-icon"></i>
                  <p>
                    Sometimes you just need someone, i am that someone whi can
                    help you without anything in return.
                  </p>

                  <div class="client-img">
                    <img
                      src="https://megaone.acrothemes.com/personal/img/avatar-2.png"
                      alt="client"
                    />
                  </div>
                  <h5 class="client-name mb-0">Krutika</h5>
                  <span class="client-designation">Mumbai</span>
                </div>

                <div class="client-box">
                  <i class="lni-quotation q-icon"></i>
                  <p>
                    Helping the needy is my hobby, and i am one the best at it..
                  </p>

                  <div class="client-img">
                    <img
                      src="https://megaone.acrothemes.com/personal/img/avatar-3.png"
                      alt="client"
                    />
                  </div>
                  <h5 class="client-name mb-0">Aditya</h5>
                  <span class="client-designation">Uttar Pradesh</span>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
