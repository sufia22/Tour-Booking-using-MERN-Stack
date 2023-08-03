import "../styles/Tour.scss";
import CommonSection from "../shared/CommonSection";
import { Col, Container, Row } from "reactstrap";
import SearchBar from "../shared/SearchBar";
import TourCard from "../shared/TourCard";
import { useEffect, useState } from "react";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const Tours = () => {
  // const [pageCount, setPageCount] = useState(0);
  // const [page, setPage] = useState(0);

  const { data, loading, error } = useFetch(`${BASE_URL}/tour`);
  // const { data: tourCount } = useFetch(
  //   `http://localhost:5050/api/v1/tour/search/getTourCount`
  // );

  // useEffect(() => {
  //   if (Array.isArray(tourCount) && tourCount.length > 0) {
  //     // Handle the array data and extract the count
  //     const count = tourCount[0].tours; // Adjust this based on your actual response structure
  //     const pages = Math.ceil(count / 8);
  //     setPageCount(pages);
  //   } else {
  //     console.log("Invalid tourCount data:", tourCount);
  //   }
  // }, [page, tourCount]);

  return (
    <>
      <CommonSection title={"All Tours"} />

      {/* ------ search bar start --------*/}
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      {/* ------ search bar end ------- */}

      {/* ------ tour data start ------- */}
      <section className="pt-0">
        <Container>
          {loading && <h4>Loading . . .</h4>}
          {error && <h4>{error}</h4>}
          {!loading && !error && (
            <Row>
              {data?.tours?.map((tour, index) => (
                <Col lg="3" className="mb-4" key={index}>
                  <TourCard tour={tour} />
                </Col>
              ))}

              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {/* {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active-page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))} */}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      {/* ------ tour data end ------- */}

      {/* ------ newsletter section start ------- */}
      <Newsletter />
      {/* ------ newsletter section end ------- */}
    </>
  );
};

export default Tours;
