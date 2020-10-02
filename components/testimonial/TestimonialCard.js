import Image from "components/Image"

export default function TestimonialCard({ content, name, title, image }) {
  return (
    <div className="container">
      <p className="testimonial_text">{content}</p>
      <div className="user">
        {/* <img className="user_img" src={image} alt={name} /> */}
        <Image
          style={{
            borderRadius: "50%",
            width: "5rem",
            height: "5rem",
          }}
          src={image}
          alt={name}
        />
        <div className="">
          <div className="user_name">{name}</div>
          <div className="user_title">{title}</div>
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 1rem 2rem;
          margin: 0.3rem;
          background: #ffffff;
          line-height: 1em;
          border-radius: 9px;
        }
        .testimonial_text {
          font-size: 1rem;
          padding: 2rem 0;
        }
        .user {
          display: grid;
          align-items: center;
          grid-column-gap: 0.65rem;
          grid-template-columns: 1fr 5fr;
        }
        @media (max-width: 460px) {
          .user {
            display: flex;
            justify-content: center;
            text-align: center;
          }
          .user_name {
            white-space: nowrap;
            font-size: 1rem;
          }
        }
        .user_img {
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
        }
        .user_name {
          font-size: 1.1rem;
          font-weight: bold;
        }
        .user_title {
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  )
}
