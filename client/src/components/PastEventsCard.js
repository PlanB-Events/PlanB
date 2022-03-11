


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
      
      {images.map((image, index) => (
        <div
          key={index}
          className="demo-item"
          style={{ backgroundImage: "url(" + image.src + ")" }}
        />
      ))}
      
        </div>
    )
}

