import "./ServiceCard.scss";

const ServiceCard = ({ item }) => {
  const { imgUrl, title, desc } = item;
  return (
    <>
      <div className="service-item">
        <div className="service-img">
          <img src={imgUrl} alt="" />
        </div>
        <h5>{title}</h5>
        <p>{desc}</p>
      </div>
    </>
  );
};

export default ServiceCard;
