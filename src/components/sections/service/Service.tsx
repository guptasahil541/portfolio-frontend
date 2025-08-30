import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { SectionSubHeading } from '@/components/ui/SectionSubHeading/SectionSubHeading';
import { SectionTextContent } from '@/components/ui/SectionTextContent/SectionTextContent';

export const Service = () => {
  return (
    <section id="services" className="section_vertical_padding">
      <div className="container">
        <SectionSubHeading content='( services )' />
        <SectionHeading content='Helping you build beautiful, functional web experiences'/>
        <SectionTextContent content='Three packages, designed to fit different needs — from CMS builds to fully custom-coded solutions. Pricing starts at a base rate and scales with project scope.' />
      </div>
    </section>
  )
}
