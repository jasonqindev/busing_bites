import { Paper, Title, Button } from "@mantine/core";
import styles from "./aboutUs.module.scss";
import { MouseEvent } from "react";

const AboutUs = () => {
  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleLinkedInClick = (linkedinUrl: string) => {
    window.open(linkedinUrl, "_blank");
  };

  const teamMembers = [
    {
      name: "Gaolong Qin",
      email: "GAOLONG.QIN.2022@MUMAIL.IE",
      linkedinUrl: "https://www.linkedin.com/in/gaolong-qin-7b2baa280/",
      imageSrc: "/images/mario.jpg",
    },
    {
      name: "Thomas May",
      email: "thomas.may.2022@mumail.ie",
      linkedinUrl: "https://www.linkedin.com/in/thomas-may-660a591b9/",
      imageSrc: "/images/sonic.jpg",
    },
    {
      name: "Alex Träem",
      email: "alexander.traem.2022@mumail.ie",
      linkedinUrl: "https://www.linkedin.com/in/alexander-traem-263419264/",
      imageSrc: "/images/knckles.jpg",
    },
    {
      name: "Peter Prendergast",
      email: "peter.prendergast.2022@mumail.ie",
      linkedinUrl: "https://www.linkedin.com/in/peter-prendergast-ab3747185/",
      imageSrc: "/images/sile.jpg",
    },
    {
      name: "Manu Xavier",
      email: "manu.xavier.2022@mumail.ie",
      linkedinUrl: "https://www.linkedin.com/in/manu-xavier-compsci/",
      imageSrc: "/images/shrek.jpg",
    },
  ];

  return (
    <div className={styles.page}>
      <Paper shadow="xl" radius="lg" className={styles.container}>
        <Title>About Us</Title>
        <div className={styles.teamSection}>
          <Title order={2}>Meet the Team</Title>
          <img src="/images/team.jpg" height={250} alt="Team" className={styles.teamImage} />
          <p>
            Welcome to Bussing Bites, where the flavorful journey of culinary exploration meets the innovative realm of technology.
            Born out of the collective passion and creativity of students enrolled in the CS353 module,
            Bussing Bites emerged as a dynamic project that transcends the traditional boundaries of computer science.
            Fueled by a shared interest in addressing dietary concerns and a commitment to making a positive impact,
            our team embarked on the exciting challenge of developing a food recipe website.
            As students eager to apply our programming skills to real-world scenarios,
            we recognized the potential to assist individuals with dietary issues by providing a platform that goes beyond mere recipes.
            Bussing Bites is our labor of love—a testament to the fusion of gastronomy and technology,
            dedicated to empowering individuals to embrace a healthier lifestyle through delicious,
            tailored recipes. Join us on this delectable adventure, where the essence of our project
            lies not just in code but in the flavors that bring people together and promote well-being.
          </p>
          <h2>The Team</h2>
          {teamMembers.map((member) => (
            <div key={member.name}>
              <img src={member.imageSrc} alt={member.name} className={styles.memberImage} />
              <p>{member.name}</p>
              <p>
                <Button onClick={() => handleEmailClick(member.email)}>Email</Button>
                <text> </text>
                <Button onClick={() => handleLinkedInClick(member.linkedinUrl)}>LinkedIn</Button>
              </p>
             
            </div>
          ))}
           <p>
                Licensing: This project is licensed under the MIT License. You can find the full license text in the project repository.
              </p>
              <p>
                Project Start Date: October 5th, 2022
              </p>
        </div>
      </Paper>
    </div>
  );
};

export default AboutUs;
