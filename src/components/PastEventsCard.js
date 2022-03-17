import { Carousel } from "react-bootstrap";

export default function PastEventsCard() {
  const images = [
    {
      src: "/images/sun-concert-1.jpg",
    },
    {
      src: "/images/sportsPB/workout-1.jpg",
    },
    {
      src: "/images/pedralbes-festival.jpg",
    },
  ];

  return (
    <Carousel>
      {images.map((image) => {
        return (
          <Carousel.Item key={images.indexOf(image)}>
            <img className="d-block w-100" src={image.src} alt="imgSlide" />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
