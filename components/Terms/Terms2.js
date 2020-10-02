import React from "react"
import Typography from "@material-ui/core/Typography"

export default function FormDialog() {
  return (
    <>
      <div className="terms_container">
        <h1>Terms and Conditions</h1>
        <Typography variant="h5" component="h5">
          Terms of Use
        </Typography>
        <Typography variant="body1" className="text" component="p">
          These Terms of Use ("Terms") and our Privacy Policy set forth the
          terms and conditions governing your use of the Medtech Africa's
          service (the "Healthbank"). The service is offered by Medtech Africa
          (the "Facility"). The Terms and Privacy Policy together form a legal
          contract between you and Facility, governing your access to and use of
          the Service. Please read the Terms and Privacy Policy carefully before
          using the Service. BY CLICKING "I ACCEPT", YOU ARE ENTERING INTO A
          LEGALLY BINDING AGREEMENT TO THESE TERMS OF USE AND THE PRIVACY POLICY
          JUST AS YOU WOULD BY SIGNING A PAPER CONTRACT. If you do not agree
          with and accept these Terms of Use and the Privacy Policy, do not use
          the Service. DO NOT USE THIS SITE FOR EMERGENCY MEDICAL NEEDS. If you
          experience a medical emergency, Please call emergency.
        </Typography>
        <Typography variant="h5" component="h5">
          Acceptable Use
        </Typography>
        <Typography component="p" variant="body1" className="text">
          You agree not to access or use the Service in an unlawful way or for
          an unlawful or illegitimate purpose or in any manner that contravenes
          this Agreement. You shall not post, use, store or transmit (a) a
          message or information under a false name; (b) information that is
          unlawful, libelous, defamatory, obscene, fraudulent, predatory of
          minors, harassing, threatening or hateful to any person; or (c)
          information that infringes or violates any of the intellectual
          property rights of others or the privacy or publicity rights of
          others. You shall not attempt to disrupt the operation of the Service
          by any method, including through use of viruses, Trojan horses, worms,
          time bombs, denial of service attacks, flooding or spamming. You shall
          not use the Service in any manner that could damage, disable or impair
          the Service. You shall not attempt to gain unauthorized access to any
          user accounts or computer systems or networks, through hacking,
          password mining or any other means. You shall not use any robot,
          scraper or other means to access the Service for any purpose.
        </Typography>
        <Typography variant="h5" component="h5">
          Modification of These Terms and the Site.
        </Typography>
        <Typography component="p" variant="body1" className="text">
          You are responsible for regularly reviewing these Terms. Facility has
          the right, but not the obligation, to correct any errors or omissions
          in any portion of the Site, the Service and these Terms. Facility
          reserves the right, at its sole discretion, to change, modify, add,
          remove or terminate any portion of the Site, the Service and these
          Terms, in whole or in part, at any time, without prior notice. All
          changes to these Terms are effective immediately upon being posted to
          the Site. YOUR CONTINUED USE OF THE SITE OR SERVICE FOLLOWING ANY
          CHANGES TO THESE TERMS WILL MEAN YOU ACCEPT THESE CHANGES.
        </Typography>
        <Typography variant="h5" component="h5">
          International Use
        </Typography>
        <Typography component="p" variant="body1" className="text">
          The Service is designed for and intended for users in Africa. Medtech
          Africa makes no representation that the information and services
          provided on the Service are applicable to, appropriate for, or
          available to users in locations outside the United States. Accessing
          the Service from territories where the content is illegal is
          prohibited. If you choose to access the site from a location outside
          Africa, you do so on your own initiative and you are responsible for
          compliance with local laws.
        </Typography>
        <Typography variant="h5" component="h5">
          Termination
        </Typography>
        <Typography component="p" variant="body1" className="text">
          Facility may suspend or terminate your access to the Service at any
          time, for any reason or for no reason at all. Facility has the right
          (but not the obligation) to refuse to provide access to the Service to
          any person, agency or organization at any time, for any reason or for
          no reason at all, in our sole discretion. Facility reserves the right
          to change, suspend, or discontinue all or part of the Service,
          temporarily or permanently, without prior notice.
        </Typography>
      </div>
      <style jsx>{`
        .terms_container {
          max-width: 720px;
          margin: 0 auto;
          padding: 2rem 2rem 4rem;
          text-align: justify;
        }
        h1 {
          font-size: 2rem;
        }
        .terms_container .text {
          text-align: justify;
        }
        .subheader {
          margin-top: 1rem;
        }
      `}</style>
    </>
  )
}
