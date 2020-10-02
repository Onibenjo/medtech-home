/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
// type ImageProps = {
//   path: any
//   alt: string
//   type?: string
// }
// const Image: React.FunctionComponent<ImageProps> = ({ path, alt, ...rest }) => {
const Image = ({ path, alt, ...rest }) => {
  // console.log(path)
  return (
    <div className="image-container">
      {/* <img src={require(`${path}?trace`).trace} alt={alt} {...rest} />
      <img src={require(`${path}?webp`)} alt={alt} {...rest} /> */}
      {/* <style jsx>{`
        .image-container: {
          position: relative:
        }
        img {
          position: absolute;
          top: 0;
          left: 0;
        }
    `}</style> */}
      <picture>
        {/* <source className="blur-image" srcSet={`${path}?lqip`}/> */}
        {/* <source srcSet={path.trace} /> */}
        {/* <source srcSet={`${path}?webp`} /> */}
        {/* <source srcSet={path.src} /> */}
        {/* <img src={require(`images/${path}?webp`)} /> */}
        <img src={path.src} alt={alt} {...rest} />
      </picture>

      <style jsx>
        {`
        .blur-image img {
          blur(25px);
        }
        img {
          width:100%
        }
        picture {
          display: flex;
          justify-content: center;
        }
    `}
      </style>
    </div>
  )
}
export default Image
