import { Carousel } from "react-bootstrap";



export default function PastEventsCard(){
    
    const images = [
        {
          src:
            "/public/images/sun-concert-1.jpg"
        },
        {
          src:
            "/public/images/sportsPB/workout-1.jpg"
        },
        {
          src:
            "/public/images/botanical-gardens-concert.jpg"
        }
      ];

    return(
        <div>
      <Carousel>
      {images.forEach((image) => {return(
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={image.src}
            alt="First slide"
            />
        </Carousel.Item>
      )})}
      </Carousel>
        </div>
    )
}

