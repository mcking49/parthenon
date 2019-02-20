import { Injectable } from '@angular/core';

export interface IProject {
  title: string;
  category: string;
  year: number;
  images: string[];
  brief: string;
  conclusion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  public projects: IProject[] = [];

  constructor() {
    this.initProjects();
  }

  private initProjects() {
    this.projects = [
      {
        title: 'Hutt Attacks',
        category: 'Architecture Building',
        year: 2014,
        images: [],
        brief: `The affect/condition taken from the imagined landscape is captivity vs. escape. Here the two are
          investigated through the main character of the widow. Discussion will be undertaken over the
          contrast that the widow experiences between the two worlds and how this affects ones life. This is
          taken and turned into models that will be then used to influence the final hut design. The design of
          the hut was extracted from the imagined landscape along with the iterations of the models. The hut
          was designed for the existing site of Ghuznee Street bridge and caters to the users of that site.`,
        conclusion: `The process of this assignment was quite interesting in the sense that it was a continuation of the
          previous assignment where it required that we hadto have a story where we would extract our hut
          design from. This assignment was a further investigation of that, and was interesting because we
          hadto captivate that same story but in an interior environment and in a way that it would play with
          people’s emotions while in or even around thebuilding. It was fairly clear from the start what I had
          wanted to be achieved from this assignment and that was due to understanding my imagined story. I
          wanted to create an interior that was cold and hard and that had no warmth or welcome to it. This
          was derived straight from the story, wherethe widow’s tower was a place of pain and suffering and I
          wanted to take that and incorporate that into the reflection space. By doing this I feel thatusers of
          this space will get a full experience of the space as they reflect on their lives and take time out to
          understand where they are at, at thatparticular phase of their lives. By making the space an
          uncomfortable one, users will not be able to take a liking to it, and therefore be able to concentrate
          more on the matters at hand. This environment was well developed thanks to the help of the story
          as well as the architecture that acted as a template for the interior of this structureI feel the space
          has been designed well and really helps to magnify the fact that this place is a space where people
          com to reflect on life. The circular bench in the middle of the structure acts as a focal point of the
          building and also resembles the tower itself. This then ripples off into the rest of the concrete floor,
          where the marble of the ripples create a strong statement. By using marble, I was able to create a
          strong hierarchy in the materials andcreate a sense of hardness yet a feeling of freedom. The marble
          being a lighter materials stands in contrast with the darker concrete, and the ripple effect shows
          how there is a sense of a pursuit of freedom, where the ripples are trying to break away from the
          bench, just as the widow initially try to do fromthe stone tower.These design features have allowed
          for a successful design and the process has helped in getting to a point where the fantasy story and
          interior architecture align with the real world, and blend in smoothly to create a superficial hut and
          also a design that has a much deeper understanding behind it - where people can go to have a break
          and reflect of their lives.`
      },
      {
        title: 'Parametric Wall',
        category: 'Architecture Design',
        year: 2014,
        images: [],
        brief: `This project looked at creating a installation on the grounds of the Architecture and Design campus
          where the built form would aim to have contact with humans. Local New Zealand timber species
          were researched and from the selected species the materiality of the intervention would drive the
          output. The form was generated through early sketches and then transferred to Grasshopper
          software for iterations and final design. The final intervention is one that acts as a bike park on the
          north face of the building. The form allows for bikes to be parked and locked to the structure at a
          safe and convenient location, replacing the old and tired rack previously used. In addition to a park,
          the modules within the structure also move and react to the sun, closing themselves when
          brightness peaks to filter in the light that is know to overheat the main foyer behind it.`,
        conclusion: ``
      },
      {
        title: 'Wellington Pavilion',
        category: 'Architecture Design',
        year: 2014,
        images: [],
        brief: `The aim of this project is to demonstrate skill acquisition in representational tools and techniques
          relevant to contemporary design practices. This project sets out a number of discipline specific
          working strategies for the investigation and representation of design ideas. Here we are asked to
          take three different journeys around the city and explore the different findings. Then we are asked
          to dismantle the findings and extract ideas from it in order to come up with different models. Then
          we are to choose one and resent it in context by the use of renders and technical drawings.`,
        conclusion: ``
      },
      {
        title: 'Block House',
        category: 'Architecture Design',
        year: 2015,
        images: [],
        brief: `Learning to extract ideas from recyclable components in our surroundings and building on rural land
          is what this project was based on. Coupled with this, we were required to design a house with
          specific requirements that we would have lived to live. Shipping containers were chosen and
          composed in a stacked form to create a small house housing up to four people. Working with the
          structure of the elements and the orientation, a three storey, modular orthogonal house nestled
          within a forest was designed that focused on cost, construction and site conditions.`,
        conclusion: ``
      },
      {
        title: 'Community Center',
        category: 'Craft',
        year: 2015,
        images: [],
        brief: `This two-part project creatively explores the essential partnership between architecture and the
          people who inhabit its spaces and surroundings – bringing design to life.
          These two projects investigated the architectural implications of site and context. Project work
          included studies of the elements and principles of site analysis – researching &amp; measuring the
          environmental, physical, urban, cultural, historical, social and legal context of the design.
          The central theme of this design series is an exploration of the human perception and understanding
          of architecture through the senses. Principles of visual, acoustic and thermal sensory inputs
          investigates how the form generated can be used in creating architecture, especially
          environmentally friendly and sustainable architecture that is based on a particular clientele.

          In part two of this project, a community centre was designed that was based in the diverse suburb of
          Newtown in Wellington. This community centre has been designed with respect to its surroundings,
          both physical and cultural. The design reflects the representation of different cultures that call
          Newtown home, and this can be seen in the split of levels that not only create interesting interior
          qualities but also portray the various view point of the different people.
          The design mainly consists of thin concrete pillars and slabs that act as the structure of the design.
          This exposed feature is intentionally generated to represent the many individuals that come
          together to form and foster a healthy society. The physical model created portrays the craft and
          thought-process of what has been designed, giving also a visual understanding of a final outcome.
          This model made from MDF and acrylic represents the intended soft and ‘homely’ qualities of the
          spaces, with the variation of areas for different uses.`,
        conclusion: ``
      },
      {
        title: 'Documenting a House',
        category: 'Construction Drawings',
        year: 2015,
        images: [],
        brief: `This project focused on materials used in the construction process in New Zealand, along with their
          history and examples of them being used in modern construction processes / situations.
          Selection and specification of building materials and construction methods were documented in
          accordance with NZ standard 3604. The construction documents of the designed building informed
          the physical model which was constructed from balsa wood to exact scaled dimensions of a timber
          constructed house in New Zealand. The completion of this project provided knowledge about
          construction of small-scale buildings in the New Zealand context.`,
        conclusion: ``
      },
      {
        title: 'Elemental Design',
        category: 'Architecture Design',
        year: 2015,
        images: [],
        brief: `How do we create architecture that evolves itself from a fictional narrative? This project is based on
          creating an narrative and generating a form that has more meaning than just walls. “The life cycle” –
          a story about the reversal of life, a journey from death to birth. The journey starts from the ground,
          moving through the fire, cleansing in the water and rising to the skies. The voyage from start to

          finish is one that is reflective in nature; using elements such as form and material to provoke feelings
          within the user.`,
        conclusion: ``
      },
      {
        title: 'Infill Housing',
        category: 'Architecture Design',
        year: 2015,
        images: [],
        brief: `This two-part project creatively explores the essential partnership between architecture and the
          people who inhabit its spaces and surroundings – bringing design to life.
          These two projects investigated the architectural implications of site and context. Project work
          included studies of the elements and principles of site analysis – researching &amp; measuring the
          environmental, physical, urban, cultural, historical, social and legal context of the design.
          The central theme of this design series is an exploration of the human perception and understanding
          of architecture through the senses. Principles of visual, acoustic and thermal sensory inputs
          investigates how the form generated can be used in creating architecture, especially
          environmentally friendly and sustainable architecture that is based on a particular clientele.
          In part one of this project, an infill housing scheme was designed to help house part of the refugee
          intake in Wellington, New Zealand. A compact modular design was generated to enable assembly in
          small sites and to keep production and construction costs low. This design was to respect both the
          cultural expectations of the users and also the physical requirements they may have.
          The final design consists of prefabricated, structurally insulated panels that join to create a solid and
          functioning house. Spaces are carefully planned and elements of compact and flexible design are
          considered to provide a thoughtful piece or architecture that in universal in its approach.`,
        conclusion: ``
      },
      {
        title: 'S9 Studio',
        category: 'Architecture Design',
        year: 2015,
        images: [],
        brief: `S9 is a project that includes a self-reflective activity, synthesising interconnected contextual factors
          and a range of influences from conceptual to pragmatic concerns. A process of a fast, free and
          explorative design approach was taken to encourage an emphasis on experimentation and lateral
          thinking. Through thorough analysis of site and iterations, skills crucial to the design process were
          learnt and led towards an awareness of method and outcome. Strategies of architectural
          composition; ordering, forming and massing are expressed both on the inside and outside of the
          form, with the flexible program and composition of the external façade. The threshold between
          private and public space changes through the design with mixed used spaces that encourage a
          variance of contact. The façade reflects the famous location it sits in, incorporating the chaos and
          vibrance of Cuba Street and its surroundings.`,
        conclusion: ``
      },
      {
        title: 'Timber Frame Housing',
        category: 'Construction Drawings',
        year: 2015,
        images: [],
        brief: `This project focused on materials used in the construction process in New Zealand, along with their
          history and examples of them being used in modern construction processes / situations.
          Selection and specification of building materials and construction methods were documented in
          accordance with NZ standard 3604. The construction documents of the designed building informed
          the physical model which was constructed from balsa wood to exact scaled dimensions of a timber
          constructed house in New Zealand. The completion of this project provided knowledge about
          construction of small-scale buildings in the New Zealand context.`,
        conclusion: ``
      },
      {
        title: 'Crystalization',
        category: 'Physical Modelling',
        year: 2016,
        images: [],
        brief: `The project was based on creating interesting forms using physical material. In collaboration with
          Brittany Irvine and Hettie Bull, borax solution was used to create physical forms through an iterative
          and experimental process. The data derived from the outcomes were then extracted and input into
          the second phase of this course; digital form generation.`,
        conclusion: ``
      },
      {
        title: 'Digital Form Generation',
        category: 'Computer Modelling',
        year: 2016,
        images: [],
        brief: `This second phase of digital modelling processes included raw data from physical studies of
          materials being translated into a digital realm. Through the use of software such as Maya and
          grasshopped, forms were tested in response of the data fed and from this a process of architecture
          had started form. After a simple response was reached, the formal qualities were taken into
          Autodesk Maya to produce an over response to the “aerial pandemic” narrative. The final design is
          one that is formed by massive crystal shapes that collate to form a barrier against the threat from
          above. The architecture acts as shield that actively opens and closes around a large island in order to
          protect its refugees from danger.`,
        conclusion: ``
      },
      {
        title: 'Documenting a Building',
        category: 'Construction Drawings',
        year: 2016,
        images: [],
        brief: `This project, based on a large scale building, consisted of detailing and documenting of a core, the
          services and the façade of an office building located in Wellington, New Zealand.
          The knowledge gained in this project included the principles of designing and building larger
          buildings, specific construction systems suitable for high rise offices and use of technologies that are
          suitable and mandatory on larger projects. This process also informed that buildings are constructed
          as a result of a multitude of intersecting factors: regulatory conditions, building performance criteria,
          climate, cost, materials, design objectives – all these, among others, needed to be resolved in order
          to get a building built.
          Researching through an array of materials and techniques, this project documents the specifications
          to New Zealand standards that are to a quality of submission to local authorities and building
          contractors.`,
        conclusion: ``
      },
      {
        title: 'Earthquake Museum',
        category: 'Architecture Design',
        year: 2016,
        images: [],
        brief: `This project looks at the development and design of the New Zealand earthquake museum located
          in Evans Bay Parade, Wellington. This design looks to incorporate the seven major earthquakes
          recorded in NZ and transform that into a form that helps narrate a story to the people that visit it.
          Architectural form is coupled with structure to enhance the meeting of these two systems – like two
          tectonic plates colliding with each other, only different being that this one will work with the other
          rather than oppose it. This museum largely made up of reinforced concrete, will be used for
          exhibitions, learning and also reflecting on the past while building into the future. The design
          outcome holds two narratives as well as two different levels that even though seem to clash, end up
          working in harmony to complete the journey.`,
        conclusion: ``
      },
      {
        title: 'Residential Home 1',
        category: 'Architecture Design',
        year: 2016,
        images: [],
        brief: `A quick and simple house design generated for a large scale development project. This design, along
          with ones from collaborating members were to form a large scale development in Kilbernie,
          Wellington. Basic quality drove the design, with a budget to work to and full costing of every
          element having to be provided. Market research at the beginning of the project set out the scope for
          design and analysis of the output revealed that this model was sellable in the local housing market.`,
        conclusion: ``
      },
      {
        title: 'Residential Home 2',
        category: 'Architecture Design',
        year: 2016,
        images: [],
        brief: `A residential home that was designed around a very strict budget and client. The needs of the client
          included a two storey open-plan house that needed to contrast with the context of Island Bay,
          Wellington. Materials such as scorched wood and aluminium were used to give the design a modern
          look while features such as the pool were required to blend in with the house while still having a
          component of separation.`,
        conclusion: ``
      },
      {
        title: 'School of Music',
        category: 'Architecture Design',
        year: 2016,
        images: [],
        brief: `The school of music was a project for Victoria University of Wellington, located in the heart of
          Wellington city. This building was designed to house the new school of music; which needed to

          include a multitude of different activities. Site analysis determined what could be achieved in the
          compact site and a heavy range on program analysis determined the internal and spatial qualities of
          the spaces. The final design generated looked to house two large auditoriums, a large number of
          studio spaces and individual offices for management and staff. Qualities such as acoustics and
          privacy were to be considered, which also helped determine the division of spaces. Structure was an
          important aspect of the design, and the decision to expose it allowed for interesting shapes and
          formations evident on the different street fronts.`,
        conclusion: ``
      },
      {
        title: 'Waterloo Redevelopment',
        category: 'Urban Design',
        year: 2016,
        images: [],
        brief: `The Waterloo redevelopment project was in collaboration with Riley Adams-Winch. This project
          looked at revitalizing and rejuvenating the suburb of Waterloo, Wellington. The proposal aimed to
          foster connection between the eastern and western wards of Waterloo, to beautify and increase
          inhabitation of public spaces, to optimise and increase volume of residential space and to use the
          socio-economic stability of Waterloo to relive pressure of deprivation in surrounding suburbs.

          The final architectural outcome is one that redesigns and redefines the main Waterloo transport
          hub and creates housing that intensifies the area in order to address the various issues researched.
          Architectural features both on a small scale with layout of dwellings and on the larger scale with
          rejuvenation of roads complete this urban design proposal.`,
        conclusion: ``
      },
      {
        title: 'Athens Intervention',
        category: 'Architecture Design',
        year: 2017,
        images: [],
        brief: `This project completed at the Technical University of Munich was a studio project based in the
          suburb of Victoria in Athens, Greece. In this studio we travelled to Athens to get an understanding pf
          what and who we were developing for, taking in the knowledge and culture of the Greeks. This
          design proposal is in collaboration with Din Sterain from the University of Tel Aviv, and focuses on
          the rejuvenation of an old Polykatoikia – a traditional Greek apartment building. In this design we
          explore the possibility to transform this unoccupied building into a large community hub, where a
          different range of programs serve a variance of age groups in the neighbourhood.`,
        conclusion: ``
      },
      {
        title: 'Athens Urban',
        category: 'Urban Design',
        year: 2017,
        images: [],
        brief: `This project completed at the Technical University of Munich was a studio project based in the
          suburb of Victoria in Athens, Greece. In this studio we travelled to Athens to get an understanding pf
          what and who we were developing for, taking in the knowledge and culture of the Greeks. This
          urban design proposal is in collaboration with Din Sterain from the University of Tel Aviv.`,
        conclusion: ``
      },
      {
        title: 'Commercial Construction',
        category: 'Construction Drawings',
        year: 2017,
        images: [],
        brief: `This project consists of the documentation of an office and retail development in the heart of
          Porirua city in Wellington. The main objective of this project was to strike a balance between
          developers, investors and cost. This design that has been generated is a reflection of the typology
          that Porirua exhibits, both in terms of forms and shapes but also in terms of the local identity of
          pacific cultures. Location is made the most of in this design and the circulation of people both within
          and through it were given full consideration. Attention was also given to the many different aspects
          of designing a large scale commercial development and the many challenges and opportunities that
          come from it. The structure of the building is designed to work well with the design to allow for
          maximum usage of space and minimum obstructions within the floor area. A balance between work
          and leisure amenities in the design ensure that different types of people can interact with the site at
          any given time, allowing for the collaboration and contact of various situations. This office and retail
          complex caters to all sizes of businesses and with this allows for the city of Porirua to maintain their
          community spirit while striving to increase its economic growth in the region. A main concrete beam
          and column structure is used along with moment frames in the x and y axis for horizontal loads.`,
        conclusion: ``
      },
      {
        title: 'Commercial Design',
        category: 'Architecture Design',
        year: 2017,
        images: [],
        brief: `This project consists of an office and retail development in the heart of Porirua city in Wellington.
          The main objective of this project was to strike a balance between developers, investors and cost.
          This design that has been generated is a reflection of the typology that Porirua exhibits, both in
          terms of forms and shapes but also in terms of the local identity of pacific cultures. Location is made
          the most of in this design and the circulation of people both within and through it were given full
          consideration. Attention was also given to the many different aspects of designing a large scale
          commercial development and the many challenges and opportunities that come from it. The
          structure of the building is designed to work well with the design to allow for maximum usage of
          space and minimum obstructions within the floor area. A balance between work and leisure

          amenities in the design ensure that different types of people can interact with the site at any given
          time, allowing for the collaboration and contact of various situations. This office and retail complex
          caters to all sizes of businesses and with this allows for the city of Porirua to maintain their
          community spirit while striving to increase its economic growth in the region.`,
        conclusion: ``
      },
      {
        title: 'Robotics',
        category: 'Assisted Design',
        year: 2017,
        images: [],
        brief: `This project was based on robotics and completed for the chair of Robotics and Realization at the
          Technical University of Munich. This intervention is based around a scenario where a robot is
          developed to grow and harvest basic fresh produce for people living in a central city apartment or
          location. This robot is designed so that it can be adapted to the exterior of any existing small-sized
          building with easy set-up and running features. As we progress as a society, the use of robots are
          increasingly prominent in everyday life and by adapting this technology to an existing structure, we
          are enabling ourselves to enjoy these basic luxuries while solving a global problem with the help of
          construction and automated technology.`,
        conclusion: ``
      },
      {
        title: 'Symbols + Craft',
        category: 'Physical Modelling',
        year: 2017,
        images: [],
        brief: `This project looks at the importance of craft in Architecture. From doing we learn a lot, so how can
          we marry the process of making to the process of understanding what we design? Symbols play a big
          part in buildings, and using these symbols to produce architecture results in structures that turn into
          icons that live forever.`,
        conclusion: ``
      },
    ];
  }
}