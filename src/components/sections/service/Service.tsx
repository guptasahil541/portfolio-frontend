import { SectionHeader, SectionTextContent } from "@/components/ui"

export const Service = () => {
  return (
    <section id="services">
      <div className="section_flex container">
        <SectionHeader
          heading="Helping you build beautiful, functional web experiences"
          subHeading="( services )"
        />
        <SectionTextContent
          content='Three packages, designed to fit different needs — from CMS builds to fully custom-coded solutions. Pricing starts at a base rate and scales with project scope.'
        />
      </div>
    </section>
  )
}
