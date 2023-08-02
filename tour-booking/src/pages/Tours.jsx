import "../styles/Tour.scss";
import CommonSection from "../shared/CommonSection";
import { Col, Container, Row } from "reactstrap";
import SearchBar from "../shared/SearchBar";
import tourData from "../assets/data/tours";
import TourCard from "../shared/TourCard";
import { useEffect, useState } from "react";
import Newsletter from "../shared/Newsletter";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const pages = Math.ceil(5 / 4); // later we will use backend data count
    setPageCount(pages);
  }, [page]);

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
          <Row>
            {tourData?.map((tour) => (
              <Col lg="3" key={tour.id} className="mb-4">
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
