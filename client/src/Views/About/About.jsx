import React from "react";
import "../About/About.css";
import { Link } from "react-router-dom";
const About = () => {
  const programmers = [
    {
      name: "Miguel Gorriti",
      image: "https://avatars.githubusercontent.com/u/128431530?v=4",
      socialMedia: {
        github: "https://github.com/MiGorriti",
        linkedin: "https://www.linkedin.com/in/miguel-gorriti-555393205/",
      },
    },
    {
      name: "Programador 2",
      image: "URL_IMAGEN_2",
      socialMedia: {
        github: "LINK_GITHUB_2",
        linkedin: "LINK_LINKEDIN_2",
      },
    },
    {
      name: "Programador 3",
      image: "URL_IMAGEN_3",
      socialMedia: {
        github: "LINK_GITHUB_3",
        linkedin: "LINK_LINKEDIN_3",
      },
    },
    {
      name: "Programador 4",
      image: "URL_IMAGEN_4",
      socialMedia: {
        github: "LINK_GITHUB_4",
        linkedin: "LINK_LINKEDIN_4",
      },
    },
    {
      name: "Programador 5",
      image: "URL_IMAGEN_5",
      socialMedia: {
        github: "LINK_GITHUB_5",
        linkedin: "LINK_LINKEDIN_5",
      },
    },
    {
      name: "Programador 6",
      image: "URL_IMAGEN_6",
      socialMedia: {
        github: "LINK_GITHUB_6",
        linkedin: "LINK_LINKEDIN_6",
      },
    },
    {
      name: "Programador 7",
      image: "URL_IMAGEN_7",
      socialMedia: {
        github: "LINK_GITHUB_7",
        linkedin: "LINK_LINKEDIN_7",
      },
    },
  ];

  return (
    <div>
      <h1>Desarrolladores</h1>
      <div className="programmers-list">
        {programmers.map((programmer, index) => (
          <div key={index} className="programmer-card">
            <img src={programmer.image} alt={programmer.name} />
            <h2>{programmer.name}</h2>
            <div className="social-media-links">
              <a href={programmer.socialMedia.github} target="_blank">
                GitHub
              </a>
              <a href={programmer.socialMedia.linkedin} target="_blank">
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
      <Link to="/Home" className="Boton">
        Home
      </Link>
    </div>
  );
};

export default About;
