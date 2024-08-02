import React, { useState, useRef, MouseEvent, useEffect } from "react";

type TeamMember = {
  id: number;
  name: string;
  position: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Rick McCartney",
    position: "CEO",
    image:
      "https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d3483259_Rick%20McCartney%20.webp",
  },
  {
    id: 2,
    name: "Chris Koha",
    position: "COO",
    image:
      "https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d34832ae_655d505c9d551c9c11dd3613_Chris20Koha.webp",
  },
  {
    id: 3,
    name: "Caroline Nieto",
    position: "Chief Product Officer",
    image:
      "https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/65cd134a7ece047ea2260d5b_Caroline%20Nieto.webp",
  },
  {
    id: 4,
    name: "Víctor Albertos",
    position: "CTO",
    image:
      "https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d34832e6_655d504bfd0e67e20640dbbd_ViCC81ctor20Albertos.webp",
  },
  {
    id: 5,
    name: "Dr. Jana Schmidt",
    position: "Chief Innovation Officer",
    image:
      "https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d348325a_655d4fbc461dbfc3c7e1914e_Dr.20Jana20Hapfelmeier.webp",
  },
  {
    id: 6,
    name: "Adrián Rubio",
    position: "VP of Engineering",
    image:
      "https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d348325c_655d50b27e70d440e4404528_AdriaCC81n20Rubio.webp",
  },
  {
    id: 7,
    name: "Cy Serrano",
    position: "VP of Product",
    image:
      "https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/659dbdfd5a080be8d34832c7_655d4fcd461dbfc3c7e19739_Cy20Serrano.webp",
  },
  {
    id: 8,
    name: "Lenya McGrath",
    position: "VP of Partnerships",
    image:
      "https://cdn.prod.website-files.com/659dbdfd5a080be8d3483190/65e0bbf51f50ea7c26f413f5_Lenya%20McGrath.webp",
  },
];

interface TeamMemberProps {
  member: TeamMember;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ x: string; y: string }>({
    x: "50%",
    y: "50%",
  });
  const teamItemRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (teamItemRef.current) {
      const rect = teamItemRef.current.getBoundingClientRect();
      const containerTopBounds = rect.top;
      const containerLeftBounds = rect.left;

      const containerWidth = rect.width;
      const containerHeight = rect.height;

      const containerOriginX = containerWidth / 2;
      const containerOriginY = containerHeight / 2;

      const cursorPosX = e.clientX - containerLeftBounds;
      const cursorPosY = e.clientY - containerTopBounds;

      let cursorFromOriginOffsetX = (cursorPosX / containerOriginX - 1) * 100;
      let cursorFromOriginOffsetY = (cursorPosY / containerOriginY - 1) * 100;

      const acutalImagePositionX = containerOriginX + cursorFromOriginOffsetX;
      const acutalImagePositionY = containerOriginY + cursorFromOriginOffsetY / 20;

      setCoords({
        x: `${(acutalImagePositionX / containerWidth) * 100}%`,
        y: `${(acutalImagePositionY / containerHeight) * 100}%`,
      });
    }
  };

  return (
    <div className="flex justify-center" style={{ width: "100%" }}>
      <div className="w-full lg:w-[95%]">
        <div
          ref={teamItemRef}
          className={`team__item ${hovered ? "hovered" : ""} h-[140px] flex  md:items-center`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <div className="flex items-center md:justify-between w-[100%]">
            <div className="flex md:justify-between md:items-center animating md:flex-row flex-col w-[100%]">
              <div className="flex gap-x-10 md:items-center">
                <div className="team__index  flex items-start md:items-center md:block">
                  <div
                    className="f-40 light hidden md:block items-center"
                    style={{ opacity: "15%" }}
                  >{`0${member.id}`}</div>
                </div>
                <div className="flex -ml-10 md:ml-0 items-start md:items-center md:text-[44px] md:leading-[52px] leading-7 text-[23.4px]">
                  {member.name}
                </div>
              </div>
              <div
                className="flex md:items-center md:text-[22.2px] text-[11.57px]"
                style={{ fontFamily: "SF Pro, sans-serif" }}
              >
                <div className="f-20 is--500 text-[#706A6D]">{member.position}</div>
              </div>
            </div>
            <div className="md:hidden block ">
              <img src={member.image} alt="" className="w-36" width={100} height={100} />
            </div>
          </div>

          <div
            id="ahmed"
            className="team__avatar--parent md:block hidden"
            style={{
              opacity: hovered ? 1 : 0,
              visibility: hovered ? "visible" : "hidden",
            }}
          >
            <div
              className="team__avatar"
              style={{
                position: "absolute",
                top: `${coords.y}`,
                left: `${coords.x}`,
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                transition: "transform 0.3s ease",
              }}
            >
              <img src={member.image} alt={member.name} />
            </div>
          </div>
          <style jsx>{`
            .team__item {
              padding: 20px;
              text-align: center;
              cursor: pointer;
              transition: background 0.3s ease, color 0.3s ease;
              width: 100%;
              position: relative;
              border-bottom: 1px solid black;
              font-family: SF Pro;
              width: 100%;
            }
            .team__item:hover {
              background: #df1780;
              color: white;
            }
            .team__row {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .team__index {
              font-size: 44px;
              line-height: 52.8px;
              font-weight: 274;
            }
            .team__position .f-20 {
              font-size: 20px;
              font-weight: 500;
            }
            .team__avatar--parent {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: visible;
              pointer-events: none;
              opacity: 0;
              visibility: hidden;
              transition: opacity 0.3s ease, visibility 0.3s ease;
              z-index: 100;
            }
            .team__item:hover .team__avatar--parent {
              opacity: 1;
              visibility: visible;
            }
            .team__avatar img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  return (
    <div className="team__list px-6">
      {teamMembers.map((member) => (
        <TeamMember key={member.id} member={member} />
      ))}
      <style jsx>{`
        .team__list {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Team;
