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
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: tour,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tour?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tour/search/getTourCount`);

  useEffect(() => {
    if (tourCount && tourCount.tours !== undefined) {
      const pages = Math.ceil(tourCount.tours / 8);
      setPageCount(pages);
    }
    window.scrollTo(0, 0);
  }, [tourCount, tour]);

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
          {loading && <h4 className="text-center pt-5">Loading . . .</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {tour.tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" key={tour._id} className="mb-4">
                  <TourCard tour={tour} />
                </Col>
              ))}

              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active-page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
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
