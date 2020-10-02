import TestimonialCard from "./TestimonialCard"

const testimonials = [
  {
    content:
      "Ever since i moved in to use the medtech africa's app, I have been enjoying quality health care services with the amazing doctors here.",
    image: "femi.jpg?original",
    name: "Oluwafemi Olabukoye",
    title: "CEO, Fmgold Technologies",
    id: 1,
  },
  {
    content:
      "Medtech Africa has provided an easy way for me to reach out for health related services at my fingertips. Especially for me who is always busy with work.",
    image: "victor.jpg?original",
    name: "Asah Victor",
    title: "COO, Wells Capital Ltd",
    id: 2,
  },
]

const Testimonial = () => {
  return (
    <>
      <div className="testimonial_wrapper">
        <h2 className="heading">Testimonial</h2>
        <div className="grid">
          {testimonials.map((testimony) => (
            <TestimonialCard {...testimony} key={testimony.id} />
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            grid-gap: 2rem;
          }
          .testimonial_wrapper {
            max-width: 100%;
            width: 90%;
            height: auto;
            margin: 0 auto;
            padding: 1.6rem 0.91rem;
          }
          .testimonial_wrapper h2 {
            text-align: center;
            margin-bottom: 20px;
            margin-top: 0;
          }
        `}
      </style>
    </>
  )
}
export default Testimonial
